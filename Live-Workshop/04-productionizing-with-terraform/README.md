# Module 4: Productionizing with Terraform

**Objective:** Convert the blueprints, actions, and scorecards you created in the UI into version-controlled, manageable Terraform code.

This module covers the critical real-world workflow of prototyping in a UI and then "hardening" the configuration as code. We will focus on the `terraform import` command, which allows Terraform to take ownership of existing resources.

---

### 1. Set up the Terraform Provider

First, we need to configure the Port Terraform provider.

**File: `main.tf`**
```hcl
terraform {
  required_providers {
    port = {
      source  = "port-labs/port"
      version = "~> 1.0"
    }
  }
}

provider "port" {
  client_id     = var.port_client_id
  client_secret = var.port_client_secret
}
```

**File: `variables.tf`**
```hcl
variable "port_client_id" {
  type        = string
  description = "Port Client ID"
  sensitive   = true
}

variable "port_client_secret" {
  type        = string
  description = "Port Client Secret"
  sensitive   = true
}
```

**Action:**
1.  Create these files in the current directory.
2.  Run `terraform init` to install the provider.
3.  Set your Port credentials as environment variables (`TF_VAR_port_client_id` and `TF_VAR_port_client_secret`).

---

### 2. Define Resources in HCL

Next, write the HCL code that mirrors the resources we created in the UI.

**Action:** Add the following resource blocks to `main.tf`.

```hcl
# Postmortem Blueprint
resource "port_blueprint" "postmortem" {
  identifier = "postmortem"
  title      = "Postmortem"
  icon       = "Document"
  properties {
    string_props {
      identifier = "title"
      title      = "Title"
    }
    string_props {
      identifier = "status"
      title      = "Status"
      enum       = ["DRAFT", "IN_REVIEW", "COMPLETED"]
    }
    string_props {
      identifier = "summary"
      title      = "Summary"
      format     = "markdown"
    }
    string_props {
      identifier = "lessonsLearned"
      title      = "Lessons Learned"
      format     = "markdown"
    }
  }
  relations {
    identifier = "incident"
    title      = "Related Incident"
    target     = "pagerdutyIncident"
    required   = true
  }
}

# Acknowledge Incident Action
resource "port_action" "acknowledge_incident" {
  identifier          = "acknowledge_incident"
  title               = "Acknowledge"
  blueprint_identifier = "pagerdutyIncident"
  trigger             = "DAY-2"
  invocation_method {
    type = "WEBHOOK"
    url  = "https://api.pagerduty.com/incidents/{{.entity.identifier}}/"
    method = "PUT"
    headers = {
      "Authorization" = "Token token={{ secrets.PAGERDUTY_API_KEY }}"
      "Content-Type"  = "application/json"
      "Accept"        = "application/vnd.pagerduty+json;version=2"
      "From"          = "{{ secrets.PAGERDUTY_USER_EMAIL }}"
    }
    body = jsonencode({
      incident = {
        type   = "incident_reference"
        status = "acknowledged"
      }
    })
  }
}

# Other actions (Resolve, Compose Postmortem) and the Scorecard would be defined similarly.
# We are focusing on the blueprint and one action for the import exercise.
```

---

### 3. Import Existing Resources

This is the most critical and complex step. We will tell Terraform that the code we just wrote corresponds to the `postmortem` blueprint that already exists in Port.

1.  **Run `terraform plan`:** You will see that Terraform wants to *create* a new `postmortem` blueprint. This is expected.
2.  **Run the `import` command:**
    -   The syntax is `terraform import <resource_address> <resource_id>`.
    -   Our resource address is `port_blueprint.postmortem`.
    -   The resource ID for a blueprint is its identifier, `postmortem`.
    ```shell
    terraform import port_blueprint.postmortem postmortem
    ```
3.  **Run `terraform plan` again:** You should now see the message "No changes. Your infrastructure matches the configuration." Terraform now owns the blueprint.
4.  **Import the Action:**
    ```shell
    terraform import port_action.acknowledge_incident "pagerdutyIncident acknowledge_incident"
    ```
    *Note: Action IDs are a combination of the blueprint and action identifier.*

---

### 4. Verify and Apply

Now that your state is synchronized, you can manage these resources through code. Make a small, safe change in the HCL (e.g., change the `icon` of the `postmortem` blueprint to "Book").

1.  Run `terraform plan`. It should show a plan to update one resource.
2.  Run `terraform apply`. The change will be applied to the blueprint in Port.

You have successfully migrated UI-managed resources to a fully "as-code" workflow.



