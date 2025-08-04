# Port Best Practices Guide

## Overview

This guide provides comprehensive best practices for configuring and managing Port instances, based on real-world experience and TechCorp workshop scenarios.

## Blueprint Design Patterns

### 1. Hierarchical Blueprint Structure

Design blueprints with clear relationships and inheritance patterns:

```yaml
# Parent Blueprint: Service
service:
  identifier: "service"
  title: "Service"
  schema:
    properties:
      name:
        type: "string"
        title: "Service Name"
      team:
        type: "string" 
        title: "Owning Team"
      language:
        type: "string"
        title: "Programming Language"
        enum: ["Python", "JavaScript", "Java", "Go", "C#"]

# Child Blueprint: Microservice
microservice:
  identifier: "microservice"
  title: "Microservice"
  relations:
    service:
      target: "service"
      required: true
  schema:
    properties:
      api_version:
        type: "string"
        title: "API Version"
      health_endpoint:
        type: "string"
        format: "url"
        title: "Health Check Endpoint"
```

### 2. Property Naming Conventions

Use consistent, descriptive property names:

**Good:**
- `repository_url` (clear, descriptive)
- `last_deployment_date` (specific)
- `health_status` (unambiguous)

**Avoid:**
- `url` (too generic)
- `date` (unclear which date)
- `status` (could mean anything)

### 3. Required vs Optional Properties

Be strategic about required properties:

```yaml
schema:
  properties:
    # Always required - core identification
    name:
      type: "string"
      title: "Service Name"
    team:
      type: "string"
      title: "Owning Team"
    
    # Optional - may not be available initially
    repository_url:
      type: "string"
      format: "url"
      title: "Repository URL"
    
  required: ["name", "team"]
```

## Data Integration Best Practices

### 1. Incremental Data Loading

Design integrations to handle data incrementally:

```yaml
# GitHub Integration Example
resources:
  - kind: repository
    selector:
      query: 'true'
    port:
      entity:
        mappings:
          identifier: .name
          title: .full_name
          properties:
            url: .html_url
            language: .language
            created_at: .created_at
            updated_at: .updated_at
            # Use updated_at for incremental sync
```

### 2. Error Handling in Mappings

Include fallback values and error handling:

```yaml
mappings:
  identifier: .name
  title: .full_name // .name // "Unknown"
  properties:
    language: .language // "Not Specified"
    stars: .stargazers_count // 0
    # Handle missing or null values gracefully
```

### 3. Data Validation

Implement validation at multiple levels:

```yaml
schema:
  properties:
    version:
      type: "string"
      pattern: "^v[0-9]+\\.[0-9]+\\.[0-9]+$"
      title: "Version"
      description: "Semantic version (e.g., v1.2.3)"
    
    health_score:
      type: "number"
      minimum: 0
      maximum: 100
      title: "Health Score"
```

## Action Design Patterns

### 1. Parameterized Actions

Design actions with flexible parameters:

```json
{
  "identifier": "deploy_service",
  "title": "Deploy Service",
  "userInputs": {
    "properties": {
      "environment": {
        "type": "string",
        "title": "Target Environment",
        "enum": ["development", "staging", "production"],
        "default": "staging"
      },
      "version": {
        "type": "string",
        "title": "Version",
        "pattern": "^v[0-9]+\\.[0-9]+\\.[0-9]+$"
      },
      "rollback_enabled": {
        "type": "boolean",
        "title": "Enable Rollback",
        "default": true
      }
    },
    "required": ["environment", "version"]
  }
}
```

### 2. Action Naming and Organization

Use clear, action-oriented names:

**Good:**
- `deploy_to_production`
- `create_pull_request`
- `restart_service`

**Avoid:**
- `production` (not an action)
- `pr` (unclear abbreviation)
- `fix` (too vague)

### 3. Conditional Actions

Use conditions to show relevant actions:

```json
{
  "condition": {
    "type": "JQ",
    "expressions": [
      ".entity.properties.environment == \"production\""
    ]
  }
}
```

## Scorecard Configuration

### 1. Balanced Scorecard Rules

Create scorecards with balanced difficulty levels:

```json
{
  "identifier": "service_maturity",
  "title": "Service Maturity",
  "rules": [
    {
      "identifier": "has_readme",
      "title": "Has README",
      "level": "Bronze",
      "query": {
        "property": "readme_exists",
        "operator": "=",
        "value": true
      }
    },
    {
      "identifier": "has_tests",
      "title": "Has Automated Tests",
      "level": "Silver", 
      "query": {
        "property": "test_coverage",
        "operator": ">",
        "value": 80
      }
    },
    {
      "identifier": "production_ready",
      "title": "Production Ready",
      "level": "Gold",
      "query": {
        "combinator": "and",
        "conditions": [
          {
            "property": "health_endpoint",
            "operator": "!=",
            "value": null
          },
          {
            "property": "monitoring_enabled",
            "operator": "=",
            "value": true
          }
        ]
      }
    }
  ]
}
```

### 2. Progressive Difficulty

Structure rules from basic to advanced:

- **Bronze**: Basic requirements (documentation, basic setup)
- **Silver**: Quality measures (testing, code quality)
- **Gold**: Production readiness (monitoring, security)

## Dashboard Design

### 1. Widget Selection Guidelines

Choose appropriate widgets for data types:

| Data Type | Recommended Widget | Use Case |
|-----------|-------------------|----------|
| Counts/Totals | Number Chart | Service count, issue count |
| Trends | Line Chart | Deployment frequency, error rates |
| Distributions | Pie Chart | Language distribution, team ownership |
| Detailed Data | Table | Service catalog, recent deployments |
| External Content | iFrame | Grafana dashboards, documentation |

### 2. Dashboard Layout

Organize dashboards logically:

```
┌─────────────────┬─────────────────┐
│   Key Metrics   │   Trends        │
│   (Numbers)     │   (Line Charts) │
├─────────────────┼─────────────────┤
│   Distribution  │   Recent        │
│   (Pie Charts)  │   Activity      │
├─────────────────┴─────────────────┤
│   Detailed Data (Tables)          │
└───────────────────────────────────┘
```

### 3. Filter Strategy

Implement consistent filtering:

```json
{
  "filters": [
    {
      "property": "team",
      "operator": "=",
      "value": "{{ user.team }}"
    },
    {
      "property": "environment",
      "operator": "in",
      "value": ["staging", "production"]
    }
  ]
}
```

## Security Best Practices

### 1. Access Control

Implement role-based access:

```yaml
# Team-based access control
permissions:
  - role: "developer"
    resources: ["entity:read", "action:execute"]
    conditions:
      team: "{{ user.team }}"
  
  - role: "admin"
    resources: ["*"]
```

### 2. Sensitive Data Handling

Avoid storing sensitive data in Port:

**Good:**
- Reference IDs to external systems
- Public repository URLs
- Non-sensitive configuration

**Avoid:**
- API keys or secrets
- Personal information
- Internal system credentials

### 3. API Token Management

Manage API tokens securely:

- Use service accounts for automation
- Rotate tokens regularly
- Limit token scope to minimum required
- Store tokens in secure credential stores

## Performance Optimization

### 1. Entity Limits

Be mindful of entity counts:

- **Small deployment**: < 1,000 entities
- **Medium deployment**: 1,000 - 10,000 entities  
- **Large deployment**: > 10,000 entities

### 2. Query Optimization

Write efficient queries:

```json
// Good - specific property filter
{
  "property": "team",
  "operator": "=", 
  "value": "backend"
}

// Avoid - complex nested queries when simple ones work
{
  "combinator": "and",
  "conditions": [
    {
      "combinator": "or",
      "conditions": [...]
    }
  ]
}
```

### 3. Integration Frequency

Set appropriate sync frequencies:

- **Real-time data**: Every 5-15 minutes
- **Daily reports**: Once per day
- **Historical data**: Weekly or monthly

## Maintenance and Operations

### 1. Configuration Management

Version control your Port configurations:

```bash
# Export configurations
port-cli export --output ./port-config/

# Version control
git add port-config/
git commit -m "Update service blueprint schema"
```

### 2. Monitoring and Alerting

Monitor Port usage:

- API rate limits
- Integration health
- User adoption metrics
- Error rates

### 3. Regular Cleanup

Maintain data quality:

- Remove obsolete entities
- Update outdated properties
- Clean up unused blueprints
- Archive old scorecards

## Common Anti-Patterns

### 1. Over-Engineering Blueprints

**Problem**: Creating overly complex blueprints with too many properties

**Solution**: Start simple, add complexity gradually based on actual needs

### 2. Inconsistent Data Models

**Problem**: Different teams using different property names for same concepts

**Solution**: Establish organization-wide naming conventions

### 3. Action Overload

**Problem**: Creating too many actions that confuse users

**Solution**: Focus on most common workflows, group related actions

### 4. Scorecard Gaming

**Problem**: Rules that can be easily gamed without real improvement

**Solution**: Focus on meaningful metrics that drive actual quality

## Migration Strategies

### 1. Gradual Rollout

Implement Port incrementally:

1. **Phase 1**: Core service catalog
2. **Phase 2**: Basic actions and integrations  
3. **Phase 3**: Advanced features and scorecards
4. **Phase 4**: Organization-wide adoption

### 2. Data Migration

Plan data migration carefully:

- Export existing data in compatible formats
- Create mapping scripts for data transformation
- Test migration with subset of data
- Plan rollback procedures

### 3. User Training

Provide comprehensive training:

- Role-specific training materials
- Hands-on workshops
- Documentation and quick reference guides
- Regular office hours for questions

## Conclusion

Following these best practices will help you build a robust, scalable Port implementation that serves your organization's needs effectively. Remember to:

- Start simple and iterate
- Focus on user needs
- Maintain consistency
- Monitor and optimize regularly
- Keep security in mind

For specific implementation questions, refer to the [API Reference](api-reference.md) and [Troubleshooting Guide](../troubleshooting.md).