# Module 2: Advanced Self-Service Actions

**Objective:** Empower developers to manage the incident lifecycle directly from Port by creating powerful, API-driven self-service actions.

Now that incident data is in Port, we can build actions on top of it to create a seamless developer experience. Instead of forcing developers to jump to the PagerDuty UI, they can manage incidents from the same place they view service telemetry, documentation, and ownership.

---

### 1. Create a `Postmortem` Blueprint

Before creating actions, let's create a blueprint to hold our postmortem documents.

**Action:** Create the `postmortem` blueprint in Port.
```yaml
identifier: postmortem
title: Postmortem
icon: "Document"
schema:
  properties:
    title:
      title: Title
      type: string
    status:
      title: Status
      type: string
      enum:
        - DRAFT
        - IN_REVIEW
        - COMPLETED
    summary:
      title: Summary
      type: string
      format: markdown
    lessonsLearned:
      title: Lessons Learned
      type: string
      format: markdown
  required: []
relations:
  incident:
    title: Related Incident
    target: pagerdutyIncident
    required: true
```

---

### 2. Create "Update Incident" Actions (Acknowledge & Resolve)

These actions will call the PagerDuty API directly to update the status of an incident. This demonstrates how Port can act as a control plane for external systems.

#### PagerDuty API Setup
You will need:
- A PagerDuty API Key (the same one used for the integration should work if it has write permissions).
- The email address of a PagerDuty user to perform the action.

Store these securely in the Action's secrets.

#### Action 1: Acknowledge Incident

1.  **Go to the `pagerdutyIncident` blueprint** and create a new Action.
2.  **Trigger:** `Day-2`
3.  **Type:** `Webhook`
4.  **Title:** `Acknowledge`
5.  **Webhook URL:** `https://api.pagerduty.com/incidents/{{.entity.identifier}}/`
6.  **HTTP Method:** `PUT`
7.  **Headers:**
    ```json
    {
      "Authorization": "Token token={{ secrets.PAGERDUTY_API_KEY }}",
      "Content-Type": "application/json",
      "Accept": "application/vnd.pagerduty+json;version=2",
      "From": "{{ secrets.PAGERDUTY_USER_EMAIL }}"
    }
    ```
8.  **Body:**
    ```json
    {
      "incident": {
        "type": "incident_reference",
        "status": "acknowledged"
      }
    }
    ```
9.  **Secrets:** Create secrets named `PAGERDUTY_API_KEY` and `PAGERDUTY_USER_EMAIL` with your values.
10. **Visibility Rule (Optional):** Set the action to only be visible when the incident status is `triggered`.
    - `jq Expression`: `.entity.properties.status == "triggered"`

#### Action 2: Resolve Incident

Follow the same steps as above, but with a different title and body.

-   **Title:** `Resolve`
-   **Body:**
    ```json
    {
      "incident": {
        "type": "incident_reference",
        "status": "resolved"
      }
    }
    ```
-   **Visibility Rule (Optional):**
    - `jq Expression`: `.entity.properties.status == "acknowledged"`

#### Breakout Team Activities (Teams of ~3)

Form 4 teams. Each team owns one activity below and will demo the result.

##### Activity 1: Add Note to Incident
1.  Go to the `pagerdutyIncident` blueprint and create a new Action.
2.  Trigger: `Day-2`
3.  Type: `Webhook`
4.  Title: `Add Note`
5.  Webhook URL: `https://api.pagerduty.com/incidents/{{.entity.identifier}}/notes`
6.  HTTP Method: `POST`
7.  Headers: reuse the headers from the actions above (include `From`).
8.  Body:
    ```json
    {
      "note": { "content": "{{ inputs.note }}" }
    }
    ```
9.  User Inputs: Add a required `note` (string, textarea).
10. Visibility Rule (Optional): Show on any status.

##### Activity 2: Snooze Incident
1.  Create a new Action on `pagerdutyIncident`.
2.  Trigger: `Day-2`
3.  Type: `Webhook`
4.  Title: `Snooze`
5.  Webhook URL: `https://api.pagerduty.com/incidents/{{.entity.identifier}}/snooze`
6.  HTTP Method: `POST`
7.  Headers: reuse the headers from the actions above (include `From`).
8.  Body:
    ```json
    {
      "duration": {{ inputs.durationSeconds }}
    }
    ```
9.  User Inputs: Add `durationSeconds` (number, e.g., 1800 for 30 minutes).
10. Visibility Rule (Optional): `.entity.properties.status == "triggered"`

##### Activity 3: Escalate Incident
1.  Create a new Action on `pagerdutyIncident`.
2.  Trigger: `Day-2`
3.  Type: `Webhook`
4.  Title: `Escalate`
5.  Webhook URL: `https://api.pagerduty.com/incidents/{{.entity.identifier}}/escalate`
6.  HTTP Method: `POST`
7.  Headers: reuse the headers from the actions above (include `From`).
8.  Body:
    ```json
    {}
    ```
9.  (Optional) Add a numeric input `escalation_level` and include it in the body per PagerDuty API if your account requires it.
10. Visibility Rule (Optional): `.entity.properties.status != "resolved"`

##### Activity 4: Reassign Incident
1.  Create a new Action on `pagerdutyIncident`.
2.  Trigger: `Day-2`
3.  Type: `Webhook`
4.  Title: `Reassign`
5.  Webhook URL: `https://api.pagerduty.com/incidents/{{.entity.identifier}}`
6.  HTTP Method: `PUT`
7.  Headers: reuse the headers from the actions above (include `From`).
8.  Body (accepts a `assigneeUserId` input):
    ```json
    {
      "incident": {
        "type": "incident_reference",
        "assignments": [
          {
            "assignee": { "id": "{{ inputs.assigneeUserId }}", "type": "user_reference" }
          }
        ]
      }
    }
    ```
9.  User Inputs: Add `assigneeUserId` (string). Tip: Use PagerDuty API or UI to find a user ID.
10. Visibility Rule (Optional): `.entity.properties.status != "resolved"`

For all activities: store secrets (`PAGERDUTY_API_KEY`, `PAGERDUTY_USER_EMAIL`) securely, add success/failure messages, and verify the action works on a test incident before demo.

---

### 3. Create a "Compose Postmortem" Action

This action will be a `CREATE` action, allowing a user to create a new `postmortem` entity directly from the incident page.

1.  **Go to the `pagerdutyIncident` blueprint** and create a new Action.
2.  **Trigger:** `Day-2`
3.  **Type:** `Create`
4.  **Title:** `Compose Postmortem`
5.  **Target Blueprint:** `postmortem`
6.  **Mapping:**
    -   `title`: `"Postmortem for " & .entity.title`
    -   `relations.incident`: `.entity.identifier`
7.  **User Inputs:**
    -   Add user inputs for `summary` and `lessonsLearned` to allow the user to fill them in when the action runs.

By the end of this module, you can view an incident in Port, acknowledge it, resolve it, and create its associated postmortem, all without leaving the Port UI.



