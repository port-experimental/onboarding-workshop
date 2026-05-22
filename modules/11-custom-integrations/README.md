# Module 11: Custom Integrations

## 🧭 Navigation

**Previous**: [Module 10: Governance & RBAC](../10-governance/) | **Next**: [Module 12: Scale & Ops](../12-scale-ops/)

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 90 minutes | 📋 **Prerequisites**: [Module 10](../10-governance/) completed

**Progress**: Module 11 of 12 | **Completion**: 92% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Choose the right integration approach for any data source
- Use the Port REST API to create and query entities programmatically
- Set up inbound webhook ingestion for push-based systems
- Scaffold a minimal Ocean custom integration

## Prerequisites
- Completed [Module 10: Governance & RBAC](../10-governance/)
- Port API credentials (Client ID and Client Secret from Builder → ... → Credentials)
- Python 3.11+ installed (for Ocean exercise)
- `curl` or Postman available

## Duration
**Estimated Time**: 90 minutes

---

## Key Concepts

### Integration Decision Tree

When connecting a new system to Port, follow this order:

1. **Native integration** — check [Port's integrations catalog](https://docs.port.io/build-your-software-catalog/sync-data-to-catalog/) first. If a connector exists, use it (covered in Module 3).
2. **Ocean Custom Integration** — when no native integration exists. Best for REST-compliant APIs, standard auth (Bearer/API key/Basic), and predictable JSON data. Configuration-driven — minimal code.
3. **Generic webhook** — when the external system pushes events to you (rather than you pulling from it). One-way ingest from systems that can send HTTP POST.
4. **REST API scripting** — for one-off operations, bulk upserts, migration scripts, or anything that doesn't need ongoing sync.

---

## Section 1: Port REST API

### Authentication

All Port API calls require a Bearer token obtained via your client credentials:

```bash
curl -X POST https://api.port.io/v1/auth/access_token \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET"
  }'
```

Response:
```json
{
  "ok": true,
  "accessToken": "eyJhbGci...",
  "expiresIn": 3600,
  "tokenType": "Bearer"
}
```

Store the token and use it in subsequent requests:
```bash
export PORT_TOKEN="eyJhbGci..."
```

### Entity CRUD

**Create or update (upsert) an entity:**

```bash
curl -X POST "https://api.port.io/v1/blueprints/service/entities?upsert=true&merge=true" \
  -H "Authorization: Bearer $PORT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "payment-service",
    "title": "Payment Service",
    "properties": {
      "language": "Go",
      "description": "Handles payment processing",
      "archived": false
    },
    "relations": {
      "team": "backend"
    }
  }'
```

Key query params:
- `upsert=true` — create if not exists, update if exists
- `merge=true` — only update provided fields (don't wipe unmentioned properties)

**Read an entity:**

```bash
curl "https://api.port.io/v1/blueprints/service/entities/payment-service" \
  -H "Authorization: Bearer $PORT_TOKEN"
```

**Delete an entity:**

```bash
curl -X DELETE "https://api.port.io/v1/blueprints/service/entities/payment-service" \
  -H "Authorization: Bearer $PORT_TOKEN"
```

**Search / query entities:**

```bash
curl -X POST "https://api.port.io/v1/entities/search" \
  -H "Authorization: Bearer $PORT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rules": [
      {
        "operator": "=",
        "property": "language",
        "value": "Python"
      }
    ],
    "combinator": "and"
  }'
```

### Hands-On: Bulk CSV Upsert

Write a shell script that reads a CSV of services and upserts them into Port.

Create `scripts/bulk-upsert-services.sh`:

```bash
#!/bin/bash
# Usage: ./scripts/bulk-upsert-services.sh services.csv
# CSV format: identifier,title,language,team

TOKEN_RESPONSE=$(curl -s -X POST https://api.port.io/v1/auth/access_token \
  -H "Content-Type: application/json" \
  -d "{\"clientId\": \"$PORT_CLIENT_ID\", \"clientSecret\": \"$PORT_CLIENT_SECRET\"}")

TOKEN=$(echo $TOKEN_RESPONSE | python3 -c "import sys,json; print(json.load(sys.stdin)['accessToken'])")

while IFS=',' read -r identifier title language team; do
  [[ "$identifier" == "identifier" ]] && continue  # skip header row
  curl -s -X POST "https://api.port.io/v1/blueprints/service/entities?upsert=true&merge=true" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"identifier\": \"$identifier\",
      \"title\": \"$title\",
      \"properties\": {\"language\": \"$language\"},
      \"relations\": {\"team\": \"$team\"}
    }"
  echo "Upserted: $identifier"
done < "$1"
```

Test CSV (`services.csv`):
```
identifier,title,language,team
payments-v2,Payments V2,Go,backend
notifications,Notifications,Python,backend
design-system,Design System,TypeScript,frontend
```

Run:
```bash
export PORT_CLIENT_ID="your_client_id"
export PORT_CLIENT_SECRET="your_client_secret"
chmod +x scripts/bulk-upsert-services.sh
./scripts/bulk-upsert-services.sh services.csv
```

Expected: each service appears in **Catalog → Services**.

---

## Section 2: Generic Webhook Ingestion

Use Port's inbound webhook to receive events from any system that can send HTTP POST requests.

### Set up an inbound webhook

1. Navigate to **Builder → Data Sources → + Add Data Source → Webhook**
2. Configure:
   - **Title**: `PagerDuty Incidents`
   - **Blueprint**: `incident` (create this blueprint first if it doesn't exist — see below)
   - **Mapping**: define how the incoming JSON maps to Port entity fields

### Create an Incident blueprint

Before the webhook can map data, create the target blueprint. In **Builder → Data Model → + Blueprint**:

```json
{
  "identifier": "incident",
  "title": "Incident",
  "icon": "Alert",
  "schema": {
    "properties": {
      "status": {
        "type": "string",
        "title": "Status",
        "enum": ["triggered", "acknowledged", "resolved"]
      },
      "severity": {
        "type": "string",
        "title": "Severity",
        "enum": ["critical", "high", "medium", "low"]
      },
      "summary": {
        "type": "string",
        "title": "Summary"
      },
      "url": {
        "type": "string",
        "title": "URL",
        "format": "url"
      }
    },
    "required": []
  },
  "relations": {
    "service": {
      "title": "Affected Service",
      "target": "service",
      "required": false,
      "many": false
    }
  }
}
```

### Webhook mapping configuration

After creating the webhook, configure the mapping YAML to transform incoming PagerDuty payloads:

```yaml
resources:
  - kind: webhook
    selector:
      query: 'true'
    port:
      entity:
        mappings:
          blueprint: '"incident"'
          identifier: .messages[0].incident.id | tostring
          title: .messages[0].incident.title
          properties:
            status: .messages[0].incident.status
            severity: .messages[0].incident.urgency
            summary: .messages[0].incident.summary
            url: .messages[0].incident.html_url
          relations:
            service: .messages[0].incident.service.name
```

### Securing the webhook

Port generates a secret for each webhook. Validate incoming requests by checking the `X-Port-Signature` header:

```python
import hmac
import hashlib

def validate_port_webhook(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

---

## Section 3: Ocean Custom Integration

Ocean is Port's open-source integration framework for ongoing bidirectional sync with external systems. Use it when you need to:
- Poll an external API on a schedule (not just receive pushes)
- Do a full resync periodically
- Handle large volumes of data

### Prerequisites

```bash
pip install port-ocean
```

### Scaffold a new integration

```bash
ocean new my-ticketing-integration
cd my-ticketing-integration
```

Ocean generates:
```
my-ticketing-integration/
├── main.py           # Integration entry point
├── integration.py    # Fetch + map logic
├── config.yaml       # Integration configuration
└── pyproject.toml
```

### Implement the integration

`integration.py` — fetch entities from a mock ticketing API and map to Port:

```python
from port_ocean.context.ocean import ocean

@ocean.on_resync("ticket")
async def on_resync_tickets(kind: str):
    # Fetch from your API
    async with ocean.create_http_client() as client:
        response = await client.get(
            "https://api.example.com/tickets",
            headers={"Authorization": f"Bearer {ocean.integration_config['api_token']}"}
        )
        tickets = response.json()

    for ticket in tickets:
        yield {
            "identifier": str(ticket["id"]),
            "title": ticket["subject"],
            "properties": {
                "status": ticket["status"],
                "priority": ticket["priority"],
            },
            "relations": {
                "service": ticket.get("service_name")
            }
        }
```

### Configure the mapping

`config.yaml`:

```yaml
resources:
  - kind: ticket
    selector:
      query: "true"
    port:
      entity:
        mappings:
          blueprint: '"ticket"'
          identifier: .identifier
          title: .title
          properties:
            status: .properties.status
            priority: .properties.priority
          relations:
            service: .relations.service
```

### Run and test locally

```bash
ocean sail
```

Expected: Ocean fetches tickets from the mock API and upserts them into Port.

See the [Ocean documentation](https://docs.port.io/build-your-software-catalog/custom-integration/ocean-custom-integration/overview) for the full framework reference.

---

## 🎯 Self-Assessment Checkpoint

### Success Indicators
- [ ] Retrieved a Port API access token via `curl`
- [ ] Upserted at least one entity via the REST API
- [ ] Ran the bulk CSV upsert script and saw services appear in Port
- [ ] Can explain when to use Ocean vs webhook vs REST API scripting
- [ ] (Optional) Scaffolded an Ocean integration and ran it locally

## End State & Further Reading

By the end of this module:
- At least 3 services exist in Port that were created via the REST API (not the UI)
- A webhook data source is configured in Builder → Data Sources
- You can explain the integration decision tree from memory

See the [Port API reference](https://docs.port.io/api-reference/port-api) and [Ocean documentation](https://docs.port.io/build-your-software-catalog/custom-integration/ocean-custom-integration/overview).

## Common Issues & Solutions

**Problem**: API returns 401 Unauthorized  
**Solution**: Access tokens expire after 1 hour. Re-run the auth call to get a fresh token.

**Problem**: Upsert succeeds but entity doesn't appear in catalog  
**Solution**: Check that the `blueprint` identifier in your request matches exactly (case-sensitive). Verify the blueprint exists in **Builder → Data Model**.

**Problem**: Webhook payload mapping produces no entities  
**Solution**: Use the **Test** tab in the webhook editor to paste a sample payload and see what entities would be generated. Fix JQ expressions iteratively.

**Problem**: `ocean new` command not found  
**Solution**: `pip install port-ocean` installs the `ocean` CLI. If it's still not found after install, check that your pip bin directory is on your PATH: `pip show port-ocean` will show the install location.

**Still stuck or think you've found a bug?** See [Bug Reporting & Support](../../README.md#bug-reporting--support).

## Next Steps

With custom integrations working, the final module covers running Port reliably at scale:
- **[Module 12: Scale & Ops](../12-scale-ops/)** — multi-environment management and catalog hygiene

## Quick Reference

### Port API base URL
`https://api.port.io/v1`

### Key endpoints
| Operation | Method | Path |
|-----------|--------|------|
| Get token | POST | `/auth/access_token` |
| Upsert entity | POST | `/blueprints/{blueprint}/entities?upsert=true` |
| Get entity | GET | `/blueprints/{blueprint}/entities/{identifier}` |
| Delete entity | DELETE | `/blueprints/{blueprint}/entities/{identifier}` |
| Search entities | POST | `/entities/search` |

---

**Completed Module 11?** Continue to [Module 12: Scale & Ops](../12-scale-ops/).
