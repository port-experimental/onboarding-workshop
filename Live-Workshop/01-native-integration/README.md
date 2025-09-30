# Module 1: Configuring the Native PagerDuty Integration

**Objective:** Connect Port to your PagerDuty account and configure the data mapping to ingest `Services` and `Incidents`.

This module replaces the need for custom code by leveraging Port's powerful out-of-the-box integrations.

---

### 1. Install and Configure the PagerDuty Integration

1.  **Navigate to the Integrations Page:** In Port, go to `Organization` -> `Integrations`.
2.  **Install PagerDuty:** Find the PagerDuty integration and click `Install`.
3.  **Provide Credentials:** You will be prompted to provide a PagerDuty API Token. Follow the link to the PagerDuty documentation to generate a key with the necessary permissions.
4.  **Save the Configuration.**

---

### 2. Understand the Default Blueprint

Once installed, the integration will automatically create a new blueprint in your Port environment: `pagerdutyIncident`.

**Action:**
- Navigate to `Dev Portal` -> `Blueprints`.
- Examine the `pagerdutyIncident` blueprint. Note its properties (`status`, `summary`, `url`, `service`, etc.). This is the raw data we get from PagerDuty.

---

### 3. Configure Data Mapping

The core task is to tell Port how the data from PagerDuty relates to your existing data model. We want to connect PagerDuty's services to our existing `Service` blueprint.

1.  **Open the Integration Settings:** Go back to the PagerDuty integration settings page.
2.  **Configure the `service` Kind:**
    - The PagerDuty integration discovers entities of kind `service`. We need to map this to our `service` blueprint.
    - In the mapping configuration, set the target blueprint to `service`.
    - **Mapping Rule:** Create a mapping rule to connect the PagerDuty service to your existing service. A common method is to match the `name` of the PagerDuty service to the `title` of your Port service entity.
      - `jq Expression`: `.entity.title = .resource.name`
3.  **Configure the `incident` Kind:**
    - The `pagerdutyIncident` blueprint is already created for this.
    - We need to establish the `relation` from the incident to our `service` blueprint.
    - **Mapping Rule:** Add a mapping rule to set the relation.
      - `jq Expression`: `.entity.relations.service = .resource.service.summary` (Assuming the service summary/name from PagerDuty matches an identifier for your service blueprint).

4.  **Save and Resync:** Save the new mapping configuration and trigger a `Resync` of the integration.

---

### 4. Verify the Results

1.  **Check Services:** Navigate to your `Service` catalog page. You should see that your existing services are now enriched with data or relations from PagerDuty.
2.  **Check Incidents:** Navigate to the `pagerdutyIncident` catalog page. You should see a list of all incidents ingested from PagerDuty.
3.  **Check Relations:** View an incident and confirm that it is correctly linked to the corresponding `Service` in your catalog.

By the end of this module, PagerDuty is fully integrated as a data source, and its entities are correctly mapped to your existing software catalog.
