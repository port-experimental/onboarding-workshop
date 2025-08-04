# Challenge: Create Your First Dashboard

**Difficulty**: Beginner  
**Estimated Time**: 25-35 minutes  
**Prerequisites**: Completed [Module 4: Dashboards](../../modules/04-dashboards/) and [First Blueprint Challenge](first-blueprint.md)

## Objective
Create a dashboard to visualize TechCorp's service portfolio using widgets that display key metrics and information about services and teams.

## Scenario
As a platform engineer at TechCorp, you need to create a dashboard that gives developers and managers visibility into the service landscape. The dashboard should show service distribution, team ownership, and key metrics.

## Requirements

### Dashboard Configuration
- **Title**: `TechCorp Service Overview`
- **Description**: `Overview of services, teams, and key metrics`
- **Layout**: Grid layout with 4 widgets

### Required Widgets

#### Widget 1: Service Count by Team
- **Type**: Pie Chart
- **Title**: `Services by Team`
- **Data Source**: Service entities
- **Group By**: Team property
- **Purpose**: Show which teams own the most services

#### Widget 2: Services by Language
- **Type**: Bar Chart  
- **Title**: `Programming Languages`
- **Data Source**: Service entities
- **Group By**: Language property
- **Purpose**: Display technology distribution

#### Widget 3: Service Status Table
- **Type**: Table
- **Title**: `Service Status`
- **Data Source**: Service entities
- **Columns**: Name, Team, Environment, Language
- **Purpose**: Provide detailed service information

#### Widget 4: Team Information
- **Type**: Markdown
- **Title**: `Team Quick Reference`
- **Content**: Static markdown with team contact information
- **Purpose**: Display team leads and contact info

## Starter Templates

### Sample Markdown Content for Widget 4
```markdown
# TechCorp Teams

## Frontend Team
- **Lead**: Sarah Chen
- **Contact**: sarah.chen@techcorp.com
- **Slack**: #frontend-team

## Backend Team  
- **Lead**: Mike Rodriguez
- **Contact**: mike.rodriguez@techcorp.com
- **Slack**: #backend-team

## DevOps Team
- **Lead**: Alex Johnson
- **Contact**: alex.johnson@techcorp.com
- **Slack**: #devops-team
```

## Step-by-Step Instructions

### Step 1: Create the Dashboard
1. Navigate to **Dashboards** in Port
2. Click **"+ New Dashboard"**
3. Enter title: `TechCorp Service Overview`
4. Add description: `Overview of services, teams, and key metrics`
5. Click **Create**

### Step 2: Add Pie Chart Widget
1. Click **"+ Add Widget"**
2. Select **"Pie Chart"**
3. Configure:
   - Title: `Services by Team`
   - Entity: `Service`
   - Group by: `team`
4. Click **Save**

### Step 3: Add Bar Chart Widget
1. Click **"+ Add Widget"** 
2. Select **"Bar Chart"**
3. Configure:
   - Title: `Programming Languages`
   - Entity: `Service`
   - Group by: `language`
4. Click **Save**

### Step 4: Add Table Widget
1. Click **"+ Add Widget"**
2. Select **"Table"**
3. Configure:
   - Title: `Service Status`
   - Entity: `Service`
   - Columns: Select `title`, `team`, `environment`, `language`
4. Click **Save**

### Step 5: Add Markdown Widget
1. Click **"+ Add Widget"**
2. Select **"Markdown"**
3. Configure:
   - Title: `Team Quick Reference`
   - Content: Copy the sample markdown above
4. Click **Save**

### Step 6: Arrange Layout
1. Drag widgets to arrange in a 2x2 grid
2. Resize widgets as needed
3. Save dashboard

## Success Criteria

You've successfully completed this challenge when:

- [ ] Dashboard is created with correct title and description
- [ ] All 4 required widgets are added and configured
- [ ] Pie chart shows service distribution by team
- [ ] Bar chart displays programming language usage
- [ ] Table widget shows service details with correct columns
- [ ] Markdown widget displays team contact information
- [ ] Dashboard layout is organized and readable
- [ ] Dashboard can be accessed from the Dashboards menu

## Validation Steps

### Visual Validation
1. **Check Dashboard Creation**
   - Navigate to Dashboards
   - Verify "TechCorp Service Overview" appears in the list
   - Click to open the dashboard

2. **Verify Widget Functionality**
   - Pie chart displays different colored segments for teams
   - Bar chart shows language distribution
   - Table displays service data with all required columns
   - Markdown widget shows formatted team information

3. **Test Interactivity**
   - Click on pie chart segments (should filter other widgets)
   - Sort table columns
   - Verify data updates when entities change

### Data Validation
1. **Check Data Sources**
   - Widgets pull data from Service entities
   - Charts reflect actual service distribution
   - Table shows current service information

## Common Issues & Solutions

**Problem**: Widgets show "No data"  
**Solution**: Ensure you have Service entities created, or create sample services using the TechCorp data model

**Problem**: Charts don't display properly  
**Solution**: Check that the grouping property (team, language) has values in your service entities

**Problem**: Table columns are empty  
**Solution**: Verify service entities have the required properties filled in

**Problem**: Markdown doesn't format correctly  
**Solution**: Check markdown syntax, ensure proper headers and formatting

## Bonus Challenges

### Bonus 1: Add Filters
- Add dashboard-level filters for Environment or Team
- Test how filters affect all widgets

### Bonus 2: Create Additional Widgets
- Add a Number widget showing total service count
- Create a line chart showing service creation over time (if you have date data)

### Bonus 3: Customize Styling
- Experiment with different chart colors
- Adjust widget sizes for better layout
- Add descriptions to widgets

## Next Steps

After completing this challenge:
- Try [Create Your First Action](first-action.md)
- Or move on to [Intermediate: Multi-Dashboard Setup](../intermediate/multi-dashboard-setup.md)

## Learning Notes

Document what you learned:
- Which widget types work best for different data?
- How do dashboard filters affect user experience?
- What makes a dashboard useful vs overwhelming?

---

**Completed this challenge?** Share your dashboard with your team and gather feedback on what additional widgets would be helpful!