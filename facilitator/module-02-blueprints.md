# Module 2: Blueprints - Facilitator Notes

## Workshop Delivery Guidance

**Pre-Module Setup (5 minutes)**
- Ensure participants completed Module 1 and can access Builder
- Verify admin permissions for blueprint creation
- Have the GitHub Release blueprint example ready to demonstrate

**Module Timing**
- **Concepts Introduction**: 15-20 minutes (blueprints, properties, relationships)
- **Hands-On Exercise**: 20-25 minutes (create GitHub Release blueprint)
- **Best Practices Discussion**: 10-15 minutes
- **Q&A and Troubleshooting**: 5-10 minutes

**Key Teaching Points**
1. **Blueprints are Schemas**: Compare to database tables or API schemas
2. **Properties Define Structure**: Each property type serves specific purposes
3. **Relationships Create Context**: Show how entities connect meaningfully
4. **Meta Properties**: Explain built-in fields that every entity has

## Demonstration Flow

**Live Demo Sequence:**
1. Navigate to Builder → Data Model
2. Show existing blueprints and their relationships in the visual diagram
3. Create the GitHub Release blueprint step-by-step
4. Explain each property type as you add it
5. Show how the relationship appears in the diagram
6. Preview what entities will look like (even without data)

## Common Questions & Answers

**Q: "How do I know what properties to include?"**  
A: Start with the data source (GitHub API) and business needs. Add properties iteratively.

**Q: "Can I change blueprints after creating entities?"**  
A: Yes, but be careful with required fields and data type changes. Plan schema evolution.

**Q: "What's the difference between String and Text properties?"**  
A: String is for short text (names, IDs), Text is for longer content (descriptions).

**Q: "How many relationships can a blueprint have?"**  
A: No hard limit, but keep it logical. Too many relationships can complicate the model.

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Can't create blueprint | Verify admin permissions in Builder section |
| Property validation errors | Check required fields and data types match |
| Relationship not working | Ensure target blueprint exists first |
| Blueprint not in diagram | Refresh page, relationships may need time to appear |

## Extension Activities

**For Fast Learners:**
- Create the Environment blueprint from the challenge
- Explore existing blueprint configurations
- Design a blueprint for their own organization's needs

**For Groups:**
- Discuss blueprint design patterns for different industries
- Share experiences with data modeling in other systems
- Brainstorm additional properties for TechCorp blueprints

## Assessment Checkpoints

Ensure participants can demonstrate:
- [ ] Create a new blueprint with basic information
- [ ] Add properties of different types (String, Boolean, Date, etc.)
- [ ] Configure property requirements and descriptions
- [ ] Set up a relationship to another blueprint
- [ ] Explain the difference between properties and relationships

## Advanced Discussion Topics

**Schema Evolution:**
- How to handle blueprint changes over time
- Strategies for adding required fields to existing entities
- Migration patterns for major schema changes

**Design Patterns:**
- When to use many-to-many vs one-to-many relationships
- Naming conventions for consistency
- Property organization and grouping strategies