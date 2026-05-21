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

## Demonstration Flow

If you want to demo before attendees try:
1. Open Builder → Automations in the Port UI
2. Show an existing automation (or create a minimal one live)
3. Point out the three parts: trigger, condition, invocationMethod
4. Show the Runs log so attendees know where to verify execution

## Handling JQ Path Confusion

When an attendee's condition doesn't match:
1. Ask them to show you the condition expression
2. Check: are they using `.properties.field` (wrong) or `.diff.after.properties.field` (correct)?
3. Quick fix: prefix every `.properties` with `.diff.after.` for ENTITY_CREATED/UPDATED triggers

When a webhook body template returns null:
1. Check if they used `.diff.after.*` (wrong in a template) vs `{{ .event.diff.after.* }}` (correct)
2. JQ conditions use bare `.diff.*`; templates use `{{ .event.diff.* }}`

## Permissions Prerequisites

Attendees need **Builder access** (admin or editor role) to create automations. If an attendee can't see the Automations section in Builder, they likely have viewer-only access — ask your Port admin to grant editor permissions before the session.
