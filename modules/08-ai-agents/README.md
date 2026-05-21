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
- Connect an AI coding tool to Port via MCP (Model Context Protocol)
- Use Port AI to generate blueprints, automation rules, and scorecards
- Understand how to define and register skills for Port AI Agents

## Prerequisites
- Completed [Module 7: Scorecards](../07-scorecards/)
- A working Port instance with entities, blueprints, and at least one automation
- An MCP-capable AI tool installed (Claude Code, Cursor, or VS Code with Copilot) — or access to the Port AI Assistant (built in, no setup required)

## Duration
**Estimated Time**: 75 minutes

---

## Key Concepts

### Port AI Interfaces

Port offers several AI interfaces under the **Port AI** umbrella:

| Interface | Access | Use Case |
|-----------|--------|----------|
| **Port AI Assistant** | Built into Port UI — zero config | Ask questions about your catalog, generate configs |
| **AI Agents** | Builder → AI Agents | Domain-specific agents that run autonomously |
| **MCP Server** | External AI tool setup | Connect your AI coding tool to Port as a data source |
| **AI Workflows** | Automations + AI | Trigger AI agents as part of automation rules |

### Port AI Assistant

The Port AI Assistant is available immediately — no setup required. Click the **spark icon** in the Port navigation bar to open it.

The assistant can:
- Answer questions about your catalog: *"Which services have no team assigned?"*
- Generate Port configurations from natural language: *"Create a blueprint for a Kubernetes Namespace"*
- Trigger actions and automations on your behalf (requires approval)
- Launch specialized AI Agents for domain-specific tasks

### AI Agents

AI Agents are configurable, domain-specific assistants built on the `_ai_agent` blueprint. Unlike the general AI Assistant, agents are:
- Built for specific tasks (e.g., an "On-Call Agent" that queries PagerDuty + Port)
- Invokable from the AI Assistant chat (`+` button), via automations, or via API
- Configurable with specific instructions, allowed tools, and allowed actions

### MCP — Model Context Protocol

MCP is an open protocol that lets external AI tools (Claude Code, Cursor, VS Code Copilot) connect to Port as a data source. When connected via MCP:

- The AI tool can read your catalog entities, blueprints, and scorecards
- The AI tool can create/update entities and trigger actions
- Your Port data becomes live context for AI-generated configurations

Port runs a hosted MCP server:
- **EU region**: `https://mcp.port.io/v1`
- **US region**: `https://mcp.us.port.io/v1`

Authentication is OAuth-based — you'll be prompted to log in via browser the first time.

### Skills

Skills are registered capabilities that extend what an AI Agent can do. A skill is a named, documented function — backed by a Port action — that the agent can call in response to natural language requests.

---

## Hands-On Exercise 1: Port AI Assistant

No setup needed for this exercise.

### Step 1: Open the AI Assistant

Click the **spark icon** (⚡) in the Port navigation bar. The AI chat panel opens.

### Step 2: Query your catalog

Try these prompts:
- *"How many services are in the catalog?"*
- *"Which services don't have a team assigned?"*
- *"What is the current Production Readiness scorecard level of the ecommerce-api service?"*

The assistant reads your live catalog and returns accurate results.

### Step 3: Generate a configuration

Try: *"Create a Port blueprint for a Kubernetes Namespace with these properties: cluster (string), environment (select with options dev, staging, prod), and a relation to the Service blueprint."*

The assistant generates a JSON blueprint definition. Review it, then paste it into **Builder → Data Model → + Blueprint → JSON editor**.

---

## Hands-On Exercise 2: Connect Claude Code to Port via MCP

This exercise connects Claude Code to your Port instance so it can read and write your catalog in real time.

### Step 1: Add the Port MCP server

In your terminal (with Claude Code installed):

```bash
claude mcp add --transport sse port https://mcp.port.io/v1
```

For the US region:
```bash
claude mcp add --transport sse port https://mcp.us.port.io/v1
```

Alternatively, add it manually to your Claude Code settings (usually `~/.claude/settings.json` or via the Claude Desktop config):

```json
{
  "mcpServers": {
    "port": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.port.io/v1"]
    }
  }
}
```

> For the US region, replace `https://mcp.port.io/v1` with `https://mcp.us.port.io/v1`.

### Step 2: Authenticate

The first time you use Port via MCP, a browser window will open for OAuth login. Sign in with your Port account.

For CI/CD environments where browser auth is not possible, generate a token first:
```bash
curl -X POST https://api.port.io/v1/auth/access_token \
  -H "Content-Type: application/json" \
  -d '{"clientId": "<YOUR_CLIENT_ID>", "clientSecret": "<YOUR_CLIENT_SECRET>"}'
```

Use the token in the MCP connection header:

```bash
claude mcp add --transport sse port https://mcp.port.io/v1 \
  --header "Authorization: Bearer <ACCESS_TOKEN>"
```

### Step 3: Verify the connection

In Claude Code, start a new conversation and ask:
> *"List all blueprints in my Port catalog."*

Expected: Claude reads your catalog and lists your TechCorp blueprints by name and identifier.

### Optional: Restrict access

By default, MCP gives your AI tool full read+write access. To restrict:

```json
{
  "mcpServers": {
    "port": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.port.io/v1",
               "--header", "x-read-only-mode: 1"]
    }
  }
}
```

---

## Using Port AI to Build Port

One of the highest-leverage uses of Port AI is configuring Port itself. Here are prompts you can try with either the Port AI Assistant or an MCP-connected AI tool:

### Generate a blueprint

> *"Create a Port blueprint for a Kubernetes Namespace with properties: cluster (string), environment (select: dev/staging/prod), resource_quota_cpu (number), resource_quota_memory (string), and a relation to the Service blueprint."*

The AI generates a complete JSON blueprint. Paste it into **Builder → Data Model → + Blueprint → JSON editor**.

### Generate an automation rule

> *"Write a Port automation rule that fires when a Service entity's `status` property changes to 'deprecated'. The automation should send a webhook to `https://hooks.example.com/alerts` with the service identifier and the previous status value."*

### Generate a scorecard

> *"Create a Port scorecard for measuring Developer Experience of services. Include: Bronze level (has description and team assigned), Silver level (has runbook URL and on-call contact), Gold level (has SLO defined and no open critical vulnerabilities)."*

Each of these prompts takes minutes instead of hours. Review the generated JSON for accuracy, test it in Port, and iterate.

> **Tip:** AI-generated configurations almost always need minor corrections — a property name mismatch, an unsupported operator, or a missing required field. This is expected, not a failure. The AI gets you 90% of the way there.

---

## AI Agents: Creating a Domain-Specific Agent

### Step 1: Create an AI Agent blueprint entry

Navigate to **Builder → AI Agents** and click **New AI Agent**. Configure:

| Field | Value |
|-------|-------|
| **Title** | `Service Health Agent` |
| **Instructions** | `You are a Port AI agent specialized in monitoring service health. When asked about a service, check its scorecard levels, recent action runs, and team ownership. Always include the Production Readiness scorecard level in your responses.` |
| **Allowed Tools** | Select Port catalog read tools |
| **Execution Mode** | `approval-required` (recommended for first-time setup) |

### Step 2: Test the agent

Open the Port AI Assistant (spark icon), click the `+` button to select agents, choose your `Service Health Agent`, then ask:

> *"What is the health status of the ecommerce-api service?"*

### Step 3: Invoke via automation (optional)

You can chain an AI Agent into an automation rule using the `AI_AGENT` invocation method — for example, triggering a health summary whenever a deployment action completes.

---

## Skills: Extending AI Agent Capabilities

Skills are registered Port actions that an AI Agent can call by name. They bridge natural language requests to Port's automation system.

### Example skill definition

```json
{
  "identifier": "get_service_health",
  "title": "Get Service Health",
  "description": "Returns the current scorecard level and team for a named service. Use when asked about service health, readiness, or status.",
  "trigger": {
    "type": "self-service",
    "operation": "DAY-2",
    "blueprintIdentifier": "service"
  }
}
```

Once this action is created in Port, link it to your AI Agent as an allowed action. The agent will then call `get_service_health` when a user asks *"Is the ecommerce-api healthy?"*

See the [AI Agents documentation](https://docs.port.io/ai-interfaces/ai-agents/overview) for the full skill and agent configuration reference.

---

## 🎯 Self-Assessment Checkpoint

### Success Indicators
- [ ] Used the Port AI Assistant to query the catalog (no setup needed)
- [ ] Can explain the difference between the AI Assistant, AI Agents, and MCP
- [ ] (Optional) Connected an external AI tool to Port via MCP
- [ ] Generated at least one Port configuration (blueprint, automation, or scorecard) using AI
- [ ] Understand what a skill is and how it extends an AI Agent

## End State & Further Reading

By the end of this module, you should have:
- Successfully used the Port AI Assistant to answer a catalog question
- (Optional) A working MCP connection between your AI tool and Port
- At least one AI-generated configuration saved in Port

See the [Port AI Interfaces documentation](https://docs.port.io/ai-interfaces/overview) for the full feature reference.

## Common Issues & Solutions

**Problem**: Port AI Assistant gives inaccurate catalog answers  
**Solution**: The assistant reads your live catalog. If answers seem wrong, verify the underlying entity data in **Catalog** first. Empty or incorrect properties on entities lead to inaccurate AI responses.

**Problem**: MCP connection returns "unauthorized"  
**Solution**: Try the OAuth flow again — open a new session and let the browser login complete fully. Verify you're using the correct regional URL (EU: `mcp.port.io`, US: `mcp.us.port.io`).

**Problem**: AI-generated JSON is rejected by Port  
**Solution**: The AI may have used an unsupported field or wrong value type. Compare against the blueprint schema in **Builder → Data Model** and remove or correct unknown fields. This is expected — iterate.

**Problem**: "I don't see AI Agents in my Builder"  
**Solution**: AI Agents may not be enabled on your Port plan. Check with your Port admin or account manager.

**Still stuck or think you've found a bug?** See [Bug Reporting & Support](../../README.md#bug-reporting--support) for how to report workshop issues or Port product behavior.

## Next Steps

With AI-accelerated workflows in place, the final module covers managing all of this as infrastructure-as-code:
- **[Module 9: Terraform](../09-terraform/)** — manage Port configurations with Terraform

## Quick Reference

### Port AI Interfaces URLs
| Interface | URL |
|-----------|-----|
| AI documentation | `https://docs.port.io/ai-interfaces/overview` |
| AI Agents | `https://docs.port.io/ai-interfaces/ai-agents/overview` |
| MCP Server | `https://docs.port.io/ai-interfaces/port-mcp-server/overview-and-installation` |
| MCP EU endpoint | `https://mcp.port.io/v1` |
| MCP US endpoint | `https://mcp.us.port.io/v1` |

### MCP header options
| Header | Effect |
|--------|--------|
| `x-read-only-mode: 1` | Restrict AI tool to read-only access |
| `x-allowed-actions-to-run: id1,id2` | Restrict which actions AI tool can trigger |

---

**Completed Module 8?** Continue to [Module 9: Terraform](../09-terraform/) to learn infrastructure-as-code management for Port.
