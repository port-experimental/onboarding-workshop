#!/bin/bash

# Port Workshop Environment Validation Script
# Validates environment setup before starting the workshop

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Logging functions
log_info() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
}

log_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

log_error() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
}

log_header() {
    echo -e "${BLUE}📋 $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Port instance access
check_port_access() {
    log_header "Checking Port instance access..."
    
    if [ -z "$PORT_URL" ]; then
        log_error "PORT_URL environment variable not set"
        echo "  Set it with: export PORT_URL=https://your-org.getport.io"
        return 1
    fi
    
    if command_exists curl; then
        if curl -s -I "$PORT_URL" >/dev/null 2>&1; then
            log_info "Port instance accessible at $PORT_URL"
        else
            log_error "Cannot access Port instance at $PORT_URL"
            echo "  Check your URL and network connection"
        fi
    elif command_exists wget; then
        if wget --spider -q "$PORT_URL" 2>/dev/null; then
            log_info "Port instance accessible at $PORT_URL"
        else
            log_error "Cannot access Port instance at $PORT_URL"
            echo "  Check your URL and network connection"
        fi
    else
        log_warn "Neither curl nor wget available - cannot test Port access"
        echo "  Please verify manually that you can access $PORT_URL"
    fi
}

# Check required tools
check_required_tools() {
    log_header "Checking required tools..."
    
    # Web browser check (indirect)
    if [ -n "$BROWSER" ]; then
        log_info "Browser environment variable set: $BROWSER"
    else
        log_warn "BROWSER environment variable not set"
        echo "  Ensure you have a modern web browser installed"
    fi
    
    # Text editor check
    if command_exists code; then
        log_info "VS Code available"
    elif command_exists vim; then
        log_info "Vim available"
    elif command_exists nano; then
        log_info "Nano available"
    else
        log_warn "No common text editor found"
        echo "  Consider installing VS Code for better experience"
    fi
}

# Check optional tools
check_optional_tools() {
    log_header "Checking optional tools..."
    
    # Terraform
    if command_exists terraform; then
        VERSION=$(terraform --version | head -n1)
        log_info "Terraform installed: $VERSION"
    else
        log_warn "Terraform not installed (needed for Module 7)"
        echo "  Install with: brew install terraform (macOS) or choco install terraform (Windows)"
    fi
    
    # Git
    if command_exists git; then
        VERSION=$(git --version)
        log_info "Git installed: $VERSION"
    else
        log_warn "Git not installed (needed for examples and challenges)"
        echo "  Install with: brew install git (macOS) or choco install git (Windows)"
    fi
    
    # Node.js (for validation scripts)
    if command_exists node; then
        VERSION=$(node --version)
        log_info "Node.js installed: $VERSION"
    else
        log_warn "Node.js not installed (needed for advanced validation)"
        echo "  Install from: https://nodejs.org/"
    fi
}

# Check network connectivity
check_network() {
    log_header "Checking network connectivity..."
    
    ENDPOINTS=(
        "https://docs.getport.io"
        "https://api.github.com"
        "https://registry.terraform.io"
    )
    
    for endpoint in "${ENDPOINTS[@]}"; do
        if command_exists curl; then
            if curl -s -I "$endpoint" >/dev/null 2>&1; then
                log_info "$endpoint accessible"
            else
                log_warn "$endpoint not accessible"
                echo "  Some workshop features may not work"
            fi
        elif command_exists wget; then
            if wget --spider -q "$endpoint" 2>/dev/null; then
                log_info "$endpoint accessible"
            else
                log_warn "$endpoint not accessible"
                echo "  Some workshop features may not work"
            fi
        else
            log_warn "Cannot test network connectivity to $endpoint"
        fi
    done
}

# Check system requirements
check_system() {
    log_header "Checking system requirements..."
    
    # Operating system
    if [[ "$OSTYPE" == "darwin"* ]]; then
        log_info "Running on macOS"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        log_info "Running on Linux"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        log_info "Running on Windows"
    else
        log_warn "Unknown operating system: $OSTYPE"
    fi
    
    # Shell
    if [ -n "$BASH_VERSION" ]; then
        log_info "Using Bash: $BASH_VERSION"
    elif [ -n "$ZSH_VERSION" ]; then
        log_info "Using Zsh: $ZSH_VERSION"
    else
        log_warn "Unknown shell: $SHELL"
    fi
}

# Generate report
generate_report() {
    echo
    log_header "Environment Validation Report"
    echo "=================================================="
    echo -e "${GREEN}✓ Passed: $PASSED${NC}"
    echo -e "${YELLOW}⚠ Warnings: $WARNINGS${NC}"
    echo -e "${RED}✗ Failed: $FAILED${NC}"
    echo "=================================================="
    
    if [ $FAILED -eq 0 ]; then
        echo -e "${GREEN}🎉 Environment ready for Port Workshop!${NC}"
        if [ $WARNINGS -gt 0 ]; then
            echo -e "${YELLOW}⚠️  Some optional features may not be available.${NC}"
        fi
        return 0
    else
        echo -e "${RED}❌ Environment setup incomplete. Please address the failed checks above.${NC}"
        return 1
    fi
}

# Main execution
main() {
    echo "🔍 Port Workshop Environment Validation"
    echo "====================================="
    echo
    
    check_system
    check_port_access
    check_required_tools
    check_optional_tools
    check_network
    
    echo
    generate_report
}

# Show usage if no PORT_URL is set
if [ -z "$PORT_URL" ] && [ $# -eq 0 ]; then
    echo "Usage: $0 [PORT_URL]"
    echo "   or: PORT_URL=https://your-org.getport.io $0"
    echo
    echo "Examples:"
    echo "  $0 https://demo.getport.io"
    echo "  PORT_URL=https://my-org.getport.io $0"
    exit 1
fi

# Set PORT_URL from argument if provided
if [ $# -gt 0 ]; then
    export PORT_URL="$1"
fi

# Run main function
main
exit $?