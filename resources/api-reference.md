# Port API Reference Guide

## Overview

This guide provides comprehensive documentation for Port's REST API with practical examples and common use cases. All examples use the TechCorp scenario for consistency with the workshop content.

## Authentication

### JWT Token Authentication

```bash
# Get your API credentials from Port UI: Settings > API Tokens
export PORT_CLIENT_ID="your_client_id"
export PORT_CLIENT_SECRET="your_client_secret"

# Get access token
curl -X POST 'https://api.getport.io/v1/auth/access_token' \
  -H 'Content-Type: application/json' \
  -d '{
    "clientId": "'$PORT_CLIENT_ID'",
    "clientSecret": "'$PORT_CLIENT_SECRET'"
  }'
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "tokenType": "Bearer"
}
```

## Blueprints API

### Create Blueprint

Create a new blueprint for TechCorp services:

```bash
curl -X POST 'https://api.getport.io/v1/blueprints' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "identifier": "techcorp_service",
    "title": "TechCorp Service",
    "icon": "Service",
    "schema": {
      "properties": {
        "language": {
          "type": "string",
          "title": "Programming Language",
          "enum": ["Python", "JavaScript", "Java", "Go", "C#"]
        },
        "team": {
          "type": "string",
          "title": "Owning Team"
        },
        "repository_url": {
          "type": "string",
          "format": "url",
          "title": "Repository URL"
        },
        "health_status": {
          "type": "string",
          "title": "Health Status",
          "enum": ["Healthy", "Warning", "Critical"],
          "default": "Healthy"
        }
      },
      "required": ["language", "team"]
    }
  }'
```

### Get Blueprint

```bash
curl -X GET 'https://api.getport.io/v1/blueprints/techcorp_service' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

### Update Blueprint

Add new properties to existing blueprint:

```bash
curl -X PATCH 'https://api.getport.io/v1/blueprints/techcorp_service' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "schema": {
      "properties": {
        "deployment_frequency": {
          "type": "number",
          "title": "Deployments per Week"
        }
      }
    }
  }'
```

## Entities API

### Create Entity

Create a TechCorp service entity:

```bash
curl -X POST 'https://api.getport.io/v1/blueprints/techcorp_service/entities' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "identifier": "ecommerce-api",
    "title": "E-commerce API",
    "properties": {
      "language": "Python",
      "team": "Backend Team",
      "repository_url": "https://github.com/techcorp/ecommerce-api",
      "health_status": "Healthy"
    }
  }'
```

### Bulk Create Entities

Create multiple TechCorp services at once:

```bash
curl -X POST 'https://api.getport.io/v1/blueprints/techcorp_service/entities?upsert=true' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "entities": [
      {
        "identifier": "mobile-app",
        "title": "Mobile App",
        "properties": {
          "language": "JavaScript",
          "team": "Frontend Team",
          "repository_url": "https://github.com/techcorp/mobile-app"
        }
      },
      {
        "identifier": "analytics-service",
        "title": "Analytics Service",
        "properties": {
          "language": "Java",
          "team": "Data Team",
          "repository_url": "https://github.com/techcorp/analytics-service"
        }
      }
    ]
  }'
```

### Search Entities

Find all Python services:

```bash
curl -X GET 'https://api.getport.io/v1/blueprints/techcorp_service/entities?search=Python' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

Filter by team:

```bash
curl -X POST 'https://api.getport.io/v1/entities/search' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "rules": [
      {
        "property": "team",
        "operator": "=",
        "value": "Backend Team"
      }
    ],
    "combinator": "and"
  }'
```

## Actions API

### Create Action

Create a deployment action for TechCorp services:

```bash
curl -X POST 'https://api.getport.io/v1/blueprints/techcorp_service/actions' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "identifier": "deploy_service",
    "title": "Deploy Service",
    "icon": "Deploy",
    "userInputs": {
      "properties": {
        "environment": {
          "type": "string",
          "title": "Target Environment",
          "enum": ["staging", "production"],
          "default": "staging"
        },
        "version": {
          "type": "string",
          "title": "Version Tag",
          "pattern": "^v[0-9]+\\.[0-9]+\\.[0-9]+$"
        }
      },
      "required": ["environment", "version"]
    },
    "trigger": {
      "type": "github",
      "githubMethod": {
        "org": "techcorp",
        "repo": "deployment-workflows",
        "workflow": "deploy.yml",
        "workflowInputs": {
          "service_name": "{{ .entity.identifier }}",
          "environment": "{{ .inputs.environment }}",
          "version": "{{ .inputs.version }}"
        }
      }
    }
  }'
```

### Execute Action

Trigger a deployment:

```bash
curl -X POST 'https://api.getport.io/v1/blueprints/techcorp_service/entities/ecommerce-api/actions/deploy_service/runs' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": {
      "environment": "staging",
      "version": "v1.2.3"
    }
  }'
```

## Scorecards API

### Create Scorecard

Create a service quality scorecard for TechCorp:

```bash
curl -X POST 'https://api.getport.io/v1/blueprints/techcorp_service/scorecards' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "identifier": "service_quality",
    "title": "Service Quality Score",
    "rules": [
      {
        "identifier": "has_readme",
        "title": "Has README",
        "level": "Gold",
        "query": {
          "property": "readme_exists",
          "operator": "=",
          "value": true
        }
      },
      {
        "identifier": "recent_deployment",
        "title": "Recent Deployment",
        "level": "Silver",
        "query": {
          "property": "last_deployment",
          "operator": ">",
          "value": "{{ (now | date: \"%Y-%m-%d\") | date_modify: \"-7d\" }}"
        }
      }
    ]
  }'
```

## Common Use Cases

### 1. Service Onboarding Workflow

Complete workflow to onboard a new TechCorp service:

```bash
# 1. Create the service entity
curl -X POST 'https://api.getport.io/v1/blueprints/techcorp_service/entities' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "identifier": "new-service",
    "title": "New Service",
    "properties": {
      "language": "Go",
      "team": "Platform Team",
      "repository_url": "https://github.com/techcorp/new-service"
    }
  }'

# 2. Create related environment entities
curl -X POST 'https://api.getport.io/v1/blueprints/environment/entities' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "identifier": "new-service-prod",
    "title": "New Service Production",
    "properties": {
      "service": "new-service",
      "type": "production"
    }
  }'
```

### 2. Bulk Data Import

Import multiple services from external system:

```python
import requests
import json

# Configuration
PORT_API_URL = "https://api.getport.io/v1"
ACCESS_TOKEN = "your_access_token"

headers = {
    "Authorization": f"Bearer {ACCESS_TOKEN}",
    "Content-Type": "application/json"
}

# Sample data from external system
services_data = [
    {"name": "user-service", "language": "Python", "team": "Backend"},
    {"name": "notification-service", "language": "Java", "team": "Platform"},
    {"name": "frontend-app", "language": "JavaScript", "team": "Frontend"}
]

# Convert to Port entities
entities = []
for service in services_data:
    entities.append({
        "identifier": service["name"],
        "title": service["name"].replace("-", " ").title(),
        "properties": {
            "language": service["language"],
            "team": service["team"]
        }
    })

# Bulk create
response = requests.post(
    f"{PORT_API_URL}/blueprints/techcorp_service/entities?upsert=true",
    headers=headers,
    json={"entities": entities}
)

print(f"Created {len(entities)} services: {response.status_code}")
```

### 3. Automated Health Checks

Update service health status based on monitoring data:

```bash
# Update health status based on external monitoring
curl -X PATCH 'https://api.getport.io/v1/blueprints/techcorp_service/entities/ecommerce-api' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": {
      "health_status": "Warning",
      "last_health_check": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
    }
  }'
```

## Error Handling

### Common HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request format or missing required fields
- `401 Unauthorized`: Invalid or expired access token
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource doesn't exist
- `409 Conflict`: Resource already exists (when creating)
- `422 Unprocessable Entity`: Validation errors
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### Error Response Format

```json
{
  "error": {
    "message": "Validation failed",
    "details": [
      {
        "field": "properties.language",
        "message": "Value must be one of: Python, JavaScript, Java, Go, C#"
      }
    ]
  }
}
```

## Rate Limits

- **Standard Plan**: 1000 requests per hour
- **Enterprise Plan**: 5000 requests per hour
- **Burst Limit**: 100 requests per minute

### Rate Limit Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Best Practices

1. **Use Bulk Operations**: When creating multiple entities, use bulk endpoints
2. **Implement Retry Logic**: Handle rate limits and temporary failures
3. **Cache Access Tokens**: Tokens are valid for 1 hour
4. **Use Filters**: Optimize searches with specific filters
5. **Validate Data**: Check required fields before API calls
6. **Monitor Usage**: Track API usage against rate limits

## SDK Examples

### Python SDK

```python
from port_client import Port

# Initialize client
port = Port(
    client_id="your_client_id",
    client_secret="your_client_secret"
)

# Create entity
service = port.create_entity(
    blueprint="techcorp_service",
    identifier="new-service",
    title="New Service",
    properties={
        "language": "Python",
        "team": "Backend Team"
    }
)

# Search entities
services = port.search_entities(
    blueprint="techcorp_service",
    query={"team": "Backend Team"}
)
```

### JavaScript SDK

```javascript
const { Port } = require('@port-labs/port-api');

const port = new Port({
  clientId: 'your_client_id',
  clientSecret: 'your_client_secret'
});

// Create entity
const service = await port.createEntity({
  blueprint: 'techcorp_service',
  identifier: 'new-service',
  title: 'New Service',
  properties: {
    language: 'JavaScript',
    team: 'Frontend Team'
  }
});
```