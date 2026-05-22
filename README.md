# Port Workshop

A comprehensive, hands-on learning resource for Port - the internal developer portal solution.

## What You'll Learn

This workshop teaches you how to build and configure Port as your internal developer portal, covering everything from basic navigation to advanced infrastructure-as-code management. The workshop is structured as **modular, self-paced learning** with comprehensive exercises, assessments, and real-world examples.

## Learning Path

### 🏗️ [Builder Path](learning-paths/builder.md)
*For platform engineers configuring and managing Port*
- **Duration**: 12-14 hours (core 0→1: 8-10 hours | advanced 1→production: ~4 hours)
- **Prerequisites**: Experience with infrastructure, APIs, and configuration management
- **Covers**: All 12 modules — from blueprints to AI agents and Terraform

---
*A User path (for developers and managers) is planned. See [FUTURE.md](FUTURE.md).*

## Workshop Structure

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
10. **[Governance & RBAC](modules/10-governance/)** — Permissions, teams, and audit
11. **[Custom Integrations](modules/11-custom-integrations/)** — REST API, webhooks, and Ocean framework
12. **[Scale & Ops](modules/12-scale-ops/)** — Multi-environment management and catalog hygiene

### Hands-On Practice
- **[Examples](examples/)** - Ready-to-use templates and configurations
- **[Challenges](challenges/)** - Progressive exercises from beginner to advanced

## Getting Started

### Prerequisites

| Tool | Purpose | Installation |
|------|---------|-------------|
| Port Account | Workshop environment | [Sign up for trial](https://demo.getport.io/) |
| Visual Studio Code | Development environment | [Download](https://code.visualstudio.com/) |
| Terraform | Infrastructure management | [Install Guide](https://developer.hashicorp.com/terraform/install) |
| Node.js 18+ | Custom widget development (Module 04) | [Download](https://nodejs.org/) |
| Claude Code or MCP-capable AI tool | AI Agents module (Module 08, optional) | [Install Claude Code](https://claude.ai/code) |

### Setup Options

Choose one of these Port environment options:

1. **Port Trial** - Full-featured trial account (recommended)
2. **Port Demo** - Pre-configured demo environment
3. **Existing Port Instance** - Use your organization's Port setup

📋 **Detailed Setup Instructions**: See our comprehensive [Setup Guide](setup-guide.md) for step-by-step instructions, troubleshooting, and environment validation.

### Quick Environment Check

Before starting, validate your setup:

```bash
# Download and run validation script
chmod +x validation/validate-environment.sh
./validation/validate-environment.sh https://app.port.io
```

Or use Node.js:
```bash
node validation/environment-check.js https://app.port.io
```

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Blueprints** | Data models that define entity structure |
| **Entities** | Individual instances of blueprints (services, teams, etc.) |
| **Actions** | Self-service workflows and automation |
| **Integrations** | Connections to external systems (GitHub, CI/CD, etc.) |
| **Scorecards** | Quality metrics and compliance tracking |

## Workshop Features

- ✅ **Modular Design** - Self-contained modules with clear prerequisites and learning objectives
- ✅ **Self-Assessment** - Built-in knowledge checks and skill validation in each module
- ✅ **Generic Examples** - Uses TechCorp scenarios that work for everyone
- ✅ **Progressive Challenges** - Beginner to advanced hands-on exercises
- ✅ **Multiple Learning Paths** - Tailored content for different roles
- ✅ **Self-Contained** - No specific organizational setup required
- ✅ **Practical Focus** - Real-world scenarios and best practices
- ✅ **Facilitator Support** - Comprehensive teaching notes and guidance

## Reference Materials

### Documentation & Guides
- **[API Reference](resources/api-reference.md)** - Complete Port API documentation with examples
- **[Best Practices Guide](resources/best-practices.md)** - Configuration patterns and recommendations
- **[Glossary](resources/glossary.md)** - Port terminology and concept reference
- **[Troubleshooting Guide](troubleshooting.md)** - Common issues and solutions

### Quick References
- **[Setup Guide](setup-guide.md)** - Environment setup and validation
- **[Validation Tools](validation/)** - Automated environment checking scripts

## Support

- 📚 [Port Documentation](https://docs.port.io/)
- 🎥 [Port YouTube Channel](https://www.youtube.com/@getport/videos)
- 💬 [Community Support](https://docs.port.io/support)

## Bug Reporting & Support

- **Workshop content or examples**: Open an issue in the [onboarding workshop GitHub repository](https://github.com/port-experimental/onboarding-workshop/issues). Include:
  - Module number and exact step
  - What you did, what you expected, and what actually happened (including error messages or screenshots)
  - Your Port instance type (trial/demo/existing), browser, and OS
- **Port product or UI behavior**: If something in the Port app itself looks broken (for example, valid mappings not saving, blueprints disappearing, or UI errors), contact Port via the in-app support widget or [Port Support](https://docs.port.io/support) and include:
  - Your workspace URL
  - A short description of the issue and how to reproduce it
  - A link or reference to the relevant workshop module/step, if applicable

## Contributing

This workshop is designed to be continuously improved. If you find issues or have suggestions, please contribute back to help others learn Port effectively.

---

**Ready to start?** Choose your [learning path](#learning-paths) above and begin your Port journey!