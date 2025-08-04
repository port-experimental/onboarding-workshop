# Module 5: Actions - Facilitator Notes

## Workshop Delivery Guidance

**Pre-Module Setup (15 minutes)**
- Ensure participants have completed Module 4 (dashboards working)
- Verify access to Self-Service section and action creation
- Test GitHub Actions integration or webhook endpoints beforehand
- Have sample payload templates ready for demonstration
- Prepare backup demo workflows if GitHub integration isn't available

**Module Timing**
- **Concepts Introduction**: 20-25 minutes (actions overview, backend types)
- **Action Creation Exercise**: 35-45 minutes (deploy service action)
- **Payload Configuration**: 20-25 minutes (templating and testing)
- **Environment Setup Exercise**: 20-30 minutes (webhook action)
- **Permissions & Best Practices**: 15-20 minutes

**Key Teaching Points**
1. **Self-Service Philosophy**: Actions reduce bottlenecks and empower developers
2. **Backend Flexibility**: Port can trigger many different systems
3. **Payload Design**: Good templates make actions reliable and informative
4. **Security First**: Always consider permissions and approval workflows

## Demonstration Flow

**Live Demo Sequence:**
1. Show existing actions and their purposes
2. Navigate through action creation wizard step-by-step
3. Demonstrate different input types and their use cases
4. Build payload template incrementally, explaining each part
5. Test action execution and show result tracking
6. Discuss error handling and troubleshooting approaches

## Payload Teaching Strategy

**Start Simple:**
```json
{
  "service_name": "{{ .inputs.service.identifier }}",
  "user_email": "{{ .trigger.by.user.email }}"
}
```

**Add Complexity Gradually:**
```json
{
  "service_name": "{{ .inputs.service.identifier }}",
  "service_title": "{{ .inputs.service.title }}",
  "target_environment": "{{ .inputs.target_environment }}",
  "triggered_by": "{{ .trigger.by.user.email }}",
  "port_run_id": "{{ .run.id }}",
  "timestamp": "{{ .trigger.at }}"
}
```

**Show Advanced Patterns:**
```json
{
  "conditional_field": "{{ if .inputs.notes }}{{ .inputs.notes }}{{ else }}No notes provided{{ end }}",
  "array_handling": {{ .inputs.service.properties.topics | toJson }},
  "null_omission": "{{ if .inputs.optional_field }}{{ .inputs.optional_field }}{{ end }}"
}
```

## Common Questions & Answers

**Q: "What happens if the backend system is down when an action runs?"**  
A: Port will show the action as failed. Some backends support retry logic, or you can re-run manually.

**Q: "Can I test actions without actually triggering the backend?"**  
A: Not directly in Port, but you can use webhook testing tools or create test endpoints.

**Q: "How do I know what data is available in the payload template?"**  
A: Port documentation shows the trigger data structure, or you can log full payload for debugging.

**Q: "Can actions modify Port entities directly?"**  
A: Yes, using the "Create/Update Entity" backend type, but be careful with data consistency.

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Action not appearing | Check permissions, verify action is published |
| Payload template errors | Validate JSON syntax, check template variable names |
| Backend not receiving data | Verify webhook URL, check authentication |
| Action fails immediately | Check required inputs, validate backend configuration |
| Template variables empty | Verify input names match exactly, check data availability |

## Extension Activities

**For Fast Learners:**
- Create multi-step action forms
- Experiment with conditional input display
- Build actions that update Port entities
- Try different backend types (Slack, Kafka, etc.)

**For Groups:**
- Brainstorm self-service scenarios for their organizations
- Discuss approval workflow strategies
- Share experiences with automation tools
- Design action workflows for common development tasks

## Assessment Checkpoints

Ensure participants can demonstrate:
- [ ] Create a new self-service action
- [ ] Configure different input types and validation
- [ ] Write payload templates using trigger data
- [ ] Set up backend integration (GitHub Actions or webhook)
- [ ] Test action execution and interpret results
- [ ] Configure basic permissions

## Advanced Discussion Topics

**Action Design Patterns:**
- Idempotent vs non-idempotent actions
- Error handling and rollback strategies
- Action chaining and workflow orchestration
- Integration with existing CI/CD pipelines

**Security Considerations:**
- Input validation and sanitization
- Secrets management in payloads
- Audit logging and compliance
- Rate limiting and abuse prevention

**Operational Excellence:**
- Action monitoring and alerting
- Performance optimization
- User adoption strategies
- Maintenance and updates

## Hands-On Workshop Extension

**Action Design Workshop (30 minutes):**
1. **Scenario**: "Design 3 actions for TechCorp's development workflow"
2. **Requirements**: 
   - One deployment action
   - One environment management action
   - One documentation/communication action
3. **Deliverable**: Action specifications with inputs and backend design
4. **Discussion**: Compare approaches and identify common patterns

## Backend Integration Strategies

**GitHub Actions:**
- Best for: CI/CD workflows, code operations
- Considerations: Repository access, workflow permissions
- Testing: Use repository dispatch events for flexibility

**Webhooks:**
- Best for: Custom integrations, internal APIs
- Considerations: Authentication, error handling, timeouts
- Testing: Use tools like ngrok for local development

**Slack/Teams:**
- Best for: Notifications, approvals, communication
- Considerations: Channel permissions, message formatting
- Testing: Use test channels to avoid spam