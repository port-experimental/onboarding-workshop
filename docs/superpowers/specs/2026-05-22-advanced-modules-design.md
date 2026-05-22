# Port Workshop — Advanced Modules (1→Production) Design Spec

**Date:** 2026-05-22
**Status:** Approved
**Branch:** feature/workshop-refresh (extend existing branch)

---

## Goal

Extend the Port onboarding workshop with three advanced modules that take builders from a working Port instance (end of Module 09) to a production-ready, governed, scalable deployment. These modules sit after the existing 9-module "0→1" path.

---

## Context

The existing 9-module workshop ends with Terraform (Module 09). Builders completing it have a working Port instance with blueprints, integrations, dashboards, actions, automations, scorecards, AI, and IaC basics. The gap: they don't yet know how to govern access, connect non-native systems, or operate Port at scale across environments.

These three modules address all three pain points.

---

## Module Structure

| # | Module | Duration |
|---|--------|----------|
| 10 | Governance & RBAC | 60-75 min |
| 11 | Custom Integrations | 90 min |
| 12 | Scale & Ops | 75 min |

Total addition: ~4 hours. Builder path becomes ~12-14 hours end-to-end.

---

## Also: Module 02 Blueprints Addition

Mirror properties and aggregation properties are missing from the existing blueprint module. These are fundamental features (not advanced/scale concepts) and belong in Module 02 as an "Advanced blueprint features" section appended after the existing hands-on exercise.

- **Mirror properties**: pull data from a related entity onto the parent (e.g., show team Slack channel on every Service entity without duplicating it)
- **Aggregation properties**: compute counts/averages/sums across relations (e.g., "number of open incidents" on a Service)

This addition is small (one new section in `modules/02-blueprints/README.md`) and should ship alongside the advanced modules.

---

## Module 10 — Governance & RBAC

**Goal:** Give builders the permissions model needed to hand Port to real teams safely.

**Prerequisites:** Module 09 completed

### Sections

1. **Port's permissions model**
   - Three layers: workspace roles (admin/member/viewer) → blueprint-level permissions → page visibility
   - How layers stack: workspace role is the ceiling; blueprint permissions narrow it further
   - Port teams vs external identity groups (GitHub teams, LDAP/SAML groups) — how they sync

2. **Blueprint-level permissions**
   - Who can create/edit/delete entities per blueprint
   - Read-only blueprints (e.g., ops team can see Deployments, only CI can write them)
   - Hands-on: lock the Service blueprint so only the Backend team can create new services

3. **Page visibility**
   - Controlling which catalog pages are visible to which teams
   - Use case: managers see KPI dashboard; developers see service inventory; neither sees the other's

4. **Action permissions (deeper than Module 05)**
   - Approval chains with specific approvers (not just "any approver")
   - Team-scoped execution: only on-call team can trigger production deploy
   - Hands-on: add approval gate to the Deploy Service action from Module 05

5. **Audit log**
   - What Port logs: entity changes, action runs, blueprint edits, permission changes
   - How to access and filter the audit log
   - Export patterns for compliance (webhook to SIEM, Terraform state diff)

**Hands-on exercise:** Model TechCorp's permission reality — Backend team owns their services (full CRUD), Frontend team owns theirs, DevOps has read-only on all, only DevOps can trigger production deploys.

---

## Module 11 — Custom Integrations

**Goal:** Connect Port to any system — not just the ones with built-in integrations.

**Prerequisites:** Module 10 completed

### Sections

1. **Integration decision tree**
   Per Port docs (`docs.port.io/build-your-software-catalog/custom-integration/ocean-custom-integration/overview`):
   1. **Native integration** — if Port has a built-in connector, use it
   2. **Ocean Custom Integration** — when no native integration exists; REST-compliant APIs, standard auth, predictable JSON; configuration-driven, minimal custom code
   3. **Generic webhook** — push-based, one-way ingestion from systems that POST events
   4. **REST API scripting** — one-off operations, bulk upserts, migration scripts

2. **Port REST API**
   - Auth: client credentials → access token
   - Entity CRUD: create, read, update, delete
   - Querying the catalog (search endpoint, JQ filtering)
   - Bulk operations: upsert multiple entities in one call
   - Hands-on: script that reads a CSV of services and bulk-upserts them into Port

3. **Generic webhook ingestion**
   - Setting up a Port inbound webhook receiver
   - Mapping arbitrary JSON payloads to Port entities
   - Securing webhooks: secret validation, IP allowlisting
   - Use case: push PagerDuty incidents into Port as entities when they fire

4. **Ocean Custom Integration**
   - What Ocean is: Port's open-source integration framework for ongoing bidirectional sync
   - Architecture: integration → fetcher → mapper → Port API
   - Decision guidance: use Ocean over webhook when you need polling, full resync on schedule, or large data volumes
   - Hands-on: scaffold a minimal Ocean integration that syncs from a mock REST API

5. **Challenge**
   - Populates the currently empty `challenges/advanced/custom-integration-development.md`
   - Build an integration for a fictional internal ticketing system (Jira-like mock API)

---

## Module 12 — Scale & Ops

**Goal:** Run Port reliably across multiple environments with a team maintaining it.

**Prerequisites:** Module 11 completed

### Sections

1. **Multi-environment management**
   - Two tools, two mental models:
     - **Terraform** — declare desired state, apply it; best when Port config is fully IaC from the start
     - **Port CLI** (`github.com/port-experimental/port-cli`) — export/import/compare/migrate; best for existing UI-built config, environment promotion without full IaC adoption, or drift detection
   - Terraform pattern: same `.tf` configs, different `tfvars` per environment; CI/CD promotes dev → staging → prod
   - Port CLI pattern: `port export` from prod → `port import` to staging; `port compare` to detect drift; fail-on-diff in CI/CD
   - When to use each vs. both together
   - Hands-on: use Port CLI to compare two environments and identify a config difference

2. **Importing existing UI config into Terraform**
   - `terraform import` workflow: export resource via Port API → write `.tf` block → `terraform import` → `terraform plan` (zero diff = success)
   - Port CLI as complement: `port export` generates JSON to inform the `.tf` blocks

3. **Integration health & observability**
   - Integration run logs, error counts, last sync time — where to find them
   - Alerting on sync failures: automation rule on integration entity ENTITY_UPDATED → webhook to Slack
   - Action run dashboards: Port dashboard tracking execution rates and failure patterns
   - Detecting stale entities: last updated > N days, surfaced via scorecard rule or automation

4. **Catalog hygiene at scale**
   - Identifying stale entities: no team assigned, no recent sync, no scorecard data
   - Automation patterns for flagging or archiving stale entities
   - Blueprint design principles for large catalogs: avoid property sprawl, use relations over duplicated data

---

## Deliverables

1. `modules/02-blueprints/README.md` — add "Advanced blueprint features" section (mirror + aggregation properties)
2. `modules/10-governance/README.md` — new module
3. `modules/11-custom-integrations/README.md` — new module
4. `modules/12-scale-ops/README.md` — new module
5. `facilitator/module-10-governance.md` — new facilitator guide
6. `facilitator/module-11-custom-integrations.md` — new facilitator guide
7. `facilitator/module-12-scale-ops.md` — new facilitator guide
8. `challenges/advanced/custom-integration-development.md` — fill in (currently empty)
9. `learning-paths/builder.md` — add Modules 10-12 to the learning journey table
10. `README.md` — update module list to include Modules 10-12

---

## Out of Scope

- User path content (tracked in FUTURE.md)
- SSO/SAML setup (platform-specific, better as a reference link)
- Port multi-workspace billing/plan considerations
- Video or interactive content
- Localization
