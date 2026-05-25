# Challenge: Automate Service Lifecycle Events

**Difficulty**: Intermediate  
**Estimated Time**: 45-60 minutes  
**Prerequisites**: Completed [Module 6: Automations](../../modules/06-automations/), [First Action](../beginner/first-action.md), and have Service and Team entities in your catalog

## Objective

Set up two Port automations that react to catalog changes automatically: one that fires when a new service is created, and one that fires when a service's environment changes to Production.

## Scenario

TechCorp's platform team is tired of manually notifying teams when services are promoted to production. You'll automate two common lifecycle events so that Port handles the notifications without any human trigger.

---

## Part 1: Notify on New Service Creation

Create an automation that sends a webhook notification whenever a new Service entity is created.

### Step 1: Navigate to Automations

1. Go to **Builder → Automations**
2. Click **"+ New Automation"**

### Step 2: Configure the trigger

- **Trigger type**: `Entity Created`
- **Blueprint**: `Service`

### Step 3: Configure the condition (optional filter)

Add a condition so the automation only fires for non-archived services:

```json
{
  "combinator": "and",
  "conditions": [
    {
      "operator": "=",
      "property": "archived",
      "value": false
    }
  ]
}
```

### Step 4: Configure the action

- **Action type**: `Webhook`
- **URL**: `https://httpbin.org/post` (for testing)
- **Method**: POST
- **Body**:

```json
{
  "event": "service_created",
  "service": "{{ .entity.identifier }}",
  "team": "{{ .entity.properties.team }}",
  "language": "{{ .entity.properties.language }}",
  "environment": "{{ .entity.properties.environment }}",
  "created_by": "{{ .trigger.by.user.email }}"
}
```

### Step 5: Save and test

1. Save the automation
2. Create a new Service entity in the catalog
3. Navigate to the automation and click **Runs** to verify it fired
4. Check the run log to confirm the webhook received the correct payload

### Part 1 Success Criteria

- [ ] Automation exists with trigger type `Entity Created` on Service blueprint
- [ ] Condition excludes archived services (`archived = false`)
- [ ] Webhook action configured with correct body template
- [ ] Creating a new Service entity triggers the automation
- [ ] Automation run appears in the Runs log with status Success

---

## Part 2: Alert When a Service Goes to Production

Create an automation that fires when a Service's `environment` property changes **to** `Production`.

### Step 1: Create a second automation

1. Navigate to **Builder → Automations**
2. Click **"+ New Automation"**

### Step 2: Configure the trigger

- **Trigger type**: `Entity Updated`
- **Blueprint**: `Service`
- **Property filter**: `environment` (scope the trigger to changes on this property only)

### Step 3: Configure the condition

The automation should only fire when the new value of `environment` is `Production`:

```json
{
  "combinator": "and",
  "conditions": [
    {
      "operator": "=",
      "property": "environment",
      "value": "Production"
    }
  ]
}
```

### Step 4: Configure the action

- **Action type**: `Webhook`
- **URL**: `https://httpbin.org/post`
- **Method**: POST
- **Body**:

```json
{
  "event": "service_promoted_to_production",
  "service": "{{ .entity.identifier }}",
  "service_title": "{{ .entity.title }}",
  "team": "{{ .entity.properties.team }}",
  "language": "{{ .entity.properties.language }}",
  "promoted_by": "{{ .trigger.by.user.email }}"
}
```

### Step 5: Save and test

1. Save the automation
2. Take any existing Service entity that is **not** in Production
3. Edit it and change `environment` to `Production`
4. Check **Runs** to verify the automation fired
5. Verify the payload includes the correct service details

### Part 2 Success Criteria

- [ ] Automation exists with trigger type `Entity Updated` on Service blueprint
- [ ] Trigger is scoped to the `environment` property
- [ ] Condition checks that new value equals `Production`
- [ ] Changing a service's environment to Production triggers the automation
- [ ] Automation run log shows successful execution with correct payload

---

## Bonus: Chain Automations with Actions

Extend the Production promotion automation to also trigger a Port action automatically when a service goes to Production.

> **Hint**: Change the automation backend from `Webhook` to `Trigger Port Action`, then select an action from your catalog (e.g., `Update Service README` from the First Action challenge).

### Bonus Success Criteria

- [ ] Automation backend changed from Webhook to `Trigger Port Action`
- [ ] Selected action is triggered automatically when environment changes to Production
- [ ] Action run appears in Action Runs history when the automation fires

---

## Common Issues & Solutions

**Problem**: Automation doesn't fire when entity is created  
**Solution**: Check that the trigger blueprint is `service` (the identifier, not the display title "Service"). Blueprint identifiers are case-sensitive in Port automations.

**Problem**: `Entity Updated` automation fires on every property change, not just environment  
**Solution**: Verify the trigger has a "Property changed" scope set specifically to `environment`. Without this, the automation fires on any property update to the entity.

**Problem**: Condition doesn't filter correctly  
**Solution**: The condition evaluates the entity state **after** the update. For the Production promotion automation, verify the condition checks `environment = "Production"` (not the old value).

**Problem**: Template variables return empty strings  
**Solution**: Use `{{ .entity.properties.team }}` (with `.properties.` prefix) for blueprint properties. Entity-level fields like `identifier` and `title` are accessed directly: `{{ .entity.identifier }}`.

## Next Steps

After completing this challenge:
- Continue to [Multi-Dashboard Setup](multi-dashboard-setup.md) to add an action runs widget showing automation activity
- Or move on to [Enterprise Scorecard System](../advanced/enterprise-scorecard-system.md)
