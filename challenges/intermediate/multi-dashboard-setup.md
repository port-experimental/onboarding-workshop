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

#### Widget 1: Team Performance Overview (Number Cards)
- **Metrics**: 
  - Total Services
  - Active Deployments This Week
  - Average Service Health Score
  - Team Velocity
- **Purpose**: Key performance indicators

#### Widget 2: Service Distribution by Team (Pie Chart)
- **Data Source**: Service entities
- **Group By**: Team
- **Purpose**: Understand team workload distribution

#### Widget 3: Technology Stack Analysis (Stacked Bar Chart)
- **Data Source**: Service entities
- **X-Axis**: Team
- **Stack By**: Programming Language
- **Purpose**: Technology diversity and standardization insights

#### Widget 4: Team Health Matrix (Table)
- **Data Source**: Team entities with calculated metrics
- **Columns**: Team, Service Count, Avg Health Score, Last Deploy, Issues
- **Purpose**: Quick team health assessment

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

#### Step 2: Add Performance Numbers
1. Add **Number Widget** for each metric:
   - Total Services: Count of Service entities
   - Active Deployments: Count of deploy actions this week
   - Average Health Score: Average of service health scores
   - Team Count: Count of Team entities

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

#### Step 5: Add Team Health Table
1. Add **Table Widget**:
   - **Entity**: Team
   - **Columns**: title, service_count, avg_health_score, last_deploy
   - **Title**: `Team Health Overview`

## Dashboard 3: Platform Engineer Dashboard

### Configuration
- **Title**: `Platform Engineering Console`
- **Description**: `Infrastructure health, compliance, and system metrics`
- **Target Audience**: Platform engineers, DevOps team

### Required Widgets

#### Widget 1: Infrastructure Health (Status Grid)
- **Data Source**: Service entities
- **Display**: Service status, environment, health checks
- **Color Coding**: Green (healthy), Yellow (warning), Red (critical)
- **Purpose**: Quick infrastructure health overview

#### Widget 2: Compliance Dashboard (Table)
- **Data Source**: Service entities with scorecard data
- **Columns**: Service, Security Score, Performance Score, Compliance Status
- **Filters**: Non-compliant services highlighted
- **Purpose**: Track compliance across services

#### Widget 3: Deployment Pipeline Status (Kanban/Table)
- **Data Source**: Action runs
- **Stages**: Pending, In Progress, Success, Failed
- **Filter**: Deployment actions only
- **Purpose**: Monitor deployment pipeline health

#### Widget 4: Resource Utilization (Charts)
- **Data Source**: Service entities with resource metrics
- **Charts**: CPU usage, Memory usage, Storage usage
- **Purpose**: Infrastructure capacity planning

#### Widget 5: Alert Summary (List)
- **Data Source**: Recent alerts and incidents
- **Display**: Alert type, service, severity, status
- **Purpose**: Incident response and monitoring

### Step-by-Step Setup

#### Step 1: Create Platform Dashboard
1. Create new dashboard:
   - **Title**: `Platform Engineering Console`
   - **Description**: `Infrastructure health, compliance, and system metrics`

#### Step 2: Add Infrastructure Health Grid
1. Add **Table Widget** with status indicators:
   - **Entity**: Service
   - **Columns**: title, environment, health_status, last_deploy
   - **Conditional Formatting**: Color-code by health status

#### Step 3: Add Compliance Table
1. Add **Table Widget**:
   - **Entity**: Service
   - **Columns**: title, security_score, performance_score, compliance_status
   - **Filters**: Show non-compliant services first

#### Step 4: Add Deployment Pipeline
1. Add **Table Widget** for action runs:
   - **Entity**: Action Runs
   - **Filter**: Deployment actions
   - **Columns**: action, service, status, timestamp, duration

#### Step 5: Add Resource Charts
1. Add **Bar Chart** or **Line Chart**:
   - **Entity**: Service
   - **Metrics**: Resource utilization (if available)
   - **Group By**: Environment or Team

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
- [ ] Infrastructure health is clearly visible
- [ ] Compliance status is tracked and highlighted
- [ ] Deployment pipeline status is monitored
- [ ] Resource utilization data supports capacity planning
- [ ] Alert information enables quick response

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
- Try [Multi-Step Actions](multi-step-actions.md)
- Or move on to [Advanced: Custom Widget Development](../advanced/custom-widget-development.md)

---

**Completed this challenge?** You've created a comprehensive dashboard system that serves different organizational needs!