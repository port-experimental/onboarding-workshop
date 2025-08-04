# Challenge: Create Your First Blueprint

**Difficulty**: Beginner  
**Estimated Time**: 20-30 minutes  
**Prerequisites**: Completed [Module 2: Blueprints](../../modules/02-blueprints/)

## Objective
Create a blueprint to model **Teams** in your organization, including all the properties and relationships that make sense for tracking team information.

## Requirements

### Blueprint Configuration
- **Title**: `Team`
- **Icon**: `Team` (or `Users`)
- **Identifier**: `team`
- **Description**: `Development teams in the organization`

### Required Properties
1. **Team Name** (String, required)
   - The official name of the team
   - Example: "Backend Engineering", "Mobile Team"

2. **Slack Channel** (String, optional)
   - Team's primary Slack channel
   - Example: "#backend-team", "#mobile-dev"

3. **Team Lead** (String, optional)
   - Name or email of the team lead
   - Example: "jane.doe@company.com"

### Optional Properties (Choose 2-3)
4. **Team Size** (Number)
   - Number of people on the team

5. **Focus Area** (String with enum)
   - Options: "Frontend", "Backend", "Mobile", "DevOps", "Data", "QA"

6. **On-Call Rotation** (Boolean)
   - Whether the team has on-call responsibilities

7. **Team Members** (Array of strings)
   - List of team member names or emails

8. **Documentation URL** (URL)
   - Link to team documentation or wiki

## Success Criteria

You've successfully completed this challenge when:

- [ ] Blueprint is created with correct title and identifier
- [ ] All required properties are configured properly
- [ ] At least 2 optional properties are added
- [ ] Blueprint appears in the Data Model view
- [ ] You can navigate to the blueprint configuration and see all properties

## Bonus Challenges

### Bonus 1: Add Validation
- Make the Slack Channel property follow a pattern (starts with #)
- Set minimum/maximum values for Team Size

### Bonus 2: Create Sample Data
- Manually create 2-3 team entities using your blueprint
- Verify they appear in the catalog

### Bonus 3: Plan Relationships
- Think about how Teams might relate to Services
- Document your relationship ideas (don't implement yet)

## Validation Steps

1. **Check Blueprint Creation**
   - Navigate to Builder → Data Model
   - Verify your Team blueprint appears in the list
   - Click on it to see the visual representation

2. **Verify Properties**
   - Click on the Team blueprint
   - Check that all properties are listed correctly
   - Verify required vs optional settings

3. **Test Blueprint Usage**
   - Try creating a test entity (if you have permissions)
   - Or plan what data you would enter

## Common Issues & Solutions

**Problem**: Blueprint doesn't appear in Data Model  
**Solution**: Check that you clicked "Create" and there were no validation errors

**Problem**: Properties have wrong types  
**Solution**: Edit the blueprint and verify each property type matches your intention

**Problem**: Can't decide on optional properties  
**Solution**: Think about what information would be useful for developers looking for team contact info

## Next Steps

After completing this challenge:
- Try [Create Your First Dashboard](first-dashboard.md)
- Or move on to [Intermediate: Team-Service Relationships](../intermediate/team-service-relationships.md)

## Learning Notes

Document what you learned:
- What was challenging about blueprint design?
- What properties did you choose and why?
- How might this blueprint evolve over time?

---

**Completed this challenge?** Share your blueprint configuration with your team or move on to the next challenge!