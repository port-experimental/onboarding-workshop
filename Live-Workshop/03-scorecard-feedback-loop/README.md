# Module 3: The Scorecard Feedback Loop

**Objective:** Automatically reflect the operational health of a service in its quality scorecard by using live incident data.

This final module closes the loop on our incident lifecycle. We will modify the `Service Quality Scorecard` from Part 1 to include a new rule based on the number of incidents a service has experienced, creating a direct link between reliability and quality.

---

### 1. Add an `incidentCount` Property to the Service

First, we need to expose the number of related incidents as a property on our `Service` blueprint.

1.  **Navigate to the `service` blueprint.**
2.  **Add a new property:**
    -   **Identifier:** `incidentCount`
    -   **Title:** `Incident Count`
    -   **Type:** `Number`
3.  **Configure the `query`:**
    -   This query will count all entities from the `pagerdutyIncident` blueprint that are related to the current service.
    -   **`query`:**
        ```json
        {
          "combinator": "and",
          "rules": [
            {
              "property": "$blueprint",
              "operator": "=",
              "value": "pagerdutyIncident"
            },
            {
              "property": "$relations.service",
              "operator": "=",
              "value": "{{.self.identifier}}"
            }
          ]
        }
        ```
    -   **`calculation`:** `count`
4.  **Save the blueprint.** After a moment, you should see the `Incident Count` property populated on your service pages.

---

### 2. Update the Service Quality Scorecard

Now, we will add a new rule to our existing scorecard to penalize services with open incidents.

1.  **Navigate to the `Service Quality Scorecard`** (`Data` -> `Scorecards`).
2.  **Add a new Rule:**
    -   **Title:** `No Open Incidents`
    -   **Blueprint:** `service`
    -   **Level:** `Gold`
    -   **Query:**
        ```json
        {
          "combinator": "and",
          "rules": [
            {
              "property": "incidentCount",
              "operator": "<",
              "value": 1
            }
          ]
        }
        ```
3.  **Save the scorecard.**

---

### 3. Verify the Results

1.  **Find a service** that has one or more incidents related to it (based on the `incidentCount` property).
2.  **View its scorecard.** You should see that it now fails the "No Open Incidents" rule and its overall score has been adjusted.
3.  **Resolve the incident** for that service using the action you created in Module 2.
4.  **Wait for Port to resync** the data (a few moments).
5.  **Refresh the scorecard.** The `incidentCount` property should update, the "No Open Incidents" rule should now pass, and the service's score should improve.

You have now successfully created a dynamic feedback loop where operational events directly and automatically influence service quality standards.
