# Module 3: Data Sources - Integrations and Data Ingestion

## 🧭 Navigation

**Previous**: [Module 2: Blueprints](../02-blueprints/) | **Next**: [Module 4: Dashboards](../04-dashboards/)

**Learning Path**: [Choose Your Path](../../README.md#-choose-your-learning-path) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 60-90 minutes | 📋 **Prerequisites**: [Module 2](../02-blueprints/) completed

**Progress**: Module 3 of 7 | **Completion**: 43% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Understand how Port integrates with external systems
- Configure GitHub integration to populate blueprints
- Write and test data mapping configurations
- Troubleshoot common integration issues

## Prerequisites
- Completed [Module 2: Blueprints](../02-blueprints/)
- Basic understanding of YAML and JSON
- Familiarity with JQ syntax (helpful but not required)

## Duration
**Estimated Time**: 60-90 minutes

## Key Concepts

### What are Data Sources?
Data Sources are integrations that automatically import data from external systems into Port. They:
- **Connect** to external APIs (GitHub, Jenkins, Kubernetes, etc.)
- **Extract** relevant data from those systems
- **Transform** the data to match your blueprint structure
- **Load** the data as entities in Port

### Integration Architecture
```
External System → Port Integration → Data Mapping → Port Entities
     (GitHub)   →   (GitHub App)   →    (YAML)    →   (Services)
```

### TechCorp Integration Strategy
For our workshop, TechCorp uses:
- **GitHub**: Source code repositories and releases
- **Generic APIs**: Public APIs for demonstration
- **Mock Data**: Realistic but fictional data for practice

## Hands-On Exercise: Configure GitHub Release Integration

Let's configure the GitHub integration to populate our GitHub Release blueprint.

### Step 1: Access Data Sources
1. Navigate to **Builder** → **Data Sources**
2. Look for existing integrations (you might see GitHub already configured)
3. Click the **...** menu on a GitHub integration and select **Edit**

### Step 2: Understand the Interface
The integration editor has three sections:

#### Kinds to Test
- Shows available data types from GitHub
- Each "kind" represents a different resource (repository, pull_request, release)
- Click on different kinds to see sample data

#### Mapping Configuration
- YAML configuration that defines how data is imported
- Uses JQ syntax for data transformation
- Defines which blueprints receive which data

#### Test Results
- Shows what entities would be created with current configuration
- Helps validate your mapping before saving

### Step 3: Add Release Mapping
Add this configuration to map GitHub releases to your blueprint:

```yaml
- kind: release
  selector:
    query: 'true'  # Import all releases
  port:
    entity:
      mappings:
        blueprint: 'github_release'
        identifier: .id | tostring
        title: .name
        properties:
          tag_name: .tag_name
          release_notes: .body
          release_date: .published_at
        relations:
          service: .repository.name
```

### Step 4: Test the Mapping
1. In **Kinds to Test**, select `release`
2. You'll see sample GitHub release data
3. Click **Test Mapping** in the **Test Results** section
4. Verify the output matches your expectations

Expected test result:
```json
{
  "blueprint": "github_release",
  "identifier": "12345",
  "title": "v1.2.0",
  "properties": {
    "tag_name": "v1.2.0",
    "release_notes": "Bug fixes and improvements",
    "release_date": "2024-01-15T10:30:00Z"
  },
  "relations": {
    "service": "ecommerce-api"
  }
}
```

### Step 5: Save and Sync
1. Click **Save & Resync**
2. Wait for the integration to process
3. Check **Catalog** → **GitHub Releases** to see imported data

## Understanding Data Mapping

### JQ Syntax Basics
JQ is used to extract and transform data from API responses:

| JQ Expression | Description | Example |
|---------------|-------------|---------|
| `.field` | Extract a field | `.name` → "ecommerce-api" |
| `.field.subfield` | Extract nested field | `.repository.name` |
| `\| tostring` | Convert to string | `.id \| tostring` |
| `\| select(...)` | Filter data | `\| select(.archived == false)` |

### Common Mapping Patterns

#### Basic Property Mapping
```yaml
properties:
  name: .name
  description: .description
  language: .language
```

#### Conditional Mapping
```yaml
properties:
  status: if .archived then "archived" else "active" end
```

#### Array Handling
```yaml
properties:
  topics: .topics
  collaborators: [.collaborators[].login]
```

## Exercise: Update Service Blueprint Integration

Let's enhance the existing Service blueprint mapping to include new properties.

### Current Service Properties
The Service blueprint likely has:
- name
- description
- language
- url

### Add New Properties
Update the GitHub integration to include:
- **archived** (boolean) - whether the repository is archived
- **default_branch** (string) - the main branch name
- **topics** (array) - repository topics/tags

### Updated Mapping Configuration
```yaml
- kind: repository
  selector:
    query: 'true'
  port:
    entity:
      mappings:
        blueprint: 'service'
        identifier: .name
        title: .name
        properties:
          description: .description
          language: .language
          url: .html_url
          archived: .archived
          default_branch: .default_branch
          topics: .topics
```

## Integration Best Practices

### Selector Queries
- Use `'true'` to import all data
- Use filters to limit data: `.archived == false`
- Combine conditions: `.archived == false and .language == "Python"`

### Identifier Strategy
- Use stable, unique identifiers
- Convert numbers to strings: `.id | tostring`
- Use meaningful names when possible: `.name` instead of `.id`

### Error Handling
- Test mappings thoroughly before saving
- Use conditional expressions for optional fields
- Handle missing data gracefully

### Performance Considerations
- Limit data with selector queries when possible
- Avoid importing unnecessary large datasets
- Use appropriate sync frequencies

## 🎯 Self-Assessment Checkpoint

### Knowledge Check
Rate your understanding (1-5 scale, where 1=No understanding, 5=Expert level):

- [ ] Data sources and integration concepts: ___/5
- [ ] JQ syntax for data transformation: ___/5
- [ ] GitHub integration configuration: ___/5
- [ ] Mapping testing and validation: ___/5

### Skill Validation
Check off the skills you can confidently demonstrate:

- [ ] **Integration Navigation**: Can navigate the three-panel integration editor
- [ ] **Mapping Configuration**: Can write and modify YAML mapping configurations
- [ ] **JQ Transformations**: Can write basic JQ expressions for data extraction
- [ ] **Testing and Validation**: Can test mappings before deployment

### Confidence Assessment
How confident are you in applying what you learned?

- [ ] **Very Confident**: Ready to configure complex integrations
- [ ] **Confident**: Can handle most integration scenarios
- [ ] **Somewhat Confident**: Need guidance for complex mappings
- [ ] **Not Confident**: Require significant support for integrations

### Success Indicators
You've successfully completed this module when you can:

**Knowledge Indicators:**
- [ ] Explain the data flow from external systems to Port entities
- [ ] Describe how JQ transformations work
- [ ] Understand the purpose of selector queries
- [ ] Know when to use different mapping patterns

**Skill Indicators:**
- [ ] Navigate the data sources interface independently
- [ ] Configure GitHub release integration mapping
- [ ] Test mapping configurations before saving
- [ ] Troubleshoot common mapping issues

**Application Indicators:**
- [ ] Plan integration strategies for your organization
- [ ] Design appropriate data mappings for real scenarios
- [ ] Identify when to use different JQ expressions



## Troubleshooting Common Issues

### No Data Appearing
1. Check selector query - might be too restrictive
2. Verify blueprint identifier matches mapping
3. Ensure required properties are mapped
4. Check integration sync status

### Mapping Errors
1. Validate JQ syntax in test panel
2. Check for typos in property identifiers
3. Verify data types match blueprint definitions
4. Test with sample data first

### Relationship Issues
1. Ensure related entities exist
2. Check relationship identifier mapping
3. Verify relationship cardinality settings
4. Test relationship mapping separately

## Next Steps

With data flowing into Port, you're ready to visualize it:
- **[Module 4: Dashboards](../04-dashboards/)** - Create dashboards and widgets to display your data

## Quick Reference

### Common JQ Expressions
```yaml
# Basic field extraction
.field_name

# Nested field extraction
.parent.child

# Convert to string
.number_field | tostring

# Conditional mapping
if .condition then "value1" else "value2" end

# Array mapping
[.array_field[].sub_field]

# Filter arrays
.array_field | map(select(.status == "active"))
```

### Integration Checklist
- [ ] Blueprint exists and has correct properties
- [ ] Mapping YAML syntax is valid
- [ ] Test results show expected entity structure
- [ ] Required properties are mapped
- [ ] Relationships point to existing entities
- [ ] Selector query imports appropriate data

---

**Completed Module 3?** Continue to [Module 4: Dashboards](../04-dashboards/) to learn how to visualize your Port data.