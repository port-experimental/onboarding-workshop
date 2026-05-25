# Module 6: Automations — Event-Driven Workflows

## 🧭 Navigation

**Previous**: [Module 5: Actions](../05-actions/) | **Next**: [Module 7: Scorecards](../07-scorecards/)

**Learning Path**: [Builder Path](../../learning-paths/builder.md) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 60 minutes | 📋 **Prerequisites**: [Module 5](../05-actions/) completed

**Progress**: Module 6 of 12 | **Completion**: 50% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Explain the difference between Actions (user-triggered) and Automations (event-driven)
- Build automation rules with triggers, conditions, and actions
- Apply automations to real-world Port workflows
- Debug and monitor automation executions

## Prerequisites
- Completed [Module 5: Actions](../05-actions/)
- Understanding of Port blueprints and entities
- Familiarity with JSON configuration

## Duration
**Estimated Time**: 60 minutes

## Key Concepts

### Actions vs Automations

| | Actions | Automations |
|--|---------|-------------|
| **Triggered by** | A user clicking a button | An entity event (create/update/delete) or a timer |
| **Use case** | Self-service: "deploy my service" | Reactive: "when a service is created, tag it" |
| **Approval** | Can require approval | Runs automatically |
| **Configuration** | Self-Service section | Builder → Automations |

### Anatomy of an Automation Rule

An automation rule has three parts:

```
Trigger → Condition (optional) → Action
```

- **Trigger**: the event that fires the rule
- **Condition**: an optional JQ filter to narrow which entities are affected
- **Action (invocationMethod)**: what Port does when the rule fires

### Trigger Types

#### Entity triggers
| Trigger | Description |
|---------|-------------|
| `ENTITY_CREATED` | Fires when a new entity of a blueprint is created |
| `ENTITY_UPDATED` | Fires when any property of an entity changes |
| `ENTITY_DELETED` | Fires when an entity is deleted |
| `ANY_ENTITY_CHANGE` | Fires on create, update, or delete |
| `TIMER_PROPERTY_EXPIRED` | Fires when a timer-type property on an entity reaches zero |

#### Action run triggers
| Trigger | Description |
|---------|-------------|
| `RUN_CREATED` | Fires whenever a specified action is executed |
| `RUN_UPDATED` | Fires when an action run is patched or approved |
| `ANY_RUN_CHANGE` | Fires on any action run change |

### Invocation / Action Types

The same backend types available for Actions also work in Automations:

| Type | Description |
|------|-------------|
| `WEBHOOK` | Send an HTTP request to any URL |
| `GITHUB` | Trigger a GitHub Actions workflow |
| `GITLAB` | Trigger a GitLab pipeline |
| `AZURE_DEVOPS` | Invoke an Azure DevOps pipeline |
| `KAFKA` | Publish to a Kafka topic |
| `UPSERT_ENTITY` | Create or update an entity in the Port catalog directly |

### Complete Automation JSON Shape

```json
{
  "identifier": "unique_id",
  "title": "Automation Title",
  "description": "What this automation does",
  "trigger": {
    "type": "automation",
    "event": {
      "type": "ENTITY_UPDATED",
      "blueprintIdentifier": "service"
    },
    "condition": {
      "type": "JQ",
      "expressions": [".diff.after.properties.status == \"active\""],
      "combinator": "and"
    }
  },
  "invocationMethod": {
    "type": "WEBHOOK",
    "url": "https://example.com/hook"
  },
  "publish": true
}
```

## Hands-On Exercise: Auto-Tag New Services

When a new `Service` entity is created without a team assigned, automatically set its `status` property to `"unowned"`.

### Step 1: Open Automations

Navigate to **Builder** → **Automations** → **+ Automation**.

### Step 2: Configure the trigger

Set the trigger to fire when a Service entity is created:

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

Only fire when the `team` relation is not set. The condition uses JQ against the event diff:

```json
{
  "condition": {
    "type": "JQ",
    "expressions": [".diff.after.relations.team == null"],
    "combinator": "and"
  }
}
```

### Step 4: Configure the invocation

Use `UPSERT_ENTITY` to update the entity's `status` property directly in Port — no external system needed:

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

### Step 5: Complete automation JSON

Paste this into the automation JSON editor and save:

```json
{
  "identifier": "tag_unowned_services",
  "title": "Tag Unowned Services",
  "description": "Automatically mark newly created services as unowned when no team is assigned",
  "trigger": {
    "type": "automation",
    "event": {
      "type": "ENTITY_CREATED",
      "blueprintIdentifier": "service"
    },
    "condition": {
      "type": "JQ",
      "expressions": [".diff.after.relations.team == null"],
      "combinator": "and"
    }
  },
  "invocationMethod": {
    "type": "UPSERT_ENTITY",
    "blueprintIdentifier": "service",
    "mapping": {
      "identifier": "{{ .event.context.entityIdentifier }}",
      "properties": {
        "status": "unowned"
      }
    }
  },
  "publish": true
}
```

### Step 6: Test the rule

1. Navigate to **Catalog → Services**
2. Create a new Service entity — leave the team relation empty
3. Navigate to **Builder → Automations → Runs** to see the execution log
4. Check the newly created entity — the `status` property should now be `"unowned"`

## Example: Notify on Scorecard Level Drop

Trigger a webhook notification when a service drops below Gold scorecard level. This example uses an `ENTITY_UPDATED` trigger with a JQ condition that checks the before/after scorecard state:

```json
{
  "identifier": "notify_scorecard_drop",
  "title": "Notify on Scorecard Level Drop",
  "description": "Notify when a service drops below Gold scorecard level",
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
  },
  "publish": true
}
```

> **Note:** Mirror property changes and deleting related entities do NOT trigger `ANY_ENTITY_CHANGE`. Design your automation triggers with this in mind.

## Automation Design Patterns

### Pattern: Data enrichment on creation
Use `ENTITY_CREATED` + `UPSERT_ENTITY` to automatically fill in default properties when an entity is created.

### Pattern: Sync state across related entities
Use `ENTITY_UPDATED` + `UPSERT_ENTITY` to propagate status changes from a parent entity to its children (e.g. if a team is archived, mark its services accordingly).

### Pattern: External notifications on state change
Use `ENTITY_UPDATED` + `WEBHOOK` to push change events to Slack, PagerDuty, or any HTTP endpoint.

### Pattern: Chaining automations
Automations can trigger other automations — `UPSERT_ENTITY` changes will fire `ENTITY_UPDATED` triggers on the updated entity.

## 🎯 Self-Assessment Checkpoint

### Success Indicators
- [ ] Can explain the difference between Actions (user-triggered) and Automations (event-driven)
- [ ] Built the auto-tag automation rule with trigger, condition, and `UPSERT_ENTITY` action
- [ ] Verified the rule fired by checking **Builder → Automations → Runs**
- [ ] Can describe at least two real-world use cases for automations in your organization

## End State & Further Reading

By the end of this module, your Port instance should have:
- At least one working automation rule visible in **Builder → Automations**
- A run log showing the automation fired when you created a new service

See the [Automations documentation](https://docs.port.io/actions-and-automations/define-automations/) for the full trigger, condition, and action type reference.

## Common Issues & Solutions

**Problem**: Automation fires but condition seems to be ignored  
**Solution**: Check your JQ expression — for entity triggers, data is accessed via `.diff.after.properties.field` or `.diff.after.relations.field`, not directly via `.properties.field`.

**Problem**: `UPSERT_ENTITY` action fails  
**Solution**: Verify `blueprintIdentifier` matches exactly (case-sensitive). Check that the entity identifier expression resolves correctly.

**Problem**: Automation runs but entity is not updated  
**Solution**: Ensure `publish: true` is set on the automation. Draft automations (`publish: false`) do not execute.

**Problem**: Trigger fires unexpectedly  
**Solution**: Remember `ANY_ENTITY_CHANGE` fires on create, update, AND delete. Use a more specific trigger type (`ENTITY_CREATED`, `ENTITY_UPDATED`, `ENTITY_DELETED`) if you only want one event type.

**Problem**: Body template uses `.diff.*` path but gets null  
**Solution**: JQ conditions and body templates use different root paths. In JQ conditions, the diff is at the root: `.diff.after.properties.field`. In webhook/action body templates, the event is the root: `{{ .event.diff.after.properties.field }}`. Use `.diff.*` in `condition.expressions`; use `{{ .event.diff.* }}` in body template strings.

**Still stuck or think you've found a bug?** See [Bug Reporting & Support](../../README.md#bug-reporting--support) for how to report workshop issues or Port product behavior.

## Next Steps

With event-driven automation in place, you can add quality tracking:
- **[Module 7: Scorecards](../07-scorecards/)** — measure quality across your catalog with scorecards

## Quick Reference

### Condition JQ paths for entity triggers

| What you're checking | JQ path |
|---------------------|---------|
| New value of a property | `.diff.after.properties.field_name` |
| Old value of a property | `.diff.before.properties.field_name` |
| New relation value | `.diff.after.relations.relation_name` |
| Entity identifier | `.event.context.entityIdentifier` |
| Blueprint identifier | `.event.context.blueprintIdentifier` |

### Body template paths (webhook/action bodies)

| What you're accessing | Template expression |
|----------------------|---------------------|
| New value of a property | `{{ .event.diff.after.properties.field_name }}` |
| Old value of a property | `{{ .event.diff.before.properties.field_name }}` |
| Entity identifier | `{{ .event.context.entityIdentifier }}` |
| Blueprint identifier | `{{ .event.context.blueprintIdentifier }}` |

> Note: `.diff.before.*` is `null` for `ENTITY_CREATED` triggers — only use it with `ENTITY_UPDATED`.

---

**Completed Module 6?** Continue to [Module 7: Scorecards](../07-scorecards/) to learn about quality tracking.
