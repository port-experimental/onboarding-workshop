# Module 6: Scorecards - Quality Tracking and Metrics

## 🧭 Navigation

**Previous**: [Module 5: Actions](../05-actions/) | **Next**: [Module 7: Terraform](../07-terraform/)

**Learning Path**: [Choose Your Path](../../README.md#-choose-your-learning-path) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 60-75 minutes | 📋 **Prerequisites**: [Module 5](../05-actions/) completed

**Progress**: Module 6 of 7 | **Completion**: 86% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Understand Port's scorecard system for quality tracking
- Create scorecards with levels and rules
- Configure quality metrics for your services
- Design effective quality frameworks for your organization

## Prerequisites
- Completed [Module 5: Actions](../05-actions/)
- Understanding of quality metrics and compliance concepts
- Familiarity with JSON configuration

## Duration
**Estimated Time**: 60-75 minutes

## Key Concepts

### What are Scorecards?
[Scorecards](../../resources/glossary.md#scorecard) in Port provide a framework for measuring and tracking quality across your software catalog. They enable:
- **Quality Measurement**: Define what "good" looks like for your services
- **Compliance Tracking**: Monitor adherence to organizational standards
- **Improvement Guidance**: Show teams what they need to improve
- **Visibility**: Make quality metrics visible across the organization

### Scorecard Components

| Component | Description | Example |
|-----------|-------------|---------|
| **Levels** | Quality tiers (Bronze, Silver, Gold) | Basic → Production Ready → Excellent |
| **Rules** | Specific quality checks | "Has README", "Has tests" |
| **Filters** | Which entities the scorecard applies to | Only active services |
| **Scoring** | How entities achieve each level | Pass all Bronze rules → Bronze level |

### TechCorp Quality Framework
For our workshop, TechCorp wants to track:
- **Production Readiness**: Is the service ready for production?
- **Security Compliance**: Does the service meet security standards?
- **Developer Experience**: Is the service easy to work with?

## Hands-On Exercise: Create Production Readiness Scorecard

Let's create a scorecard to track production readiness for TechCorp services.

### Step 1: Access Scorecard Configuration
1. Navigate to **Builder** → **Data Model**
2. Find the **Service** blueprint
3. Click on the **Scorecards** tab
4. Click **+ Scorecard**

### Step 2: Configure Basic Information

Paste location: **Builder → Data Model → Service blueprint → Scorecards tab → JSON editor** (empty scorecard JSON; start with this basic information block):
```json
{
  "identifier": "production_readiness",
  "title": "Production Readiness",
  "description": "Measures how ready a service is for production deployment"
}
```

### Step 3: Define Quality Levels

Paste location: same scorecard JSON editor as above (existing JSON; merge this `levels` definition into your configuration):
```json
{
  "levels": [
    {
      "color": "paleBlue",
      "title": "Basic"
    },
    {
      "color": "bronze", 
      "title": "Bronze"
    },
    {
      "color": "silver",
      "title": "Silver"
    },
    {
      "color": "gold",
      "title": "Gold"
    }
  ]
}
```

### Step 4: Create Quality Rules
Add rules that define what each level requires:

#### Bronze Level Rule: Has Documentation

Paste location: same scorecard JSON editor (existing `rules` array; add this rule object into the array):
```json
{
  "identifier": "has_documentation",
  "title": "Has Documentation",
  "level": "Bronze",
  "query": {
    "combinator": "and",
    "conditions": [
      {
        "operator": "isNotEmpty",
        "property": "description"
      }
    ]
  }
}
```

#### Silver Level Rule: Uses Supported Language

Paste location: same scorecard JSON editor (existing `rules` array; append this rule object):
```json
{
  "identifier": "supported_language",
  "title": "Uses Supported Language",
  "level": "Silver", 
  "query": {
    "combinator": "or",
    "conditions": [
      {
        "operator": "=",
        "property": "language",
        "value": "Python"
      },
      {
        "operator": "=",
        "property": "language", 
        "value": "JavaScript"
      },
      {
        "operator": "=",
        "property": "language",
        "value": "Java"
      }
    ]
  }
}
```

#### Gold Level Rule: Not Archived

Paste location: same scorecard JSON editor (existing `rules` array; append this rule object):
```json
{
  "identifier": "active_service",
  "title": "Active Service",
  "level": "Gold",
  "query": {
    "combinator": "and",
    "conditions": [
      {
        "operator": "=",
        "property": "archived",
        "value": false
      }
    ]
  }
}
```

### Step 5: Add Filters (Optional)

Paste location: same scorecard JSON editor (existing JSON; add or update the top-level `filter` field with this object):
Only apply scorecard to relevant services:

```json
{
  "filter": {
    "combinator": "and",
    "conditions": [
      {
        "operator": "=",
        "property": "$blueprint",
        "value": "service"
      }
    ]
  }
}
```

### Step 6: Complete Scorecard Configuration

Paste location: same scorecard JSON editor (empty or existing configuration; you can replace everything with this complete example to match the module):
Here's the complete scorecard JSON:

```json
{
  "identifier": "production_readiness",
  "title": "Production Readiness", 
  "description": "Measures how ready a service is for production deployment",
  "levels": [
    {
      "color": "paleBlue",
      "title": "Basic"
    },
    {
      "color": "bronze",
      "title": "Bronze"
    },
    {
      "color": "silver", 
      "title": "Silver"
    },
    {
      "color": "gold",
      "title": "Gold"
    }
  ],
  "rules": [
    {
      "identifier": "has_documentation",
      "title": "Has Documentation",
      "level": "Bronze",
      "query": {
        "combinator": "and",
        "conditions": [
          {
            "operator": "isNotEmpty",
            "property": "description"
          }
        ]
      }
    },
    {
      "identifier": "supported_language",
      "title": "Uses Supported Language", 
      "level": "Silver",
      "query": {
        "combinator": "or",
        "conditions": [
          {
            "operator": "=",
            "property": "language",
            "value": "Python"
          },
          {
            "operator": "=",
            "property": "language",
            "value": "JavaScript"
          },
          {
            "operator": "=",
            "property": "language",
            "value": "Java"
          }
        ]
      }
    },
    {
      "identifier": "active_service",
      "title": "Active Service",
      "level": "Gold", 
      "query": {
        "combinator": "and",
        "conditions": [
          {
            "operator": "=",
            "property": "archived",
            "value": false
          }
        ]
      }
    }
  ]
}
```

> You can compare your scorecard with the more comprehensive examples in `examples/scorecards/` (for example, `service-quality.json` and `team-productivity.json`), which build on the same TechCorp model used in this module.

## Understanding Scorecard Logic

### Level Determination
An entity's level is determined by the **lowest level** where it passes **all rules**:

- **Basic**: Default level (no rules required)
- **Bronze**: Must pass all Bronze rules
- **Silver**: Must pass all Bronze AND Silver rules  
- **Gold**: Must pass all Bronze AND Silver AND Gold rules

### Example Scoring
For a service with:
- ✅ Has description (Bronze rule passes)
- ✅ Language is Python (Silver rule passes)
- ❌ Is archived (Gold rule fails)

**Result**: Silver level (passes Bronze and Silver, but fails Gold)

## Exercise: Create Security Compliance Scorecard

Create a scorecard to track security compliance:

### Requirements
1. **Identifier**: `security_compliance`
2. **Title**: `Security Compliance`
3. **Levels**: Basic, Compliant, Secure, Excellent
4. **Rules**:
   - **Compliant**: Has security contact (team property exists)
   - **Secure**: Uses HTTPS (URL starts with https://)
   - **Excellent**: Has recent activity (updated in last 30 days)

### Security Scorecard Template
```json
{
  "identifier": "security_compliance",
  "title": "Security Compliance",
  "levels": [
    {"color": "red", "title": "Basic"},
    {"color": "yellow", "title": "Compliant"}, 
    {"color": "green", "title": "Secure"},
    {"color": "darkGreen", "title": "Excellent"}
  ],
  "rules": [
    {
      "identifier": "has_team",
      "title": "Has Security Contact",
      "level": "Compliant",
      "query": {
        "combinator": "and",
        "conditions": [
          {
            "operator": "isNotEmpty",
            "property": "team"
          }
        ]
      }
    }
    // Add more rules here
  ]
}
```

## Advanced Scorecard Features

### Complex Rule Logic
Combine multiple conditions with AND/OR logic:

```json
{
  "query": {
    "combinator": "and",
    "conditions": [
      {
        "combinator": "or",
        "conditions": [
          {"operator": "=", "property": "language", "value": "Python"},
          {"operator": "=", "property": "language", "value": "Java"}
        ]
      },
      {
        "operator": "=",
        "property": "archived", 
        "value": false
      }
    ]
  }
}
```

### Property-Based Rules
Use different operators for various data types:

| Operator | Use Case | Example |
|----------|----------|---------|
| `=` / `!=` | Exact matching | `language = "Python"` |
| `>` / `<` | Numeric comparison | `score > 80` |
| `contains` | String contains | `description contains "API"` |
| `isEmpty` / `isNotEmpty` | Check for data | `team isNotEmpty` |
| `in` | Value in list | `status in ["active", "healthy"]` |

### Relationship-Based Rules
Create rules based on related entities:

```json
{
  "operator": "relatedEntityExists",
  "property": "releases",
  "conditions": [
    {
      "operator": ">",
      "property": "created_at",
      "value": "2024-01-01"
    }
  ]
}
```

## Scorecard Best Practices

### Design Principles
- **Progressive Difficulty**: Make each level meaningfully harder
- **Actionable Rules**: Teams should know how to improve their score
- **Relevant Metrics**: Measure what actually matters for quality
- **Achievable Goals**: Don't make Gold level impossible to reach

### Organizational Alignment
- **Stakeholder Input**: Include teams in scorecard design
- **Clear Communication**: Explain why each rule matters
- **Regular Review**: Update scorecards as standards evolve
- **Positive Reinforcement**: Celebrate improvements, not just compliance

### Technical Considerations
- **Performance**: Avoid overly complex rules that slow down evaluation
- **Data Quality**: Ensure underlying data is accurate and up-to-date
- **Rule Dependencies**: Consider how rules interact with each other
- **Filter Appropriately**: Don't apply scorecards to irrelevant entities

## 🎯 Self-Assessment Checkpoint

### Knowledge Check
Rate your understanding (1-5 scale, where 1=No understanding, 5=Expert level):

- [ ] Scorecard concepts and quality tracking: ___/5
- [ ] Level design and rule configuration: ___/5
- [ ] JSON syntax for scorecard rules: ___/5
- [ ] Quality framework design principles: ___/5

### Skill Validation
Check off the skills you can confidently demonstrate:

- [ ] **Scorecard Creation**: Can create scorecards with multiple levels and rules
- [ ] **Rule Configuration**: Can write rules using different operators and conditions
- [ ] **Level Logic**: Can understand and explain how level determination works
- [ ] **Quality Design**: Can design effective quality frameworks for organizations

### Confidence Assessment
How confident are you in applying what you learned?

- [ ] **Very Confident**: Ready to design comprehensive quality tracking systems
- [ ] **Confident**: Can create most scorecard scenarios with minimal guidance
- [ ] **Somewhat Confident**: Need occasional help with complex rule logic
- [ ] **Not Confident**: Require significant support for scorecard design

### Success Indicators
You've successfully completed this module when you can:

**Knowledge Indicators:**
- [ ] Explain what scorecards are and their business value
- [ ] Describe how level determination works (progressive requirements)
- [ ] Understand different rule operators and their use cases
- [ ] Know when to apply filters to limit scorecard scope

**Skill Indicators:**
- [ ] Create a new scorecard with multiple levels
- [ ] Write rules using different operators and conditions
- [ ] Configure scorecard filters appropriately
- [ ] View and interpret scorecard results in the catalog

**Application Indicators:**
- [ ] Design quality frameworks that align with business objectives
- [ ] Plan progressive quality levels that motivate improvement
- [ ] Create actionable rules that teams can understand and follow
- [ ] Identify appropriate quality metrics for different contexts

## End State & Further Reading

By the end of this module, your Port instance should:
- Contain at least one scorecard (for example, `Production Readiness`) attached to the `Service` blueprint
- Show colored scorecard levels on service entities in the **Catalog**
- Help you explain why a given service is at a particular level based on its rules

To go deeper on scorecards and quality frameworks, visit `https://docs.port.io` and search for **Scorecards** or **Quality tracking**.





## Common Issues & Solutions

**Problem**: All entities show "Basic" level  
**Solution**: Check rule syntax and ensure property names match blueprint exactly

**Problem**: Rules not evaluating correctly  
**Solution**: Verify data types match (string vs boolean vs number)

**Problem**: Scorecard not appearing on entities  
**Solution**: Check filters - they might be excluding all entities

**Problem**: Level logic seems wrong  
**Solution**: Remember: entity must pass ALL rules at a level AND all lower levels

**Still stuck or think you've found a bug?** See [Bug Reporting & Support](../../README.md#bug-reporting--support) for how to report workshop issues or Port product behavior.

## Next Steps

With quality tracking in place, you can manage everything as code:
- **[Module 7: Terraform](../07-terraform/)** - Manage Port configurations with infrastructure-as-code

## Quick Reference

### Common Rule Patterns
```json
// Has required field
{
  "operator": "isNotEmpty",
  "property": "field_name"
}

// Matches specific value
{
  "operator": "=", 
  "property": "field_name",
  "value": "expected_value"
}

// One of multiple values
{
  "combinator": "or",
  "conditions": [
    {"operator": "=", "property": "field", "value": "option1"},
    {"operator": "=", "property": "field", "value": "option2"}
  ]
}

// Numeric threshold
{
  "operator": ">",
  "property": "score",
  "value": 80
}
```

### Level Color Options
- `red`, `orange`, `yellow`, `green`, `darkGreen`
- `blue`, `darkBlue`, `purple`, `pink`
- `gray`, `lightGray`, `bronze`, `silver`, `gold`
- `paleBlue`, `turquoise`

---

**Completed Module 6?** Continue to [Module 7: Terraform](../07-terraform/) to learn infrastructure-as-code management for Port.