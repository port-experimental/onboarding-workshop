# Facilitator Guide — Module 6: Automations

## Overview
**Duration**: 60 minutes  
**Module**: 6 of 9  
**Prerequisites**: Module 5 (Actions) completed

## Key Teaching Points

- **Lead with the distinction**: Automations are event-driven; Actions are user-triggered. Make this contrast early and clearly — it's the conceptual anchor for the whole module.
- **Condition paths**: The JQ condition expression runs against the event `diff` object (`.diff.after.properties.*`), not the entity directly (`.properties.*`). This trips up almost every attendee.
- **`publish: true` is required**: Draft automations (`publish: false`) do not execute. A surprisingly common mistake.
- **`UPSERT_ENTITY`**: Highlight this backend type — it lets automations modify Port entities directly without any external system. Powerful for data enrichment patterns.

## Common Attendee Mistakes

- Using `.properties.field` in JQ conditions instead of `.diff.after.properties.field`
- Forgetting that trigger events are blueprint-scoped (`blueprintIdentifier` is required)
- Setting `publish: false` and wondering why nothing fires
- Expecting mirror property changes to trigger `ANY_ENTITY_CHANGE` (they don't)

## Session Timing

- **0–15 min**: Concepts — Actions vs Automations comparison, anatomy of a rule, trigger types
- **15–45 min**: Hands-on auto-tag exercise (Steps 1–6)
- **45–55 min**: Scorecard drop notification example walkthrough
- **55–60 min**: Q&A, design patterns overview

## Setup Checklist (before session)

- [ ] Attendees have completed Module 5 and have a working Port instance with at least one Service entity
- [ ] Services blueprint has a `status` property (string type) and a `team` relation
- [ ] Attendees have Builder access (admin or editor permissions)

## Facilitator Notes

**If attendees don't have a `status` property**: Have them add it quickly via Builder → Data Model → Service blueprint → + Property (type: string, identifier: `status`).

**If the automation fires but UPSERT_ENTITY fails with 404**: Usually means the `blueprintIdentifier` in the mapping doesn't match. Walk them through checking Builder → Data Model to confirm the exact identifier (case-sensitive).

**On chaining automations**: Mention this as a power-user pattern but don't spend time on it — it can cause infinite loops if designed carelessly.
