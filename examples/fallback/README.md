# Fallback Examples

This directory contains fallback examples and configurations for when external services or integrations are unavailable during the workshop.

## When to Use Fallback Examples

- **Network Issues**: When external APIs are unreachable
- **Corporate Firewalls**: When access to GitHub, etc. is blocked
- **Service Outages**: When external services are temporarily down
- **Offline Workshops**: When internet access is limited

## Available Fallback Options

### GitHub Integration Fallbacks

#### Mock GitHub Data
Use these pre-configured JSON files instead of live GitHub API data:

- `github-repositories.json` - Sample repository data
- `github-pull-requests.json` - Sample PR data
- `github-releases.json` - Sample release data
- `github-workflows.json` - Sample GitHub Actions data

#### Usage
1. Import data manually through Port UI
2. Use in data source mapping exercises
3. Reference in blueprint examples

### API Integration Fallbacks

#### Port API Examples
When Port API is unavailable:

- `port-blueprints.json` - Sample blueprint configurations
- `port-entities.json` - Sample entity data
- `port-actions.json` - Sample action definitions

#### Alternative Approaches
1. **UI-Only Mode**: Complete exercises using Port web interface
2. **Configuration Files**: Work with YAML/JSON files directly
3. **Import/Export**: Use Port's export/import functionality

### Terraform Fallbacks

#### When Terraform Cannot Be Installed
- `terraform-configs/` - Pre-built Terraform configurations
- `port-ui-equivalents.md` - UI steps equivalent to Terraform operations
- `configuration-examples/` - Raw JSON/YAML configurations

## Implementation Strategies

### 1. Mock Data Approach
```javascript
// Instead of live API call
const mockData = require('./fallback/github-repositories.json');
// Use mockData in exercises
```

### 2. Local File Import
```yaml
# Use local file instead of API integration
dataSource:
  type: file
  path: ./fallback/sample-data.json
```

### 3. Manual Configuration
```markdown
# Step-by-step manual configuration
1. Navigate to Port Builder
2. Create blueprint with these properties...
3. Add sample entities manually...
```

## Workshop Adaptation Guidelines

### For Facilitators

#### Pre-Workshop Preparation
1. Test all external service connections
2. Prepare fallback materials if needed
3. Have offline copies of all examples
4. Test fallback scenarios

#### During Workshop
1. Monitor for connectivity issues
2. Switch to fallback mode if needed
3. Explain why fallbacks are being used
4. Ensure learning objectives are still met

### For Participants

#### When External Services Fail
1. Don't panic - fallbacks maintain learning value
2. Focus on concepts rather than specific integrations
3. Ask questions about how real integrations would work
4. Use fallback time to explore Port UI more deeply

## Fallback Quality Assurance

### Ensuring Realistic Examples
- Fallback data mirrors real-world scenarios
- Examples maintain complexity and edge cases
- Configurations are production-ready
- Learning objectives remain achievable

### Testing Fallbacks
- Regular validation of fallback examples
- Ensure compatibility with current Port version
- Test import/export processes
- Verify UI-based alternatives work

## Recovery Procedures

### When Services Come Back Online
1. **Gradual Transition**: Move from fallback to live data
2. **Comparison Exercise**: Compare fallback vs. real data
3. **Integration Testing**: Test live integrations
4. **Validation**: Ensure everything works as expected

### Troubleshooting Fallbacks
1. **Data Format Issues**: Verify JSON/YAML syntax
2. **Import Problems**: Check Port import requirements
3. **Configuration Errors**: Validate against Port schema
4. **UI Navigation**: Ensure UI paths are current

---

**Need Help?** Contact the workshop facilitator or refer to the main [Setup Guide](../../setup-guide.md) for additional troubleshooting options.