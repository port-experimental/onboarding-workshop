# Intermediate Challenge Validation

## Team-Service Relationships Challenge Validation

### Success Criteria Checklist

#### Part 1: Blueprint Relationships
- [ ] Service blueprint has team relationship configured
- [ ] Team blueprint has services relationship configured
- [ ] Relationships are bidirectional
- [ ] Relationship validation works correctly
- [ ] Sample team entities are created

#### Part 2: GitHub Integration
- [ ] GitHub integration is created and active
- [ ] Integration successfully pulls repository data
- [ ] Service entities are created/updated from GitHub
- [ ] Team relationships are automatically assigned
- [ ] Integration runs without errors

#### Part 3: Dashboard Integration
- [ ] Dashboard displays team-service relationships
- [ ] All required widgets show data correctly
- [ ] Charts reflect actual team-service distribution
- [ ] GitHub metrics are displayed
- [ ] Dashboard updates with integration changes

### Validation Commands

```bash
# Validate blueprint relationships
curl -X GET "https://api.getport.io/v1/blueprints/service" \
  -H "Authorization: Bearer $PORT_TOKEN" | jq '.relations'

curl -X GET "https://api.getport.io/v1/blueprints/team" \
  -H "Authorization: Bearer $PORT_TOKEN" | jq '.relations'

# Check integration status
curl -X GET "https://api.getport.io/v1/integrations" \
  -H "Authorization: Bearer $PORT_TOKEN" | jq '.integrations[] | select(.type=="github")'

# Validate relationship data
port-cli entity list service --include-relations
port-cli entity list team --include-relations
```

### Relationship Validation Tests

#### Test Bidirectional Relationships
```bash
#!/bin/bash
# Test that relationships work both ways

# Get a service and check its team relationship
SERVICE_TEAM=$(port-cli entity get service ecommerce-api --format json | jq -r '.relations.team')

# Get that team and check if service appears in its services
TEAM_SERVICES=$(port-cli entity get team $SERVICE_TEAM --format json | jq -r '.relations.services[]')

if echo "$TEAM_SERVICES" | grep -q "ecommerce-api"; then
  echo "✓ Bidirectional relationship working"
else
  echo "✗ Bidirectional relationship broken"
fi
```

#### Integration Data Validation
```bash
#!/bin/bash
# Validate GitHub integration data

# Check if services have GitHub properties
SERVICES_WITH_GITHUB=$(port-cli entity list service --format json | jq '[.entities[] | select(.properties.url != null)] | length')

if [ "$SERVICES_WITH_GITHUB" -gt 0 ]; then
  echo "✓ GitHub integration populating service data"
else
  echo "✗ GitHub integration not working"
fi
```

## Multi-Dashboard Setup Challenge Validation

### Success Criteria Checklist

#### Developer Dashboard
- [ ] Dashboard serves developer workflow needs
- [ ] Team-specific filtering works
- [ ] Quick actions are accessible
- [ ] Recent activity shows relevant information
- [ ] Team resources are current

#### Manager Dashboard
- [ ] High-level metrics provide management insights
- [ ] Charts show team performance distribution
- [ ] Data supports decision-making
- [ ] Performance trends are visible
- [ ] Team health indicators are clear

#### Platform Dashboard
- [ ] Infrastructure health is visible
- [ ] Compliance status is tracked
- [ ] Deployment pipeline status is monitored
- [ ] Resource utilization supports capacity planning
- [ ] Alert information enables quick response

### Validation Commands

```bash
# Check all dashboards exist
DASHBOARDS=("developer-workspace" "engineering-management-overview" "platform-engineering-console")

for dashboard in "${DASHBOARDS[@]}"; do
  if port-cli dashboard exists "$dashboard"; then
    echo "✓ $dashboard exists"
  else
    echo "✗ $dashboard missing"
  fi
done

# Validate widget counts
for dashboard in "${DASHBOARDS[@]}"; do
  WIDGET_COUNT=$(port-cli dashboard describe "$dashboard" --format json | jq '.widgets | length')
  echo "$dashboard has $WIDGET_COUNT widgets"
done
```

### Dashboard Content Validation

#### Developer Dashboard Validation
```bash
#!/bin/bash
# Validate developer dashboard content

DASHBOARD="developer-workspace"

# Check for required widget types
WIDGET_TYPES=$(port-cli dashboard describe $DASHBOARD --format json | jq -r '.widgets[].type')

if echo "$WIDGET_TYPES" | grep -q "table"; then
  echo "✓ Developer dashboard has table widget"
else
  echo "✗ Developer dashboard missing table widget"
fi

if echo "$WIDGET_TYPES" | grep -q "action-card"; then
  echo "✓ Developer dashboard has action cards"
else
  echo "✗ Developer dashboard missing action cards"
fi

if echo "$WIDGET_TYPES" | grep -q "markdown"; then
  echo "✓ Developer dashboard has team resources"
else
  echo "✗ Developer dashboard missing team resources"
fi
```

#### Manager Dashboard Validation
```bash
#!/bin/bash
# Validate manager dashboard content

DASHBOARD="engineering-management-overview"

# Check for required chart types
WIDGET_TYPES=$(port-cli dashboard describe $DASHBOARD --format json | jq -r '.widgets[].type')

REQUIRED_TYPES=("number" "pie-chart" "bar-chart" "table" "line-chart")

for type in "${REQUIRED_TYPES[@]}"; do
  if echo "$WIDGET_TYPES" | grep -q "$type"; then
    echo "✓ Manager dashboard has $type widget"
  else
    echo "✗ Manager dashboard missing $type widget"
  fi
done
```

### Cross-Dashboard Consistency Tests

```bash
#!/bin/bash
# Test data consistency across dashboards

# Get service count from different dashboards
DEV_SERVICE_COUNT=$(port-cli dashboard query developer-workspace services-table --count)
MGR_SERVICE_COUNT=$(port-cli dashboard query engineering-management-overview team-services --count)

if [ "$DEV_SERVICE_COUNT" -eq "$MGR_SERVICE_COUNT" ]; then
  echo "✓ Service counts consistent across dashboards"
else
  echo "✗ Service count mismatch: Dev=$DEV_SERVICE_COUNT, Mgr=$MGR_SERVICE_COUNT"
fi
```

## Performance and User Experience Validation

### Dashboard Load Time Tests
```bash
#!/bin/bash
# Test dashboard performance

DASHBOARDS=("developer-workspace" "engineering-management-overview" "platform-engineering-console")

for dashboard in "${DASHBOARDS[@]}"; do
  echo "Testing $dashboard load time..."
  
  START_TIME=$(date +%s%N)
  port-cli dashboard load "$dashboard" > /dev/null
  END_TIME=$(date +%s%N)
  
  LOAD_TIME=$(( (END_TIME - START_TIME) / 1000000 ))
  
  if [ "$LOAD_TIME" -lt 3000 ]; then
    echo "✓ $dashboard loads in ${LOAD_TIME}ms (acceptable)"
  else
    echo "⚠ $dashboard loads in ${LOAD_TIME}ms (slow)"
  fi
done
```

### Widget Data Validation
```bash
#!/bin/bash
# Validate that widgets display actual data

check_widget_data() {
  local dashboard=$1
  local widget=$2
  
  DATA_COUNT=$(port-cli dashboard widget-data "$dashboard" "$widget" --count)
  
  if [ "$DATA_COUNT" -gt 0 ]; then
    echo "✓ $dashboard/$widget has data ($DATA_COUNT items)"
  else
    echo "✗ $dashboard/$widget has no data"
  fi
}

# Test key widgets
check_widget_data "developer-workspace" "team-services"
check_widget_data "engineering-management-overview" "team-performance"
check_widget_data "platform-engineering-console" "infrastructure-health"
```

## Automated Validation Script

```bash
#!/bin/bash
# intermediate-validation.sh

echo "Running Intermediate Challenge Validation..."

# Validate relationships
echo "Validating blueprint relationships..."
if port-cli blueprint relationship-exists service team; then
  echo "✓ Service-Team relationship exists"
else
  echo "✗ Service-Team relationship missing"
  exit 1
fi

# Validate integration
echo "Validating GitHub integration..."
if port-cli integration status github-integration | grep -q "active"; then
  echo "✓ GitHub integration active"
else
  echo "✗ GitHub integration not active"
  exit 1
fi

# Validate dashboards
echo "Validating dashboards..."
REQUIRED_DASHBOARDS=("developer-workspace" "engineering-management-overview" "platform-engineering-console")

for dashboard in "${REQUIRED_DASHBOARDS[@]}"; do
  if port-cli dashboard exists "$dashboard"; then
    echo "✓ $dashboard exists"
  else
    echo "✗ $dashboard missing"
    exit 1
  fi
done

# Test data consistency
echo "Testing data consistency..."
SERVICE_COUNT=$(port-cli entity count service)
TEAM_COUNT=$(port-cli entity count team)

if [ "$SERVICE_COUNT" -gt 0 ] && [ "$TEAM_COUNT" -gt 0 ]; then
  echo "✓ Test data exists (Services: $SERVICE_COUNT, Teams: $TEAM_COUNT)"
else
  echo "✗ Insufficient test data"
  exit 1
fi

echo "All intermediate challenges validated successfully!"
```