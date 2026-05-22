# Facilitator Guide — Module 10: Governance & RBAC

## Module Summary
- **Duration**: 60-75 minutes
- **Audience**: Platform engineers / Port admins
- **Key outcome**: Participants configure a real permissions model and understand the three-layer RBAC system

## Preparation
- Ensure each participant has admin access to their Port instance
- The TechCorp data model (Service blueprint, Backend/Frontend/DevOps teams) must exist from earlier modules
- If teams don't exist: have participants create them in **Builder → Teams** before the exercises

## Common Sticking Points

### "I don't see the Permissions tab on my blueprint"
Permissions configuration is only visible to workspace admins. If a participant can't see it, check their workspace role under **Builder → Members**.

### Approval chain exercise requires two accounts
The approval flow test needs one account to trigger and another to approve. Options:
- Participants pair up
- Use a shared "DevOps approver" test account prepared in advance
- Skip the approval verification step if pairing isn't possible

### Terraform permissions resource
`port_blueprint_permissions` was added in provider version ~2.15. If participants are on an older provider, the resource won't exist. Have them update: `version = "~> 2.21"` in `main.tf`.

## Timing Guide

| Section | Time |
|---------|------|
| Concepts: three-layer model | 10 min |
| Exercise 1: Blueprint permissions | 15 min |
| Exercise 2: Page visibility | 10 min |
| Exercise 3: Action approval chain | 15 min |
| Audit log walkthrough | 10 min |
| Wrap-up / Q&A | 5-10 min |

## Discussion Questions
- "Which of your existing tools has the most complex permission model? How does Port's compare?"
- "If a contractor needs read-only access to Port for 30 days, how would you set that up?"
- "What's the first blueprint you'd lock down in your real Port instance? Why?"
