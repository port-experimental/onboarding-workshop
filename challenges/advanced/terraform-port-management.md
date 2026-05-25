# Challenge: Terraform Port Management

**Difficulty**: Advanced  
**Estimated Time**: 60-90 minutes  
**Prerequisites**: Completed [Module 9: Terraform](../../modules/09-terraform/), Terraform installed locally, Port API credentials available

## Objective

Manage Port configuration as infrastructure-as-code: write Terraform to define the Service blueprint, apply it to Port, make a change through code (not the UI), and import an existing resource into Terraform state.

## Scenario

TechCorp's platform team wants all Port blueprint definitions to live in git so changes are reviewed, versioned, and reproducible. You'll take the Service blueprint you've been building in the UI and bring it under Terraform management.

---

## Part 1: Define the Service Blueprint in Terraform

### Step 1: Create your Terraform project directory

```bash
mkdir port-iac && cd port-iac
```

### Step 2: Create main.tf

```hcl
terraform {
  required_providers {
    port = {
      source  = "port-labs/port-labs"
      version = "~> 2.21"
    }
  }
}

provider "port" {
  client_id     = var.port_client_id
  client_secret = var.port_client_secret
  base_url      = var.port_base_url
}
```

### Step 3: Create variables.tf

```hcl
variable "port_client_id" {
  type      = string
  sensitive = true
}

variable "port_client_secret" {
  type      = string
  sensitive = true
}

variable "port_base_url" {
  type    = string
  default = "https://api.getport.io"
}
```

### Step 4: Create blueprints.tf — define the Service blueprint

```hcl
resource "port_blueprint" "service" {
  title      = "Service"
  icon       = "Microservice"
  identifier = "service"

  properties = {
    string_props = {
      "description" = {
        title    = "Description"
        required = true
      }
      "language" = {
        title    = "Language"
        required = true
        enum     = ["Python", "JavaScript", "Java", "Go", "C#", "TypeScript", "Ruby"]
      }
      "team" = {
        title = "Team"
        enum  = ["Frontend Team", "Backend Team", "DevOps Team", "QA Team", "Data Team"]
      }
      "environment" = {
        title = "Environment"
        enum  = ["Production", "Staging", "Development", "QA"]
      }
      "url" = {
        title  = "Repository URL"
        format = "url"
      }
      "readme" = {
        title  = "README"
        format = "markdown"
      }
      "default_branch" = {
        title   = "Default Branch"
        default = "main"
      }
    }

    boolean_props = {
      "archived" = {
        title   = "Archived"
        default = false
      }
    }
  }
}
```

### Step 5: Set credentials and initialize

```bash
export TF_VAR_port_client_id="your_client_id"
export TF_VAR_port_client_secret="your_client_secret"
terraform init
```

### Step 6: Plan and apply

```bash
terraform plan
```

Expected: Plan shows 1 resource to create — OR an error if the blueprint already exists (see Part 2).

```bash
terraform apply
```

Type `yes` to confirm.

### Part 1 Success Criteria

- [ ] `terraform init` completes without errors
- [ ] `terraform plan` shows exactly what will change with no unexpected resources
- [ ] `terraform apply` succeeds
- [ ] Service blueprint is visible in Port **Builder → Data Model**

---

## Part 2: Import an Existing Blueprint into Terraform

If the Service blueprint already existed in Port before you ran Terraform, `terraform apply` will error with "blueprint already exists." Use `terraform import` to bring it under management without recreating it.

### Step 1: Confirm the .tf block exists

The `port_blueprint.service` resource block must already exist in `blueprints.tf` (you wrote it in Part 1). Proceed.

### Step 2: Run terraform import

```bash
terraform import port_blueprint.service service
```

Format: `terraform import <resource_type>.<resource_name> <port_identifier>`

### Step 3: Verify with terraform plan

```bash
terraform plan
```

Expected: `No changes. Your infrastructure matches the configuration.`

If the plan shows changes, read the diff. Port may store properties with defaults you didn't specify. Add the matching values to your `.tf` block until the plan is clean.

### Part 2 Success Criteria

- [ ] `terraform import` completes without errors
- [ ] `terraform plan` shows zero changes after import
- [ ] `terraform state list` shows `port_blueprint.service`

---

## Part 3: Make a Change Through Code

Prove that Terraform — not the UI — controls the blueprint.

### Step 1: Add a new property via Terraform

Add a `framework` string property inside the `string_props` block in `blueprints.tf`:

```hcl
"framework" = {
  title = "Framework"
}
```

### Step 2: Plan and apply

```bash
terraform plan
```

Expected: 1 resource to update, showing the new `framework` property being added.

```bash
terraform apply
```

### Step 3: Verify in Port

Navigate to **Builder → Data Model → Service blueprint → Properties**.  
Verify `Framework` now appears in the property list.

### Part 3 Success Criteria

- [ ] `framework` property added to `blueprints.tf` (not the UI)
- [ ] `terraform plan` shows the property addition before apply
- [ ] `terraform apply` succeeds with no errors
- [ ] `Framework` property is visible in Port Builder after apply

---

## Part 4: Manage a Scorecard via Terraform (Bonus)

Add the Service Quality scorecard from the Enterprise Scorecard challenge as code.

Create `scorecards.tf`:

```hcl
resource "port_scorecard" "service_quality" {
  title     = "Service Quality"
  blueprint = "service"

  rules = [
    {
      identifier = "has_readme"
      title      = "Has README"
      level      = "Bronze"
      query = {
        combinator = "and"
        conditions = [jsonencode({ operator = "isNotEmpty", property = "readme" })]
      }
    },
    {
      identifier = "has_team"
      title      = "Has Team Ownership"
      level      = "Silver"
      query = {
        combinator = "and"
        conditions = [jsonencode({ operator = "isNotEmpty", property = "team" })]
      }
    },
    {
      identifier = "has_repo"
      title      = "Has Repository URL"
      level      = "Gold"
      query = {
        combinator = "and"
        conditions = [jsonencode({ operator = "isNotEmpty", property = "url" })]
      }
    }
  ]

  depends_on = [port_blueprint.service]
}
```

Run `terraform apply` and verify the scorecard appears in Port.

### Bonus Success Criteria

- [ ] `scorecards.tf` created with the Service Quality scorecard resource
- [ ] `terraform apply` creates or updates the scorecard without errors
- [ ] `terraform plan` shows zero changes after a successful apply

---

## Common Issues & Solutions

**Problem**: `terraform apply` errors with "blueprint already exists"  
**Solution**: The blueprint was created in the UI before you started. Run `terraform import port_blueprint.service service` then re-run `terraform plan` to verify zero drift before applying again.

**Problem**: `terraform plan` shows unexpected property removals after import  
**Solution**: Port stores some properties with defaults that Terraform doesn't know about. Read the plan diff, add the missing defaults to your `.tf` block, and re-plan until clean.

**Problem**: `terraform import` fails with "not found"  
**Solution**: The identifier must match exactly what Port uses. Check **Builder → Data Model** — the identifier is shown under the blueprint title (e.g., `service`, not `Service`).

**Problem**: Provider version mismatch or init fails  
**Solution**: Run `terraform init -upgrade` to pull the latest compatible provider version.

## Next Steps

After completing this challenge:
- Try [Governance Setup](governance-setup.md) — add RBAC to your Terraform-managed blueprints
- Explore [Module 12: Scale & Ops](../../modules/12-scale-ops/) — multi-environment Terraform patterns and the Port CLI
