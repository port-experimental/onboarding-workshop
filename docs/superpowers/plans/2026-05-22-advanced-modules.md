# Port Workshop Advanced Modules (1→Production) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three advanced modules (10: Governance & RBAC, 11: Custom Integrations, 12: Scale & Ops) plus mirror/aggregation property coverage to Module 02, extending the Port builder workshop from "0→1" to "1→production."

**Architecture:** Each module follows the established workshop pattern in `modules/*/README.md`. New directories `modules/10-governance/`, `modules/11-custom-integrations/`, and `modules/12-scale-ops/` are created with `README.md` files. Corresponding facilitator guides go in `facilitator/`. Navigation, learning path, and root README are updated last.

**Tech Stack:** Markdown, Port REST API, Port CLI (`github.com/port-experimental/port-cli`), Ocean framework, Terraform HCL

**Spec:** `docs/superpowers/specs/2026-05-22-advanced-modules-design.md`

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Modify | `modules/02-blueprints/README.md` | Add "Advanced blueprint features" section (mirror + aggregation properties) |
| Create | `modules/10-governance/README.md` | Module 10 content |
| Create | `modules/11-custom-integrations/README.md` | Module 11 content |
| Create | `modules/12-scale-ops/README.md` | Module 12 content |
| Create | `facilitator/module-10-governance.md` | Facilitator guide for Module 10 |
| Create | `facilitator/module-11-custom-integrations.md` | Facilitator guide for Module 11 |
| Create | `facilitator/module-12-scale-ops.md` | Facilitator guide for Module 12 |
| Modify | `challenges/advanced/custom-integration-development.md` | Fill in (currently empty) |
| Modify | `modules/09-terraform/README.md` | Update Next Steps to point to Module 10 |
| Modify | `learning-paths/builder.md` | Add Modules 10-12 to the journey table |
| Modify | `README.md` | Add Modules 10-12 to module list |

---

## Navigation Template

All module READMEs use this navigation block. Substitute `NN`, `MM`, `Title` as appropriate:

```markdown
## 🧭 Navigation

**Previous**: [Module NN: PrevTitle](../NN-prev-slug/) | **Next**: [Module MM: NextTitle](../MM-next-slug/)

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **All Modules**: [Workshop Home](../../README.md)
```

Module 10 previous = Module 09 (`../09-terraform/`), next = Module 11 (`../11-custom-integrations/`).
Module 11 previous = Module 10, next = Module 12.
Module 12 previous = Module 11, next = `[Challenges](../../challenges/)`.

---

## Progress Indicators

```
Module 10 of 12 | Completion: 83% of core modules
Module 11 of 12 | Completion: 92% of core modules
Module 12 of 12 | Completion: 100% of core modules 🎉
```

---

## Task 1: Module 02 — Add Advanced Blueprint Features Section

**Files:**
- Modify: `modules/02-blueprints/README.md`

Append this section after the existing "Challenge: Design Your Own Blueprint" section and before "Common Issues & Solutions":

- [ ] **Step 1: Open modules/02-blueprints/README.md and locate the insertion point**

Find the line `## Common Issues & Solutions` near the bottom. Insert the new section above it.

- [ ] **Step 2: Insert the Advanced Blueprint Features section**

```markdown
## Advanced Blueprint Features

### Mirror Properties

Mirror properties pull a value from a **related entity** onto the current entity — without duplicating data. They stay in sync automatically when the source value changes.

**Use case:** Show the owning team's Slack channel on every Service entity, so developers can find the right channel without navigating to the team.

To add a mirror property in the UI:
1. Open **Builder → Data Model → Service blueprint → Properties**
2. Click **+ Add Property → Mirror Property**
3. Set **Relation**: `team`
4. Set **Mirror Property**: `slack_channel` (the property on the Team blueprint)
5. Give it a title: `Team Slack Channel`

The Service entity will now display the team's Slack channel automatically.

In JSON (for Terraform or API-based blueprint management):

```json
{
  "mirrorProperties": {
    "team_slack_channel": {
      "title": "Team Slack Channel",
      "path": "team.slack_channel"
    }
  }
}
```

### Aggregation Properties

Aggregation properties compute a value **across all related entities** — counts, sums, averages, and min/max. They update automatically as related entities change.

**Use case:** Show the number of open incidents on each Service entity so engineers see severity at a glance in the catalog.

To add an aggregation property in the UI:
1. Open **Builder → Data Model → Service blueprint → Properties**
2. Click **+ Add Property → Aggregation Property**
3. Set **Relation**: the relation to aggregate across (e.g., `incidents`)
4. Set **Function**: `count`
5. Optionally add a **Filter**: only count incidents where `status = "open"`
6. Give it a title: `Open Incidents`

In JSON:

```json
{
  "aggregationProperties": {
    "open_incident_count": {
      "title": "Open Incidents",
      "target": "incident",
      "calculationSpec": {
        "func": "count",
        "calculationBy": "entities",
        "filter": {
          "combinator": "and",
          "conditions": [
            { "operator": "=", "property": "status", "value": "open" }
          ]
        }
      }
    }
  }
}
```

### When to use each

| Need | Use |
|------|-----|
| Show a field from a related entity without duplicating it | Mirror property |
| Count, sum, or average values across related entities | Aggregation property |
| Compute a value from the entity's own fields | Calculation property (formula) |

See the [Mirror properties docs](https://docs.port.io/build-your-software-catalog/customize-integrations/configure-data-model/setup-blueprint/properties/mirror-property) and [Aggregation properties docs](https://docs.port.io/build-your-software-catalog/customize-integrations/configure-data-model/setup-blueprint/properties/aggregation-property) for the full reference.
```

- [ ] **Step 3: Verify the section renders correctly**

Check that:
- The section appears after the "Challenge" section and before "Common Issues & Solutions"
- Both JSON code blocks are fenced with triple backticks
- The docs links are present

- [ ] **Step 4: Commit**

```bash
git add modules/02-blueprints/README.md
git commit -m "docs(02): add mirror and aggregation properties section"
```

---

## Task 2: Module 10 — Governance & RBAC

**Files:**
- Create: `modules/10-governance/README.md`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p modules/10-governance
```

- [ ] **Step 2: Write modules/10-governance/README.md**

```markdown
# Module 10: Governance & RBAC

## 🧭 Navigation

**Previous**: [Module 9: Terraform](../09-terraform/) | **Next**: [Module 11: Custom Integrations](../11-custom-integrations/)

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 60-75 minutes | 📋 **Prerequisites**: [Module 9](../09-terraform/) completed

**Progress**: Module 10 of 12 | **Completion**: 83% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Explain Port's three-layer permissions model
- Configure blueprint-level permissions for team ownership
- Control page visibility by team
- Set up approval chains for sensitive actions
- Access and export the audit log for compliance

## Prerequisites
- Completed [Module 9: Terraform](../09-terraform/)
- A Port instance with the TechCorp data model (blueprints, entities, teams from earlier modules)
- Admin access to your Port instance

## Duration
**Estimated Time**: 60-75 minutes

---

## Key Concepts

### Port's Three-Layer Permissions Model

Permissions in Port stack from widest to narrowest:

```
Workspace Role (admin / member / viewer)
    └── Blueprint Permissions (per blueprint: who can create/edit/delete entities)
            └── Page Visibility (per page: which teams can see it)
```

A user's workspace role is the ceiling — blueprint and page permissions can only restrict, never expand beyond the role.

| Workspace Role | Can do |
|----------------|--------|
| `admin` | Everything — manage blueprints, integrations, users, permissions |
| `member` | Use Self-Service, view catalog, trigger permitted actions |
| `viewer` | Read-only access to catalog pages they can see |

### Port Teams vs External Groups

Port teams are used for permissions scoping. They can be:
- **Manually managed**: created and maintained inside Port
- **Synced from your identity provider**: GitHub teams, Okta groups, Google Workspace groups, LDAP

When synced, team membership in Port stays current with your IdP automatically. Blueprint permissions and page visibility assigned to a Port team apply to all its members.

---

## Hands-On Exercise 1: Blueprint-Level Permissions

Currently any member can create, edit, or delete any entity. Let's lock down the Service blueprint so that:
- **Backend team**: full create/edit/delete on Service entities
- **Frontend team**: full create/edit/delete on Service entities (their own services)
- **DevOps team**: read-only on Service entities
- **Everyone else**: read-only

### Step 1: Open Blueprint Permissions

1. Navigate to **Builder → Data Model**
2. Click on the **Service** blueprint
3. Click the **Permissions** tab
4. You'll see the current permissions configuration (likely open to all members)

### Step 2: Configure Entity Creation

Under **Create entity**, remove the default "All" permission and add:

```json
{
  "roles": ["admin"],
  "teams": ["Backend", "Frontend"],
  "users": []
}
```

### Step 3: Configure Entity Editing

Under **Update entity**, apply the same configuration:

```json
{
  "roles": ["admin"],
  "teams": ["Backend", "Frontend"],
  "users": []
}
```

### Step 4: Configure Entity Deletion

Under **Delete entity**, restrict to admins and team leads only:

```json
{
  "roles": ["admin"],
  "teams": [],
  "users": []
}
```

### Step 5: Verify

Log in as a DevOps team member (or use a secondary test account) and confirm:
- They can view Service entities in the catalog ✅
- The **Create** button is absent or disabled ✅
- Entity edit controls are hidden ✅

---

## Hands-On Exercise 2: Page Visibility

TechCorp wants two separate dashboards:
- **Engineering KPI Dashboard** — visible only to DevOps and admins
- **Service Inventory** — visible to all members

### Step 1: Set visibility on the KPI Dashboard

1. Navigate to **Catalog** and find your Engineering KPI Dashboard (or create one named `TechCorp KPI Dashboard`)
2. Click **...** → **Edit page**
3. Under **Visibility**, select **Specific teams**
4. Add: `DevOps`
5. Save

Non-DevOps members will no longer see this page in their sidebar.

### Step 2: Verify

Log in as a Backend team member and confirm the KPI Dashboard is not visible in the catalog sidebar.

---

## Hands-On Exercise 3: Action Approval Chains

The Deploy Service action from Module 5 currently runs without approval. For production deployments, add a mandatory approval gate.

### Step 1: Open the Deploy Service action

Navigate to **Self-Service → Deploy Service → Edit action → Permissions step**.

### Step 2: Configure approval

Set:
- **Require approval**: ✅ Enabled
- **Approvers**: `Specific teams` → add `DevOps`
- **Approval type**: `Any approver` (one DevOps member is sufficient)
- **Send notifications**: ✅ Enabled (email to approvers)

### Step 3: Scope execution to the right teams

Under **Execution permissions**:
```json
{
  "roles": ["member", "admin"],
  "teams": ["Backend", "Frontend"],
  "users": []
}
```

### Step 4: Test the flow

1. Log in as a Backend team member
2. Trigger the Deploy Service action with `target_environment: production`
3. Confirm the action enters "Pending approval" state
4. Log in as a DevOps team member and approve
5. Confirm the action proceeds

---

## Audit Log

Port logs every significant event:
- Entity created, updated, deleted
- Action triggered, approved, rejected
- Blueprint created or modified
- Permissions changed
- Integration syncs

### Accessing the audit log

Navigate to **Builder → Audit Log**. Filter by:
- **Time range**: last 24h, 7d, 30d, or custom
- **Event type**: entity changes, action runs, blueprint changes, permission changes
- **Blueprint**: filter to a specific blueprint
- **User**: filter by who triggered the event

### Exporting for compliance

To push audit events to an external system (SIEM, Splunk, DataDog):

Create an automation rule that fires on any entity change and POSTs to your SIEM webhook:

```json
{
  "identifier": "audit_export",
  "title": "Export Audit Events",
  "trigger": {
    "type": "automation",
    "event": {
      "type": "ANY_ENTITY_CHANGE",
      "blueprintIdentifier": "service"
    }
  },
  "invocationMethod": {
    "type": "WEBHOOK",
    "url": "https://your-siem.example.com/port-events",
    "body": {
      "event_type": "{{ .event.action }}",
      "entity": "{{ .event.context.entityIdentifier }}",
      "blueprint": "{{ .event.context.blueprintIdentifier }}",
      "timestamp": "{{ .event.createdAt }}",
      "triggered_by": "{{ .event.trigger.by.user.email }}"
    }
  },
  "publish": true
}
```

---

## Governance Patterns

### Who owns which blueprints?

Document blueprint ownership outside Port (in your wiki or CLAUDE.md). For each blueprint, record:
- **Owner team**: who is responsible for the blueprint schema
- **Write access**: which teams can create/edit entities of this type
- **Review process**: how schema changes are proposed and approved (PR to Terraform repo)

### Using Terraform for permissions as code

Once you have Terraform set up (Module 9), permissions belong in code too:

```hcl
resource "port_blueprint_permissions" "service_permissions" {
  blueprint_identifier = "service"

  entities = {
    register = {
      roles  = ["admin"]
      teams  = ["Backend", "Frontend"]
      users  = []
    }
    update = {
      roles  = ["admin"]
      teams  = ["Backend", "Frontend"]
      users  = []
    }
    unregister = {
      roles  = ["admin"]
      teams  = []
      users  = []
    }
  }
}
```

See the [Port Terraform provider docs](https://registry.terraform.io/providers/port-labs/port-labs/latest/docs) for `port_blueprint_permissions` resource syntax.

---

## 🎯 Self-Assessment Checkpoint

### Success Indicators
- [ ] Configured blueprint-level permissions so only the right teams can create/edit Service entities
- [ ] Set page visibility on at least one dashboard to restrict it to a specific team
- [ ] Added an approval gate to the Deploy Service action
- [ ] Can navigate to the audit log and filter events by type
- [ ] Can explain the three-layer permissions model from memory

## End State & Further Reading

By the end of this module, your Port instance should:
- Have Service blueprint permissions locked to Backend and Frontend teams
- Have at least one page with restricted visibility
- Have the Deploy Service action requiring DevOps approval for production

See the [Port permissions documentation](https://docs.port.io/sso-rbac/rbac/) for the full RBAC reference.

## Common Issues & Solutions

**Problem**: Permissions changes don't seem to take effect  
**Solution**: Permissions are evaluated at request time. Clear your browser cache or try an incognito window as the test user.

**Problem**: Team members can't see pages they should have access to  
**Solution**: Verify the user is actually a member of the Port team (not just the external IdP group). Check **Builder → Teams** to confirm membership.

**Problem**: `port_blueprint_permissions` Terraform resource fails  
**Solution**: Verify the blueprint identifier is exact (case-sensitive). The `register`/`update`/`unregister` keys must all be present — omitting one is a validation error.

**Problem**: Approval notification emails are not being received  
**Solution**: Check that the approver's email in Port matches their actual email. Port sends to the address on their Port profile.

**Still stuck or think you've found a bug?** See [Bug Reporting & Support](../../README.md#bug-reporting--support).

## Next Steps

With governance in place, connect Port to systems that don't have native integrations:
- **[Module 11: Custom Integrations](../11-custom-integrations/)** — REST API, webhooks, and Ocean framework

## Quick Reference

### Permissions JSON structure (blueprint-level)
```json
{
  "roles": ["admin"],
  "teams": ["TeamName"],
  "users": ["user@example.com"]
}
```

### Port workspace roles
| Role | Capabilities |
|------|-------------|
| `admin` | Full access — blueprints, users, integrations, permissions |
| `member` | Catalog, Self-Service, permitted actions |
| `viewer` | Read-only catalog access |

---

**Completed Module 10?** Continue to [Module 11: Custom Integrations](../11-custom-integrations/).
```

- [ ] **Step 3: Verify the file**

Check:
- Navigation links reference correct previous (`../09-terraform/`) and next (`../11-custom-integrations/`)
- All 5 code blocks are properly fenced
- Progress indicator shows `Module 10 of 12`

- [ ] **Step 4: Commit**

```bash
git add modules/10-governance/README.md
git commit -m "docs(10): add governance and RBAC module"
```

---

## Task 3: Module 10 — Facilitator Guide

**Files:**
- Create: `facilitator/module-10-governance.md`

- [ ] **Step 1: Write facilitator/module-10-governance.md**

Use the existing facilitator guides (e.g., `facilitator/module-05-actions.md`) as a structural template. The guide must cover:

```markdown
# Facilitator Guide — Module 10: Governance & RBAC

## Module Summary
- **Duration**: 60-75 minutes
- **Audience**: Platform engineers / Port admins
- **Key outcome**: Participants configure a real permissions model and understand the three-layer RBAC system

## Preparation
- Ensure each participant has admin access to their Port instance
- The TechCorp data model (Service blueprint, Backend/Frontend/DevOps teams) must exist from earlier modules
- If teams don't exist: have participants create them in **Builder → Teams** before the exercises

## Common Sticking Points

### "I don't see the Permissions tab on my blueprint"
Permissions configuration is only visible to workspace admins. If a participant can't see it, check their workspace role under **Builder → Members**.

### Approval chain exercise requires two accounts
The approval flow test needs one account to trigger and another to approve. Options:
- Participants pair up
- Use a shared "DevOps approver" test account prepared in advance
- Skip the approval verification step if pairing isn't possible

### Terraform permissions resource
`port_blueprint_permissions` was added in provider version ~2.15. If participants are on an older provider, the resource won't exist. Have them update: `version = "~> 2.21"` in `main.tf`.

## Timing Guide

| Section | Time |
|---------|------|
| Concepts: three-layer model | 10 min |
| Exercise 1: Blueprint permissions | 15 min |
| Exercise 2: Page visibility | 10 min |
| Exercise 3: Action approval chain | 15 min |
| Audit log walkthrough | 10 min |
| Wrap-up / Q&A | 5-10 min |

## Discussion Questions
- "Which of your existing tools has the most complex permission model? How does Port's compare?"
- "If a contractor needs read-only access to Port for 30 days, how would you set that up?"
- "What's the first blueprint you'd lock down in your real Port instance? Why?"
```

- [ ] **Step 2: Commit**

```bash
git add facilitator/module-10-governance.md
git commit -m "docs(10): add facilitator guide for governance module"
```

---

## Task 4: Module 11 — Custom Integrations

**Files:**
- Create: `modules/11-custom-integrations/README.md`

Before writing: fetch the Port REST API base URL and Ocean scaffold command to use accurate examples.

- [ ] **Step 1: Fetch Port REST API reference for accurate endpoint paths**

Fetch `https://docs.port.io/api-reference/port-api` and note:
- The base URL for API calls (currently `https://api.port.io/v1`)
- The entity upsert endpoint path
- The auth token endpoint

- [ ] **Step 2: Fetch Ocean quickstart for scaffold command**

Fetch `https://docs.port.io/build-your-software-catalog/custom-integration/ocean-custom-integration/overview` and note:
- The exact `ocean new` or equivalent scaffold command
- Any prerequisite installs (Python version, pip package name)

- [ ] **Step 3: Create the directory and write modules/11-custom-integrations/README.md**

```bash
mkdir -p modules/11-custom-integrations
```

The file must include these sections with the content below:

```markdown
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
# Usage: ./bulk-upsert-services.sh services.csv
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
from port_ocean.core.handlers.port_app_config.models import ResourceConfig

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
```

- [ ] **Step 4: Verify**

Check:
- Navigation links: previous = `../10-governance/`, next = `../12-scale-ops/`
- All code blocks are properly fenced
- The `scripts/` directory reference is consistent (the bulk upsert script is in the plan but the directory doesn't exist yet — note it as a new file to create)

- [ ] **Step 5: Create the scripts directory and bulk upsert script**

```bash
mkdir -p scripts
```

Create `scripts/bulk-upsert-services.sh` with the content from Step 3 above, then:

```bash
chmod +x scripts/bulk-upsert-services.sh
```

- [ ] **Step 6: Commit**

```bash
git add modules/11-custom-integrations/README.md scripts/bulk-upsert-services.sh
git commit -m "docs(11): add custom integrations module and bulk upsert script"
```

---

## Task 5: Module 11 — Facilitator Guide + Custom Integration Challenge

**Files:**
- Create: `facilitator/module-11-custom-integrations.md`
- Modify: `challenges/advanced/custom-integration-development.md`

- [ ] **Step 1: Write facilitator/module-11-custom-integrations.md**

```markdown
# Facilitator Guide — Module 11: Custom Integrations

## Module Summary
- **Duration**: 90 minutes
- **Audience**: Platform engineers who need to connect Port to non-native systems
- **Key outcome**: Participants can use the Port REST API, configure a webhook, and understand when to use Ocean

## Preparation
- Participants need Port API credentials ready before the session (Builder → ... → Credentials)
- Confirm Python 3.11+ is installed for the Ocean exercise
- Have a backup sample payload ready for the webhook section (JSON below) if participants don't have a PagerDuty account

Sample webhook test payload (PagerDuty-like):
```json
{
  "messages": [{
    "incident": {
      "id": "P123456",
      "title": "Database CPU at 95%",
      "status": "triggered",
      "urgency": "high",
      "summary": "Production database CPU spiking",
      "html_url": "https://example.pagerduty.com/incidents/P123456",
      "service": { "name": "ecommerce-api" }
    }
  }]
}
```

## Timing Guide

| Section | Time |
|---------|------|
| Decision tree discussion | 10 min |
| REST API: auth + CRUD | 20 min |
| Bulk CSV upsert exercise | 15 min |
| Webhook setup | 15 min |
| Ocean overview + scaffold | 20 min |
| Q&A | 10 min |

## Common Sticking Points

### Access token expiry during exercises
Tokens expire after 1 hour. If a participant gets 401 errors mid-exercise, they just need to re-run the auth curl call.

### `ocean new` scaffold fails
Usually a PATH issue. Run `python3 -m ocean new my-integration` as an alternative.

### Webhook mapping returns no entities
The most common cause: the JQ path doesn't match the actual payload structure. Use the webhook editor's **Test** tab with the sample payload to iterate on the mapping interactively.

## Discussion Questions
- "What systems in your org would benefit from being in Port that don't have a native integration?"
- "When would you choose a webhook over Ocean? What's the tipping point?"
```

- [ ] **Step 2: Write challenges/advanced/custom-integration-development.md**

```markdown
# Advanced Challenge: Custom Integration Development

**Difficulty**: 🔴 Advanced | **Estimated Time**: 90-120 minutes  
**Prerequisites**: Module 11 completed

---

## Scenario

TechCorp uses an internal ticketing system called **TechTrack** for tracking engineering work items. TechTrack exposes a REST API but has no Port integration. Your task: build a custom integration that keeps Port's catalog in sync with TechTrack tickets.

A mock TechTrack API is available at `https://jsonplaceholder.typicode.com/todos` (using JSONPlaceholder as a stand-in — it has a similar list-of-items structure).

---

## Requirements

### 1. Create the TechTrack Ticket blueprint

Create a blueprint with identifier `techtrack_ticket` and these properties:

| Property | Type | Required |
|----------|------|----------|
| `status` | String (enum: `open`, `in_progress`, `done`) | Yes |
| `priority` | Number (1 = highest) | No |
| `completed` | Boolean | Yes |

Add a relation to `Service` blueprint (many tickets can belong to one service).

### 2. Populate via REST API (warmup)

Using the Port REST API from Module 11, upsert 5 tickets manually. Use the JSONPlaceholder endpoint to fetch real data:

```bash
curl https://jsonplaceholder.typicode.com/todos?_limit=5
```

Map each item to the `techtrack_ticket` blueprint: `id` → identifier, `title` → title, `completed` → `completed` property.

### 3. Build an Ocean integration

Scaffold an Ocean integration that:
- Fetches all todos from `https://jsonplaceholder.typicode.com/todos`
- Maps them to `techtrack_ticket` entities
- Sets `status` based on `completed`: `true` → `"done"`, `false` → `"open"`
- Runs a full resync on demand

### 4. Set up a webhook for real-time updates

Configure an inbound Port webhook that listens for "ticket updated" events. Use this sample payload to test your mapping:

```json
{
  "event": "ticket.updated",
  "ticket": {
    "id": 42,
    "title": "Fix payment timeout",
    "completed": true,
    "userId": 3
  }
}
```

The webhook mapping should upsert the ticket entity with the updated `completed` and `status` values.

---

## Success Criteria

- [ ] `techtrack_ticket` blueprint exists in Builder with correct properties and service relation
- [ ] 5+ ticket entities exist in Port (upserted via REST API)
- [ ] Ocean integration syncs all todos from JSONPlaceholder and maps status correctly
- [ ] Inbound webhook exists in Builder → Data Sources
- [ ] Pasting the sample payload in the webhook **Test** tab generates a valid entity preview

## Bonus Challenges

- Add a Port automation that fires when a ticket's `completed` property changes to `true` and upserts the entity with `status: "done"`
- Add the `open_ticket_count` aggregation property to the Service blueprint (count of related `techtrack_ticket` entities where `completed = false`)
- Secure the webhook with secret validation
```

- [ ] **Step 3: Commit**

```bash
git add facilitator/module-11-custom-integrations.md challenges/advanced/custom-integration-development.md
git commit -m "docs(11): add facilitator guide and custom integration challenge"
```

---

## Task 6: Module 12 — Scale & Ops

**Files:**
- Create: `modules/12-scale-ops/README.md`

Before writing, fetch the Port CLI README for accurate command syntax.

- [ ] **Step 1: Fetch Port CLI docs for accurate command syntax**

Fetch `https://github.com/port-experimental/port-cli` and note the exact commands for:
- Installing Port CLI
- Configuring organizations (`port config` or equivalent)
- `port export`
- `port compare`
- `port import`

- [ ] **Step 2: Create directory and write modules/12-scale-ops/README.md**

```bash
mkdir -p modules/12-scale-ops
```

```markdown
# Module 12: Scale & Ops

## 🧭 Navigation

**Previous**: [Module 11: Custom Integrations](../11-custom-integrations/) | **Next**: [Challenges](../../challenges/)

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 75 minutes | 📋 **Prerequisites**: [Module 11](../11-custom-integrations/) completed

**Progress**: Module 12 of 12 | **Completion**: 100% of core modules 🎉

## Learning Objectives
By the end of this module, you will be able to:
- Manage Port configuration across multiple environments using Terraform and Port CLI
- Import UI-created resources into Terraform state
- Monitor integration health and set up sync failure alerts
- Detect and clean up stale catalog data at scale

## Prerequisites
- Completed [Module 11: Custom Integrations](../11-custom-integrations/)
- Terraform installed (from Module 9)
- Node.js or npm available (for Port CLI install)
- Access to at least one Port workspace (two workspaces recommended for the compare exercise)

## Duration
**Estimated Time**: 75 minutes

---

## Key Concepts

### Two Tools for Multi-Environment Management

| | Terraform | Port CLI |
|--|-----------|----------|
| **Mental model** | Declare desired state, apply it | Export / import / compare / migrate |
| **Best for** | Greenfield IaC — Port config managed as code from the start | Existing UI-built config, environment promotion, drift detection |
| **CI/CD integration** | `terraform plan` / `terraform apply` in pipeline | `port compare --fail-on-diff` in pipeline |
| **Use together?** | Yes — Terraform manages resources, CLI audits drift | |

---

## Section 1: Multi-Environment with Terraform

The Terraform setup from Module 9 uses a single set of `.tf` files. To support multiple environments (dev/staging/prod), use workspace-specific variable files.

### Directory structure

```
port-terraform/
├── main.tf
├── blueprints.tf
├── actions.tf
├── scorecards.tf
├── variables.tf
├── envs/
│   ├── dev.tfvars
│   ├── staging.tfvars
│   └── prod.tfvars
```

### Environment variable files

`envs/dev.tfvars`:
```hcl
port_client_id     = "dev_client_id"
port_client_secret = "dev_client_secret"
port_base_url      = "https://api.getport.io"
environment        = "dev"
```

`envs/prod.tfvars`:
```hcl
port_client_id     = "prod_client_id"
port_client_secret = "prod_client_secret"
port_base_url      = "https://api.getport.io"
environment        = "prod"
```

### Apply to a specific environment

```bash
# Plan for dev
terraform plan -var-file=envs/dev.tfvars

# Apply to prod
terraform apply -var-file=envs/prod.tfvars
```

### CI/CD promotion pipeline (GitHub Actions)

```yaml
name: Promote Port Config

on:
  push:
    branches: [main]
    paths: ['port-terraform/**']

jobs:
  deploy-dev:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
        working-directory: ./port-terraform
      - run: terraform apply -auto-approve -var-file=envs/dev.tfvars
        working-directory: ./port-terraform
        env:
          TF_VAR_port_client_id: ${{ secrets.DEV_PORT_CLIENT_ID }}
          TF_VAR_port_client_secret: ${{ secrets.DEV_PORT_CLIENT_SECRET }}

  deploy-prod:
    needs: deploy-dev
    runs-on: ubuntu-latest
    environment: production  # requires manual approval in GitHub
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
        working-directory: ./port-terraform
      - run: terraform apply -auto-approve -var-file=envs/prod.tfvars
        working-directory: ./port-terraform
        env:
          TF_VAR_port_client_id: ${{ secrets.PROD_PORT_CLIENT_ID }}
          TF_VAR_port_client_secret: ${{ secrets.PROD_PORT_CLIENT_SECRET }}
```

---

## Section 2: Multi-Environment with Port CLI

Port CLI (`github.com/port-experimental/port-cli`) is ideal when you want to compare and sync environments without full IaC adoption.

### Install

```bash
npm install -g @port-labs/port-cli
```

### Configure organizations

Create `~/.port/config.yaml` with named organizations:

```yaml
organizations:
  staging:
    clientId: "staging_client_id"
    clientSecret: "staging_client_secret"
  prod:
    clientId: "prod_client_id"
    clientSecret: "prod_client_secret"
```

### Export configuration from prod

```bash
port export --org prod --output ./port-export-prod
```

This creates JSON files for blueprints, actions, scorecards, automations, pages, and integrations.

### Compare staging vs prod

```bash
port compare --source prod --target staging
```

Output shows a diff of all resource types — blueprints present in prod but not staging, property differences, etc.

### Fail-on-diff in CI/CD (drift detection)

Add to your CI pipeline to alert on unexpected config drift:

```bash
port compare --source prod --target staging --fail-on-diff
```

Returns exit code 1 if any difference is found — causes the CI job to fail and alerts the team.

### Import prod config into staging

```bash
port import --from ./port-export-prod --org staging
```

### Hands-On: Compare Two Environments

If you have access to two Port workspaces:

1. Configure both in `~/.port/config.yaml`
2. Run: `port compare --source prod --target staging`
3. Identify at least one difference (a blueprint property that exists in prod but not staging)
4. Export from prod and import to staging: `port import --from ./port-export-prod --org staging`
5. Re-run the compare — the diff should be gone

If you only have one workspace: run `port export --org prod --output ./port-export` and inspect the output files to understand the export format.

---

## Section 3: Importing UI Resources into Terraform

Most teams build their initial Port setup in the UI, then want to bring it under Terraform management. The import workflow:

```
1. Export resource JSON from Port API
2. Write the matching .tf resource block
3. Run: terraform import <resource_type>.<name> <port_identifier>
4. Run: terraform plan  (should show: No changes)
```

### Example: Import a blueprint

**Step 1 — Get the current blueprint JSON from Port API:**

```bash
curl "https://api.port.io/v1/blueprints/service" \
  -H "Authorization: Bearer $PORT_TOKEN" | python3 -m json.tool
```

**Step 2 — Write the matching Terraform resource.** Use the JSON output to populate a `port_blueprint` resource in `blueprints.tf`. The `identifier`, `title`, and all `properties` must match exactly.

**Step 3 — Import:**

```bash
terraform import port_blueprint.service service
```

Expected output: `port_blueprint.service: Import prepared!`

**Step 4 — Verify:**

```bash
terraform plan
```

Expected output: `No changes. Your infrastructure matches the configuration.`

If the plan shows changes, your `.tf` definition doesn't match the actual state. Adjust the `.tf` file until the plan is clean.

> **Tip:** Port CLI `port export` generates JSON representations of all resources — use these as a starting point for writing your `.tf` blocks rather than hand-crafting them.

---

## Section 4: Integration Health & Observability

### Where to check integration health

Navigate to **Builder → Data Sources** and click on any integration. The integration page shows:
- **Last sync time**: when Port last pulled data
- **Sync status**: success / in-progress / failed
- **Error log**: details of any mapping or connection errors
- **Entity count**: how many entities were created/updated in the last sync

### Alert on sync failure via automation

Create an automation that fires when an integration entity's status changes to `failed` and notifies via Slack webhook:

```json
{
  "identifier": "integration_failure_alert",
  "title": "Alert on Integration Sync Failure",
  "trigger": {
    "type": "automation",
    "event": {
      "type": "ENTITY_UPDATED",
      "blueprintIdentifier": "_integration"
    },
    "condition": {
      "type": "JQ",
      "expressions": [
        ".diff.after.properties.status == \"failed\""
      ],
      "combinator": "and"
    }
  },
  "invocationMethod": {
    "type": "WEBHOOK",
    "url": "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK",
    "body": {
      "text": "Port integration sync failed: {{ .event.context.entityIdentifier }}"
    }
  },
  "publish": true
}
```

### Action run dashboard

Build a Port dashboard that tracks action health across TechCorp:

1. Create a new Dashboard page: **"Port Operations Dashboard"**
2. Add a **Table widget** — blueprint: `_action_run`, columns: action name, status, triggered by, timestamp
3. Add a **Number Chart** — count of action runs with status `FAILURE` in the last 7 days
4. Add a **Pie Chart** — action runs grouped by status (SUCCESS / FAILURE / IN_PROGRESS)

---

## Section 5: Catalog Hygiene at Scale

### Detecting stale entities

A stale entity is one that hasn't been updated by an integration in a suspicious amount of time — often a sign that a service was decommissioned but not removed from Port.

**Scorecard rule for staleness:**

Add a rule to your Production Readiness scorecard:

```json
{
  "identifier": "recently_synced",
  "title": "Recently Synced",
  "description": "Entity was updated in the last 90 days",
  "level": "Bronze",
  "query": {
    "combinator": "and",
    "conditions": [
      {
        "operator": ">=",
        "property": "$updatedAt",
        "value": {
          "preset": "lastMonth"
        }
      }
    ]
  }
}
```

Entities failing this rule appear in the catalog with a Bronze or lower scorecard level — immediately visible.

### Blueprint design principles for large catalogs

- **One blueprint per concept**: avoid generic "Resource" blueprints that accumulate too many properties. Each blueprint should have 5-15 focused properties.
- **Use relations, not duplicated fields**: if 10 blueprints need the same team info, model it as a relation to a Team blueprint — not 10 copies of `team_slack_channel`.
- **Aggregation over raw data**: use aggregation properties (covered in Module 2) instead of storing counts/sums as manual properties that drift out of sync.
- **Mirror strategically**: only mirror properties that are frequently needed in the same view as the parent entity. Mirrors add to the query cost at render time.

---

## 🎯 Self-Assessment Checkpoint

### Success Indicators
- [ ] Can apply Terraform to a named environment using `-var-file`
- [ ] Installed Port CLI and ran at least one `port export` or `port compare` command
- [ ] Successfully imported one existing blueprint into Terraform state (zero diff on `terraform plan`)
- [ ] Integration health dashboard exists in Port showing sync status
- [ ] Added a "recently synced" staleness rule to the Production Readiness scorecard

## End State & Further Reading

By the end of this module:
- Your Terraform project has environment-specific `.tfvars` files
- Port CLI is installed and configured with at least one organization
- A Port Operations Dashboard exists with integration sync and action run widgets
- The Production Readiness scorecard has a staleness rule

See the [Port CLI repository](https://github.com/port-experimental/port-cli) and [Terraform provider docs](https://registry.terraform.io/providers/port-labs/port-labs/latest/docs).

## Common Issues & Solutions

**Problem**: `terraform import` fails with "resource not found"  
**Solution**: The identifier passed to `terraform import` must exactly match the Port resource identifier (case-sensitive). Use the Port API or UI to verify the exact identifier before importing.

**Problem**: `terraform plan` shows unexpected changes after import  
**Solution**: Your `.tf` resource block has fields that don't match Port's current state. Common mismatches: property ordering, enum values, `required` flags. Adjust the `.tf` file to match the API export exactly.

**Problem**: Port CLI `port compare` shows false positives  
**Solution**: Some properties (like `createdAt`, `updatedAt`) will always differ between environments. Use `--ignore-fields` flag if available, or filter the compare output to focus on schema-level differences.

**Problem**: `_integration` blueprint not found in automation trigger  
**Solution**: The integration health automation uses the internal `_integration` blueprint. If it's not visible in Builder, it may not be enabled for your plan. Check with your Port admin.

**Still stuck or think you've found a bug?** See [Bug Reporting & Support](../../README.md#bug-reporting--support).

## Next Steps

🎉 **Congratulations — you've completed the full Port builder workshop.**

You now have the skills to:
- Build and configure a complete Port developer portal (Modules 1-9)
- Govern access with RBAC and audit trails (Module 10)
- Connect any data source to Port (Module 11)
- Operate Port reliably across environments at scale (Module 12)

**Apply what you've learned:** Start with the [Challenges](../../challenges/) or begin building Port for your organization.

## Quick Reference

### Terraform multi-environment commands
```bash
terraform plan -var-file=envs/dev.tfvars
terraform apply -var-file=envs/prod.tfvars
terraform import port_blueprint.<name> <identifier>
```

### Port CLI commands
```bash
port export --org prod --output ./export
port compare --source prod --target staging
port compare --source prod --target staging --fail-on-diff
port import --from ./export --org staging
```

---

**Completed Module 12?** You've finished the Port workshop! Check out the [challenges](../../challenges/) to practice your skills.
```

- [ ] **Step 3: Verify**

Check:
- Navigation: previous = `../11-custom-integrations/`, next = `../../challenges/`
- All HCL, JSON, YAML, and bash code blocks are properly fenced
- The `🎉` completion message matches Module 9's style
- Port CLI commands match what was found in Step 1 (update if syntax differs)

- [ ] **Step 4: Commit**

```bash
git add modules/12-scale-ops/README.md
git commit -m "docs(12): add scale and ops module"
```

---

## Task 7: Module 12 — Facilitator Guide

**Files:**
- Create: `facilitator/module-12-scale-ops.md`

- [ ] **Step 1: Write facilitator/module-12-scale-ops.md**

```markdown
# Facilitator Guide — Module 12: Scale & Ops

## Module Summary
- **Duration**: 75 minutes
- **Audience**: Platform engineers who manage Port for their organization
- **Key outcome**: Participants have a multi-environment strategy and can detect + fix catalog drift

## Preparation
- Two Port workspaces are ideal for the Port CLI compare exercise. If unavailable, the export-and-inspect flow works as a fallback.
- Port CLI requires Node.js. Confirm it's installed before the session.
- Have the `port compare` output from a real environment diff ready to show as a demo if participants only have one workspace.

## Timing Guide

| Section | Time |
|---------|------|
| Multi-env concepts: Terraform vs CLI | 10 min |
| Terraform multi-env exercise | 15 min |
| Port CLI install + compare exercise | 20 min |
| Terraform import walkthrough | 10 min |
| Integration health + ops dashboard | 10 min |
| Catalog hygiene discussion | 5 min |
| Q&A / wrap-up | 5 min |

## Common Sticking Points

### Port CLI compare requires two workspaces
If participants have only one workspace, pivot to: "Export from this workspace and inspect the output files to understand what's exported." Then demo the compare command against a pre-prepared staging org.

### `terraform import` zero-diff is hard to achieve first try
It often takes 2-3 iterations to get a `.tf` block that perfectly matches Port's state. Normalize this: "This is expected. Read the plan diff, adjust the `.tf`, re-plan. You're done when the plan is clean."

### Integration health `_integration` blueprint
Not all plans expose this internal blueprint. If unavailable, pivot the ops dashboard exercise to action runs only (using `_action_run` which is more widely available).

## Discussion Questions
- "If your company uses both Terraform and a legacy UI-managed Port setup, how would you migrate gradually?"
- "What's your threshold for 'stale' in your catalog — 30 days? 90 days? Depends on the blueprint?"
- "Who in your org should own the Port Operations Dashboard — platform team? SRE? Someone else?"
```

- [ ] **Step 2: Commit**

```bash
git add facilitator/module-12-scale-ops.md
git commit -m "docs(12): add facilitator guide for scale and ops module"
```

---

## Task 8: Update Module 09 Navigation

**Files:**
- Modify: `modules/09-terraform/README.md`

- [ ] **Step 1: Update the Next Steps section in Module 09**

Find the current "Next Steps" section at the bottom of `modules/09-terraform/README.md`. It currently points to `challenges/`. Update it to point to Module 10:

Replace:
```markdown
**Next Steps**: Explore the [challenges](../../challenges/) to practice your skills or start implementing Port in your organization!
```

With:
```markdown
**Next Steps**: Continue to [Module 10: Governance & RBAC](../10-governance/) to set up permissions and audit trails for your Port instance.
```

Also update the navigation header at the top. Find:

```markdown
**Previous**: [Module 8: AI Agents](../08-ai-agents/) | **Next**: [Challenges](../../challenges/)
```

Replace with:

```markdown
**Previous**: [Module 8: AI Agents](../08-ai-agents/) | **Next**: [Module 10: Governance & RBAC](../10-governance/)
```

And update the completion message to reflect that Module 09 is no longer the final module:

Find `**Completion**: 100% of core modules 🎉` and replace with:

```markdown
**Progress**: Module 9 of 12 | **Completion**: 75% of core modules
```

- [ ] **Step 2: Commit**

```bash
git add modules/09-terraform/README.md
git commit -m "docs(09): update navigation to point to Module 10"
```

---

## Task 9: Update Learning Path

**Files:**
- Modify: `learning-paths/builder.md`

- [ ] **Step 1: Add Modules 10-12 to the journey table and update duration**

Find the current table:

```markdown
| [09 Terraform](../modules/09-terraform/) | Infrastructure-as-code for Port | 90-120 min |
```

Append three rows after it:

```markdown
| [10 Governance & RBAC](../modules/10-governance/) | Permissions, teams, audit | 60-75 min |
| [11 Custom Integrations](../modules/11-custom-integrations/) | REST API, webhooks, Ocean framework | 90 min |
| [12 Scale & Ops](../modules/12-scale-ops/) | Multi-environment, IaC import, catalog hygiene | 75 min |
```

- [ ] **Step 2: Update the duration at the top**

Find:

```markdown
**Duration**: 8-10 hours
```

Replace with:

```markdown
**Duration**: 12-14 hours (Modules 1-9: 8-10 hours | Advanced Modules 10-12: ~4 hours)
```

- [ ] **Step 3: Update the module count in the overview paragraph**

Find `Work through these 9 modules in order` and replace with `Work through these 12 modules in order`.

- [ ] **Step 4: Commit**

```bash
git add learning-paths/builder.md
git commit -m "docs(builder-path): add modules 10-12 to learning journey"
```

---

## Task 10: Update Root README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add Modules 10-12 to the Core Modules list**

Find:
```markdown
9. **[Terraform](modules/09-terraform/)** — Infrastructure-as-code management
```

Append:
```markdown
10. **[Governance & RBAC](modules/10-governance/)** — Permissions, teams, and audit
11. **[Custom Integrations](modules/11-custom-integrations/)** — REST API, webhooks, and Ocean framework
12. **[Scale & Ops](modules/12-scale-ops/)** — Multi-environment management and catalog hygiene
```

- [ ] **Step 2: Update the Builder Path duration and description**

Find:
```markdown
- **Duration**: 8-10 hours
```

Replace with:
```markdown
- **Duration**: 12-14 hours (core 0→1: 8-10 hours | advanced 1→production: ~4 hours)
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs(readme): add modules 10-12 to workshop overview"
```

---

## Task 11: Final Verification

- [ ] **Step 1: Verify all navigation links chain correctly**

```bash
grep -r "\.\./10-governance" modules/ learning-paths/ README.md
grep -r "\.\./11-custom-integrations" modules/ learning-paths/ README.md
grep -r "\.\./12-scale-ops" modules/ learning-paths/ README.md
```

Each should return at least two hits (previous module pointing forward, next module pointing back).

- [ ] **Step 2: Verify Module 09 no longer shows as final module**

```bash
grep "100% of core modules" modules/09-terraform/README.md
```

Expected: no output (the line was updated in Task 8).

- [ ] **Step 3: Verify Module 12 shows as final module**

```bash
grep "100% of core modules" modules/12-scale-ops/README.md
```

Expected: one hit.

- [ ] **Step 4: Verify the custom integration challenge is no longer empty**

```bash
wc -l challenges/advanced/custom-integration-development.md
```

Expected: more than 10 lines.

- [ ] **Step 5: Final commit if any loose files remain**

```bash
git status
```

If clean: done. If any modified files remain, add and commit them:

```bash
git add -A
git commit -m "docs: final navigation and cross-reference cleanup"
```

---

## Self-Review Notes

**Spec coverage check:**

| Spec requirement | Covered by |
|-----------------|------------|
| Module 02: mirror + aggregation properties | Task 1 |
| Module 10: RBAC three layers | Task 2 |
| Module 10: blueprint-level permissions exercise | Task 2 |
| Module 10: page visibility | Task 2 |
| Module 10: action approval chains (deeper) | Task 2 |
| Module 10: audit log + export | Task 2 |
| Module 10: facilitator guide | Task 3 |
| Module 11: integration decision tree (Ocean as #2) | Task 4 |
| Module 11: Port REST API + bulk upsert | Task 4 |
| Module 11: generic webhook ingestion | Task 4 |
| Module 11: Ocean framework scaffold | Task 4 |
| Module 11: fill in custom-integration-development challenge | Task 5 |
| Module 11: facilitator guide | Task 5 |
| Module 12: multi-env with Terraform | Task 6 |
| Module 12: multi-env with Port CLI | Task 6 |
| Module 12: terraform import workflow | Task 6 |
| Module 12: integration health + observability | Task 6 |
| Module 12: catalog hygiene at scale | Task 6 |
| Module 12: facilitator guide | Task 7 |
| Module 09: navigation updated | Task 8 |
| learning-paths/builder.md updated | Task 9 |
| README.md updated | Task 10 |

All spec requirements covered. ✅
