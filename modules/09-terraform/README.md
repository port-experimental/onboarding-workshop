# Module 7: Terraform - Infrastructure as Code for Port

## 🧭 Navigation

**Previous**: [Module 6: Scorecards](../06-scorecards/) | **Next**: [Challenges](../../challenges/)

**Learning Path**: [Choose Your Path](../../README.md#-choose-your-learning-path) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 90-120 minutes | 📋 **Prerequisites**: [Module 6](../06-scorecards/) completed

**Progress**: Module 7 of 7 | **Completion**: 100% of core modules 🎉

## Learning Objectives
By the end of this module, you will be able to:
- Understand the benefits of managing Port configurations as code
- Set up the Port Terraform provider
- Create and manage blueprints using Terraform
- Implement CI/CD workflows for Port configuration changes
- Follow best practices for Port infrastructure management

## Prerequisites
- Completed [Module 6: Scorecards](../06-scorecards/)
- Terraform installed and basic familiarity
- Understanding of infrastructure-as-code concepts
- Access to Port API credentials

## Duration
**Estimated Time**: 90-120 minutes

## Key Concepts

### Why Infrastructure as Code for Port?
Managing Port configurations through [Terraform](../../resources/glossary.md#terraform) provides:
- **Version Control**: Track all changes to Port configurations
- **Reproducibility**: Recreate environments consistently
- **Collaboration**: Team-based configuration management
- **Automation**: CI/CD for Port configuration deployments
- **Rollback**: Easy reversion of problematic changes

### Port Terraform Provider
The Port Terraform provider supports:
- **Blueprints**: Data model definitions
- **Actions**: Self-service workflow configurations
- **Pages**: Dashboard and catalog page layouts
- **Integrations**: Data source configurations
- **Scorecards**: Quality tracking definitions

## Hands-On Exercise: Set Up Terraform for Port

### Step 1: Get Port API Credentials
1. Navigate to **Builder** → **...** menu → **Credentials**
2. Copy your **Client ID** and **Client Secret**
3. Note your Port **Base URL** (e.g., `https://api.getport.io`)

### Step 2: Create Terraform Configuration
Create a new directory for your Terraform configuration:

```bash
# In your terminal, create and enter the Terraform project directory
mkdir port-terraform
cd port-terraform
```

### Step 3: Configure Provider
Create `main.tf`.

Paste location: **`port-terraform/main.tf`** (new file; paste the following HCL into it):

```hcl
terraform {
  required_providers {
    port = {
      source  = "port-labs/port-labs"
      version = "~> 2.0"
    }
  }
}

provider "port" {
  client_id     = var.port_client_id
  client_secret = var.port_client_secret
  base_url      = var.port_base_url
}
```

### Step 4: Define Variables
Create `variables.tf`.

Paste location: **`port-terraform/variables.tf`** (new file; paste the variable definitions below):

```hcl
variable "port_client_id" {
  description = "Port API Client ID"
  type        = string
  sensitive   = true
}

variable "port_client_secret" {
  description = "Port API Client Secret"
  type        = string
  sensitive   = true
}

variable "port_base_url" {
  description = "Port API Base URL"
  type        = string
  default     = "https://api.getport.io"
}
```

### Step 5: Create Environment Variables
Create `.env` file (don't commit this).

Paste location: **`port-terraform/.env`** (new file; paste and then update the credential values):

```bash
export TF_VAR_port_client_id="your_client_id"
export TF_VAR_port_client_secret="your_client_secret"
export TF_VAR_port_base_url="https://api.getport.io"
```

Load the variables:
```bash
source .env
```

### Step 6: Initialize Terraform
```bash
terraform init
```

## Creating Blueprints with Terraform

### Step 7: Define Service Blueprint
Create `blueprints.tf`.

Paste location: **`port-terraform/blueprints.tf`** (new file; paste this resource configuration):

```hcl
resource "port_blueprint" "service" {
  title      = "Service"
  icon       = "Service"
  identifier = "service"
  
  properties = {
    string_props = {
      "name" = {
        title    = "Name"
        required = true
      }
      "description" = {
        title    = "Description"
        required = false
      }
      "language" = {
        title    = "Programming Language"
        required = true
        enum     = ["Python", "JavaScript", "Java", "Go", "TypeScript"]
      }
      "repository_url" = {
        title  = "Repository URL"
        format = "url"
      }
    }
    
    boolean_props = {
      "archived" = {
        title    = "Archived"
        required = true
        default  = false
      }
    }
    
    array_props = {
      "topics" = {
        title = "Topics"
        string_items = {}
      }
    }
  }
}
```

### Step 8: Define Team Blueprint with Relationships
Paste location: continue editing **`port-terraform/blueprints.tf`** (append this second blueprint resource and relationship block below the previous one):
```hcl
resource "port_blueprint" "team" {
  title      = "Team"
  icon       = "Team"
  identifier = "team"
  
  properties = {
    string_props = {
      "name" = {
        title    = "Team Name"
        required = true
      }
      "slack_channel" = {
        title = "Slack Channel"
      }
    }
    
    array_props = {
      "members" = {
        title = "Team Members"
        string_items = {}
      }
    }
  }
}

# Add relationship from Service to Team
resource "port_blueprint" "service_with_team" {
  depends_on = [port_blueprint.service, port_blueprint.team]
  
  title      = "Service"
  icon       = "Service"
  identifier = "service"
  
  properties = {
    # ... (previous properties)
    
    string_props = {
      "name" = {
        title    = "Name"
        required = true
      }
      "description" = {
        title    = "Description"
        required = false
      }
      "language" = {
        title    = "Programming Language"
        required = true
        enum     = ["Python", "JavaScript", "Java", "Go", "TypeScript"]
      }
    }
    
    boolean_props = {
      "archived" = {
        title    = "Archived"
        required = true
        default  = false
      }
    }
  }
  
  relations = {
    "team" = {
      title    = "Team"
      target   = "team"
      required = false
      many     = false
    }
  }
}
```

### Step 9: Apply Configuration
```bash
# From inside `port-terraform/`
terraform plan
terraform apply
```

> The HCL snippets in this module are designed to be copy-paste ready. You can also use the full TechCorp data model description in `examples/techcorp-data-model.md` together with the blueprints in `examples/blueprints/` as a reference when expanding your Terraform resources.

## Managing Actions with Terraform

### Step 10: Create Action Configuration
Create `actions.tf`.

Paste location: **`port-terraform/actions.tf`** (new file; paste this action resource and adjust as needed):

```hcl
resource "port_action" "deploy_service" {
  title      = "Deploy Service"
  icon       = "Rocket"
  identifier = "deploy_service"
  blueprint  = "service"
  
  user_properties = {
    string_props = {
      "environment" = {
        title    = "Target Environment"
        required = true
        enum     = ["staging", "production"]
        default  = "staging"
      }
      "notes" = {
        title       = "Deployment Notes"
        description = "Optional notes about this deployment"
      }
    }
  }
  
  github_method = {
    org          = "techcorp-demo"
    repo         = "deployment-workflows"
    workflow     = "deploy-service.yml"
    workflow_inputs = jsonencode({
      service_name      = "{{ .entity.identifier }}"
      target_environment = "{{ .inputs.environment }}"
      deployment_notes  = "{{ .inputs.notes }}"
      triggered_by      = "{{ .trigger.by.user.email }}"
    })
  }
}
```

## Advanced Terraform Patterns

### Module Structure
Organize configurations into modules:

```
port-terraform/
├── modules/
│   ├── blueprints/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── actions/
│   └── scorecards/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── production/
└── main.tf
```

### Environment-Specific Configurations
Create `environments/dev/main.tf`.

Paste location: **`port-terraform/environments/dev/main.tf`** (new file; paste this module wiring configuration):

```hcl
module "blueprints" {
  source = "../../modules/blueprints"
  
  environment = "dev"
  
  # Dev-specific overrides
  enable_experimental_features = true
}

module "actions" {
  source = "../../modules/actions"
  
  environment = "dev"
  
  # Point to dev workflows
  github_org  = "techcorp-dev"
  github_repo = "dev-workflows"
}
```

## CI/CD for Port Configurations

### Step 11: GitHub Actions Workflow
Create `.github/workflows/port-terraform.yml`:

```yaml
name: Port Terraform

on:
  push:
    branches: [main]
    paths: ['terraform/**']
  pull_request:
    branches: [main]
    paths: ['terraform/**']

jobs:
  terraform:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
      with:
        terraform_version: 1.5.0
    
    - name: Terraform Init
      run: terraform init
      working-directory: ./terraform
      
    - name: Terraform Plan
      run: terraform plan
      working-directory: ./terraform
      env:
        TF_VAR_port_client_id: ${{ secrets.PORT_CLIENT_ID }}
        TF_VAR_port_client_secret: ${{ secrets.PORT_CLIENT_SECRET }}
    
    - name: Terraform Apply
      if: github.ref == 'refs/heads/main'
      run: terraform apply -auto-approve
      working-directory: ./terraform
      env:
        TF_VAR_port_client_id: ${{ secrets.PORT_CLIENT_ID }}
        TF_VAR_port_client_secret: ${{ secrets.PORT_CLIENT_SECRET }}
```

## Exercise: Create Complete TechCorp Configuration

Create a comprehensive Terraform configuration for TechCorp:

### Requirements
1. **Blueprints**: Service, Team, Environment, Release
2. **Relationships**: 
   - Service → Team (many-to-one)
   - Service → Environment (one-to-many)
   - Service → Release (one-to-many)
3. **Actions**: Deploy Service, Create Environment
4. **Scorecard**: Production Readiness

### Terraform Structure
```hcl
# blueprints.tf
resource "port_blueprint" "service" { /* ... */ }
resource "port_blueprint" "team" { /* ... */ }
resource "port_blueprint" "environment" { /* ... */ }
resource "port_blueprint" "release" { /* ... */ }

# actions.tf
resource "port_action" "deploy_service" { /* ... */ }
resource "port_action" "create_environment" { /* ... */ }

# scorecards.tf
resource "port_scorecard" "production_readiness" { /* ... */ }
```

## Best Practices

### Configuration Management
- **Version Control**: Always use Git for Terraform configurations
- **State Management**: Use remote state (S3, Terraform Cloud)
- **Environment Separation**: Separate configurations per environment
- **Module Reuse**: Create reusable modules for common patterns

### Security
- **Secrets Management**: Never commit API credentials
- **Least Privilege**: Use minimal required permissions
- **State Encryption**: Encrypt Terraform state files
- **Access Control**: Limit who can apply Terraform changes

### Operational Excellence
- **Documentation**: Document all configurations and decisions
- **Testing**: Validate configurations before applying
- **Monitoring**: Track configuration drift and changes
- **Rollback Plans**: Have procedures for reverting changes

## 🎯 Self-Assessment Checkpoint

### Knowledge Check
Rate your understanding (1-5 scale, where 1=No understanding, 5=Expert level):

- [ ] Infrastructure-as-code concepts and benefits: ___/5
- [ ] Terraform provider configuration and usage: ___/5
- [ ] Port resource management through Terraform: ___/5
- [ ] CI/CD integration strategies: ___/5

### Skill Validation
Check off the skills you can confidently demonstrate:

- [ ] **Provider Setup**: Can configure Port Terraform provider with credentials
- [ ] **Resource Management**: Can create and manage Port resources via Terraform
- [ ] **Configuration Design**: Can structure Terraform projects appropriately
- [ ] **Automation Integration**: Can implement CI/CD for Port configurations

### Confidence Assessment
How confident are you in applying what you learned?

- [ ] **Very Confident**: Ready to implement Port infrastructure-as-code in production
- [ ] **Confident**: Can manage most Port configurations with Terraform
- [ ] **Somewhat Confident**: Need guidance for complex Terraform scenarios
- [ ] **Not Confident**: Require significant support for infrastructure-as-code

### Success Indicators
You've successfully completed this module when you can:

**Knowledge Indicators:**
- [ ] Explain the benefits of managing Port configurations as code
- [ ] Understand Terraform state management and team collaboration
- [ ] Know when to use Terraform vs UI for Port management
- [ ] Describe CI/CD strategies for Port configuration deployment

**Skill Indicators:**
- [ ] Set up Port Terraform provider with proper authentication
- [ ] Create blueprints and actions using Terraform configuration
- [ ] Apply Terraform changes successfully without errors
- [ ] Design appropriate project structure for team collaboration

**Application Indicators:**
- [ ] Plan migration strategy from UI to Terraform management
- [ ] Design infrastructure-as-code workflows for your organization
- [ ] Implement proper security practices for Terraform and Port
- [ ] Create reusable modules for common Port configuration patterns

## End State & Further Reading

By the end of this module, your environment should:
- Include a working Terraform project that can `terraform plan` and `terraform apply` Port resources without errors
- Manage at least one Port blueprint and one action via Terraform instead of only through the UI
- Give you a clear idea of how you would extend this structure to multiple environments (dev/staging/prod)

To explore the latest capabilities of the Port Terraform provider, visit `https://docs.port.io` and search for **Terraform provider** or **Infrastructure as code**.





### 🎉 Workshop Completion
**Congratulations!** You've completed all 7 modules of the Port workshop. You now have the skills to:
- Navigate and configure Port effectively
- Design data models with blueprints
- Set up integrations and data sources
- Create dashboards and visualizations
- Build self-service actions and workflows
- Implement quality tracking with scorecards
- Manage Port configurations as infrastructure-as-code

**Next Steps**: Explore the [challenges](../../challenges/) to practice your skills or start implementing Port in your organization!

## Common Issues & Solutions

**Problem**: Provider authentication fails  
**Solution**: Verify client ID, secret, and base URL are correct

**Problem**: Resource already exists error  
**Solution**: Import existing resources or use `terraform import`

**Problem**: Relationship validation errors  
**Solution**: Ensure target blueprints exist before creating relationships

**Problem**: State file conflicts  
**Solution**: Use remote state backend and proper locking

**Still stuck or think you've found a bug (for example, errors from the Port provider that don’t match the examples)?** See [Bug Reporting & Support](../../README.md#bug-reporting--support) for how to report workshop issues or Port product behavior.

## Next Steps

Congratulations! You've completed all Port workshop modules. Consider:
- Implementing Port in your organization
- Contributing to the Port community
- Exploring advanced Port features
- Building custom integrations

## Quick Reference

### Common Terraform Commands
```bash
terraform init          # Initialize working directory
terraform plan          # Preview changes
terraform apply         # Apply changes
terraform destroy       # Destroy resources
terraform import        # Import existing resources
terraform state list    # List resources in state
terraform state show    # Show resource details
```

### Port Resource Types
- `port_blueprint`: Data model definitions
- `port_action`: Self-service workflows
- `port_scorecard`: Quality tracking
- `port_page`: Dashboard configurations
- `port_integration`: Data source connections

---

**Completed Module 7?** You've finished the Port workshop! Check out the [challenges](../../challenges/) to practice your new skills.