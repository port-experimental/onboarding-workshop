# Module 12: Scale & Ops

## 🧭 Navigation

**Previous**: [Module 11: Custom Integrations](../11-custom-integrations/) | **Next**: [Challenges](../../challenges/)

**Learning Path**: [Context Lake Path](../../learning-paths/Context Lake.md) | **All Modules**: [Workshop Home](../../README.md)

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
    environment: production
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
npm install -g @port-experimental/port-cli
```

### Configure organizations

Create `~/.port/config.yaml` with named organizations:

```yaml
default_org: prod

organizations:
  staging:
    client_id: "staging_client_id"
    client_secret: "staging_client_secret"
    api_url: https://api.getport.io/v1
  prod:
    client_id: "prod_client_id"
    client_secret: "prod_client_secret"
    api_url: https://api.getport.io/v1
```

### Export configuration from prod

```bash
port export --org prod --output port-export-prod.tar.gz
```

This creates a tarball backup of all resources.

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
port import --input port-export-prod.tar.gz --org staging
```

### Hands-On: Compare Two Environments

If you have access to two Port workspaces:

1. Configure both in `~/.port/config.yaml`
2. Run: `port compare --source prod --target staging`
3. Identify at least one difference (a blueprint property that exists in prod but not staging)
4. Export from prod and import to staging: `port import --input port-export-prod.tar.gz --org staging`
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

> **Note:** The `_integration` blueprint and `_action_run` blueprint used in this section are internal Port blueprints. If they are not visible in your Context Lake, they may not be enabled for your Port plan. Check with your Port admin or account manager.

### Where to check integration health

Navigate to **Context Lake → Data Sources** and click on any integration. The integration page shows:
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
  "description": "Entity was updated in the last 30 days",
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

> **Note:** The `preset` value syntax in scorecard conditions should be verified against the [Port scorecard documentation](https://docs.port.io/promote-scorecards/) before use — syntax may vary by Port version.

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
**Solution**: Some properties (like `createdAt`, `updatedAt`) may always differ between environments. Use `--include` to filter by resource type (e.g. `--include blueprints`) to focus the comparison on what matters.

**Still stuck or think you've found a bug?** See [Bug Reporting & Support](../../README.md#bug-reporting--support).

## Next Steps

🎉 **Congratulations — you've completed the full Port Context Lake workshop.**

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
port export --org prod --output export.tar.gz
port compare --source prod --target staging
port compare --source prod --target staging --fail-on-diff
port import --input export.tar.gz --org staging
```

---

**Completed Module 12?** You've finished the Port workshop! Check out the [challenges](../../challenges/) to practice your skills.
