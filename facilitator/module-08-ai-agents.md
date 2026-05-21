# Facilitator Guide — Module 8: AI Agents, MCP & Skills

## Overview
**Duration**: 75 minutes  
**Module**: 8 of 9  
**Prerequisites**: Module 7 (Scorecards) completed

## Key Teaching Points

- **Start with the AI Assistant** — it's zero-config and immediately engaging. Don't open with MCP setup. Let attendees experience catalog queries and config generation before introducing the complexity of MCP.
- **Three layers to distinguish**: AI Assistant (built-in, general) vs AI Agents (configurable, domain-specific) vs MCP (external tool integration). The table in the Key Concepts section is your anchor.
- **MCP is optional for this module** — attendees who don't have Claude Code or Cursor installed can do 100% of the hands-on content via the AI Assistant. Don't block the room on MCP setup.
- **AI-generated JSON will need corrections** — set this expectation before the "build Port" section. The goal is 90% complete + review + iterate, not first-try perfection.
- **Skills are just Port actions with good descriptions** — demystify this early. If attendees already understand actions from Module 5, skills are just actions with descriptions optimized for natural language invocation.

## Common Attendee Issues

- **"MCP isn't working"**: Most common cause is OAuth timing out or wrong regional URL. Check: are they EU or US? `mcp.port.io` vs `mcp.us.port.io`. Have them clear the auth and retry.
- **"The AI gave me wrong catalog data"**: AI reads live catalog. Point them to the Catalog page to verify the underlying entity data — the AI is only as accurate as what's in Port.
- **"My AI-generated JSON was rejected"**: Expected. Walk them through comparing the generated JSON against the blueprint schema in Builder → Data Model. Usually one field name is wrong.
- **"I don't see AI Agents in Builder"**: Plan/feature flag issue. Acknowledge it and suggest they contact their Port admin. They can still do all AI Assistant exercises.

## Session Timing

- **0–5 min**: Framing — three AI layers (Assistant, Agents, MCP)
- **5–20 min**: Port AI Assistant exercise (Exercise 1 — no setup, all attendees)
- **20–40 min**: "Using AI to build Port" section — live demo + attendee prompts
- **40–60 min**: MCP setup (Exercise 2) — for attendees who have Claude Code/Cursor
- **60–70 min**: AI Agents creation walkthrough
- **70–75 min**: Skills concept + Q&A

## Setup Checklist (before session)

- [ ] Port AI Assistant is accessible (spark icon visible in Port UI)
- [ ] Verify your Port account has AI features enabled (check with Port admin)
- [ ] Attendees who want MCP: Claude Code or Cursor installed + Port account credentials available
- [ ] TechCorp catalog has meaningful data (services with descriptions, languages, team assignments) — richer data = more interesting AI responses
- [ ] Prepare 2-3 sample prompts you've tested that work well with your specific TechCorp data

## Demonstration Flow

**Best demo sequence for live delivery:**

1. Open Port AI Assistant (spark icon)
2. Ask: *"Which TechCorp services have no team assigned?"* — shows catalog awareness
3. Ask: *"Generate a Port blueprint for a Database with properties: engine (select: postgres/mysql/mongodb), version (string), and a relation to Service"* — shows config generation
4. Copy the generated JSON, open Builder → + Blueprint → JSON editor, paste it — shows end-to-end usefulness
5. If time: switch to Claude Code with MCP, ask the same catalog question — show that the same Port data is accessible from the external tool

## MCP Regional URL Quick Reference

| Region | MCP URL |
|--------|---------|
| EU (default) | `https://mcp.port.io/v1` |
| US | `https://mcp.us.port.io/v1` |

If unsure which region, check the Port instance URL: `app.port.io` = EU, `app.us.port.io` = US.

## Permissions Prerequisites

- Attendees need standard Port user access (no special Builder access required for AI Assistant)
- For AI Agent creation: Builder access (admin or editor role)
- MCP read-only access works with any Port account; write access requires appropriate permissions
