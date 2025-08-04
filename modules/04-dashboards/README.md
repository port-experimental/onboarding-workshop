# Module 4: Dashboards - Visualization and Widgets

## 🧭 Navigation

**Previous**: [Module 3: Data Sources](../03-data-sources/) | **Next**: [Module 5: Actions](../05-actions/)

**Learning Path**: [Choose Your Path](../../README.md#-choose-your-learning-path) | **All Modules**: [Workshop Home](../../README.md)

---

## 📍 Module Overview

⏱️ **Duration**: 60-75 minutes | 📋 **Prerequisites**: [Module 3](../03-data-sources/) completed

**Progress**: Module 4 of 7 | **Completion**: 57% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Create custom dashboard pages for different audiences
- Build and configure various types of widgets
- Apply filters to focus on specific data
- Design effective dashboards for your organization

## Prerequisites
- Completed [Module 3: Data Sources](../03-data-sources/)
- Data populated in your Port instance
- Understanding of basic data visualization concepts

## Duration
**Estimated Time**: 60-75 minutes

## Key Concepts

### What are Dashboards?
Dashboards in Port provide customizable views of your software catalog data through:
- **Pages**: Containers for related widgets
- **Widgets**: Individual visualizations (tables, charts, etc.)
- **Filters**: Ways to focus on specific data subsets
- **Layouts**: Arrangements of widgets on pages

### Widget Types Available

| Widget Type | Best For | Example Use Case |
|-------------|----------|------------------|
| **Table** | Detailed data lists | Service inventory with details |
| **Pie Chart** | Proportional data | Language distribution |
| **Number Chart** | Key metrics | Total services count |
| **Line Chart** | Trends over time | Deployment frequency |
| **Markdown** | Documentation | Team guidelines |
| **IFrame** | External content | Grafana dashboards |

### Widget Visual Examples

Here are examples of what each widget type looks like in Port:

#### Table Widget
![Table Widget](../../resources/Widget.Table.png)
*Table widgets display detailed entity data in rows and columns, perfect for service catalogs and detailed listings.*

#### Pie Chart Widget  
![Pie Chart Widget](../../resources/Widget.Pie.Chart.png)
*Pie charts show proportional data and distributions, ideal for language breakdowns or team ownership.*

#### Number Chart Widget
![Number Chart Widget](../../resources/Widget.Number.Chart.png)
*Number charts display key metrics and KPIs prominently, great for counts and important statistics.*

#### Line Chart Widget
![Line Chart Widget](../../resources/Widget.Line.Chart.png)
*Line charts visualize trends over time, perfect for deployment frequency or performance metrics.*

#### Markdown Widget
![Markdown Widget](../../resources/Widget.Markdown.png)
*Markdown widgets provide rich text content, documentation, and contextual information.*

#### IFrame Widget
![IFrame Widget](../../resources/Widget.IFrame.png)
*IFrame widgets embed external content like Grafana dashboards or documentation sites.*

#### Action Card Widget
![Action Card Widget](../../resources/Widget.Action.Card.png)
*Action card widgets provide quick access to self-service actions directly from dashboards.*

## Hands-On Exercise: Create TechCorp Engineering Dashboard

Let's create a comprehensive dashboard for TechCorp's engineering teams.

### Step 1: Create Dashboard Page
1. Navigate to **Catalog**
2. Click **+ New** in the left sidebar
3. Select **Dashboard Page**
4. Configure:
   - **Title**: `TechCorp Engineering Dashboard`
   - **Icon**: `Dashboard`
   - **Description**: `Overview of TechCorp's engineering metrics and services`

### Step 2: Create Service Overview Table
Our first widget will show all active services:

1. Click **+ Widget** on your new dashboard
2. Select **Table** from the Data section
3. Configure the table:
   - **Title**: `Active Services`
   - **Blueprint**: `Service`
   - **Description**: `All non-archived TechCorp services`

4. Customize visible properties:
   - Show: `Title`, `Language`, `Team`, `URL`
   - Hide: `Last Updated`, `Entity Creation Date`
   - Reorder: `Title` → `Language` → `Team` → `URL`

5. Add filters to show only active services:
   ```json
   {
     "combinator": "and",
     "rules": [
       {
         "property": "archived",
         "operator": "=",
         "value": false
       }
     ]
   }
   ```

### Step 3: Create Language Distribution Pie Chart
Show the distribution of programming languages:

1. Add another widget: **Pie Chart**
2. Configure:
   - **Title**: `Programming Languages`
   - **Blueprint**: `Service`
   - **Property**: `language`
   - **Description**: `Distribution of programming languages across services`

3. Apply the same filter to exclude archived services

### Step 4: Create Service Count Number Chart
Display the total number of active services:

1. Add a **Number Chart** widget
2. Configure:
   - **Title**: `Total Active Services`
   - **Blueprint**: `Service`
   - **Description**: `Count of all active services`

3. Apply archived filter again

### Step 5: Create Team Information Markdown Widget
Add context and documentation:

1. Add a **Markdown** widget
2. Configure:
   - **Title**: `TechCorp Engineering Teams`
   - **Content**:
   ```markdown
   ## Our Engineering Teams
   
   ### Backend Team
   - **Focus**: API development and data services
   - **Technologies**: Python, Java, PostgreSQL
   - **Services**: ecommerce-api, analytics-service
   
   ### Frontend Team
   - **Focus**: User interfaces and mobile apps
   - **Technologies**: React, React Native, TypeScript
   - **Services**: mobile-app, web-dashboard
   
   ### DevOps Team
   - **Focus**: Infrastructure and deployment
   - **Technologies**: Kubernetes, Terraform, GitHub Actions
   - **Services**: deployment-pipeline, monitoring-stack
   
   ---
   
   **Need help?** Contact your team lead or check our [internal docs](https://docs.techcorp.com).
   ```

## Advanced Widget Configuration

### Table Widget Advanced Features

#### Custom Property Display
```json
{
  "properties": [
    {
      "identifier": "title",
      "title": "Service Name"
    },
    {
      "identifier": "language", 
      "title": "Tech Stack"
    }
  ]
}
```

#### Sorting and Pagination
- Default sort by creation date
- Customize sort order
- Set page size for large datasets

### Chart Widget Customization

#### Color Schemes
- Use consistent colors across charts
- Consider accessibility (colorblind-friendly)
- Match your organization's brand colors

#### Data Aggregation
- Group similar values (e.g., "JavaScript" and "TypeScript" → "JS Family")
- Handle null/empty values appropriately
- Set meaningful chart limits

## Exercise: Create Team-Specific Dashboard

Create a dashboard focused on the Backend team:

### Requirements
1. **Page**: "Backend Team Dashboard"
2. **Service Table**: Only Backend team services
3. **Release Timeline**: Recent releases for Backend services
4. **Quality Metrics**: Scorecard performance (if available)

### Filter Configuration for Backend Services
```json
{
  "combinator": "and",
  "rules": [
    {
      "property": "team",
      "operator": "=",
      "value": "Backend"
    },
    {
      "property": "archived",
      "operator": "=",
      "value": false
    }
  ]
}
```

## Dashboard Design Best Practices

### Layout Principles
- **Most Important First**: Place key metrics at the top
- **Logical Grouping**: Group related widgets together
- **Consistent Sizing**: Use similar widget sizes for visual harmony
- **White Space**: Don't overcrowd the dashboard

### Content Strategy
- **Audience-Specific**: Tailor content to who will use the dashboard
- **Actionable Information**: Include data that leads to decisions
- **Context**: Provide explanations and documentation
- **Fresh Data**: Ensure data is current and relevant

### Performance Considerations
- **Limit Widget Count**: Too many widgets slow page loading
- **Efficient Filters**: Use specific filters to reduce data processing
- **Appropriate Refresh**: Set reasonable data refresh intervals

## 🎯 Self-Assessment Checkpoint

### Knowledge Check
Rate your understanding (1-5 scale, where 1=No understanding, 5=Expert level):

- [ ] Dashboard concepts and widget types: ___/5
- [ ] Filter configuration and data focusing: ___/5
- [ ] Widget customization and layout design: ___/5
- [ ] Dashboard design best practices: ___/5

### Skill Validation
Check off the skills you can confidently demonstrate:

- [ ] **Dashboard Creation**: Can create new dashboard pages with appropriate configuration
- [ ] **Widget Management**: Can add and configure different widget types effectively
- [ ] **Filter Application**: Can create and apply filters to focus on relevant data
- [ ] **Design Principles**: Can apply layout and visualization best practices

### Confidence Assessment
How confident are you in applying what you learned?

- [ ] **Very Confident**: Ready to design complex dashboards for any audience
- [ ] **Confident**: Can create effective dashboards with minimal guidance
- [ ] **Somewhat Confident**: Need occasional help with advanced configurations
- [ ] **Not Confident**: Require significant support for dashboard design

### Success Indicators
You've successfully completed this module when you can:

**Knowledge Indicators:**
- [ ] Explain when to use different widget types
- [ ] Describe effective dashboard design principles
- [ ] Understand filter logic and JSON structure
- [ ] Know how to tailor dashboards for different audiences

**Skill Indicators:**
- [ ] Create dashboard pages with appropriate titles and descriptions
- [ ] Configure table widgets with custom properties and filters
- [ ] Build pie charts and number charts for data visualization
- [ ] Add markdown widgets for context and documentation

**Application Indicators:**
- [ ] Design dashboards that serve specific business purposes
- [ ] Choose appropriate widgets for different data types
- [ ] Apply filters strategically to focus on relevant information
- [ ] Plan dashboard layouts that follow visual hierarchy principles





## Common Issues & Solutions

**Problem**: Widget shows no data  
**Solution**: Check filters - they might be too restrictive, or blueprint might have no entities

**Problem**: Chart looks cluttered  
**Solution**: Group similar values or limit the number of categories displayed

**Problem**: Dashboard loads slowly  
**Solution**: Reduce number of widgets or add more specific filters to limit data

**Problem**: Filters not working as expected  
**Solution**: Verify property names match blueprint exactly, check data types

## Next Steps

With dashboards displaying your data effectively, you're ready to add interactivity:
- **[Module 5: Actions](../05-actions/)** - Create self-service workflows and automation

## Quick Reference

### Widget Filter JSON Structure
```json
{
  "combinator": "and|or",
  "rules": [
    {
      "property": "property_name",
      "operator": "=|!=|>|<|contains|in",
      "value": "comparison_value"
    }
  ]
}
```

### Common Filter Operators
- `=` / `!=`: Equals / Not equals
- `>` / `<`: Greater than / Less than
- `contains`: String contains substring
- `in`: Value in array
- `isEmpty` / `isNotEmpty`: Check for empty values

### Dashboard Planning Checklist
- [ ] Define target audience
- [ ] Identify key metrics to display
- [ ] Choose appropriate widget types
- [ ] Plan logical layout and grouping
- [ ] Consider mobile/responsive design
- [ ] Include context and documentation

---

**Completed Module 4?** Continue to [Module 5: Actions](../05-actions/) to learn how to create self-service workflows.