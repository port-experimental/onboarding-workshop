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

Under **Delete entity**, restrict to admins only:

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
      "triggered_by": "{{ .trigger.by.user.email }}"
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
