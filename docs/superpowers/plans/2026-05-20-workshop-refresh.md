# Port Workshop Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh all 7 existing workshop modules for current Port APIs/features, add 2 new modules (Automations and AI Agents/MCP/Skills), renumber to 9 modules, and consolidate to a single Builder learning path — all on a new branch.

**Architecture:** Each module is a self-contained `README.md` in its own directory under `modules/`. Directory names drive navigation order. Facilitator guides mirror the module structure under `facilitator/`. The root `README.md` and `learning-paths/builder.md` are the entry points.

**Tech Stack:** Markdown, YAML, JSON — no code. Port docs at `https://docs.port.io` are the authoritative source for API shapes and feature descriptions.

---

## File Map

### Create
- `FUTURE.md` — User path deferred work tracker
- `modules/06-automations/README.md` — new module
- `modules/08-ai-agents/README.md` — new module
- `learning-paths/builder.md` — replaces platform-engineer.md
- `facilitator/module-06-automations.md` — new facilitator guide
- `facilitator/module-08-ai-agents.md` — new facilitator guide

### Rename (git mv)
- `modules/06-scorecards/` → `modules/07-scorecards/`
- `modules/07-terraform/` → `modules/09-terraform/`
- `facilitator/module-06-scorecards.md` → `facilitator/module-07-scorecards.md`
- `facilitator/module-07-terraform.md` → `facilitator/module-09-terraform.md`

### Modify
- `modules/01-getting-started/README.md`
- `modules/02-blueprints/README.md`
- `modules/03-data-sources/README.md`
- `modules/04-dashboards/README.md`
- `modules/05-actions/README.md`
- `modules/07-scorecards/README.md` (full rewrite post-rename)
- `modules/09-terraform/README.md` (light refresh post-rename)
- `facilitator/module-01-getting-started.md`
- `facilitator/module-02-blueprints.md`
- `facilitator/module-03-data-sources.md`
- `facilitator/module-04-dashboards.md`
- `facilitator/module-05-actions.md`
- `facilitator/module-07-scorecards.md` (post-rename)
- `facilitator/module-09-terraform.md` (post-rename)
- `README.md` (root)

### Delete
- `learning-paths/developer.md`
- `learning-paths/manager.md`
- `learning-paths/quick-start.md`
- `learning-paths/platform-engineer.md` (replaced by builder.md)

---

## Task 1: Create branch and restructure module directories

**Files:**
- Create branch: `feature/workshop-refresh`
- Rename: `modules/06-scorecards/` → `modules/07-scorecards/`
- Rename: `modules/07-terraform/` → `modules/09-terraform/`
- Rename: `facilitator/module-06-scorecards.md` → `facilitator/module-07-scorecards.md`
- Rename: `facilitator/module-07-terraform.md` → `facilitator/module-09-terraform.md`

- [ ] **Step 1: Create and switch to new branch**

```bash
git checkout -b feature/workshop-refresh
```

Expected: `Switched to a new branch 'feature/workshop-refresh'`

- [ ] **Step 2: Rename module directories with git mv**

```bash
git mv modules/06-scorecards modules/07-scorecards
git mv modules/07-terraform modules/09-terraform
```

Expected: no output (git mv is silent on success)

- [ ] **Step 3: Rename facilitator guide files**

```bash
git mv facilitator/module-06-scorecards.md facilitator/module-07-scorecards.md
git mv facilitator/module-07-terraform.md facilitator/module-09-terraform.md
```

- [ ] **Step 4: Create new module directories**

```bash
mkdir -p modules/06-automations
mkdir -p modules/08-ai-agents
```

- [ ] **Step 5: Commit the restructure**

```bash
git add -A
git commit -m "chore: restructure module directories for 9-module layout"
```

Expected: commit showing renames and new empty dirs

---

## Task 2: Create FUTURE.md

**Files:**
- Create: `FUTURE.md`

- [ ] **Step 1: Write FUTURE.md**

Create `/FUTURE.md` with this content:

```markdown
# Future Work

## User Path

The workshop currently targets **Builders** (platform engineers configuring Port).

A **User path** (for developers and managers consuming Port) was scoped during the May 2026 workshop refresh but deferred because it requires distinct content — not a subset of the Builder modules.

### What the User path needs
- A different starting point: catalog navigation and self-service consumption, not Builder configuration
- Module 01 variant: focused on finding services, using dashboards, triggering actions
- No Terraform, reduced Scorecards/Data Sources depth
- Manager-specific section: reading dashboards, scorecard KPIs, and org-wide views

### Next steps
1. Run a brainstorming session scoped to the User path
2. Decide whether to fork existing modules or write standalone ones
3. Update learning-paths/ to add `user.md` alongside `builder.md`

**Design spec:** `docs/superpowers/specs/2026-05-20-workshop-refresh-design.md`
```

- [ ] **Step 2: Commit**

```bash
git add FUTURE.md
git commit -m "docs: add FUTURE.md tracking deferred User path"
```

---

## Task 3: Research — fetch current Port docs

**Purpose:** Before refreshing any module, establish the current state of Port APIs and features. Do this task once; results inform Tasks 4–12.

- [ ] **Step 1: Fetch Port Blueprints API docs**

Fetch: `https://docs.port.io/api-reference/create-a-blueprint`

Note: current endpoint, required fields, and any payload changes vs. existing module examples.

- [ ] **Step 2: Fetch Port Automations docs**

Fetch: `https://docs.port.io/actions-and-automations/define-automations/`

Note: trigger types, condition syntax, action types available, and any example JSON.

- [ ] **Step 3: Fetch Port AI Agents docs**

Fetch: `https://docs.port.io/ai-agents/overview`

Also fetch: `https://docs.port.io/ai-agents/mcp`

Note: what AI agents can do, MCP server setup steps, skills definition format.

- [ ] **Step 4: Fetch Scorecards-as-Blueprints docs**

Fetch: `https://docs.port.io/promote-scorecards/`

Note: the new model — scorecards are now standalone blueprints with entities/properties/relations. Record the JSON schema differences vs. the old model (which attached scorecards to other blueprints).

- [ ] **Step 5: Fetch Custom Widgets/Plugins docs**

Fetch: `https://docs.port.io/customize-pages-dashboards-and-plugins/dashboards/custom-widget`

Note: how to scaffold, configure, and deploy a custom widget; what React/TypeScript entrypoint looks like.

- [ ] **Step 6: Fetch current Actions API docs**

Fetch: `https://docs.port.io/create-self-service-experiences/setup-ui-for-action/`

Note: any payload template syntax changes, new input types, backend type changes.

---

## Task 4: Refresh Module 01 — Getting Started

**Files:**
- Modify: `modules/01-getting-started/README.md`
- Modify: `facilitator/module-01-getting-started.md`

- [ ] **Step 1: Update navigation header**

In `modules/01-getting-started/README.md`, replace the navigation block:

```markdown
## 🧭 Navigation

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **Next**: [Module 2: Blueprints](../02-blueprints/)

**All Modules**: [Workshop Home](../../README.md) | **Challenges**: [Beginner](../../challenges/beginner/) | [Intermediate](../../challenges/intermediate/) | [Advanced](../../challenges/advanced/)
```

- [ ] **Step 2: Update progress line**

Replace: `**Progress**: Module 1 of 7 | **Completion**: 14% of core modules`
With: `**Progress**: Module 1 of 9 | **Completion**: 11% of core modules`

- [ ] **Step 3: Remove broken validation script references**

The validation scripts (`validation/validate-environment.sh`, `validation/environment-check.js`) were removed in the last commit. Remove both bash blocks that reference them from the "Automated Validation" section. Keep the manual checklist.

- [ ] **Step 4: Update Next Steps section**

Replace the Next Steps section with:

```markdown
## Next Steps

Now that you're comfortable with Port navigation, you're ready to dive deeper into:
- **[Module 2: Blueprints](../02-blueprints/)** — learn how Port models your data
- **[Module 3: Data Sources](../03-data-sources/)** — understand how Port gets its data
```

- [ ] **Step 5: Update facilitator guide**

In `facilitator/module-01-getting-started.md`, update any references to "Module 1 of 7" → "Module 1 of 9" and remove notes about the validation scripts.

- [ ] **Step 6: Commit**

```bash
git add modules/01-getting-started/README.md facilitator/module-01-getting-started.md
git commit -m "docs(01): update nav, progress count, remove stale validation script refs"
```

---

## Task 5: Refresh Module 02 — Blueprints

**Files:**
- Modify: `modules/02-blueprints/README.md`
- Modify: `facilitator/module-02-blueprints.md`

- [ ] **Step 1: Fetch current blueprint API endpoint**

Fetch: `https://docs.port.io/api-reference/create-a-blueprint`

Confirm the current `POST /v1/blueprints` payload shape. Check if `schema.properties` structure and `relations` format match the existing examples in the module.

- [ ] **Step 2: Update navigation + progress**

```markdown
## 🧭 Navigation

**Previous**: [Module 1: Getting Started](../01-getting-started/) | **Next**: [Module 3: Data Sources](../03-data-sources/)

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **All Modules**: [Workshop Home](../../README.md)
```

Replace progress: `**Progress**: Module 2 of 9 | **Completion**: 22% of core modules`

- [ ] **Step 3: Update any API payload examples**

Using the docs fetched in Step 1, update any `POST /v1/blueprints` JSON examples where the payload shape has changed. Key fields to verify: `schema`, `relations`, `mirrorProperties`, `calculationProperties`.

- [ ] **Step 4: Update "Further Reading" link**

Replace the vague `search for Blueprints` instruction with:

```markdown
To deepen your understanding, see the [Blueprints documentation](https://docs.port.io/build-your-software-catalog/define-your-data-model/setup-blueprint/properties/).
```

- [ ] **Step 5: Update Next Steps + facilitator guide**

Update next steps link to point to Module 3. Update facilitator guide: progress count and any stale notes.

- [ ] **Step 6: Commit**

```bash
git add modules/02-blueprints/README.md facilitator/module-02-blueprints.md
git commit -m "docs(02): refresh API examples and update navigation"
```

---

## Task 6: Refresh Module 03 — Data Sources

**Files:**
- Modify: `modules/03-data-sources/README.md`
- Modify: `facilitator/module-03-data-sources.md`

- [ ] **Step 1: Fetch current integration/mapping docs**

Fetch: `https://docs.port.io/build-your-software-catalog/sync-data-to-catalog/`

Check: current integration configuration format, JQ mapping syntax, any endpoint or payload changes.

- [ ] **Step 2: Update navigation + progress**

Navigation block same pattern as Module 02 (previous/next + Builder path link).

Replace progress: `**Progress**: Module 3 of 9 | **Completion**: 33% of core modules`

- [ ] **Step 3: Update any stale API examples**

Verify `mappings` and `resources` JSON structure in hands-on exercises against current docs. Update any fields that have changed names or shapes.

- [ ] **Step 4: Update docs links and facilitator guide**

Replace vague search instructions with direct docs links (pattern from Task 5, Step 4). Update facilitator guide progress count.

- [ ] **Step 5: Commit**

```bash
git add modules/03-data-sources/README.md facilitator/module-03-data-sources.md
git commit -m "docs(03): refresh integration examples and update navigation"
```

---

## Task 7: Refresh Module 04 — Dashboards + Custom Widgets

**Files:**
- Modify: `modules/04-dashboards/README.md`
- Modify: `facilitator/module-04-dashboards.md`

- [ ] **Step 1: Fetch Custom Widgets docs**

Fetch: `https://docs.port.io/customize-pages-dashboards-and-plugins/dashboards/custom-widget`

Note the scaffold command, the expected file structure, how to configure the widget in Port, and how to deploy it.

- [ ] **Step 2: Update navigation + progress**

Navigation previous/next + Builder path link. Progress: `**Progress**: Module 4 of 9 | **Completion**: 44% of core modules`

- [ ] **Step 3: Update widget type table**

Add `Custom Widget` row to the existing widget types table:

```markdown
| **Custom Widget** | Custom React/TypeScript visualizations | Embedded Grafana panel, custom metrics view |
```

- [ ] **Step 4: Add Custom Widgets section**

After the existing "IFrame Widget" subsection, add a new section:

```markdown
## Custom Widgets (Plugins)

Custom widgets are self-contained React/TypeScript applications embedded as iframes in dashboards and entity pages. Use them when built-in widgets can't express what you need.

### When to use custom widgets vs built-in
- **Built-in widget**: data is already in Port (tables, charts, counts)
- **Custom widget**: need external data, custom visualizations, or interactive UI not available in built-in widgets

### Scaffold a custom widget

Prerequisites: Node.js 18+, access to the `port-plugins` CLI.

```bash
npx port-plugins@latest create my-widget
cd my-widget
npm install
npm run dev
```

The scaffold creates:
- `src/App.tsx` — main widget component, receives Port entity context via `window.__PORT_CONTEXT__`
- `src/main.tsx` — entrypoint
- `vite.config.ts` — build config targeting iframe embedding

### Connect to Port entity context

```typescript
// src/App.tsx
import { useEffect, useState } from 'react'

interface PortContext {
  entity: { identifier: string; title: string; properties: Record<string, unknown> }
  blueprintIdentifier: string
}

export default function App() {
  const [context, setContext] = useState<PortContext | null>(null)

  useEffect(() => {
    const ctx = (window as any).__PORT_CONTEXT__ as PortContext
    if (ctx) setContext(ctx)
  }, [])

  if (!context) return <div>Loading...</div>

  return (
    <div>
      <h2>{context.entity.title}</h2>
      <pre>{JSON.stringify(context.entity.properties, null, 2)}</pre>
    </div>
  )
}
```

### Build and deploy

```bash
npm run build
npx port-plugins@latest deploy --token $PORT_CLIENT_SECRET
```

After deploy, add the widget to any dashboard: **+ Widget → Custom Widget → select your plugin**.

### Hands-on exercise

1. Scaffold a widget named `service-health`
2. Display the `status` and `language` properties from the entity context
3. Build and deploy
4. Add it to the TechCorp Services dashboard
```

> **Validate this section against current docs** fetched in Step 1. Adjust CLI commands, file structure, and API if they differ.

- [ ] **Step 5: Update facilitator guide**

Add a note in `facilitator/module-04-dashboards.md`:

```markdown
## Custom Widgets (added 2026-05)
- Requires Node.js 18+ on attendee machines
- port-plugins CLI is public npm package — no special access needed
- Common issue: CORS errors when widget fetches external APIs; advise using Port's proxied fetch or pre-fetching data server-side
```

- [ ] **Step 6: Commit**

```bash
git add modules/04-dashboards/README.md facilitator/module-04-dashboards.md
git commit -m "docs(04): add Custom Widgets/Plugins section and update navigation"
```

---

## Task 8: Refresh Module 05 — Actions

**Files:**
- Modify: `modules/05-actions/README.md`
- Modify: `facilitator/module-05-actions.md`

- [ ] **Step 1: Fetch current Actions API docs**

Fetch: `https://docs.port.io/create-self-service-experiences/setup-ui-for-action/`

Check: input types list, backend types list, payload template syntax. Note any fields added or removed since the existing examples.

- [ ] **Step 2: Update navigation + progress**

Navigation: previous = Module 04, **next = Module 06 Automations**. Progress: `**Progress**: Module 5 of 9 | **Completion**: 56% of core modules`

- [ ] **Step 3: Update backend types list**

In the "Backend Types" section, verify the list against current docs. Add any new backend types (e.g. `Port Agent` if available). Remove any deprecated ones.

- [ ] **Step 4: Update payload template reference table**

Verify the template variables table (`.inputs.*`, `.trigger.by.user.*`, `.run.id`) against current docs. Add any new available variables.

- [ ] **Step 5: Update Next Steps**

```markdown
## Next Steps

With self-service actions working, you can add event-driven automation:
- **[Module 6: Automations](../06-automations/)** — react to entity changes automatically
```

- [ ] **Step 6: Update facilitator guide + commit**

Update progress and next-module reference in facilitator guide.

```bash
git add modules/05-actions/README.md facilitator/module-05-actions.md
git commit -m "docs(05): refresh backend types, payload templates, update nav to module 06"
```

---

## Task 9: Write Module 06 — Automations (new)

**Files:**
- Create: `modules/06-automations/README.md`
- Create: `facilitator/module-06-automations.md`

Reference: Port automations docs fetched in Task 3, Step 2.

- [ ] **Step 1: Write module header and overview**

```markdown
# Module 6: Automations — Event-Driven Workflows

## 🧭 Navigation

**Previous**: [Module 5: Actions](../05-actions/) | **Next**: [Module 7: Scorecards](../07-scorecards/)

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 60 minutes | 📋 **Prerequisites**: [Module 5](../05-actions/) completed

**Progress**: Module 6 of 9 | **Completion**: 67% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Explain the difference between Actions (user-triggered) and Automations (event-driven)
- Build automation rules with triggers, conditions, and actions
- Apply automations to real-world Port workflows
- Debug and monitor automation executions
```

- [ ] **Step 2: Write Key Concepts section**

```markdown
## Key Concepts

### Actions vs Automations

| | Actions | Automations |
|--|---------|-------------|
| **Triggered by** | A user clicking a button | An entity event (create/update/delete) or a timer |
| **Use case** | Self-service: "deploy my service" | Reactive: "when a service is created, tag it" |
| **Approval** | Can require approval | Runs automatically |

### Anatomy of an Automation Rule

```
Trigger → Condition (optional) → Action
```

- **Trigger**: what event fires the rule (entity created, property updated, timer)
- **Condition**: optional filter to narrow which entities are affected
- **Action**: what Port does when the rule fires (call a webhook, update an entity, trigger an action run)

### Trigger Types

| Trigger | Description |
|---------|-------------|
| `ENTITY_CREATED` | Fires when a new entity of a blueprint is created |
| `ENTITY_UPDATED` | Fires when any property of an entity changes |
| `ENTITY_DELETED` | Fires when an entity is deleted |
| `TIMER_PROPERTY_EXPIRED` | Fires when a timer-type property reaches zero |
| `ANY_ENTITY_CHANGE` | Fires on create, update, or delete |
```

- [ ] **Step 3: Write hands-on exercise — auto-tag service on creation**

```markdown
## Hands-On Exercise: Auto-Tag New Services

When a new `Service` entity is created without a `team` property set, automatically tag it as `unowned`.

### Step 1: Open Automations

Navigate to **Builder** → **Automations** → **+ Automation**.

### Step 2: Configure the trigger

```json
{
  "trigger": {
    "type": "automation",
    "event": {
      "type": "ENTITY_CREATED",
      "blueprintIdentifier": "service"
    }
  }
}
```

### Step 3: Add a condition

Only fire when `team` is not set:

```json
{
  "condition": {
    "type": "JQ",
    "expressions": [".diff.after.relations.team == null"],
    "combinator": "and"
  }
}
```

### Step 4: Configure the action

Update the entity's `status` property to `"unowned"`:

```json
{
  "invocationMethod": {
    "type": "UPSERT_ENTITY",
    "blueprintIdentifier": "service",
    "mapping": {
      "identifier": "{{ .event.context.entityIdentifier }}",
      "properties": {
        "status": "unowned"
      }
    }
  }
}
```

### Step 5: Test the rule

1. Create a new Service entity without setting a team
2. Navigate to **Automations** → **Runs** to see the execution log
3. Check the entity — `status` should now be `"unowned"`
```

- [ ] **Step 4: Write second example — notify on scorecard failure**

```markdown
## Example: Notify on Scorecard Rule Failure

When a service drops below `Gold` scorecard level, send a webhook notification.

```json
{
  "trigger": {
    "type": "automation",
    "event": {
      "type": "ENTITY_UPDATED",
      "blueprintIdentifier": "service"
    },
    "condition": {
      "type": "JQ",
      "expressions": [
        ".diff.before.scorecards.production_readiness.level == \"Gold\"",
        ".diff.after.scorecards.production_readiness.level != \"Gold\""
      ],
      "combinator": "and"
    }
  },
  "invocationMethod": {
    "type": "WEBHOOK",
    "url": "https://hooks.example.com/port-alerts",
    "body": {
      "service": "{{ .event.context.entityIdentifier }}",
      "previous_level": "{{ .event.diff.before.scorecards.production_readiness.level }}",
      "new_level": "{{ .event.diff.after.scorecards.production_readiness.level }}"
    }
  }
}
```
```

- [ ] **Step 5: Write self-assessment, end state, common issues**

Follow the pattern from existing modules:

```markdown
## 🎯 Self-Assessment Checkpoint

### Success Indicators
- [ ] Can explain the difference between Actions and Automations
- [ ] Built at least one automation rule with a trigger + condition + action
- [ ] Verified the rule fired in the Automations → Runs log

## End State & Further Reading

Your Port instance should have at least one working automation rule visible in **Builder → Automations**.

See [Automations documentation](https://docs.port.io/actions-and-automations/define-automations/) for the full trigger and action type reference.

## Common Issues & Solutions

**Problem**: Automation fires but condition seems ignored  
**Solution**: Check JQ expression syntax — wrap in `.diff.after` or `.diff.before` depending on whether you're checking new or old state.

**Problem**: `UPSERT_ENTITY` action fails with 404  
**Solution**: Verify `blueprintIdentifier` matches exactly. Identifiers are case-sensitive.

**Still stuck?** See [Bug Reporting & Support](../../README.md#bug-reporting--support).

## Next Steps

- **[Module 7: Scorecards](../07-scorecards/)** — measure quality across your catalog
```

- [ ] **Step 6: Write facilitator guide**

Create `facilitator/module-06-automations.md`:

```markdown
# Facilitator Guide — Module 6: Automations

## Key Teaching Points
- Automations are event-driven; Actions are user-triggered — make this distinction early
- The JQ condition expression runs against the event diff object, not the entity directly
- `UPSERT_ENTITY` is the most common action type; `WEBHOOK` is second

## Common Attendee Mistakes
- Using `.properties.field` in conditions instead of `.diff.after.properties.field`
- Forgetting that trigger events are blueprint-scoped (must specify `blueprintIdentifier`)

## Timing
- 15 min: concepts + Actions vs Automations comparison
- 30 min: hands-on auto-tag exercise
- 15 min: second example + Q&A
```

- [ ] **Step 7: Commit**

```bash
git add modules/06-automations/README.md facilitator/module-06-automations.md
git commit -m "docs(06): add Automations module — triggers, conditions, actions, examples"
```

---

## Task 10: Rewrite Module 07 — Scorecards (as Blueprints)

**Files:**
- Modify: `modules/07-scorecards/README.md` (full rewrite)
- Modify: `facilitator/module-07-scorecards.md`

Reference: Scorecards-as-Blueprints docs fetched in Task 3, Step 4.

- [ ] **Step 1: Write new module header**

The old header says "Module 6 of 7". Replace entirely:

```markdown
# Module 7: Scorecards — Quality Tracking

## 🧭 Navigation

**Previous**: [Module 6: Automations](../06-automations/) | **Next**: [Module 8: AI Agents](../08-ai-agents/)

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 60-75 minutes | 📋 **Prerequisites**: [Module 6](../06-automations/) completed

**Progress**: Module 7 of 9 | **Completion**: 78% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Understand the Scorecards-as-Blueprints model
- Create scorecard blueprints with levels and rules
- Relate scorecards to other blueprints
- Design quality frameworks for your organization
```

- [ ] **Step 2: Write new Key Concepts section**

Replace the old scorecard concepts (which described scorecards as tabs attached to blueprints) with the new model:

```markdown
## Key Concepts

### Scorecards are Blueprints

In the current Port model, scorecards are **first-class blueprints**. This means:
- A scorecard is a blueprint with a special `scorecard` type
- Each entity being measured gets a corresponding **scorecard entity** that holds its score
- Scorecard entities have properties (current level, rule results) and relations (to the measured entity)
- You can query, filter, and visualize scorecard entities just like any other entity

### Scorecard Blueprint Structure

| Field | Description |
|-------|-------------|
| `identifier` | Unique ID for the scorecard blueprint (e.g. `service_production_readiness`) |
| `title` | Display name |
| `levels` | Ordered quality tiers: Basic → Bronze → Silver → Gold |
| `rules` | List of checks; each rule belongs to a level |
| `targetBlueprint` | The blueprint being measured (e.g. `service`) |

### How levels work

An entity reaches a level when it passes **all rules at that level and all levels below it**:

- **Basic**: default — no rules required
- **Bronze**: pass all Bronze rules
- **Silver**: pass all Bronze + Silver rules
- **Gold**: pass all Bronze + Silver + Gold rules
```

- [ ] **Step 3: Write hands-on exercise — create Production Readiness scorecard**

Using the new model from the docs fetched in Task 3 Step 4, write a complete exercise. The key difference from the old module: scorecards are now created as blueprints via **Builder → Data Model → + Blueprint**, not as tabs on existing blueprints.

```markdown
## Hands-On Exercise: Production Readiness Scorecard

### Step 1: Create the scorecard blueprint

Navigate to **Builder → Data Model → + Blueprint**. Set the type to `Scorecard`.

```json
{
  "identifier": "service_production_readiness",
  "title": "Production Readiness",
  "blueprint": "scorecard",
  "schema": {
    "properties": {}
  },
  "scorecard": {
    "targetBlueprint": "service",
    "levels": [
      { "title": "Basic", "color": "paleBlue" },
      { "title": "Bronze", "color": "bronze" },
      { "title": "Silver", "color": "silver" },
      { "title": "Gold", "color": "gold" }
    ],
    "rules": [
      {
        "identifier": "has_description",
        "title": "Has Description",
        "level": "Bronze",
        "query": {
          "combinator": "and",
          "conditions": [{ "operator": "isNotEmpty", "property": "description" }]
        }
      },
      {
        "identifier": "uses_supported_language",
        "title": "Uses Supported Language",
        "level": "Silver",
        "query": {
          "combinator": "or",
          "conditions": [
            { "operator": "=", "property": "language", "value": "Python" },
            { "operator": "=", "property": "language", "value": "JavaScript" },
            { "operator": "=", "property": "language", "value": "Java" }
          ]
        }
      },
      {
        "identifier": "is_active",
        "title": "Not Archived",
        "level": "Gold",
        "query": {
          "combinator": "and",
          "conditions": [{ "operator": "=", "property": "archived", "value": false }]
        }
      }
    ]
  }
}
```

> **Note:** The exact JSON shape may vary — validate against the docs fetched in Task 3 Step 4 and adjust accordingly.

### Step 2: Verify scorecard entities appear

After saving, navigate to **Catalog**. A new page for `Production Readiness` scorecard entities should appear, with one entity per service showing its current level.

### Step 3: Check a service's score

Click any service entity. Its scorecard level should appear in the entity sidebar or a dedicated scorecard tab.
```

- [ ] **Step 4: Write "Key differences from old model" callout**

```markdown
## Migrating from the old Scorecard model

If you've used Port before mid-2025, scorecards worked differently:
- **Old model**: scorecard was a tab inside a blueprint's configuration, not its own blueprint
- **New model**: scorecard is a standalone blueprint; score state lives in scorecard entities

If you have existing scorecard configurations, refer to the [Scorecards migration guide](https://docs.port.io/promote-scorecards/) for steps to convert them.
```

- [ ] **Step 5: Write self-assessment, end state, common issues, next steps**

Follow the existing module pattern. Next module: `[Module 8: AI Agents](../08-ai-agents/)`.

- [ ] **Step 6: Update facilitator guide**

Rewrite `facilitator/module-07-scorecards.md` to reflect new model. Key teaching note:

```markdown
## Key Teaching Points
- Biggest conceptual shift: scorecards are NOW blueprints. Attendees with prior Port experience will expect the old tab UI — set expectations early.
- Scorecard entities are auto-created by Port when the scorecard blueprint is saved; attendees don't create them manually
- The "levels are cumulative" rule is the most common source of confusion — Bronze + Silver rules must both pass to reach Silver
```

- [ ] **Step 7: Commit**

```bash
git add modules/07-scorecards/README.md facilitator/module-07-scorecards.md
git commit -m "docs(07): rewrite Scorecards module for Scorecards-as-Blueprints model"
```

---

## Task 11: Write Module 08 — AI Agents, MCP & Skills (new)

**Files:**
- Create: `modules/08-ai-agents/README.md`
- Create: `facilitator/module-08-ai-agents.md`

Reference: AI Agents + MCP docs fetched in Task 3, Steps 3 and 4.

- [ ] **Step 1: Write module header and overview**

```markdown
# Module 8: AI Agents, MCP & Skills

## 🧭 Navigation

**Previous**: [Module 7: Scorecards](../07-scorecards/) | **Next**: [Module 9: Terraform](../09-terraform/)

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 75 minutes | 📋 **Prerequisites**: [Module 7](../07-scorecards/) completed

**Progress**: Module 8 of 9 | **Completion**: 89% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Describe what Port AI Agents are and how they interact with Port data
- Connect an AI tool to Port via MCP (Model Context Protocol)
- Define and register a skill for a Port AI Agent
- Use Port AI to generate blueprints, automation rules, and scorecards
```

- [ ] **Step 2: Write Key Concepts section**

```markdown
## Key Concepts

### Port AI Agents

Port AI Agents are LLM-powered assistants embedded in Port that can:
- Answer questions about your software catalog ("which services have no team?")
- Generate Port configurations from natural language ("create a blueprint for a microservice")
- Trigger actions and automations on your behalf

### MCP — Model Context Protocol

MCP is an open protocol that lets AI tools (Claude, Cursor, VS Code Copilot) connect to Port as a data source. When you connect an AI tool to Port via MCP:
- The AI can read your catalog entities and blueprints
- The AI can create/update entities and trigger actions
- Your Port data becomes context for AI-generated answers

### Skills

Skills are registered capabilities that extend what a Port AI Agent can do. A skill is a named, documented function the agent can call — backed by a Port action, a webhook, or an API call.
```

- [ ] **Step 3: Write MCP setup exercise**

```markdown
## Hands-On Exercise 1: Connect Claude Code to Port via MCP

This exercise connects Claude Code (the AI tool you may be using right now) to your Port instance so it can read and write your catalog.

### Step 1: Get your Port credentials

In Port: **Builder → ... → Credentials** → copy `CLIENT_ID` and `CLIENT_SECRET`.

### Step 2: Add Port MCP server to Claude Code

In your terminal:

```bash
claude mcp add port-io \
  --env PORT_CLIENT_ID=<your_client_id> \
  --env PORT_CLIENT_SECRET=<your_client_secret>
```

Or add manually to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "port-io": {
      "command": "npx",
      "args": ["-y", "@port-labs/port-mcp-server"],
      "env": {
        "PORT_CLIENT_ID": "<your_client_id>",
        "PORT_CLIENT_SECRET": "<your_client_secret>"
      }
    }
  }
}
```

### Step 3: Test the connection

In Claude Code, ask: *"List all services in my Port catalog"*

Expected: Claude reads your catalog and lists TechCorp services by name and team.

> **Validate MCP setup steps against the docs** fetched in Task 3 Step 3. The package name and config format may differ from the above.
```

- [ ] **Step 4: Write "Use AI to build Port" section**

```markdown
## Using Port AI to Build Port

One of the most powerful uses of Port AI is configuring Port itself. Try these prompts with your MCP-connected AI tool:

### Generate a blueprint

Prompt: *"Create a Port blueprint for a Kubernetes Namespace with properties: cluster (string), environment (select: dev/staging/prod), resource_quota_cpu (number), resource_quota_memory (string), and a relation to a Service blueprint."*

The AI generates the full JSON. Paste it into **Builder → Data Model → + Blueprint → JSON editor**.

### Generate an automation rule

Prompt: *"Write a Port automation rule that fires when a Service entity's `status` property changes to 'deprecated' and sends a webhook to https://hooks.example.com/alerts with the service identifier and the old status."*

### Generate a scorecard

Prompt: *"Create a Port scorecard blueprint for measuring Developer Experience of services. Include Bronze level (has description and owner), Silver level (has runbook URL and on-call contact), Gold level (has SLO defined and last incident was more than 30 days ago)."*

Each of these rounds takes minutes instead of hours. Review the generated JSON, test it in Port, and iterate.
```

- [ ] **Step 5: Write Skills section**

```markdown
## Defining a Skill

A skill tells a Port AI Agent what it can do on your behalf. Skills are defined in the Port Builder and backed by a Port action.

### Example: "get-service-health" skill

```json
{
  "identifier": "get_service_health",
  "title": "Get Service Health",
  "description": "Returns the current health status and scorecard level for a named service",
  "trigger": {
    "blueprint": "service",
    "operation": "DAY-2"
  }
}
```

Once registered, the AI Agent can call this skill when a user asks: *"Is the ecommerce-api healthy?"*

Refer to [AI Agent Skills documentation](https://docs.port.io/ai-agents/skills) for the full skill schema.
```

- [ ] **Step 6: Write self-assessment, end state, common issues**

```markdown
## 🎯 Self-Assessment Checkpoint

### Success Indicators
- [ ] MCP connection works — AI tool can list Port entities
- [ ] Generated at least one Port configuration (blueprint/automation/scorecard) using AI
- [ ] Can explain the difference between AI Agents, MCP, and Skills

## End State & Further Reading

Your Port instance should have an MCP connection verified, and at least one AI-generated configuration saved.

See [Port AI documentation](https://docs.port.io/ai-agents/overview) for the full feature reference.

## Common Issues & Solutions

**Problem**: MCP connection returns "unauthorized"  
**Solution**: Verify `PORT_CLIENT_ID` and `PORT_CLIENT_SECRET` are correct and not expired.

**Problem**: AI generates JSON that Port rejects  
**Solution**: AI may have hallucinated a field. Compare against the blueprint schema in **Builder → Data Model** and remove unknown fields.

**Still stuck?** See [Bug Reporting & Support](../../README.md#bug-reporting--support).

## Next Steps

- **[Module 9: Terraform](../09-terraform/)** — manage all of this as infrastructure-as-code
```

- [ ] **Step 7: Write facilitator guide**

```markdown
# Facilitator Guide — Module 8: AI Agents, MCP & Skills

## Key Teaching Points
- MCP is the connection layer; AI Agents are the conversational layer; Skills extend what agents can do
- The "use AI to build Port" section is the most engaging — let attendees try their own prompts
- AI-generated JSON almost always needs small corrections — that's expected, not a failure

## Prerequisites to check before session
- Attendees have Claude Code or another MCP-capable AI tool installed
- Port API credentials are accessible

## Timing
- 15 min: concepts (Agents, MCP, Skills)
- 25 min: MCP setup exercise
- 25 min: AI-generated configurations exercise
- 10 min: Skills + Q&A

## Common Attendee Issues
- MCP server package name changes frequently — check docs before the session
- Some organizations block external npm installs — have a fallback with pre-generated JSON examples
```

- [ ] **Step 8: Commit**

```bash
git add modules/08-ai-agents/README.md facilitator/module-08-ai-agents.md
git commit -m "docs(08): add AI Agents, MCP & Skills module"
```

---

## Task 12: Light Refresh Module 09 — Terraform

**Files:**
- Modify: `modules/09-terraform/README.md`
- Modify: `facilitator/module-09-terraform.md`

- [ ] **Step 1: Fetch current Port Terraform provider version**

Fetch: `https://registry.terraform.io/providers/port-labs/port/latest`

Note: latest provider version, any deprecated resources or changed resource schemas.

- [ ] **Step 2: Update navigation + progress**

```markdown
## 🧭 Navigation

**Previous**: [Module 8: AI Agents](../08-ai-agents/) | **Next**: [Challenges](../../challenges/)

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **All Modules**: [Workshop Home](../../README.md)
```

Progress: `**Progress**: Module 9 of 9 | **Completion**: 100% of core modules 🎉`

- [ ] **Step 3: Update provider version reference**

Find the `required_providers` block and update the `version` constraint to match the latest stable version found in Step 1:

```hcl
terraform {
  required_providers {
    port = {
      source  = "port-labs/port"
      version = "~> <latest_version>"
    }
  }
}
```

- [ ] **Step 4: Check for deprecated resources**

If any `port_blueprint`, `port_entity`, or `port_action` resource schemas changed in the latest provider, update the corresponding `.tf` examples in the module.

- [ ] **Step 5: Update facilitator guide + commit**

Update progress count and previous-module link.

```bash
git add modules/09-terraform/README.md facilitator/module-09-terraform.md
git commit -m "docs(09): update Terraform provider version and navigation"
```

---

## Task 13: Consolidate learning paths to Builder only

**Files:**
- Create: `learning-paths/builder.md`
- Delete: `learning-paths/developer.md`, `learning-paths/manager.md`, `learning-paths/quick-start.md`, `learning-paths/platform-engineer.md`

- [ ] **Step 1: Write builder.md**

```markdown
# Builder Learning Path

*For platform engineers who configure and manage Port for their organization*

## Overview

**Duration**: 8-10 hours
**Prerequisites**: Experience with infrastructure, APIs, and configuration management
**Focus**: Full Port configuration — blueprints, integrations, dashboards, actions, automations, scorecards, AI, and Terraform

## Your Learning Journey

Work through these 9 modules in order. Each builds on the previous.

| Module | Topic | Duration |
|--------|-------|----------|
| [01 Getting Started](../modules/01-getting-started/) | Port navigation and core concepts | 30-45 min |
| [02 Blueprints](../modules/02-blueprints/) | Data modeling and entity relationships | 45-60 min |
| [03 Data Sources](../modules/03-data-sources/) | Integrations and data ingestion | 60-90 min |
| [04 Dashboards](../modules/04-dashboards/) | Widgets, pages, and custom plugins | 60-75 min |
| [05 Actions](../modules/05-actions/) | Self-service automation | 90-120 min |
| [06 Automations](../modules/06-automations/) | Event-driven workflows | 60 min |
| [07 Scorecards](../modules/07-scorecards/) | Quality tracking as blueprints | 60-75 min |
| [08 AI Agents](../modules/08-ai-agents/) | AI agents, MCP, skills | 75 min |
| [09 Terraform](../modules/09-terraform/) | Infrastructure-as-code for Port | 90-120 min |

## Prerequisites

- Access to a Port instance (trial, demo, or existing)
- Node.js 18+ (for Module 04 Custom Widgets)
- Terraform installed (for Module 09)
- An MCP-capable AI tool like Claude Code (for Module 08, optional)

---

*Looking for a User/Developer path? See [FUTURE.md](../FUTURE.md).*
```

- [ ] **Step 2: Delete old learning path files**

```bash
git rm learning-paths/developer.md learning-paths/manager.md learning-paths/quick-start.md learning-paths/platform-engineer.md
```

- [ ] **Step 3: Commit**

```bash
git add learning-paths/builder.md
git commit -m "docs: replace 4 learning paths with single Builder path"
```

---

## Task 14: Update root README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update module list**

Replace the "Core Modules" list:

```markdown
### Core Modules
1. **[Getting Started](modules/01-getting-started/)** — Port basics and navigation
2. **[Blueprints](modules/02-blueprints/)** — Data modeling and entity management
3. **[Data Sources](modules/03-data-sources/)** — Integrations and data ingestion
4. **[Dashboards](modules/04-dashboards/)** — Visualization, widgets, and custom plugins
5. **[Actions](modules/05-actions/)** — Self-service automation
6. **[Automations](modules/06-automations/)** — Event-driven workflows
7. **[Scorecards](modules/07-scorecards/)** — Quality tracking and metrics
8. **[AI Agents, MCP & Skills](modules/08-ai-agents/)** — AI-powered development
9. **[Terraform](modules/09-terraform/)** — Infrastructure-as-code management
```

- [ ] **Step 2: Replace Learning Paths section**

Replace the 4-path section:

```markdown
## Learning Path

### 🏗️ [Builder Path](learning-paths/builder.md)
*For platform engineers configuring and managing Port*
- **Duration**: 8-10 hours
- **Prerequisites**: Experience with infrastructure, APIs, and configuration management
- **Covers**: All 9 modules — from blueprints to AI agents and Terraform

---
*A User path (for developers and managers) is planned. See [FUTURE.md](FUTURE.md).*
```

- [ ] **Step 3: Update prerequisites table**

Add Node.js and AI tool rows:

```markdown
| Node.js 18+ | Custom widget development (Module 04) | [Download](https://nodejs.org/) |
| Claude Code or MCP-capable AI tool | AI Agents module (Module 08, optional) | [Install Claude Code](https://claude.ai/code) |
```

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs(readme): update to 9 modules, single Builder path"
```

---

## Task 15: Navigation link audit

**Files:**
- All 9 `modules/*/README.md`

- [ ] **Step 1: Grep for stale "of 7" references**

```bash
grep -r "of 7" modules/
```

Expected: 0 results. If any found, fix them to "of 9".

- [ ] **Step 2: Grep for stale learning path links**

```bash
grep -r "Choose Your Path\|developer\|manager\|quick-start\|platform-engineer" modules/ learning-paths/
```

Fix any remaining references to old path names.

- [ ] **Step 3: Grep for stale module cross-links**

```bash
grep -r "06-scorecards\|07-terraform" modules/ facilitator/
```

These should all now point to `07-scorecards` and `09-terraform`. Fix any remaining old paths.

- [ ] **Step 4: Update _navigation-template.md**

Open `modules/_navigation-template.md` and update the module count from 7 to 9 and the learning path link from `Choose Your Path` to `Builder Path`:

```markdown
**Learning Path**: [Builder Path](../../learning-paths/builder.md) | ...
**Progress**: Module X of 9 | ...
```

- [ ] **Step 5: Verify new module links resolve**

```bash
ls modules/06-automations/README.md modules/07-scorecards/README.md modules/08-ai-agents/README.md modules/09-terraform/README.md
```

Expected: all 4 files exist.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "docs: fix stale navigation links across all modules"
```

---

## Task 16: Final validation and PR

- [ ] **Step 1: Full stale-reference grep**

```bash
grep -r "of 7\|06-scorecards\|07-terraform\|platform-engineer\|quick-start\|learning-paths/developer\|learning-paths/manager" modules/ facilitator/ README.md learning-paths/ 2>/dev/null
```

Expected: 0 results.

- [ ] **Step 2: Verify all module dirs exist**

```bash
ls modules/
```

Expected output includes: `01-getting-started  02-blueprints  03-data-sources  04-dashboards  05-actions  06-automations  07-scorecards  08-ai-agents  09-terraform`

- [ ] **Step 3: Verify facilitator guides exist**

```bash
ls facilitator/
```

Expected: 9 module files (`module-01` through `module-09`).

- [ ] **Step 4: Open PR**

```bash
gh pr create \
  --base main \
  --head feature/workshop-refresh \
  --title "Workshop refresh: 9 modules, Builder path, Automations + AI modules" \
  --body "$(cat <<'EOF'
## Summary
- Refreshed all 7 existing modules for current Port APIs, Custom Widgets, and Scorecards-as-Blueprints model
- Added Module 06: Automations (event-driven workflow rules)
- Added Module 08: AI Agents, MCP & Skills (Port AI, MCP setup, meta usage)
- Renumbered to 9 modules (Scorecards → 07, AI → 08, Terraform → 09)
- Consolidated 4 learning paths to single Builder path
- Added FUTURE.md tracking deferred User path

## Test plan
- [ ] All 9 module README files exist
- [ ] All 9 facilitator guide files exist
- [ ] No "of 7" references remain
- [ ] No dead cross-links between modules
- [ ] FUTURE.md exists at repo root
- [ ] learning-paths/builder.md exists; old path files removed
EOF
)"
```
