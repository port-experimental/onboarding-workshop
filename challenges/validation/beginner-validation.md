# Beginner Challenge Validation

## First Blueprint Challenge Validation

### Success Criteria Checklist

#### Blueprint Configuration
- [ ] Blueprint identifier is `team`
- [ ] Blueprint title is `Team`
- [ ] Blueprint icon is `Team` or `Users`
- [ ] Blueprint description mentions development teams

#### Required Properties
- [ ] Team Name property exists (String, required)
- [ ] Slack Channel property exists (String, optional)
- [ ] Team Lead property exists (String, optional)

#### Optional Properties (minimum 2)
- [ ] Team Size property (Number)
- [ ] Focus Area property (String with enum)
- [ ] On-Call Rotation property (Boolean)
- [ ] Team Members property (Array of strings)
- [ ] Documentation URL property (URL format)

#### Blueprint Functionality
- [ ] Blueprint appears in Data Model view
- [ ] Blueprint configuration is accessible
- [ ] All properties display correctly
- [ ] Required/optional settings are correct

### Validation Commands

```bash
# Check if blueprint exists
curl -X GET "https://api.getport.io/v1/blueprints/team" \
  -H "Authorization: Bearer $PORT_TOKEN"

# Validate blueprint schema
port-cli blueprint validate team

# Check blueprint properties
port-cli blueprint describe team --format json | jq '.schema.properties'
```

### Common Issues Checklist

- [ ] Blueprint creation completed without errors
- [ ] All required properties are marked as required
- [ ] Enum values are properly configured for Focus Area
- [ ] URL format validation is set for Documentation URL
- [ ] Array type is correctly configured for Team Members

## First Dashboard Challenge Validation

### Success Criteria Checklist

#### Dashboard Configuration
- [ ] Dashboard title is `TechCorp Service Overview`
- [ ] Dashboard description is present
- [ ] Dashboard is accessible from Dashboards menu

#### Widget Configuration
- [ ] Pie Chart widget shows services by team
- [ ] Bar Chart widget shows programming languages
- [ ] Table widget displays service details
- [ ] Markdown widget shows team contact information

#### Widget Functionality
- [ ] Pie chart displays data with colored segments
- [ ] Bar chart shows language distribution
- [ ] Table displays all required columns
- [ ] Markdown widget renders formatted content
- [ ] Widgets are properly arranged in layout

#### Data Integration
- [ ] Widgets pull data from Service entities
- [ ] Charts reflect actual service distribution
- [ ] Table shows current service information
- [ ] Dashboard updates when entity data changes

### Validation Commands

```bash
# Check dashboard exists
curl -X GET "https://api.getport.io/v1/dashboards" \
  -H "Authorization: Bearer $PORT_TOKEN" | jq '.dashboards[] | select(.title=="TechCorp Service Overview")'

# Validate widget configuration
port-cli dashboard describe techcorp-service-overview --widgets

# Test data connectivity
port-cli entity list service --count
```

## First Action Challenge Validation

### Success Criteria Checklist

#### Action Configuration
- [ ] Action identifier is `update_readme`
- [ ] Action title is `Update Service README`
- [ ] Action description is present
- [ ] Action icon is `Edit`
- [ ] Action is available on Service entities

#### Input Configuration
- [ ] README Content input (text area, required)
- [ ] Update Reason input (string, required)
- [ ] Notify Team input (boolean, optional)
- [ ] Required field validation works

#### Backend Configuration
- [ ] Webhook URL is configured
- [ ] HTTP method is POST
- [ ] Request headers are set
- [ ] Request body includes entity and input data

#### Functionality
- [ ] Action appears in Service entity actions menu
- [ ] Action form displays with correct inputs
- [ ] Form validation prevents submission without required fields
- [ ] Action execution sends correct payload
- [ ] Action run appears in execution history

### Validation Commands

```bash
# Check action exists
curl -X GET "https://api.getport.io/v1/actions/update_readme" \
  -H "Authorization: Bearer $PORT_TOKEN"

# Validate action configuration
port-cli action describe update_readme --format json

# Test action execution (dry run)
port-cli action execute update_readme --entity service-id --dry-run \
  --input '{"readme_content":"test","update_reason":"validation"}'
```

### Test Data Requirements

For validation to work properly, ensure these test entities exist:

#### Sample Teams
```json
[
  {
    "identifier": "frontend-team",
    "title": "Frontend Team",
    "properties": {
      "description": "Frontend development team",
      "lead": "Sarah Chen",
      "members_count": 6,
      "focus_area": "Frontend Development"
    }
  },
  {
    "identifier": "backend-team", 
    "title": "Backend Team",
    "properties": {
      "description": "Backend development team",
      "lead": "Mike Rodriguez",
      "members_count": 8,
      "focus_area": "Backend Development"
    }
  }
]
```

#### Sample Services
```json
[
  {
    "identifier": "ecommerce-api",
    "title": "E-commerce API",
    "properties": {
      "description": "Core e-commerce platform API",
      "language": "Python",
      "team": "Backend Team",
      "environment": "Production"
    }
  },
  {
    "identifier": "mobile-app",
    "title": "Mobile App", 
    "properties": {
      "description": "Customer mobile application",
      "language": "React Native",
      "team": "Frontend Team",
      "environment": "Production"
    }
  }
]
```

## Automated Validation Script

```bash
#!/bin/bash
# beginner-validation.sh

echo "Running Beginner Challenge Validation..."

# Check blueprints
echo "Validating blueprints..."
if port-cli blueprint exists team; then
  echo "✓ Team blueprint exists"
else
  echo "✗ Team blueprint missing"
  exit 1
fi

# Check dashboard
echo "Validating dashboard..."
if port-cli dashboard exists techcorp-service-overview; then
  echo "✓ Dashboard exists"
else
  echo "✗ Dashboard missing"
  exit 1
fi

# Check action
echo "Validating action..."
if port-cli action exists update_readme; then
  echo "✓ Action exists"
else
  echo "✗ Action missing"
  exit 1
fi

echo "All beginner challenges validated successfully!"
```