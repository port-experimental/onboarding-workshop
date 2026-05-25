# Challenge: Enterprise Scorecard System

**Difficulty**: Advanced  
**Estimated Time**: 90-120 minutes  
**Prerequisites**: Completed [Module 7: Scorecards](../../modules/07-scorecards/), [Team-Service Relationships](../intermediate/team-service-relationships.md), and have Service entities in your catalog

## Objective

Design and implement a two-scorecard system for TechCorp that measures service quality from two angles: **documentation & ownership** (Service Quality) and **deployment readiness** (Operational Readiness). Then build an executive dashboard and a self-service improvement action.

## Scenario

TechCorp's CTO wants engineers to see at a glance which services are production-ready and which need attention. You'll create scorecards that evaluate each service automatically and surface gaps without manual reporting.

---

## Part 1: Service Quality Scorecard

This scorecard measures whether a service is well-documented and properly owned.

### Step 1: Create the scorecard

1. Navigate to **Builder → Scorecards**
2. Click **"+ New Scorecard"**
3. Configure:
   - **Title**: `Service Quality`
   - **Blueprint**: `Service`
   - **Filter**: Apply only to non-archived services (`archived = false`)

### Step 2: Configure levels

Add four levels in order (Port evaluates from lowest to highest):

| Level | Color |
|-------|-------|
| Basic | paleBlue |
| Bronze | bronze |
| Silver | silver |
| Gold | gold |

### Step 3: Add rules

Add these four rules. A service achieves a level when all rules for that level and below pass.

**Rule 1 — Bronze: Has README** (identifier: `has_readme`)
```json
{
  "query": {
    "combinator": "and",
    "conditions": [
      { "operator": "isNotEmpty", "property": "readme" }
    ]
  }
}
```

**Rule 2 — Bronze: Uses supported language** (identifier: `uses_supported_language`)
```json
{
  "query": {
    "combinator": "or",
    "conditions": [
      { "operator": "=", "property": "language", "value": "Python" },
      { "operator": "=", "property": "language", "value": "JavaScript" },
      { "operator": "=", "property": "language", "value": "Java" },
      { "operator": "=", "property": "language", "value": "Go" },
      { "operator": "=", "property": "language", "value": "TypeScript" }
    ]
  }
}
```

**Rule 3 — Silver: Has team ownership** (identifier: `has_team`)
```json
{
  "query": {
    "combinator": "and",
    "conditions": [
      { "operator": "isNotEmpty", "property": "team" }
    ]
  }
}
```

**Rule 4 — Gold: Has repository URL** (identifier: `has_repo_url`)
```json
{
  "query": {
    "combinator": "and",
    "conditions": [
      { "operator": "isNotEmpty", "property": "url" }
    ]
  }
}
```

4. Save the scorecard.
5. Navigate to **Catalog → Services** and verify each service now shows a scorecard level.

### Part 1 Success Criteria

- [ ] Scorecard exists and is linked to the Service blueprint
- [ ] All 4 rules are configured with correct levels (2× Bronze, 1× Silver, 1× Gold)
- [ ] Filter excludes archived services (`archived = false`)
- [ ] At least one service shows Bronze or higher
- [ ] At least one service shows Basic (so you can see improvement is needed)

---

## Part 2: Operational Readiness Scorecard

Create a second scorecard called **Operational Readiness** that measures whether a service is ready for production operations. You define the exact rules — here are the building blocks.

### Available properties to evaluate

| Property | What to check |
|----------|--------------|
| `environment` | Is it deployed to Production? |
| `default_branch` | Is it using `main` (not a legacy branch name)? |
| `archived` | Is it actively maintained (not archived)? |
| `description` | Does it have a meaningful description? |
| `framework` | Has a framework been documented? |

### Suggested level thresholds

- **Bronze**: Service has a description and is not archived
- **Silver**: Service uses `main` as its default branch
- **Gold**: Service is deployed to Production environment

### Steps

1. Create a new scorecard: **Title** = `Operational Readiness`, **Blueprint** = `Service`
2. Add the same four levels (Basic / Bronze / Silver / Gold)
3. Add rules for each level using the properties above — write the JSON rule conditions yourself based on the Part 1 examples
4. Apply a filter so only non-archived services are evaluated

### Part 2 Success Criteria

- [ ] Second scorecard created with at least 3 rules across 3 levels
- [ ] Rules use properties that actually exist on the Service blueprint
- [ ] At least one service reaches Silver or Gold on this scorecard
- [ ] `terraform plan` shows zero changes after import (if managing via Terraform)

---

## Part 3: Executive Dashboard

Build a dashboard that gives leadership visibility into scorecard health across the portfolio.

### Required widgets

**Widget 1: Quality Level Distribution (Pie Chart)**
- Entity: Service
- Group By: `Service Quality` scorecard level
- Title: `Services by Quality Level`

**Widget 2: Operational Readiness Distribution (Pie Chart)**
- Entity: Service
- Group By: `Operational Readiness` scorecard level
- Title: `Services by Operational Readiness`

**Widget 3: Services Needing Attention (Table)**
- Entity: Service
- Filter: `Service Quality` level = Basic
- Columns: Service name, Team, Language, Environment
- Title: `Services at Basic Quality (Need Improvement)`

**Widget 4: Gold Standard Services (Table)**
- Entity: Service
- Filter: `Service Quality` level = Gold
- Columns: Service name, Team, Language
- Title: `Gold Standard Services`

### Dashboard Steps

1. Navigate to **Dashboards → + New Dashboard**
2. Title: `Service Quality Executive View`
3. Add Widget 1: Pie Chart, Entity = Service, Group By = Service Quality scorecard level
4. Add Widget 2: Pie Chart, Entity = Service, Group By = Operational Readiness scorecard level
5. Add Widget 3: Table, Entity = Service, Filter = Service Quality level is Basic
6. Add Widget 4: Table, Entity = Service, Filter = Service Quality level is Gold
7. Arrange in a 2×2 grid and save

### Part 3 Success Criteria

- [ ] Dashboard created with all 4 widgets
- [ ] Pie charts show distribution across scorecard levels (not empty)
- [ ] "Services Needing Attention" table shows only Basic-quality services
- [ ] "Gold Standard" table shows only Gold-quality services

---

## Part 4: Improvement Action (Bonus)

Create a self-service action on the Service blueprint that developers can use to flag a service for documentation improvement.

### Action configuration

- **Title**: `Flag for Documentation Review`
- **Identifier**: `flag_doc_review`
- **Trigger**: Self-service, DAY-2, on Service blueprint
- **Backend**: Webhook to `https://httpbin.org/post` (for testing)
- **Input**: `notes` (String, optional) — "What documentation is missing?"

### Request body template

```json
{
  "action": "flag_doc_review",
  "service": "{{.entity.identifier}}",
  "team": "{{.entity.properties.team}}",
  "notes": "{{.inputs.notes}}",
  "triggered_by": "{{.trigger.by.user.email}}"
}
```

### Bonus Success Criteria

- [ ] Action appears on Service entities in the catalog
- [ ] Action form accepts optional notes input
- [ ] Webhook receives payload with service identifier and team
- [ ] Action run appears in Action Runs history

---

## Common Issues & Solutions

**Problem**: Scorecard shows "Basic" for all services even though they should pass Bronze rules  
**Solution**: Check that the rule's `conditions` use the exact property identifier (e.g., `readme` not `README`), and that your service entities actually have those properties filled in

**Problem**: Scorecard filter isn't working  
**Solution**: The filter uses the same condition format as rules — `{ "operator": "=", "property": "archived", "value": false }`

**Problem**: Dashboard widgets show "No data" for scorecard grouping  
**Solution**: Scorecard data may take a moment to populate after saving rules. Refresh the page and ensure at least one service has passed the Bronze level rules.

**Problem**: Rule JSON is rejected when saving  
**Solution**: In the Port UI, rules are typically configured via form fields (not raw JSON). Use the JSON examples above as a reference for what conditions to set in the form.

## Next Steps

After completing this challenge:
- Try [Governance Setup](governance-setup.md) — control which teams can see which scorecard dashboards
- Or explore [Terraform Port Management](terraform-port-management.md) — manage scorecards as infrastructure-as-code
