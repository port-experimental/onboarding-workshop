#!/bin/bash

# Port Workshop Challenge Validation Script
# Usage: ./validate-challenge.sh [level] [challenge-name]
# Example: ./validate-challenge.sh beginner first-blueprint

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PORT_API_URL="${PORT_API_URL:-https://api.getport.io/v1}"
PORT_TOKEN="${PORT_TOKEN:-}"

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if Port token is set
    if [ -z "$PORT_TOKEN" ]; then
        log_error "PORT_TOKEN environment variable not set"
        log_info "Please set your Port API token: export PORT_TOKEN=your_token_here"
        exit 1
    fi
    
    # Check if required tools are available
    command -v curl >/dev/null 2>&1 || { log_error "curl is required but not installed"; exit 1; }
    command -v jq >/dev/null 2>&1 || { log_error "jq is required but not installed"; exit 1; }
    
    log_success "Prerequisites check passed"
}

# API helper functions
port_api_get() {
    local endpoint=$1
    curl -s -X GET "$PORT_API_URL/$endpoint" \
        -H "Authorization: Bearer $PORT_TOKEN" \
        -H "Content-Type: application/json"
}

port_api_post() {
    local endpoint=$1
    local data=$2
    curl -s -X POST "$PORT_API_URL/$endpoint" \
        -H "Authorization: Bearer $PORT_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$data"
}

# Validation functions
validate_blueprint() {
    local blueprint_id=$1
    local expected_title=$2
    
    log_info "Validating blueprint: $blueprint_id"
    
    local response=$(port_api_get "blueprints/$blueprint_id")
    local status=$(echo "$response" | jq -r '.ok // false')
    
    if [ "$status" = "true" ] || echo "$response" | jq -e '.identifier' >/dev/null 2>&1; then
        local title=$(echo "$response" | jq -r '.title // ""')
        if [ "$title" = "$expected_title" ]; then
            log_success "Blueprint $blueprint_id exists with correct title: $title"
            return 0
        else
            log_warning "Blueprint $blueprint_id exists but title mismatch. Expected: $expected_title, Got: $title"
            return 1
        fi
    else
        log_error "Blueprint $blueprint_id not found"
        return 1
    fi
}

validate_action() {
    local action_id=$1
    local expected_title=$2
    
    log_info "Validating action: $action_id"
    
    local response=$(port_api_get "actions/$action_id")
    local status=$(echo "$response" | jq -r '.ok // false')
    
    if [ "$status" = "true" ] || echo "$response" | jq -e '.identifier' >/dev/null 2>&1; then
        local title=$(echo "$response" | jq -r '.title // ""')
        if [ "$title" = "$expected_title" ]; then
            log_success "Action $action_id exists with correct title: $title"
            return 0
        else
            log_warning "Action $action_id exists but title mismatch. Expected: $expected_title, Got: $title"
            return 1
        fi
    else
        log_error "Action $action_id not found"
        return 1
    fi
}

validate_dashboard() {
    local dashboard_id=$1
    local expected_title=$2
    
    log_info "Validating dashboard: $dashboard_id"
    
    local response=$(port_api_get "dashboards")
    local dashboard=$(echo "$response" | jq -r ".dashboards[] | select(.identifier==\"$dashboard_id\" or .title==\"$expected_title\")")
    
    if [ -n "$dashboard" ]; then
        local title=$(echo "$dashboard" | jq -r '.title')
        log_success "Dashboard found with title: $title"
        
        # Check widget count
        local widget_count=$(echo "$dashboard" | jq -r '.widgets | length')
        log_info "Dashboard has $widget_count widgets"
        return 0
    else
        log_error "Dashboard $dashboard_id not found"
        return 1
    fi
}

validate_entities() {
    local blueprint_id=$1
    local min_count=${2:-1}
    
    log_info "Validating entities for blueprint: $blueprint_id"
    
    local response=$(port_api_get "blueprints/$blueprint_id/entities")
    local count=$(echo "$response" | jq -r '.entities | length // 0')
    
    if [ "$count" -ge "$min_count" ]; then
        log_success "Found $count entities for blueprint $blueprint_id (minimum: $min_count)"
        return 0
    else
        log_warning "Found only $count entities for blueprint $blueprint_id (minimum: $min_count)"
        return 1
    fi
}

validate_integration() {
    local integration_type=$1
    
    log_info "Validating integration type: $integration_type"
    
    local response=$(port_api_get "integrations")
    local integration=$(echo "$response" | jq -r ".integrations[] | select(.type==\"$integration_type\")")
    
    if [ -n "$integration" ]; then
        local status=$(echo "$integration" | jq -r '.status // "unknown"')
        local title=$(echo "$integration" | jq -r '.title // "unknown"')
        
        if [ "$status" = "active" ] || [ "$status" = "running" ]; then
            log_success "Integration $title is active"
            return 0
        else
            log_warning "Integration $title exists but status is: $status"
            return 1
        fi
    else
        log_error "No $integration_type integration found"
        return 1
    fi
}

# Challenge-specific validation functions
validate_beginner_first_blueprint() {
    log_info "Validating First Blueprint Challenge..."
    
    local success=0
    
    validate_blueprint "team" "Team" || success=1
    
    # Check required properties
    local blueprint=$(port_api_get "blueprints/team")
    local properties=$(echo "$blueprint" | jq -r '.schema.properties | keys[]')
    
    local required_props=("description" "lead" "members_count")
    for prop in "${required_props[@]}"; do
        if echo "$properties" | grep -q "$prop"; then
            log_success "Required property $prop found"
        else
            log_error "Required property $prop missing"
            success=1
        fi
    done
    
    return $success
}

validate_beginner_first_dashboard() {
    log_info "Validating First Dashboard Challenge..."
    
    local success=0
    
    validate_dashboard "techcorp-service-overview" "TechCorp Service Overview" || success=1
    validate_entities "service" 2 || success=1
    
    return $success
}

validate_beginner_first_action() {
    log_info "Validating First Action Challenge..."
    
    local success=0
    
    validate_action "update_readme" "Update Service README" || success=1
    
    return $success
}

validate_intermediate_relationships() {
    log_info "Validating Team-Service Relationships Challenge..."
    
    local success=0
    
    # Check blueprints exist
    validate_blueprint "team" "Team" || success=1
    validate_blueprint "service" "Service" || success=1
    
    # Check relationships
    local service_blueprint=$(port_api_get "blueprints/service")
    local team_relation=$(echo "$service_blueprint" | jq -r '.relations.team // empty')
    
    if [ -n "$team_relation" ]; then
        log_success "Service-Team relationship configured"
    else
        log_error "Service-Team relationship missing"
        success=1
    fi
    
    # Check entities with relationships
    validate_entities "team" 2 || success=1
    validate_entities "service" 2 || success=1
    
    return $success
}

validate_intermediate_dashboards() {
    log_info "Validating Multi-Dashboard Setup Challenge..."
    
    local success=0
    
    local dashboards=("Developer Workspace" "Engineering Management Overview" "Platform Engineering Console")
    
    for dashboard in "${dashboards[@]}"; do
        validate_dashboard "" "$dashboard" || success=1
    done
    
    return $success
}

# Main validation logic
validate_challenge() {
    local level=$1
    local challenge=$2
    
    case "$level" in
        "beginner")
            case "$challenge" in
                "first-blueprint")
                    validate_beginner_first_blueprint
                    ;;
                "first-dashboard")
                    validate_beginner_first_dashboard
                    ;;
                "first-action")
                    validate_beginner_first_action
                    ;;
                *)
                    log_error "Unknown beginner challenge: $challenge"
                    return 1
                    ;;
            esac
            ;;
        "intermediate")
            case "$challenge" in
                "team-service-relationships")
                    validate_intermediate_relationships
                    ;;
                "multi-dashboard-setup")
                    validate_intermediate_dashboards
                    ;;
                *)
                    log_error "Unknown intermediate challenge: $challenge"
                    return 1
                    ;;
            esac
            ;;
        *)
            log_error "Unknown challenge level: $level"
            return 1
            ;;
    esac
}

validate_all_beginner() {
    log_info "Validating all beginner challenges..."
    
    local overall_success=0
    
    validate_challenge "beginner" "first-blueprint" || overall_success=1
    validate_challenge "beginner" "first-dashboard" || overall_success=1
    validate_challenge "beginner" "first-action" || overall_success=1
    
    return $overall_success
}

validate_all_intermediate() {
    log_info "Validating all intermediate challenges..."
    
    local overall_success=0
    
    validate_challenge "intermediate" "team-service-relationships" || overall_success=1
    validate_challenge "intermediate" "multi-dashboard-setup" || overall_success=1
    
    return $overall_success
}

# Usage information
show_usage() {
    echo "Port Workshop Challenge Validation Script"
    echo ""
    echo "Usage: $0 [level] [challenge-name]"
    echo "       $0 [level] all"
    echo "       $0 --help"
    echo ""
    echo "Levels:"
    echo "  beginner     - Validate beginner challenges"
    echo "  intermediate - Validate intermediate challenges"
    echo ""
    echo "Beginner Challenges:"
    echo "  first-blueprint  - First Blueprint Challenge"
    echo "  first-dashboard  - First Dashboard Challenge"
    echo "  first-action     - First Action Challenge"
    echo ""
    echo "Intermediate Challenges:"
    echo "  team-service-relationships - Team-Service Relationships Challenge"
    echo "  multi-dashboard-setup      - Multi-Dashboard Setup Challenge"
    echo ""
    echo "Examples:"
    echo "  $0 beginner first-blueprint"
    echo "  $0 intermediate all"
    echo "  $0 beginner all"
    echo ""
    echo "Environment Variables:"
    echo "  PORT_TOKEN    - Your Port API token (required)"
    echo "  PORT_API_URL  - Port API URL (default: https://api.getport.io/v1)"
}

# Main script logic
main() {
    if [ $# -eq 0 ] || [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
        show_usage
        exit 0
    fi
    
    check_prerequisites
    
    local level=$1
    local challenge=${2:-"all"}
    
    log_info "Starting validation for $level level, challenge: $challenge"
    
    local success=0
    
    if [ "$challenge" = "all" ]; then
        case "$level" in
            "beginner")
                validate_all_beginner || success=1
                ;;
            "intermediate")
                validate_all_intermediate || success=1
                ;;
            *)
                log_error "Unknown level: $level"
                exit 1
                ;;
        esac
    else
        validate_challenge "$level" "$challenge" || success=1
    fi
    
    echo ""
    if [ $success -eq 0 ]; then
        log_success "All validations passed! 🎉"
    else
        log_error "Some validations failed. Please check the output above."
        exit 1
    fi
}

# Run main function with all arguments
main "$@"