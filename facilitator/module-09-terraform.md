# Module 7: Terraform - Facilitator Notes

## Workshop Delivery Guidance

**Pre-Module Setup (15 minutes)**
- Ensure participants have completed Module 6 (scorecards working)
- Verify Terraform is installed on participant machines
- Test Port API credentials and provider setup beforehand
- Have sample Terraform configurations ready for demonstration
- Prepare backup cloud environment if local setup fails

**Module Timing**
- **Concepts Introduction**: 20-25 minutes (IaC benefits, provider overview)
- **Provider Setup**: 20-25 minutes (credentials, initialization)
- **Blueprint Creation**: 25-30 minutes (Terraform blueprint configuration)
- **Action Configuration**: 20-25 minutes (Terraform action setup)
- **CI/CD Discussion**: 15-20 minutes (automation strategies)
- **Best Practices**: 10-15 minutes

**Key Teaching Points**
1. **Infrastructure as Code Benefits**: Version control, reproducibility, collaboration
2. **Port Provider Capabilities**: What can and cannot be managed via Terraform
3. **State Management**: Importance of remote state and team collaboration
4. **CI/CD Integration**: Automating Port configuration deployments

## Demonstration Flow

**Live Demo Sequence:**
1. Show Port credentials and API access setup
2. Demonstrate Terraform provider configuration step-by-step
3. Create simple blueprint using Terraform
4. Show terraform plan/apply workflow
5. Demonstrate state management and drift detection
6. Build action configuration incrementally
7. Show CI/CD pipeline integration example

## Terraform Teaching Strategy

**Start Simple:**
```hcl
# Basic provider setup
provider "port" {
  client_id     = var.port_client_id
  client_secret = var.port_client_secret
}
```

**Add Complexity Gradually:**
```hcl
# Simple blueprint
resource "port_blueprint" "service" {
  title      = "Service"
  identifier = "service"
  
  properties = {
    string_props = {
      "name" = {
        title    = "Name"
        required = true
      }
    }
  }
}
```

**Show Advanced Patterns:**
```hcl
# Blueprint with relationships and complex properties
resource "port_blueprint" "service" {
  title      = "Service"
  identifier = "service"
  
  properties = {
    string_props = {
      "language" = {
        title = "Language"
        enum  = ["Python", "JavaScript", "Java"]
      }
    }
  }
  
  relations = {
    "team" = {
      title  = "Team"
      target = "team"
      many   = false
    }
  }
}
```

## Common Questions & Answers

**Q: "Should I manage everything in Terraform or use the UI for some things?"**  
A: Start with Terraform for core infrastructure (blueprints, actions). UI is fine for experimentation and one-off changes.

**Q: "What happens if I change something in the UI that's managed by Terraform?"**  
A: Terraform will detect drift and revert changes on next apply. Use `terraform import` for intentional UI changes.

**Q: "How do I handle secrets in Terraform configurations?"**  
A: Use environment variables, Terraform Cloud, or external secret management. Never commit secrets to version control.

**Q: "Can I use Terraform to manage Port entities (not just blueprints)?"**  
A: Yes, but it's usually better to let integrations manage entities. Use Terraform for configuration, not data.

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Provider authentication fails | Verify client ID/secret, check base URL |
| Resource already exists | Use `terraform import` to bring existing resources under management |
| State file conflicts | Use remote state backend, ensure proper locking |
| Plan shows unexpected changes | Check for manual UI changes, review resource configuration |
| Apply fails with API errors | Verify Port permissions, check resource dependencies |

## Extension Activities

**For Fast Learners:**
- Set up remote state backend (S3, Terraform Cloud)
- Create modules for reusable Port configurations
- Implement complete CI/CD pipeline for Port changes
- Explore advanced Terraform features (workspaces, etc.)

**For Groups:**
- Discuss Terraform best practices from their organizations
- Design module structure for Port configurations
- Plan migration strategy from UI to Terraform management
- Share experiences with infrastructure-as-code tools

## Assessment Checkpoints

Ensure participants can demonstrate:
- [ ] Set up Port Terraform provider with credentials
- [ ] Create blueprints using Terraform configuration
- [ ] Understand terraform plan/apply workflow
- [ ] Configure actions through Terraform
- [ ] Explain benefits of infrastructure-as-code for Port
- [ ] Set up basic CI/CD for Port configurations

## Advanced Discussion Topics

**Terraform Strategy:**
- Module design patterns for Port configurations
- State management strategies for teams
- Environment separation (dev/staging/prod)
- Configuration drift detection and remediation

**Operational Excellence:**
- Automated testing of Terraform configurations
- Rollback strategies for failed deployments
- Monitoring and alerting for configuration changes
- Documentation and change management processes

**Team Collaboration:**
- Code review processes for Port configurations
- Access control and permissions for Terraform
- Training and onboarding for infrastructure-as-code
- Integration with existing DevOps workflows

## Hands-On Workshop Extension

**Infrastructure Design Workshop (30 minutes):**
1. **Scenario**: "Design Terraform structure for TechCorp's Port configuration"
2. **Requirements**: 
   - Multiple environments (dev/staging/prod)
   - Reusable modules for common patterns
   - CI/CD integration strategy
   - Team collaboration workflow
3. **Deliverable**: Terraform project structure and deployment strategy
4. **Discussion**: Compare approaches and identify best practices

## CI/CD Integration Patterns

**GitHub Actions:**
```yaml
name: Port Terraform
on:
  push:
    branches: [main]
    paths: ['terraform/**']
jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v2
    - name: Terraform Apply
      run: terraform apply -auto-approve
      env:
        TF_VAR_port_client_id: ${{ secrets.PORT_CLIENT_ID }}
```

**GitLab CI:**
```yaml
terraform:
  stage: deploy
  script:
    - terraform init
    - terraform plan
    - terraform apply -auto-approve
  variables:
    TF_VAR_port_client_id: $PORT_CLIENT_ID
  only:
    - main
```

## Migration Strategies

**From UI to Terraform:**
1. **Audit Current State**: Document existing Port configuration
2. **Prioritize Resources**: Start with blueprints, then actions, then pages
3. **Import Existing**: Use `terraform import` for critical resources
4. **Gradual Migration**: Move resources incrementally, not all at once
5. **Validation**: Ensure no functionality is lost during migration

**Team Adoption:**
1. **Training**: Ensure team understands Terraform basics
2. **Documentation**: Clear procedures for common tasks
3. **Tooling**: Set up development environment and CI/CD
4. **Governance**: Establish review and approval processes
5. **Support**: Provide ongoing help and troubleshooting

## Security Considerations

**Credential Management:**
- Use environment variables or secret management systems
- Rotate API credentials regularly
- Limit Terraform service account permissions
- Audit access to Terraform state files

**Access Control:**
- Restrict who can apply Terraform changes
- Use branch protection and required reviews
- Implement approval workflows for production changes
- Monitor and log all configuration changes

**State Security:**
- Encrypt Terraform state files
- Use remote state with access controls
- Regular state file backups
- Secure state locking mechanisms