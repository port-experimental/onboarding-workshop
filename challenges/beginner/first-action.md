# Challenge: Create Your First Self-Service Action

**Difficulty**: Beginner  
**Estimated Time**: 30-40 minutes  
**Prerequisites**: Completed [Module 5: Actions](../../modules/05-actions/) and [First Blueprint Challenge](first-blueprint.md)

## Objective
Create a self-service action that allows developers to update a service's README file through Port's interface, demonstrating how Port can trigger external workflows.

## Scenario
At TechCorp, developers often need to update service documentation. Instead of requiring them to navigate to GitHub and edit files manually, you'll create a Port action that streamlines this process through a simple form.

## Requirements

### Action Configuration
- **Title**: `Update Service README`
- **Identifier**: `update_readme`
- **Description**: `Update the README file for a service`
- **Trigger**: Manual (available on Service entities)
- **Icon**: `Edit`

### Input Properties
1. **New Content** (Text Area, required)
   - Title: "README Content"
   - Description: "New content for the README file"
   - Placeholder: "Enter markdown content..."

2. **Update Reason** (String, required)
   - Title: "Reason for Update"
   - Description: "Brief description of why you're updating the README"
   - Placeholder: "e.g., Added new API documentation"

3. **Notify Team** (Boolean, optional)
   - Title: "Notify Team"
   - Description: "Send notification to team Slack channel"
   - Default: false

### Backend Configuration
- **Type**: GitHub Workflow (simulated)
- **Webhook URL**: `https://api.github.com/repos/techcorp/{{.entity.identifier}}/dispatches`
- **Method**: POST
- **Headers**: Authorization with GitHub token

## Starter Template

### Action JSON Configuration
```json
{
  "identifier": "update_readme",
  "title": "Update Service README",
  "description": "Update the README file for a service",
  "trigger": {
    "type": "self-service",
    "operation": "DAY-2",
    "userInputs": {
      "properties": {
        "readme_content": {
          "title": "README Content",
          "type": "string",
          "format": "text",
          "description": "New content for the README file"
        },
        "update_reason": {
          "title": "Reason for Update", 
          "type": "string",
          "description": "Brief description of why you're updating the README"
        },
        "notify_team": {
          "title": "Notify Team",
          "type": "boolean",
          "description": "Send notification to team Slack channel",
          "default": false
        }
      },
      "required": ["readme_content", "update_reason"]
    },
    "blueprintIdentifier": "service"
  },
  "invocationMethod": {
    "type": "WEBHOOK",
    "url": "https://api.github.com/repos/techcorp/{{.entity.identifier}}/dispatches",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer YOUR_GITHUB_TOKEN"
    },
    "body": {
      "event_type": "update_readme",
      "client_payload": {
        "service_name": "{{.entity.identifier}}",
        "readme_content": "{{.inputs.readme_content}}",
        "update_reason": "{{.inputs.update_reason}}",
        "notify_team": "{{.inputs.notify_team}}",
        "triggered_by": "{{.trigger.by.user.email}}"
      }
    }
  }
}
```

## Step-by-Step Instructions

### Step 1: Navigate to Actions
1. Go to **Builder** → **Actions** in Port
2. Click **"+ New Action"**
3. Choose **"Create from scratch"**

### Step 2: Configure Basic Settings
1. **Identifier**: Enter `update_readme`
2. **Title**: Enter `Update Service README`
3. **Description**: Enter `Update the README file for a service`
4. **Icon**: Select `Edit` from the icon picker
5. Click **Next**

### Step 3: Set Trigger Configuration
1. **Trigger Type**: Select `Self Service`
2. **Operation**: Select `DAY-2`
3. **Blueprint**: Select `Service`
4. Click **Next**

### Step 4: Configure User Inputs
1. Click **"+ Add Input"** for first property:
   - **Identifier**: `readme_content`
   - **Title**: `README Content`
   - **Type**: `String`
   - **Format**: `Text Area`
   - **Description**: `New content for the README file`
   - **Required**: ✓

2. Click **"+ Add Input"** for second property:
   - **Identifier**: `update_reason`
   - **Title**: `Reason for Update`
   - **Type**: `String`
   - **Description**: `Brief description of why you're updating the README`
   - **Required**: ✓

3. Click **"+ Add Input"** for third property:
   - **Identifier**: `notify_team`
   - **Title**: `Notify Team`
   - **Type**: `Boolean`
   - **Description**: `Send notification to team Slack channel`
   - **Default**: `false`

4. Click **Next**

### Step 5: Configure Backend (Webhook)
1. **Invocation Type**: Select `Webhook`
2. **HTTP Method**: Select `POST`
3. **URL**: Enter `https://httpbin.org/post` (for testing)
4. **Headers**: Add `Content-Type: application/json`
5. **Body**: Use the JSON template below

### Step 6: Configure Request Body
```json
{
  "event_type": "update_readme",
  "service_name": "{{.entity.identifier}}",
  "service_title": "{{.entity.title}}",
  "readme_content": "{{.inputs.readme_content}}",
  "update_reason": "{{.inputs.update_reason}}",
  "notify_team": "{{.inputs.notify_team}}",
  "triggered_by": "{{.trigger.by.user.email}}",
  "team": "{{.entity.team}}"
}
```

### Step 7: Save and Test
1. Click **Create Action**
2. Navigate to a Service entity
3. Look for the **"Update Service README"** action
4. Click to test the action

## Success Criteria

You've successfully completed this challenge when:

- [ ] Action is created with correct identifier and title
- [ ] Action appears on Service entities in the catalog
- [ ] All three input fields are configured properly
- [ ] Required validation works (can't submit without required fields)
- [ ] Action form displays with proper labels and descriptions
- [ ] Test execution sends data to webhook endpoint
- [ ] Action run appears in the Action Runs history
- [ ] Webhook receives correct payload with entity and input data

## Validation Steps

### Functional Validation
1. **Check Action Creation**
   - Navigate to Builder → Actions
   - Verify "Update Service README" appears in actions list
   - Click to view configuration

2. **Test Action Availability**
   - Go to Software Catalog
   - Click on any Service entity
   - Verify "Update Service README" appears in actions menu

3. **Test Action Form**
   - Click the action to open the form
   - Verify all input fields appear with correct labels
   - Test required field validation
   - Submit with sample data

4. **Verify Execution**
   - Check Action Runs for successful execution
   - Verify webhook received correct payload (check httpbin.org response)

### Data Validation
1. **Check Payload Structure**
   - Verify entity data is correctly passed (service name, team)
   - Confirm user inputs are included in payload
   - Check that user information is captured

## Common Issues & Solutions

**Problem**: Action doesn't appear on Service entities  
**Solution**: Check that the blueprint identifier is set to "service" and action is published

**Problem**: Required validation not working  
**Solution**: Verify required fields are marked as required in the input configuration

**Problem**: Webhook fails  
**Solution**: Check URL is correct and accessible, verify JSON payload format

**Problem**: Entity data not appearing in payload  
**Solution**: Ensure you're using correct template syntax like `{{.entity.identifier}}`

## Bonus Challenges

### Bonus 1: Add Input Validation
- Add pattern validation for the update reason (minimum length)
- Add enum options for common update types

### Bonus 2: Enhance Payload
- Include more entity properties in the webhook payload
- Add timestamp and execution ID

### Bonus 3: Create Related Actions
- Create a "Deploy Service" action
- Create a "Create Release" action

## Next Steps

After completing this challenge:
- Try [Create Your First Scorecard](first-scorecard.md)
- Or move on to [Intermediate: Multi-Step Actions](../intermediate/multi-step-actions.md)

## Learning Notes

Document what you learned:
- How do Port actions integrate with external systems?
- What makes a good self-service action interface?
- How can actions improve developer productivity?

---

**Completed this challenge?** Try creating actions for other common developer workflows in your organization!