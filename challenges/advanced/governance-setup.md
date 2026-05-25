# Challenge: Governance Setup

**Difficulty**: Advanced  
**Estimated Time**: 45-60 minutes  
**Prerequisites**: Completed [Module 10: Governance & RBAC](../../modules/10-governance/), have TechCorp teams configured with at least Backend Team and DevOps Team

## Objective

Implement TechCorp's access control policy in Port: lock the Service blueprint so only specific teams can create new services, restrict a production action to DevOps approval only, and hide the Platform Engineering dashboard from developers.

## Scenario

TechCorp's security review found that any member can create Service entities and trigger production deployments. This must be fixed before the next audit. You'll configure Port's three-layer permissions model to enforce team-based ownership.

---

## Part 1: Lock the Service Blueprint

Restrict who can create, edit, and delete Service entities.

### Target policy

| Team | Create | Edit | Delete |
|------|--------|------|--------|
| Backend Team | ✅ | ✅ | ✅ |
| Frontend Team | ✅ | ✅ | ✅ |
| DevOps Team | ✅ | ✅ | ✅ |
| QA Team | ❌ | ❌ | ❌ |
| Viewers | ❌ | ❌ | ❌ |

### Step 1: Navigate to blueprint permissions

1. Go to **Builder → Data Model → Service blueprint**
2. Click the **"..."** menu → **Permissions**

### Step 2: Configure create permissions

Under **Create**:
- Remove `All members` if currently set
- Add specific teams: `Backend Team`, `Frontend Team`, `DevOps Team`

### Step 3: Configure edit and delete permissions

Under **Update** and **Delete**:
- Set to the same three teams: `Backend Team`, `Frontend Team`, `DevOps Team`

### Step 4: Save and verify

1. Save the permissions
2. Inspect the resulting permissions JSON — it should look like:

```json
{
  "entities": {
    "create": {
      "teams": ["Backend Team", "Frontend Team", "DevOps Team"]
    },
    "update": {
      "teams": ["Backend Team", "Frontend Team", "DevOps Team"]
    },
    "delete": {
      "teams": ["Backend Team", "Frontend Team", "DevOps Team"]
    }
  }
}
```

3. If you have a second user account on a different team (e.g., QA Team), log in and verify they cannot create a Service entity.

### Part 1 Success Criteria

- [ ] Service blueprint permissions configured — no longer "All members"
- [ ] Create restricted to Backend Team, Frontend Team, and DevOps Team
- [ ] Update and Delete restricted to the same three teams
- [ ] Permissions JSON matches the target policy above (or equivalent)

---

## Part 2: Require Approval for the Deploy Action

Add an approval requirement to an action so that only DevOps team members can approve production operations.

### Step 1: Navigate to the action

1. Go to **Builder → Actions**
2. Select the `Deploy Service` action (or `Update Service README` from the First Action challenge if Deploy doesn't exist)
3. Click **"..."** → **Edit**

### Step 2: Add approval requirement

1. Navigate to the **Permissions** tab of the action editor
2. Enable **"Require approval"**
3. Set **Approvers** to: `DevOps Team`
4. Set **Who can execute** to: `All members` (any member can request, only DevOps approves)

### Step 3: Save and verify

1. Save the action
2. Navigate to any Service entity and trigger the action
3. The run should show "Pending approval" status — not execute immediately
4. The approval request should be visible in the action's Runs page

### Part 2 Success Criteria

- [ ] Action has approval requirement enabled
- [ ] Approvers set to DevOps Team only
- [ ] Triggering the action creates a run with "Waiting for approval" status (not immediate execution)
- [ ] Run log confirms approval-pending state

---

## Part 3: Restrict Dashboard Visibility

Ensure the `Platform Engineering Console` dashboard (from the Multi-Dashboard challenge) is only visible to DevOps team members.

### Step 1: Navigate to page permissions

1. Go to the **Platform Engineering Console** dashboard
2. Click the **"..."** menu → **Edit Page** (or look for a **Permissions** or **Visibility** option)

### Step 2: Set visibility

- Change visibility from **All members** to **Specific teams**
- Select: `DevOps Team`
- Save

### Step 3: Verify

1. Log in as a user who is **not** on the DevOps team — the Platform Engineering Console should not appear in their dashboard list
2. If a second account is unavailable, verify the page settings show restricted visibility (not "All members")

### Part 3 Success Criteria

- [ ] Platform Engineering Console visibility set to DevOps Team only
- [ ] Visibility setting is not "All members"
- [ ] Dashboard is not visible to non-DevOps members (if testable)

---

## Part 4: Review the Audit Log

Verify your permission changes are recorded in Port's audit trail.

### Step 1: Access the audit log

1. Navigate to **Settings** (gear icon, top-right) → **Audit Log**
2. Filter by **Event Type**: Permission-related events

### Step 2: Verify your changes are logged

Look for entries corresponding to:
- Service blueprint permission update
- Action permission update (approval requirement added)
- Page visibility update

Each entry shows: timestamp, actor (your email), event type, and the resource affected.

### Step 3: Export for compliance (optional)

Note the audit log URL or export options available in your Port plan — enterprise plans typically support audit log export via API or webhook for SIEM integration.

### Part 4 Success Criteria

- [ ] Audit log shows at least one permission change event from this session
- [ ] Entry includes timestamp and your user email as the actor
- [ ] Event type correctly identifies the changed resource (blueprint or action)

---

## Common Issues & Solutions

**Problem**: Blueprint permission UI is greyed out  
**Solution**: You need workspace **Admin** role to edit blueprint permissions. Navigate to **Settings → Members** to verify your role, or ask your Port admin to grant admin access.

**Problem**: Approval requirement option doesn't appear in the action editor  
**Solution**: Approval requirements are only available for DAY-2 (self-service) actions on existing entities — not for CREATE actions. Make sure the action's trigger type is `DAY-2`.

**Problem**: Page visibility option is not visible  
**Solution**: Look in the page's **Edit** menu rather than a dedicated "Permissions" label. Port may show this as "Visibility" or "Access control" depending on your plan.

**Problem**: Audit log shows no entries for my changes  
**Solution**: Audit log entries may take 1-2 minutes to appear. Filter by **Today** and refresh. If still empty, check that your Port plan includes audit logging.

## Next Steps

After completing this challenge:
- Explore [Terraform Port Management](terraform-port-management.md) — manage these permissions as code
- Review [Module 12: Scale & Ops](../../modules/12-scale-ops/) — operating Port at scale with access controls in place
