# Challenge: Team-Service Relationships & Integration

**Difficulty**: Intermediate  
**Estimated Time**: 45-60 minutes  
**Prerequisites**: Completed beginner challenges and [Module 3: Data Sources](../../modules/03-data-sources/)

## Objective
Build a complete data model connecting Teams and Services with relationships, then create an integration to automatically populate service data from GitHub, demonstrating how Port connects different data sources.

## Scenario
TechCorp wants to automatically track which teams own which services and pull service metadata from GitHub repositories. You'll create the relationships between blueprints and set up a GitHub integration to keep the data synchronized.

## Requirements

### Part 1: Blueprint Relationships
- Modify existing Team and Service blueprints to include relationships
- Create bidirectional relationships between Teams and Services
- Add validation rules for the relationships

### Part 2: GitHub Integration
- Set up a GitHub integration to pull repository data
- Map GitHub repository data to Service entities
- Configure automatic updates when repositories change

### Part 3: Dashboard Integration
- Create a dashboard showing team-service relationships
- Display GitHub metrics (stars, forks, last commit)
- Show team workload distribution

## Part 1: Configure Relationships

### Step 1: Update Service Blueprint
Add this relationship to your Service blueprint:

```yaml
relations:
  team:
    title: Owning Team
    target: team
    required: true
    many: false
    description: The team responsible for this service
```

### Step 2: Update Team Blueprint  
Add this relationship to your Team blueprint:

```yaml
relations:
  services:
    title: Owned Services
    target: service
    required: false
    many: true
    description: Services owned by this team
```

### Step 3: Create Sample Data
Create these team entities:
- **Frontend Team** (identifier: `frontend-team`)
- **Backend Team** (identifier: `backend-team`)
- **DevOps Team** (identifier: `devops-team`)

## Part 2: GitHub Integration Setup

### Integration Configuration Template
```yaml
identifier: github-integration
title: GitHub Repository Integration
description: Sync repository data to Service entities
type: github
config:
  token: YOUR_GITHUB_TOKEN
  organization: techcorp
  repositories:
    - ecommerce-api
    - mobile-app
    - analytics-service
    - payment-gateway
  mapping:
    - blueprint: service
      filter: .name | startswith("techcorp/")
      entity:
        identifier: .name | split("/")[1]
        title: .name | split("/")[1] | gsub("-"; " ") | title
        properties:
          description: .description // "No description provided"
          language: .language
          url: .html_url
          readme: .readme_content
          archived: .archived
          default_branch: .default_branch
          stars: .stargazers_count
          forks: .forks_count
          last_commit: .pushed_at
        relations:
          team: 
            - identifier: "backend-team"
              condition: '.name | contains("api") or contains("service")'
            - identifier: "frontend-team" 
              condition: '.name | contains("app") or contains("web")'
            - identifier: "devops-team"
              condition: '.name | contains("infra") or contains("deploy")'
```

### Step-by-Step Integration Setup

#### Step 1: Create GitHub Integration
1. Navigate to **Builder** → **Data Sources**
2. Click **"+ New Integration"**
3. Select **GitHub** as the source type
4. Configure basic settings:
   - **Title**: `TechCorp GitHub Integration`
   - **Identifier**: `techcorp-github`
   - **Description**: `Sync TechCorp repositories to Service entities`

#### Step 2: Configure Authentication
1. **Authentication Method**: Personal Access Token
2. **Token**: Enter a GitHub token with repo access
3. **Organization**: `techcorp` (or use a real organization you have access to)

#### Step 3: Set Up Repository Mapping
1. **Target Blueprint**: Select `Service`
2. **Repository Filter**: `*` (all repositories)
3. **Entity Mapping**:
   - **Identifier**: `{{.name | split("/")[1]}}`
   - **Title**: `{{.name | split("/")[1] | gsub("-"; " ") | title}}`

#### Step 4: Configure Property Mapping
Map these GitHub fields to Service properties:
- `description` → `{{.description}}`
- `language` → `{{.language}}`
- `url` → `{{.html_url}}`
- `archived` → `{{.archived}}`
- `default_branch` → `{{.default_branch}}`

#### Step 5: Set Up Team Relationships
Configure conditional team assignment:
```jq
if (.name | contains("api") or contains("service")) then "backend-team"
elif (.name | contains("app") or contains("web")) then "frontend-team"  
elif (.name | contains("infra") or contains("deploy")) then "devops-team"
else "backend-team" end
```

## Part 3: Create Relationship Dashboard

### Dashboard Requirements
Create a dashboard called "Team Service Overview" with these widgets:

#### Widget 1: Services per Team (Pie Chart)
- **Data Source**: Service entities
- **Group By**: Team relationship
- **Title**: `Services by Team`

#### Widget 2: Team Details Table
- **Data Source**: Team entities
- **Columns**: Team Name, Lead, Service Count, Focus Area
- **Title**: `Team Overview`

#### Widget 3: Service Health Matrix
- **Data Source**: Service entities  
- **Columns**: Service Name, Team, Language, Stars, Last Commit
- **Title**: `Service Health Dashboard`

#### Widget 4: Language Distribution
- **Data Source**: Service entities
- **Group By**: Language
- **Chart Type**: Bar Chart
- **Title**: `Technology Stack`

## Success Criteria

### Part 1: Relationships
- [ ] Service blueprint has team relationship configured
- [ ] Team blueprint has services relationship configured
- [ ] Relationships are bidirectional (visible from both sides)
- [ ] Sample team entities are created
- [ ] Relationship validation works (can assign teams to services)

### Part 2: Integration
- [ ] GitHub integration is created and active
- [ ] Integration successfully pulls repository data
- [ ] Service entities are created/updated from GitHub data
- [ ] Team relationships are automatically assigned based on repository names
- [ ] Integration runs without errors

### Part 3: Dashboard
- [ ] Dashboard displays team-service relationships
- [ ] All four widgets show data correctly
- [ ] Charts reflect the actual team-service distribution
- [ ] GitHub metrics (stars, commits) are displayed
- [ ] Dashboard updates when integration data changes

## Validation Steps

### Test Relationships
1. **Create Service-Team Connection**
   - Go to a Service entity
   - Edit and assign it to a team
   - Verify the team appears in the relationship field
   - Check that the service appears in the team's services list

2. **Verify Bidirectional Relationships**
   - From Team entity, view connected services
   - From Service entity, view connected team
   - Confirm data consistency

### Test Integration
1. **Check Integration Status**
   - Navigate to Data Sources
   - Verify integration shows "Active" status
   - Check last sync time and success status

2. **Validate Data Sync**
   - Compare GitHub repository data with Port service entities
   - Verify properties are correctly mapped
   - Check that team assignments match repository patterns

### Test Dashboard
1. **Verify Widget Data**
   - Pie chart shows correct team distribution
   - Table displays accurate team and service information
   - Service health matrix shows GitHub metrics
   - Language chart reflects actual technology usage

## Common Issues & Solutions

**Problem**: Relationships don't appear in entity forms  
**Solution**: Check that both blueprints have the relationship configured and are published

**Problem**: GitHub integration fails authentication  
**Solution**: Verify GitHub token has correct permissions and hasn't expired

**Problem**: Services not assigned to correct teams  
**Solution**: Review the JQ mapping logic and test with actual repository names

**Problem**: Dashboard widgets show no data  
**Solution**: Ensure entities exist and have the required properties populated

## Bonus Challenges

### Bonus 1: Advanced Mapping
- Add more sophisticated team assignment logic
- Include repository topics in the mapping
- Map GitHub issues and pull requests

### Bonus 2: Automated Workflows
- Create an action to reassign services between teams
- Set up notifications when new repositories are added
- Create automated team workload balancing

### Bonus 3: Enhanced Dashboard
- Add time-series widgets showing repository activity
- Create team performance metrics
- Add service health scoring based on GitHub metrics

## Learning Notes

Document what you learned:
- How do relationships change data modeling in Port?
- What are the benefits of automated data synchronization?
- How can integrations reduce manual data entry?
- What challenges arise when connecting multiple data sources?

## Next Steps

After completing this challenge:
- Try [Multi-Dashboard Setup](multi-dashboard-setup.md)
- Or move on to [Advanced: Custom Integration Development](../advanced/custom-integration-development.md)

---

**Completed this challenge?** You've successfully created a connected data model that automatically stays in sync with external systems!