# Facilitator Guide — Module 11: Custom Integrations

## Module Summary
- **Duration**: 90 minutes
- **Audience**: Platform engineers who need to connect Port to non-native systems
- **Key outcome**: Participants can use the Port REST API, configure a webhook, and understand when to use Ocean

## Preparation
- Participants need Port API credentials ready before the session (Builder → ... → Credentials)
- Confirm Python 3.11+ is installed for the Ocean exercise
- Have a backup sample payload ready for the webhook section (JSON below) if participants don't have a PagerDuty account

Sample webhook test payload (PagerDuty-like):
```json
{
  "messages": [{
    "incident": {
      "id": "P123456",
      "title": "Database CPU at 95%",
      "status": "triggered",
      "urgency": "high",
      "summary": "Production database CPU spiking",
      "html_url": "https://example.pagerduty.com/incidents/P123456",
      "service": { "name": "ecommerce-api" }
    }
  }]
}
```

## Timing Guide

| Section | Time |
|---------|------|
| Decision tree discussion | 10 min |
| REST API: auth + CRUD | 20 min |
| Bulk CSV upsert exercise | 15 min |
| Webhook setup | 15 min |
| Ocean overview + scaffold | 20 min |
| Q&A | 10 min |

## Common Sticking Points

### Access token expiry during exercises
Tokens expire after 1 hour. If a participant gets 401 errors mid-exercise, they just need to re-run the auth curl call.

### `ocean new` scaffold fails
Usually a PATH issue. Run `python3 -m ocean new my-integration` as an alternative.

### Webhook mapping returns no entities
The most common cause: the JQ path doesn't match the actual payload structure. Use the webhook editor's **Test** tab with the sample payload to iterate on the mapping interactively.

## Discussion Questions
- "What systems in your org would benefit from being in Port that don't have a native integration?"
- "When would you choose a webhook over Ocean? What's the tipping point?"
