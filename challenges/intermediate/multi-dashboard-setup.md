# Challenge: Multi-Dashboard Setup with Role-Based Views

**Difficulty**: Intermediate  
**Estimated Time**: 50-70 minutes  
**Prerequisites**: Completed [Team-Service Relationships](team-service-relationships.md) and [Module 4: Dashboards](../../modules/04-dashboards/)

## Objective
Create multiple specialized dashboards for different roles at TechCorp (developers, managers, platform engineers) with appropriate filters, permissions, and data visualizations for each audience.

## Scenario
TechCorp has different stakeholders who need different views of the same data. Developers need operational details, managers need high-level metrics, and platform engineers need infrastructure insights. You'll create role-specific dashboards that serve each audience effectively.

## Requirements

### Dashboard 1: Developer Dashboard
**Audience**: Individual developers and team members  
**Focus**: Day-to-day operational information

### Dashboard 2: Manager Dashboard  
**Audience**: Team leads and engineering managers  
**Focus**: Team performance and high-level metrics

### Dashboard 3: Platform Engineer Dashboard
**Audience**: Platform and DevOps teams  
**Focus**: Infrastructure, compliance, and system health

## Dashboard 1: Developer Dashboard

### Configuration
- **Title**: `Developer Workspace`
- **Description**: `Day-to-day development information and quick actions`
- **Target Audience**: Developers, individual contributors

### Required Widgets

#### Widget 1: My Team's Services (Table)
- **Data Source**: Service entities
- **Filter**: Services owned by user's team
- **Columns**: Service Name, Language, Last Commit, Repository Link
- **Actions**: Update README, Deploy Service
- **Purpose**: Quick access to team's services

#### Widget 2: Recent Activity (Timeline/List)
- **Data Source**: Action runs, recent entity updates
- **Filter**: Last 7 days, user's team
- **Display**: Action type, timestamp, status, triggered by
- **Purpose**: Track recent changes and deployments

#### Widget 3: Quick Actions (Action Cards)
- **Actions**: 
  - Create New Service
  - Update Service Documentation
  - Request Environment Access
  - Report Issue
- **Purpose**: Common self-service tasks

#### Widget 4: Team Resources (Markdown)
- **Content**: Team-specific links and information
- **Include**: 
  - Team Slack channel
  - Documentation links
  - On-call rotation
  - Meeting schedules

### Step-by-Step Setup

#### Step 1: Create Developer Dashboard
1. Navigate to **Dashboards**
2. Click **"+ New Dashboard"**
3. Configure:
   - **Title**: `Developer Workspace`
   - **Description**: `Day-to-day development information and quick actions`
   - **Visibility**: Team members

#### Step 2: Add Services Table
1. Add **Table Widget**
2. Configure:
   - **Title**: `My Team's Services`
   - **Entity**: Service
   - **Filter**: `team = "{{user.team}}"` (if user context available)
   - **Columns**: `title`, `language`, `last_commit`, `url`
   - **Actions**: Enable relevant service actions

#### Step 3: Add Activity Widget
1. Add **List Widget** or **Table Widget**
2. Configure:
   - **Title**: `Recent Activity`
   - **Data Source**: Action Runs
   - **Filter**: Last 7 days
   - **Sort**: Most recent first

#### Step 4: Add Action Cards
1. Add **Action Cards Widget**
2. Select relevant actions:
   - Update Service README
   - Deploy Service
   - Create Service
   - Request Access

#### Step 5: Add Team Resources
1. Add **Markdown Widget**
2. Include team-specific content:

```markdown
# Frontend Team Resources

## Quick Links
- [Team Documentation](https://wiki.techcorp.com/frontend)
- [Slack Channel](https://techcorp.slack.com/channels/frontend-team)
- [Sprint Board](https://jira.techcorp.com/frontend)

## On-Call Schedule
- **This Week**: Sarah Chen
- **Next Week**: Mike Johnson
- **Emergency**: #frontend-oncall

## Meetings
- **Daily Standup**: 9:00 AM PST
- **Sprint Planning**: Mondays 2:00 PM PST
- **Retrospective**: Fridays 3:00 PM PST
```

## Dashboard 2: Manager Dashboard

### Configuration
- **Title**: `Engineering Management Overview`
- **Description**: `Team performance metrics and high-level insights`
- **Target Audience**: Engineering managers, team leads

### Required Widgets

#### Widget 1: Service Portfolio Overview (Number Cards)
- **Metrics**:
  - Total Services: Count of all Service entities where `archived = false`
  - Production Services: Count of Service entities where `environment = "Production"`
  - Total Teams: Count of Team entities
  - Archived Services: Count of Service entities where `archived = true`
- **Purpose**: Key portfolio statistics at a glance

#### Widget 2: Service Distribution by Team (Pie Chart)
- **Data Source**: Service entities
- **Group By**: Team
- **Purpose**: Understand team workload distribution

#### Widget 3: Technology Stack Analysis (Stacked Bar Chart)
- **Data Source**: Service entities
- **X-Axis**: Team
- **Stack By**: Programming Language
- **Purpose**: Technology diversity and standardization insights

#### Widget 4: Team Overview (Table)
- **Data Source**: Team entities
- **Columns**: Team Name, Slack Channel, Team Lead, On-Call Rotation
- **Purpose**: Team contacts and responsibilities at a glance

#### Widget 5: Deployment Frequency (Line Chart)
- **Data Source**: Action runs (deploy actions)
- **Time Range**: Last 30 days
- **Group By**: Team
- **Purpose**: Track deployment velocity

### Step-by-Step Setup

#### Step 1: Create Manager Dashboard
1. Create new dashboard:
   - **Title**: `Engineering Management Overview`
   - **Description**: `Team performance metrics and high-level insights`

#### Step 2: Add Portfolio Overview Numbers
1. Add **Number Widget** for each metric:
   - **Total Services**: Source = Service blueprint, Filter = `archived = false`
   - **Production Services**: Source = Service blueprint, Filter = `environment = "Production"`
   - **Total Teams**: Source = Team blueprint
   - **Archived Services**: Source = Service blueprint, Filter = `archived = true`

#### Step 3: Add Team Distribution Chart
1. Add **Pie Chart Widget**:
   - **Entity**: Service
   - **Group By**: team
   - **Title**: `Services by Team`

#### Step 4: Add Technology Stack Chart
1. Add **Stacked Bar Chart**:
   - **Entity**: Service
   - **X-Axis**: team
   - **Stack By**: language
   - **Title**: `Technology Stack by Team`

#### Step 5: Add Team Overview Table
1. Add **Table Widget**:
   - **Entity**: Team
   - **Columns**: title, slack_channel, team_lead, on_call_rotation
   - **Title**: `Team Directory`

## Dashboard 3: Platform Engineer Dashboard

### Configuration
- **Title**: `Platform Engineering Console`
- **Description**: `Infrastructure health, compliance, and system metrics`
- **Target Audience**: Platform engineers, DevOps team

### Required Widgets

#### Widget 1: Services by Environment (Pie Chart)
- **Data Source**: Service entities
- **Group By**: `environment`
- **Purpose**: Distribution of services across Production, Staging, Development, QA

#### Widget 2: Services by Language (Bar Chart)
- **Data Source**: Service entities
- **Group By**: `language`
- **Filter**: `archived = false`
- **Purpose**: Technology stack distribution across the org

#### Widget 3: Service Inventory (Table)
- **Data Source**: Service entities
- **Columns**: Service Name, Language, Team, Environment, Repository URL
- **Filter**: `archived = false`
- **Sort**: Team, then name
- **Purpose**: Full service inventory for platform audits

#### Widget 4: Recent Action Runs (Table)
- **Data Source**: Action Runs
- **Columns**: Action, Entity, Status, Triggered By, Timestamp
- **Sort**: Most recent first
- **Purpose**: Monitor self-service activity across the org

### Step-by-Step Setup

#### Step 1: Create Platform Dashboard
1. Create new dashboard:
   - **Title**: `Platform Engineering Console`
   - **Description**: `Infrastructure health, compliance, and system metrics`

#### Step 2: Add Environment Distribution Chart
1. Add **Pie Chart Widget**:
   - **Entity**: Service
   - **Group By**: `environment`
   - **Title**: `Services by Environment`

#### Step 3: Add Language Distribution Chart
1. Add **Bar Chart Widget**:
   - **Entity**: Service
   - **Group By**: `language`
   - **Title**: `Language Distribution`

#### Step 4: Add Service Inventory Table
1. Add **Table Widget**:
   - **Entity**: Service
   - **Columns**: `title`, `language`, `team`, `environment`, `url`
   - **Title**: `Service Inventory`

#### Step 5: Add Action Runs Table
1. Add **Table Widget**:
   - **Entity**: Action Runs
   - **Title**: `Recent Actions`
   - **Sort**: Timestamp descending

## Success Criteria

### Developer Dashboard
- [ ] Dashboard serves developer daily workflow needs
- [ ] Team-specific filtering works correctly
- [ ] Quick actions are easily accessible
- [ ] Recent activity provides relevant information
- [ ] Team resources are current and helpful

### Manager Dashboard  
- [ ] High-level metrics provide management insights
- [ ] Charts show team performance and distribution
- [ ] Data supports decision-making processes
- [ ] Performance trends are visible
- [ ] Team health indicators are clear

### Platform Dashboard
- [ ] Environment distribution pie chart displays correctly
- [ ] Language bar chart shows service technology breakdown
- [ ] Service inventory table lists all non-archived services with correct columns
- [ ] Action runs table shows recent self-service activity

## Validation Steps

### Test Each Dashboard
1. **Navigation Test**
   - Access each dashboard from the main menu
   - Verify appropriate data loads for each audience
   - Test filtering and interactivity

2. **Data Accuracy Test**
   - Compare dashboard data with source entities
   - Verify calculations and aggregations
   - Test real-time updates

3. **User Experience Test**
   - Review each dashboard from the target audience perspective
   - Verify information hierarchy and layout
   - Test on different screen sizes

### Cross-Dashboard Consistency
1. **Data Consistency**
   - Verify same data appears consistently across dashboards
   - Check that filters don't create conflicting views
   - Ensure calculations use same methodology

## Common Issues & Solutions

**Problem**: Dashboards show different numbers for same data  
**Solution**: Check filter configurations and ensure consistent data sources

**Problem**: Role-based filtering not working  
**Solution**: Verify user context variables and permissions are configured correctly

**Problem**: Charts don't display properly  
**Solution**: Check data types and ensure sufficient data exists for visualizations

**Problem**: Performance issues with complex dashboards  
**Solution**: Optimize queries, reduce widget complexity, or implement caching

## Bonus Challenges

### Bonus 1: Dynamic Filtering
- Add dashboard-level filters that affect all widgets
- Implement user-context-based automatic filtering
- Create saved filter presets

### Bonus 2: Advanced Visualizations
- Add custom charts using external visualization libraries
- Create heat maps for service health
- Implement trend analysis widgets

### Bonus 3: Dashboard Automation
- Set up automated dashboard reports
- Create dashboard snapshots for historical analysis
- Implement dashboard alerting for threshold breaches

## Learning Notes

Document what you learned:
- How do different roles need different data presentations?
- What makes a dashboard useful vs overwhelming?
- How can you balance detail with overview information?
- What are the challenges of maintaining multiple dashboards?

## Next Steps

After completing this challenge:
- Move on to [Enterprise Scorecard System](../advanced/enterprise-scorecard-system.md) — add quality tracking to your dashboards
- Or try [Governance Setup](../advanced/governance-setup.md) — control who sees which dashboards

---

**Completed this challenge?** You've created a comprehensive dashboard system that serves different organizational needs!