# Facilitator Guide — Module 7: Scorecards

## Overview
**Duration**: 60-75 minutes  
**Module**: 7 of 9  
**Prerequisites**: Module 6 (Automations) completed

## Key Teaching Points

- **Lead with the model change**: Scorecards are now first-class blueprints — `Scorecard`, `Scorecard Rule`, and `Scorecard Rule Result` are all visible in the Builder. Attendees with prior Port experience may expect the old tab-only UI; set this expectation early.
- **Levels are cumulative**: To reach Silver, an entity must pass ALL Bronze rules AND all Silver rules. This is the most common source of confusion — "why is my service stuck at Bronze?"
- **`filter` vs rule `query`**: `filter` determines which entities the scorecard even evaluates; `query` determines whether a specific rule passes. They're different layers of the same concept.
- **Scorecard entities are auto-created**: When a scorecard blueprint is saved, Port auto-generates `Scorecard Rule Result` entities for every evaluated entity. Attendees don't create these manually.
- **Gradual rollout note**: As of 2026, the Scorecards-as-Blueprints model is rolling out gradually. Some accounts may still see the older tab-based UI. If an attendee's Builder doesn't show the Scorecard blueprint, acknowledge the rollout and walk them through the Scorecards tab on the Service blueprint instead.

## Common Attendee Mistakes

- Mismatching property identifiers in rule conditions (identifiers are case-sensitive — `Description` ≠ `description`)
- Using `isEmpty` instead of `= false` for boolean properties
- Expecting `filter` and rule `query` to be the same thing
- Not understanding cumulative levels: "I passed the Silver rule but I'm still Bronze" → they failed a Bronze rule

## Session Timing

- **0–10 min**: Scorecards as blueprints — model overview, what changed from before
- **10–15 min**: JSON schema walkthrough — levels, filter, rules, operators
- **15–45 min**: Hands-on Production Readiness scorecard (Steps 1–4)
- **45–55 min**: Security Compliance exercise (self-guided)
- **55–70 min**: `filter` field, scorecards + automations integration, Q&A

## Setup Checklist (before session)

- [ ] Attendees have completed Module 6 and have a working Port instance with Service entities
- [ ] Services blueprint has: `description` (string), `language` (string), `archived` (boolean)
- [ ] Attendees have Builder access (admin or editor permissions)
- [ ] If using a fresh instance: create 3-4 Service entities with different property states so scorecard levels are visible and varied after the exercise

## Demonstration Flow

1. Open Builder → Data Model → Service blueprint → Scorecards tab
2. Click `+ New scorecard` — show the JSON editor
3. Paste the minimal Ownership example (the one from the docs) as a quick demo
4. Save, then navigate to Catalog → Services — show the scorecard badge on entities
5. Click one service to show the rules pass/fail view

## Handling "My service is stuck at Basic"

Walk through this checklist:
1. Is the rule `query.conditions` using the exact property identifier? Check Builder → Service → Properties list.
2. Is the property value actually set on the entity? Click the entity in Catalog and look.
3. For boolean properties: is the rule using `= false` (not `isEmpty`)?
4. Is the level cumulative? Which Bronze rules is it failing?

## Permissions Prerequisites

Attendees need Builder access (admin or editor) to create scorecards. If they can't see the Scorecards tab, check their role in Settings → Members.
