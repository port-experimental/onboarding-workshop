# Port Workshop Refresh — Design Spec

**Date:** 2026-05-20
**Status:** Approved
**Branch:** feature/workshop-refresh (new branch off main)

---

## Goal

Refresh the Port onboarding workshop to reflect current Port capabilities, add two new modules (Automations and AI Agents/MCP/Skills), reorder modules for better logical flow, and consolidate learning paths to a single Builder path. A User path is deferred and tracked in FUTURE.md.

---

## Module Structure

| # | Module | Change |
|---|--------|--------|
| 01 | Getting Started | Refresh — API updates, outdated examples |
| 02 | Blueprints | Refresh — API updates, outdated examples |
| 03 | Data Sources | Refresh — API updates, outdated examples |
| 04 | Dashboards | Refresh — add Custom Widgets/Plugins section |
| 05 | Actions | Refresh — API updates, outdated examples |
| 06 | Automations | **New** — Port automation rules |
| 07 | Scorecards | Refresh — rewrite for Scorecards-as-Blueprints model |
| 08 | AI Agents, MCP & Skills | **New** — AI agents, MCP setup, skills, meta usage |
| 09 | Terraform | Light refresh — stays Builder-only |

Module 08 (AI) moves before Terraform so the workshop crescendos with AI-powered workflows before the IaC capstone.

---

## Learning Paths

**Builder path** (active): all 9 modules, targeting platform engineers who configure and manage Port.

**User path** (deferred): documented in `FUTURE.md`. Will require distinct content — not a subset of Builder modules. Scope TBD in a future brainstorming session.

---

## Refresh Scope

### Modules 01–03, 05 (API + examples)
- Update API endpoints and payload shapes to current Port API
- Fix or replace outdated YAML/JSON examples
- Validate all links and references against current Port docs

### Module 04 — Dashboards
- Existing widget content stays
- Add new section: Custom Widgets/Plugins
  - What they are (self-contained React/TypeScript iframes embedded in dashboards/entity pages)
  - When to use vs. built-in widgets
  - Hands-on: scaffold, configure, deploy a custom widget
  - Reference the `port-plugin-dev` patterns

### Module 09 — Terraform (light refresh)
- Update provider version references and any deprecated resource syntax
- Validate example `.tf` files against current `port-labs/port` Terraform provider
- No structural changes; Builder-only designation stays

### Module 07 — Scorecards
- Full rewrite of the Scorecards section to reflect the Scorecards-as-Blueprints model
- Scorecards are now first-class blueprints with entities, properties, and relations
- Update all examples, JSON payloads, and exercises accordingly
- Preserve conceptual intro (what scorecards are for), update the how

---

## New Module 06 — Automations

**Goal:** Teach Port automation rules — event-driven logic that reacts to entity changes without manual triggers.

**Sections:**
1. What are automation rules — difference from Actions (user-triggered vs. event-driven)
2. Anatomy of a rule: trigger + condition + action
3. Trigger types: entity created/updated/deleted, timer-based
4. Conditions: property filters, relation checks
5. Actions: webhook calls, Port API calls, triggering other actions
6. Practical examples:
   - Auto-tag a service when a new deployment entity is created
   - Notify on scorecard rule failure
   - Sync status across related entities
7. Hands-on exercise: build an end-to-end automation rule

**Audience:** Builder path. Duration: ~60 minutes.

---

## New Module 08 — AI Agents, MCP & Skills

**Goal:** Teach how to use and build with Port's AI capabilities, including the meta use case of using AI to build Port itself.

**Sections:**
1. Port AI Agents — what they are, how they work, how to invoke them
2. MCP (Model Context Protocol) — Port's MCP server, connecting AI tools to Port data
3. Skills — defining, registering, and using skills with Port agents
4. Meta: using Port AI to build Port
   - Generate blueprints from descriptions
   - Use AI to write automation rules
   - AI-assisted scorecard design
5. Hands-on exercise: set up MCP + build a skill that queries Port entities

**Audience:** Builder path (with AI tools available). Duration: ~75 minutes.

---

## Content Validation

All refreshed modules are validated against current Port docs (docs.port.io) during implementation. Where docs and existing workshop content conflict, docs win.

---

## Deliverables

1. New branch `feature/workshop-refresh` off `main`
2. `FUTURE.md` at repo root — documents User path as next step with context
3. All 9 module `README.md` files updated (7 refreshed, 2 new)
4. All 9 facilitator guide files updated/created (includes renaming existing files to match new module numbers — e.g. `module-06-scorecards.md` → `module-07-scorecards.md`)
5. `README.md` at repo root updated: module list (9 modules), learning paths (Builder only)
6. Learning path files: remove `developer.md`, `manager.md`, `quick-start.md`; update `platform-engineer.md` → `builder.md`
7. Navigation links updated across all modules

---

## Out of Scope

- User path content (deferred to FUTURE.md)
- New challenges for modules 06/08 (can follow in a separate pass)
- Video or interactive content
- Localization
