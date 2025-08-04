# Workshop Content Validation Framework

This validation framework ensures the quality and completeness of the Port workshop content through automated testing and validation.

## Overview

The framework consists of four main validation components:

1. **Syntax Validation** - Validates YAML/JSON syntax and Port-specific structure
2. **Link Validation** - Checks external links for accessibility
3. **Template Validation** - Ensures configuration templates are complete
4. **Challenge Validation** - Validates learning challenges meet quality standards

## Installation

```bash
cd validation
npm install
```

## Usage

### Run All Validations

```bash
npm test
# or
npm run validate:all
```

### Run Individual Validations

```bash
# Syntax validation only
npm run validate:syntax

# Link validation only
npm run validate:links

# Template validation only
npm run validate:templates

# Challenge validation only
npm run validate:challenges
```

## Validation Details

### Syntax Validation

Validates:
- YAML/JSON syntax correctness
- Port blueprint structure (identifier, title, schema)
- Port action structure (identifier, title, trigger, invocationMethod)
- Port integration structure (resources, mappings)
- Port scorecard structure (identifier, title, rules)

### Link Validation

Validates:
- External HTTP/HTTPS links accessibility
- Handles redirects and common HTTP status codes
- Skips localhost and placeholder URLs
- Respects rate limits with delays

### Template Validation

Validates:
- Required fields for each template type
- Recommended fields for better usability
- Property definitions and structure
- Port-specific configuration completeness

### Challenge Validation

Validates:
- Required sections (Objective, Prerequisites, Instructions, Success Criteria)
- Difficulty-appropriate complexity levels
- Step-by-step guidance for beginner challenges
- Port-specific terminology usage
- Code examples and configuration snippets

## Validation Rules

### Blueprint Templates
- **Required**: identifier, title, schema
- **Recommended**: icon, description
- **Schema**: Must have properties, should have required fields
- **Properties**: Must have type, should have title

### Action Templates
- **Required**: identifier, title, trigger, invocationMethod
- **Recommended**: description, icon, permissions
- **Trigger**: Must have type, self-service should have userInputs
- **Inputs**: Must have type, should have title

### Integration Templates
- **Required**: resources array
- **Resources**: Must have kind and port.entity
- **Mappings**: Must have identifier and blueprint mappings

### Scorecard Templates
- **Required**: identifier, title, filter, rules
- **Rules**: Must have identifier, title, level
- **Levels**: Should use Gold/Silver/Bronze

### Challenge Files
- **Beginner**: Detailed step-by-step instructions, max complexity 3
- **Intermediate**: Scenario-based problems, max complexity 6
- **Advanced**: Minimal guidance, max complexity 10

## Error Types

### Errors (Must Fix)
- Syntax errors in YAML/JSON files
- Missing required fields in templates
- Broken external links (4xx/5xx status codes)
- Missing required sections in challenges

### Warnings (Should Fix)
- Missing recommended fields
- Suboptimal structure or content
- Accessibility concerns
- Content quality suggestions

## Integration

### CI/CD Integration

Add to your CI pipeline:

```yaml
- name: Validate Workshop Content
  run: |
    cd validation
    npm install
    npm test
```

### Pre-commit Hook

```bash
#!/bin/sh
cd validation && npm test
```

### GitHub Actions

```yaml
name: Content Validation
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd validation && npm install && npm test
```

## Configuration

### Link Validation Skips

The link validator automatically skips:
- Localhost URLs (127.0.0.1, localhost)
- Placeholder URLs (example.com, your-organization)
- Social media URLs that block automated requests
- URLs requiring authentication

### Timeout Settings

- Link validation timeout: 10 seconds
- Rate limiting: 100ms delay between requests

## Troubleshooting

### Common Issues

1. **YAML Syntax Errors**
   - Check indentation (use spaces, not tabs)
   - Validate quotes and special characters
   - Use online YAML validators for complex issues

2. **Link Validation Failures**
   - Temporary network issues - retry validation
   - Some sites block automated requests
   - Check if URLs have changed or moved

3. **Template Validation Errors**
   - Ensure all required fields are present
   - Check field names match Port documentation
   - Validate nested object structures

4. **Challenge Validation Issues**
   - Add missing sections (Objective, Success Criteria)
   - Include step-by-step instructions for beginners
   - Add Port-specific terminology and examples

### Performance

- Syntax validation: ~1-2 seconds
- Template validation: ~2-3 seconds
- Challenge validation: ~1-2 seconds
- Link validation: ~30-60 seconds (depends on network and link count)

## Contributing

When adding new validation rules:

1. Add the rule to the appropriate validator class
2. Include both error and warning levels
3. Add clear error messages
4. Update this README with new validation details
5. Test with existing workshop content

## Support

For issues with the validation framework:
1. Check the error messages for specific guidance
2. Review the validation rules above
3. Run individual validators to isolate issues
4. Check the workshop content against Port documentation