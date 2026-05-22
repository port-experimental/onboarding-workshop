# Facilitator Guide — Module 12: Scale & Ops

## Module Summary
- **Duration**: 75 minutes
- **Audience**: Platform engineers who manage Port for their organization
- **Key outcome**: Participants have a multi-environment strategy and can detect + fix catalog drift

## Preparation
- Two Port workspaces are ideal for the Port CLI compare exercise. If unavailable, the export-and-inspect flow works as a fallback.
- Port CLI requires Node.js. Confirm it's installed before the session.
- Have the `port compare` output from a real environment diff ready to show as a demo if participants only have one workspace.

## Timing Guide

| Section | Time |
|---------|------|
| Multi-env concepts: Terraform vs CLI | 10 min |
| Terraform multi-env exercise | 15 min |
| Port CLI install + compare exercise | 20 min |
| Terraform import walkthrough | 10 min |
| Integration health + ops dashboard | 10 min |
| Catalog hygiene discussion | 5 min |
| Q&A / wrap-up | 5 min |

## Common Sticking Points

### Port CLI compare requires two workspaces
If participants have only one workspace, pivot to: "Export from this workspace and inspect the output files to understand what's exported." Then demo the compare command against a pre-prepared staging org.

### `terraform import` zero-diff is hard to achieve first try
It often takes 2-3 iterations to get a `.tf` block that perfectly matches Port's state. Normalize this: "This is expected. Read the plan diff, adjust the `.tf`, re-plan. You're done when the plan is clean."

### Integration health `_integration` blueprint
Not all plans expose this internal blueprint. If unavailable, pivot the ops dashboard exercise to action runs only (using `_action_run` which is more widely available).

## Discussion Questions
- "If your company uses both Terraform and a legacy UI-managed Port setup, how would you migrate gradually?"
- "What's your threshold for 'stale' in your catalog — 30 days? 90 days? Depends on the blueprint?"
- "Who in your org should own the Port Operations Dashboard — platform team? SRE? Someone else?"
