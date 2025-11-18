# Module 2: Blueprints - Data Modeling in Port

## 🧭 Navigation

**Previous**: [Module 1: Getting Started](../01-getting-started/) | **Next**: [Module 3: Data Sources](../03-data-sources/)

**Learning Path**: [Choose Your Path](../../README.md#-choose-your-learning-path) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 45-60 minutes | 📋 **Prerequisites**: [Module 1](../01-getting-started/) completed

**Progress**: Module 2 of 7 | **Completion**: 29% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Understand what blueprints are and how they work
- Create and configure blueprint properties
- Set up relationships between blueprints
- Design effective data models for your organization

## Prerequisites
- Completed [Module 1: Getting Started](../01-getting-started/)
- Basic understanding of data modeling concepts

## Duration
**Estimated Time**: 45-60 minutes

## Key Concepts

### What are Blueprints?
[Blueprints](../../resources/glossary.md#blueprint) are the foundation of Port's data model. They define:
- **Structure**: What [properties](../../resources/glossary.md#property) entities can have
- **Relationships**: How entities connect to each other
- **Validation**: Rules for data integrity
- **Visualization**: How entities appear in the catalog

Think of blueprints as templates or schemas that describe your software ecosystem.

### Blueprint Components

| Component | Description | Example |
|-----------|-------------|---------|
| **Properties** | Data fields that entities can have | name, language, team |
| **Relations** | Connections to other blueprints | Service → Team |
| **Meta Properties** | Built-in fields like ID and title | $identifier, $title |
| **Validation** | Rules for required fields and formats | Required: true |

## Hands-On Exercise: Create a GitHub Release Blueprint

Let's create a blueprint to track software releases for TechCorp's services.

### Step 1: Access Blueprint Creation
1. Navigate to **Builder** → **Data Model**
2. Click **+ Blueprint** in the upper left
3. You'll see the blueprint creation form

### Step 2: Configure Basic Information
Fill out the blueprint form:
- **Title**: `GitHub Release`
- **Icon**: `Github` (search for GitHub icon)
- **Description**: `Software releases for TechCorp services`

### Step 3: Add Properties
We'll add properties based on what GitHub provides for releases:

#### Property 1: Tag Name
- **Type**: String
- **Title**: `Tag Name`
- **Identifier**: `tag_name` (auto-generated)
- **Required**: ✅ True
- **Description**: `The git tag used for this release (e.g., v1.2.0)`

#### Property 2: Release Notes
- **Type**: Markdown
- **Title**: `Release Notes`
- **Identifier**: `release_notes`
- **Required**: ✅ True
- **Description**: `Detailed notes about what's included in this release`

#### Property 3: Release Date
- **Type**: Date
- **Title**: `Release Date`
- **Identifier**: `release_date`
- **Required**: ❌ False
- **Description**: `When this release was published`

### Step 4: Add Relationship
Releases belong to specific services, so we need a relationship:

1. Click **+ Add Property**
2. Select **Relation** type
3. Configure:
   - **Title**: `Service`
   - **Related Blueprint**: `Service`
   - **Limit**: `1 entity` (each release belongs to one service)
   - **Required**: ✅ True

### Step 5: Save and Review
1. Click **Create** to save your blueprint
2. Navigate back to **Data Model** page
3. Notice how the relationship appears in the visual diagram

> Prefer to start from ready-made YAML? You can also import the example blueprints from `examples/blueprints/` (for example, `release-blueprint.yaml`, `service-blueprint.yaml`, and `team-blueprint.yaml`) to match the TechCorp model used throughout this workshop.

## Understanding Blueprint Relationships

### Relationship Types
- **Many-to-One**: Multiple entities relate to one (Releases → Service)
- **One-to-Many**: One entity relates to many (Service → Releases)
- **Many-to-Many**: Multiple entities relate to multiple (Services ↔ Teams)

### TechCorp Example Relationships
```
Team ←→ Service (many-to-many: teams can own multiple services)
Service → Environment (one-to-many: services deploy to multiple environments)
Service → Release (one-to-many: services have multiple releases)
Release → Service (many-to-one: releases belong to one service)
```

## Blueprint Best Practices

### Naming Conventions
- **Blueprints**: Use singular nouns (`Service`, not `Services`)
- **Properties**: Use clear, descriptive names (`tag_name`, not `tag`)
- **Identifiers**: Use snake_case for consistency

### Property Design
- **Required Fields**: Only mark truly essential fields as required
- **Data Types**: Choose appropriate types (String, Number, Boolean, etc.)
- **Descriptions**: Always provide clear descriptions for properties

### Relationship Design
- **Cardinality**: Think carefully about one-to-many vs many-to-many
- **Required Relations**: Consider if the relationship is always necessary
- **Circular Dependencies**: Avoid complex circular relationships

## 🎯 Self-Assessment Checkpoint

### Knowledge Check
Rate your understanding (1-5 scale, where 1=No understanding, 5=Expert level):

- [ ] Blueprint concepts and data modeling: ___/5
- [ ] Property types and their use cases: ___/5
- [ ] Relationship design and cardinality: ___/5
- [ ] Blueprint best practices: ___/5

### Skill Validation
Check off the skills you can confidently demonstrate:

- [ ] **Blueprint Creation**: Can create blueprints with proper configuration
- [ ] **Property Management**: Can add and configure different property types
- [ ] **Relationship Design**: Can set up appropriate relationships between blueprints
- [ ] **Data Modeling**: Can design effective schemas for real-world scenarios

### Confidence Assessment
How confident are you in applying what you learned?

- [ ] **Very Confident**: Ready to design complex data models
- [ ] **Confident**: Can handle most blueprint scenarios
- [ ] **Somewhat Confident**: Need guidance for complex relationships
- [ ] **Not Confident**: Require significant support for blueprint design

### Success Indicators
You've successfully completed this module when you can:

**Knowledge Indicators:**
- [ ] Explain what blueprints are and their purpose
- [ ] Describe different property types and when to use them
- [ ] Understand relationship cardinality (one-to-many vs many-to-many)
- [ ] Apply blueprint design best practices

**Skill Indicators:**
- [ ] Create a new blueprint with basic information
- [ ] Add properties of different types with proper validation
- [ ] Configure relationships between blueprints
- [ ] Navigate the data model diagram effectively

**Application Indicators:**
- [ ] Design blueprints for your organization's needs
- [ ] Plan data model evolution and schema changes
- [ ] Troubleshoot common blueprint configuration issues

## End State & Further Reading

By the end of this module, your Port instance should:
- Contain a `GitHub Release` blueprint with the properties and relations described above
- Show the `Service` ↔ `Release` relationship in the **Data Model** diagram
- Give you confidence creating additional blueprints and relations for your own use cases

To go deeper on data modeling, visit `https://docs.port.io` and search for **Blueprints** and **Data model** to see the latest best practices and reference material.



## Challenge: Design Your Own Blueprint

Try creating a blueprint for **Environment** with these properties:
- **Name** (String, required): Environment name (e.g., "production", "staging")
- **URL** (URL, optional): Environment URL
- **Status** (String, required): Current status ("healthy", "degraded", "down")
- **Service** (Relation to Service, many-to-one): Which service this environment runs

## Common Issues & Solutions

**Problem**: Can't see my blueprint in the catalog  
**Solution**: Blueprints need entities (data) to appear in catalog pages

**Problem**: Relationship not working correctly  
**Solution**: Check that both blueprints exist and the relationship cardinality is correct

**Problem**: Properties not showing expected data types  
**Solution**: Verify the property type matches your data (String vs Number vs Boolean)

## Next Steps

Now that you understand blueprints, you're ready to learn how Port gets data:
- **[Module 3: Data Sources](../03-data-sources/)** - Configure integrations to populate your blueprints

## Quick Reference

### Blueprint Property Types
- **String**: Text data (names, descriptions)
- **Number**: Numeric values (counts, scores)
- **Boolean**: True/false values (archived, active)
- **Date**: Date/time values (created_at, updated_at)
- **URL**: Web addresses (repository_url, documentation_url)
- **Email**: Email addresses (owner_email)
- **Markdown**: Rich text with formatting
- **JSON**: Structured data objects
- **Array**: Lists of values

### Meta Properties (Built-in)
- **$identifier**: Unique ID for the entity
- **$title**: Display name for the entity
- **$blueprint**: Which blueprint this entity uses
- **$icon**: Icon displayed for the entity

---

**Completed Module 2?** Continue to [Module 3: Data Sources](../03-data-sources/) to learn how to populate your blueprints with real data.