# Module 1: Getting Started with Port

## 🧭 Navigation

**Learning Path**: [Choose Your Path](../../README.md#-choose-your-learning-path) | **Next**: [Module 2: Blueprints](../02-blueprints/)

**All Modules**: [Workshop Home](../../README.md) | **Challenges**: [Beginner](../../challenges/beginner/) | [Intermediate](../../challenges/intermediate/) | [Advanced](../../challenges/advanced/)

---

## 📍 Module Overview

⏱️ **Duration**: 30-45 minutes | 📋 **Prerequisites**: None

**Progress**: Module 1 of 7 | **Completion**: 14% of core modules

## Learning Objectives
By the end of this module, you will be able to:
- Navigate the Port interface confidently
- Understand Port's core concepts and terminology
- Access different sections of Port (Home, Catalog, Self-Service, Builder)
- Set up your Port environment for the workshop

## Prerequisites
- Basic understanding of web applications
- Familiarity with developer tools and workflows
- **Port Instance Access**: See [Setup Guide](../../setup-guide.md) for detailed setup instructions

## Duration
**Estimated Time**: 30-45 minutes

## 🔧 Environment Setup & Validation

Before starting this module, ensure your environment is properly configured:

### Quick Environment Check
1. **Port Access**: Can you access your Port instance URL?
2. **Browser**: Using a modern browser (Chrome, Firefox, Safari, Edge)?
3. **Permissions**: Do you have the necessary permissions for the workshop?

### Automated Validation (Optional)
Run our environment validation script to check your setup:

```bash
# Run the validation script (from workshop directory)
chmod +x validation/validate-environment.sh
./validation/validate-environment.sh https://app.port.io
```

Or use the Node.js version:
```bash
node validation/environment-check.js https://app.port.io
```

### Manual Validation Checklist
- [ ] Can access Port instance URL
- [ ] Can log in successfully
- [ ] Home page loads without errors
- [ ] Navigation menu is visible and functional
- [ ] No JavaScript errors in browser console

**Need Help?** See the comprehensive [Setup Guide](../../setup-guide.md) for troubleshooting.

## Key Concepts

### What is Port?
Port is an internal developer portal that allows organizations to create custom, curated experiences for developers. It provides:

- **Software Catalog**: Centralized view of all your services, teams, and resources
- **Self-Service Actions**: Automated workflows developers can trigger themselves
- **Dashboards**: Customizable visualizations of your development ecosystem
- **Quality Tracking**: Scorecards and metrics to maintain standards

### Core Components

| Component | Description | Example |
|-----------|-------------|---------|
| **Blueprints** | Data models that define entity structure | Service, Team, Environment |
| **Entities** | Individual instances of blueprints | "user-service", "frontend-team" |
| **Actions** | Self-service workflows | Deploy service, Create environment |
| **Integrations** | Connections to external systems | GitHub, Jenkins, Kubernetes |

## Hands-On Exercise: Port Navigation

### Step 1: Access Port
For this workshop, we'll use **TechCorp** - a fictional software company - as our example organization.

1. Access your Port instance (trial, demo, or provided workshop environment)
2. Log in using your credentials
3. You should see the Port home page

### Step 2: Explore the Home Page
The Home page serves as your personal dashboard:

- **Navigation Menu**: Home, Catalog, Self-Service sections
- **Widgets**: Data visualizations and quick actions
- **+ Widget Button**: Add new widgets to customize your view

**Try This**: Click the `+ Widget` button to see available widget types:
- Data representation widgets (tables, charts)
- Custom widgets (IFrame, Markdown)
- Personal widgets (based on your context)

### Step 3: Navigate to the Catalog
The Catalog shows all entities in your software ecosystem:

1. Click **Catalog** in the navigation menu
2. Explore the left sidebar - these are your **Pages**
3. Notice pages like "Services", "Teams", "Environments"
4. Click on different pages to see the entities

**What You'll See**: TechCorp has several services like:
- `ecommerce-api` (Backend team, Python)
- `mobile-app` (Frontend team, React Native)
- `analytics-service` (Data team, Java)

### Step 4: Check Self-Service Actions
Self-Service is where developers can trigger automated workflows:

1. Click **Self-Service** in the navigation menu
2. Look for available actions (there might be none initially)
3. Click `+ Action` to see the action creation form

### Step 5: Explore the Builder
The Builder is where Port administrators configure everything:

1. Click **Builder** in the top-right corner
2. Explore the different sections:
   - **Data Model**: Blueprints and their relationships
   - **Data Sources**: Integrations with external systems
   - **Pages**: Catalog and dashboard page configurations

**Important**: The `...` menu in Builder contains:
- Credentials for API access
- Data export tools
- Useful documentation links

## 🎯 Self-Assessment Checkpoint

### Knowledge Check
Rate your understanding (1-5 scale, where 1=No understanding, 5=Expert level):

- [ ] Port's core purpose and components: ___/5
- [ ] Navigation between different Port sections: ___/5
- [ ] Difference between user and admin interfaces: ___/5
- [ ] TechCorp example context and use cases: ___/5

### Skill Validation
Check off the skills you can confidently demonstrate:

- [ ] **Navigation Skills**: Can move between Home, Catalog, Self-Service, and Builder
- [ ] **Interface Recognition**: Can identify key features in each section
- [ ] **Widget Management**: Can locate and understand widget creation
- [ ] **Admin Access**: Can find Builder credentials and configuration areas

### Confidence Assessment
How confident are you in applying what you learned?

- [ ] **Very Confident**: Ready to explore Port independently
- [ ] **Confident**: Can navigate with minimal guidance
- [ ] **Somewhat Confident**: Need occasional help with navigation
- [ ] **Not Confident**: Require significant support

### Success Indicators
You've successfully completed this module when you can:

**Knowledge Indicators:**
- [ ] Explain Port's main purpose in your own words
- [ ] Describe the four main sections and their purposes
- [ ] Understand the TechCorp example context

**Skill Indicators:**
- [ ] Navigate between all Port sections without assistance
- [ ] Locate key features like widget creation and credentials
- [ ] Distinguish between user and admin interfaces

**Application Indicators:**
- [ ] Identify how Port might fit into your workflow
- [ ] Plan which sections you'll use most frequently
- [ ] Understand prerequisites for the next module



## Common Issues & Solutions

**Problem**: Can't access Port instance  
**Solution**: Verify your login credentials and ensure you have the correct URL

**Problem**: Empty catalog or no data visible  
**Solution**: This is normal for new instances - data will be populated as we configure integrations

**Problem**: Missing permissions for Builder section  
**Solution**: Ensure you have admin access or are using the correct workshop environment

## Next Steps

Now that you're comfortable with Port navigation, you're ready to dive deeper into:
- **[Module 2: Blueprints](../02-blueprints/)** - Learn how Port models your data
- **[Module 3: Data Sources](../03-data-sources/)** - Understand how Port gets its data

## Quick Reference

### Port Interface Sections
- **Home**: Personal dashboard with widgets
- **Catalog**: Browse all entities and pages
- **Self-Service**: Available actions and workflows
- **Builder**: Administrative configuration interface

### Key Terminology
- **Entity**: A specific instance (e.g., "user-service")
- **Blueprint**: A data model template (e.g., "Service")
- **Page**: A view in the catalog (e.g., "Services" page)
- **Widget**: A visualization component on dashboards

---

**Completed Module 1?** Continue to [Module 2: Blueprints](../02-blueprints/) to learn about Port's data modeling.