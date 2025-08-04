# Module 5: Actions - Self-Service Automation

## 🧭 Navigation

**Previous**: [Module 4: Dashboards](../04-dashboards/) | **Next**: [Module 6: Scorecards](../06-scorecards/)

**Learning Path**: [Choose Your Path](../../README.md#-choose-your-learning-path) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 90-120 minutes | 📋 **Prerequisites**: [Module 4](../04-dashboards/) completed

**Progress**: Module 5 of 7 | **Completion**: 71% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Understand Port's self-service action system
- Create actions with user inputs and workflows
- Configure different backend types (GitHub Actions, webhooks)
- Implement permissions and approval workflows
- Design effective self-service experiences

## Prerequisites
- Completed [Module 4: Dashboards](../04-dashboards/)
- Basic understanding of APIs and webhooks
- Familiarity with GitHub Actions (helpful but not required)

## Duration
**Estimated Time**: 90-120 minutes

## Key Concepts

### What are Actions?
Actions in Port enable self-service workflows that developers can trigger themselves. They consist of:
- **User Interface**: Forms with inputs for users to fill out
- **Backend Integration**: Systems that execute the actual work
- **Payload Generation**: Data transformation from inputs to backend format
- **Permissions**: Control over who can execute actions

### Action Architecture
```
User Input → Port Action → Backend System → Result
   (Form)  →   (Payload)  →   (GitHub/API)  → (Success/Failure)
```

### Backend Types
Port supports various backend systems:
- **GitHub Actions**: Trigger workflows in GitHub repositories
- **Webhooks**: Send HTTP requests to any API endpoint
- **GitLab/Azure Pipelines**: Trigger CI/CD pipelines
- **Kafka**: Send messages to Kafka topics
- **Port Entities**: Create/update entities directly in Port

## Hands-On Exercise: Create Service Deployment Action

Let's create an action that allows developers to deploy TechCorp services.

### Step 1: Plan the Action
Our deployment action will:
- Allow users to select a service to deploy
- Choose target environment (staging/production)
- Add optional deployment notes
- Trigger a GitHub Actions workflow

### Step 2: Create the Action
1. Navigate to **Self-Service**
2. Click **+ Action**
3. Configure basic details:
   - **Title**: `Deploy Service`
   - **Icon**: `Rocket`
   - **Operation**: `Day-2` (operational task)
   - **Description**: `Deploy a TechCorp service to specified environment`

### Step 3: Configure User Inputs
Click **Next** and add these inputs:

#### Input 1: Service Selection
- **Title**: `Service`
- **Type**: `Entity`
- **Blueprint**: `Service`
- **Required**: ✅ True
- **Description**: `Select the service to deploy`

#### Input 2: Environment
- **Title**: `Target Environment`
- **Type**: `Select`
- **Options**: 
  ```json
  [
    {"label": "Staging", "value": "staging"},
    {"label": "Production", "value": "production"}
  ]
  ```
- **Required**: ✅ True
- **Default**: `staging`

#### Input 3: Deployment Notes
- **Title**: `Deployment Notes`
- **Type**: `Text Area`
- **Required**: ❌ False
- **Description**: `Optional notes about this deployment`

### Step 4: Configure Backend
Click **Next** and set up the backend:

1. **Invocation Type**: `Run GitHub Workflow`
2. **Organization**: `techcorp-demo` (or your demo org)
3. **Repository**: `deployment-workflows`
4. **Workflow File**: `deploy-service.yml`

### Step 5: Create Payload
Configure the payload sent to GitHub Actions:

```json
{
  "service_name": "{{ .inputs.service.identifier }}",
  "service_title": "{{ .inputs.service.title }}",
  "target_environment": "{{ .inputs.target_environment }}",
  "deployment_notes": "{{ .inputs.deployment_notes }}",
  "triggered_by": "{{ .trigger.by.user.email }}",
  "port_run_id": "{{ .run.id }}"
}
```

### Step 6: Set Permissions
Click **Next** to configure permissions:
- **Execution**: `All users` (for workshop - in production, limit to specific teams)
- **Approval**: `Not required` (for now)

### Step 7: Test the Action
1. Click **Create** to save the action
2. Navigate back to **Self-Service**
3. Click on your new "Deploy Service" action
4. Fill out the form and test execution

## Understanding Action Payloads

### Trigger Data Structure
Actions have access to rich context data:

```json
{
  "inputs": {
    "service": {"identifier": "ecommerce-api", "title": "E-commerce API"},
    "target_environment": "staging",
    "deployment_notes": "Hotfix for payment bug"
  },
  "trigger": {
    "by": {
      "user": {
        "email": "developer@techcorp.com",
        "firstName": "Jane",
        "lastName": "Developer"
      }
    }
  },
  "run": {
    "id": "run_12345"
  }
}
```

### Payload Templating
Use Jinja2-style templating to access data:

| Template | Description | Example Output |
|----------|-------------|----------------|
| `{{ .inputs.field_name }}` | User input value | `"staging"` |
| `{{ .trigger.by.user.email }}` | User's email | `"user@company.com"` |
| `{{ .run.id }}` | Unique run ID | `"run_12345"` |
| `{{ .inputs.entity.identifier }}` | Entity identifier | `"ecommerce-api"` |

## Exercise: Create Environment Setup Action

Create an action for setting up new development environments:

### Requirements
1. **Action Name**: "Create Development Environment"
2. **Inputs**:
   - Service (Entity selector)
   - Environment Name (String, required)
   - Branch (String, default: "main")
   - TTL Hours (Number, default: 24)
3. **Backend**: Webhook to environment provisioning API
4. **Permissions**: Developers only

### Webhook Payload Example
```json
{
  "action": "create_environment",
  "service": "{{ .inputs.service.identifier }}",
  "environment_name": "{{ .inputs.environment_name }}",
  "branch": "{{ .inputs.branch }}",
  "ttl_hours": {{ .inputs.ttl_hours }},
  "owner": "{{ .trigger.by.user.email }}",
  "port_run_id": "{{ .run.id }}"
}
```

## Advanced Action Features

### Multi-Step Forms
For complex actions, organize inputs into steps:

```yaml
steps:
  - title: "Service Configuration"
    inputs: [service, environment]
  - title: "Deployment Options"
    inputs: [branch, notes]
```

### Conditional Inputs
Show/hide inputs based on other selections:

```json
{
  "title": "Production Approval",
  "type": "text",
  "dependsOn": {
    "property": "target_environment",
    "value": "production"
  }
}
```

### Approval Workflows
For sensitive operations, require approval:

1. **Approval Required**: ✅ True
2. **Approvers**: Specific users or teams
3. **Approval Type**: Any approver / All approvers
4. **Notifications**: Email, Slack, or webhook

## Action Design Best Practices

### User Experience
- **Clear Naming**: Use descriptive action and input names
- **Helpful Descriptions**: Explain what each input does
- **Sensible Defaults**: Pre-fill common values
- **Validation**: Use appropriate input types and constraints

### Security & Governance
- **Principle of Least Privilege**: Only grant necessary permissions
- **Approval for Sensitive Operations**: Require approval for production changes
- **Audit Trail**: Include user context in payloads
- **Input Validation**: Validate inputs on both client and server side

### Error Handling
- **Clear Error Messages**: Help users understand what went wrong
- **Retry Logic**: Handle transient failures gracefully
- **Fallback Options**: Provide alternatives when primary systems fail
- **Monitoring**: Track action success/failure rates

## 🎯 Self-Assessment Checkpoint

### Knowledge Check
Rate your understanding (1-5 scale, where 1=No understanding, 5=Expert level):

- [ ] Self-service action concepts and architecture: ___/5
- [ ] Backend integration types and use cases: ___/5
- [ ] Payload templating and data transformation: ___/5
- [ ] Action design and user experience principles: ___/5

### Skill Validation
Check off the skills you can confidently demonstrate:

- [ ] **Action Creation**: Can create self-service actions with appropriate configuration
- [ ] **Input Configuration**: Can set up various input types with proper validation
- [ ] **Backend Integration**: Can configure GitHub Actions or webhook backends
- [ ] **Payload Design**: Can write effective payload templates using trigger data

### Confidence Assessment
How confident are you in applying what you learned?

- [ ] **Very Confident**: Ready to design complex self-service workflows
- [ ] **Confident**: Can create most action scenarios with minimal guidance
- [ ] **Somewhat Confident**: Need occasional help with advanced configurations
- [ ] **Not Confident**: Require significant support for action development

### Success Indicators
You've successfully completed this module when you can:

**Knowledge Indicators:**
- [ ] Explain the purpose and benefits of self-service actions
- [ ] Describe different backend types and their appropriate use cases
- [ ] Understand payload templating syntax and available data
- [ ] Know when to apply permissions and approval workflows

**Skill Indicators:**
- [ ] Create actions with multiple input types and validation
- [ ] Configure backend integrations (GitHub Actions or webhooks)
- [ ] Write payload templates that properly transform user inputs
- [ ] Test action execution and troubleshoot common issues

**Application Indicators:**
- [ ] Design self-service workflows that reduce operational bottlenecks
- [ ] Choose appropriate backend systems for different automation needs
- [ ] Plan action permissions and security considerations
- [ ] Create user-friendly action interfaces with clear descriptions





## Common Issues & Solutions

**Problem**: Action payload not reaching backend  
**Solution**: Check GitHub repository/workflow exists, verify organization and repository names

**Problem**: Template variables not resolving  
**Solution**: Verify template syntax, check available trigger data structure

**Problem**: Users can't see the action  
**Solution**: Check permissions configuration, ensure users have appropriate access

**Problem**: Action fails with validation errors  
**Solution**: Verify required inputs are provided, check input types match expectations

## Next Steps

With self-service actions working, you can add quality tracking:
- **[Module 6: Scorecards](../06-scorecards/)** - Implement quality metrics and compliance tracking

## Quick Reference

### Common Payload Templates
```json
{
  "user_email": "{{ .trigger.by.user.email }}",
  "user_name": "{{ .trigger.by.user.firstName }} {{ .trigger.by.user.lastName }}",
  "run_id": "{{ .run.id }}",
  "entity_id": "{{ .inputs.entity_field.identifier }}",
  "entity_title": "{{ .inputs.entity_field.title }}",
  "input_value": "{{ .inputs.field_name }}",
  "timestamp": "{{ .trigger.at }}"
}
```

### Input Type Reference
- **String**: Single-line text input
- **Text Area**: Multi-line text input
- **Number**: Numeric input with validation
- **Boolean**: Checkbox (true/false)
- **Select**: Dropdown with predefined options
- **Multi-Select**: Multiple selection from options
- **Entity**: Select from Port entities
- **Date**: Date picker
- **Email**: Email input with validation
- **URL**: URL input with validation

---

**Completed Module 5?** Continue to [Module 6: Scorecards](../06-scorecards/) to learn about quality tracking and metrics.