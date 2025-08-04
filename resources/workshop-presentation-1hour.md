# Port Workshop - 1 Hour Compressed Version

## 🎯 Workshop Overview

**Duration**: 60 minutes  
**Format**: Interactive presentation with live demos  
**Audience**: Developers, DevOps engineers, platform teams  
**Goal**: Understand Port's core value and see it in action

---

## 📋 Pre-Workshop Setup (5 minutes before start)

### Facilitator Checklist
- [ ] Port demo instance ready with TechCorp data
- [ ] Screen sharing and audio tested
- [ ] Backup slides ready in case of technical issues
- [ ] Participant access links shared (optional demo accounts)
- [ ] Chat/Q&A moderation setup

### Participant Preparation
- **Optional**: Access to Port demo instance
- **Required**: Web browser for following along
- **Helpful**: Basic familiarity with developer tools

---

## 🚀 Session Structure

### **Opening (5 minutes) - The Developer Portal Problem**

#### Slide 1: Welcome & Agenda
- Workshop goals and what we'll cover
- Interactive format - questions encouraged
- TechCorp scenario introduction

#### Slide 2: The Challenge
**"Why do we need an internal developer portal?"**

**Common Developer Pain Points:**
- "Where is the documentation for this service?"
- "Who owns this microservice?"
- "How do I deploy to staging?"
- "What's the health status of our services?"
- "Which services are production-ready?"

**The Scattered Tool Problem:**
- GitHub for code
- Jira for tickets  
- Confluence for docs
- Jenkins for deployments
- Grafana for monitoring
- Slack for communication

#### Slide 3: Port's Solution
**"One portal to rule them all"**

Port creates a **unified developer experience** by:
- **Centralizing information** from all your tools
- **Enabling self-service** workflows
- **Providing visibility** into your software ecosystem
- **Tracking quality** and compliance

---

### **Demo 1: Port Navigation & Catalog (10 minutes)**

#### Live Demo: TechCorp's Port Instance
**"Let's see Port in action"**

**Show the Home Page (2 minutes)**
- Clean, personalized dashboard
- Key metrics at a glance
- Quick access to common tasks

**Explore the Catalog (5 minutes)**
- **Services Page**: Show TechCorp's microservices
  - ecommerce-api (Python, Backend team)
  - mobile-app (React Native, Frontend team)
  - analytics-service (Java, Data team)
- **Entity Details**: Click into a service
  - Properties, relationships, actions
  - Real-time data from GitHub integration
- **Search & Filter**: Find services by team, language, status

**Self-Service Actions (3 minutes)**
- Show available actions (Deploy Service, Create Environment)
- Demonstrate action form and execution
- Explain how this reduces bottlenecks

**Key Takeaway**: *"Port gives you a single pane of glass for your entire software ecosystem"*

---

### **Concept Deep-Dive: How Port Works (15 minutes)**

#### Slide 4: Port's Architecture
**"The magic behind the portal"**

```
External Systems → Port Integrations → Data Model → User Experience
   (GitHub)     →   (Sync & Map)    → (Blueprints) →   (Catalog)
   (Jenkins)    →                   → (Entities)   →   (Actions)
   (K8s)        →                   → (Relations)  →   (Dashboards)
```

#### Demo 2: Data Model (Blueprints)
**"How Port models your world"** (5 minutes)

**Show Builder → Data Model**
- Visual diagram of TechCorp's data model
- **Service Blueprint**: Properties (name, language, team, URL)
- **Team Blueprint**: Relationships to services
- **Release Blueprint**: Connected to services

**Explain Key Concepts:**
- **Blueprints** = Templates/schemas
- **Entities** = Actual instances (your services, teams, etc.)
- **Relations** = How things connect

#### Demo 3: Data Sources (Integrations)
**"How Port gets its data"** (5 minutes)

**Show Builder → Data Sources**
- GitHub integration pulling repository data
- **Live mapping**: Show how GitHub API data becomes Port entities
- **JQ transformation**: Brief example of data mapping
- **Real-time sync**: Changes in GitHub appear in Port

**Key Concepts:**
- Integrations connect to external systems
- Data mapping transforms API responses
- Automatic synchronization keeps data fresh

#### Demo 4: Quality Tracking (Scorecards)
**"Making quality measurable"** (5 minutes)

**Show Service Scorecard**
- Production Readiness scorecard
- **Levels**: Bronze → Silver → Gold
- **Rules**: Has documentation, uses supported language, not archived
- **Entity scoring**: Show how services achieve different levels

**Business Value:**
- Objective quality measurement
- Improvement guidance for teams
- Compliance tracking
- Quality trends over time

---

### **Demo 5: Self-Service in Action (15 minutes)**

#### The Self-Service Philosophy
**"Empowering developers to help themselves"**

**Traditional Workflow:**
1. Developer needs to deploy → Slack message to DevOps
2. DevOps manually runs deployment → Context switching
3. Back-and-forth for parameters → Delays and errors
4. Manual verification → No audit trail

**Port Self-Service Workflow:**
1. Developer clicks "Deploy Service" → Guided form
2. Port triggers GitHub Actions → Automated execution  
3. Real-time status updates → Full visibility
4. Complete audit trail → Governance and compliance

#### Live Demo: Deploy Service Action
**"Let's deploy the ecommerce-api to staging"** (8 minutes)

**Action Execution:**
1. Navigate to ecommerce-api service
2. Click "Deploy Service" action
3. Fill out form:
   - Target Environment: Staging
   - Version: v1.2.3
   - Deployment Notes: "Bug fix for payment processing"
4. Execute and show run tracking
5. Explain payload sent to GitHub Actions

**Show Action Configuration** (if time permits):
- User inputs (dropdowns, text fields, entity selectors)
- Backend integration (GitHub Actions)
- Payload templating with user context

#### Dashboard Demo
**"Visualizing your ecosystem"** (7 minutes)

**TechCorp Engineering Dashboard:**
- **Service Overview Table**: All active services with key details
- **Language Distribution**: Pie chart showing tech stack
- **Service Count**: Key metric prominently displayed
- **Team Information**: Markdown widget with context

**Show Dashboard Creation:**
- Add new widget (table)
- Configure properties and filters
- Demonstrate real-time data updates

**Dashboard Value:**
- Executive visibility
- Team-specific views
- Operational insights
- Data-driven decisions

---

### **Business Value & Next Steps (10 minutes)**

#### Slide 5: ROI of Internal Developer Portals
**"Why organizations invest in Port"**

**Developer Productivity:**
- 40% reduction in time spent finding information
- 60% faster onboarding for new team members
- 50% reduction in support tickets to platform teams

**Operational Excellence:**
- Standardized deployment processes
- Improved service quality and compliance
- Better incident response with centralized information

**Organizational Benefits:**
- Reduced cognitive load on developers
- Improved cross-team collaboration
- Data-driven engineering decisions
- Scalable self-service culture

#### Slide 6: Implementation Roadmap
**"How to get started with Port"**

**Phase 1: Foundation (Week 1-2)**
- Set up Port instance
- Create core blueprints (Services, Teams)
- Configure GitHub integration
- Import existing services

**Phase 2: Self-Service (Week 3-4)**
- Create first deployment action
- Set up basic dashboards
- Train initial user group
- Gather feedback and iterate

**Phase 3: Scale (Month 2-3)**
- Add more integrations (CI/CD, monitoring)
- Implement quality scorecards
- Create team-specific dashboards
- Expand to more teams

**Phase 4: Advanced (Month 3+)**
- Infrastructure-as-code with Terraform
- Advanced workflows and approvals
- Custom integrations
- Organization-wide adoption

#### Slide 7: Getting Started Resources
**"Your next steps"**

**Immediate Actions:**
1. **Try Port**: Sign up for free trial at [demo.getport.io](https://demo.getport.io/)
2. **Explore**: Use the comprehensive workshop modules for deep learning
3. **Plan**: Identify your first use case and stakeholders
4. **Connect**: Join Port community for support and best practices

**Workshop Resources:**
- **Full Workshop**: 7 detailed modules for comprehensive learning
- **API Reference**: Complete documentation with examples
- **Best Practices**: Configuration patterns and recommendations
- **Troubleshooting**: Common issues and solutions

---

### **Q&A and Wrap-up (5 minutes)**

#### Common Questions & Answers

**Q: "How does Port compare to other developer portals?"**
A: Port focuses on flexibility and integration depth. Unlike rigid platforms, Port adapts to your existing tools and workflows.

**Q: "What's the learning curve for developers?"**
A: Very minimal. Port is designed for intuitive use. Most developers are productive within hours.

**Q: "How do we handle security and permissions?"**
A: Port integrates with your existing SSO and provides granular role-based access control.

**Q: "Can Port work with our existing tools?"**
A: Yes! Port has 50+ pre-built integrations and supports custom integrations via APIs and webhooks.

**Q: "What about maintenance and updates?"**
A: Port is a managed SaaS platform. Updates are automatic, and the platform team handles infrastructure.

#### Final Takeaways

**Key Messages:**
1. **Port solves real developer pain** by centralizing information and enabling self-service
2. **Quick time-to-value** with pre-built integrations and templates
3. **Scales with your organization** from small teams to enterprise
4. **Comprehensive ecosystem** with strong community and support

**Call to Action:**
- Start your Port trial today
- Use the workshop materials for hands-on learning
- Join the Port community for ongoing support

---

## 🎯 Facilitator Notes

### Timing Breakdown
- **Opening**: 5 min
- **Demo 1 (Navigation)**: 10 min
- **Concepts**: 15 min
- **Demo 2 (Self-Service)**: 15 min
- **Business Value**: 10 min
- **Q&A**: 5 min

### Key Success Metrics
- Participants understand Port's core value proposition
- At least 3 live demos completed successfully
- Audience engagement through questions and interaction
- Clear next steps provided for continued learning

### Backup Plans
- **Technical Issues**: Have screenshots ready for each demo
- **Time Overrun**: Skip advanced dashboard creation, focus on core concepts
- **Low Engagement**: Ask direct questions, use polls if available

### Essential Messages
1. Port eliminates developer friction
2. Self-service reduces bottlenecks
3. Quality becomes measurable and improvable
4. Implementation is straightforward with quick wins

---

**Ready to deliver?** This compressed format provides maximum impact in minimal time while maintaining hands-on demonstration value.