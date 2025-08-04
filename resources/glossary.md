# Port Glossary and Concept Reference

## Core Concepts

### **Action**
A self-service operation that users can trigger from the Port interface. Actions can automate workflows like deployments, creating resources, or updating configurations.

**Example**: A "Deploy Service" action that triggers a GitHub workflow to deploy a service to staging or production.

### **Blueprint**
A schema that defines the structure and properties of entities in Port. Blueprints act as templates that specify what data can be stored for each entity type.

**Example**: A "Service" blueprint with properties like name, team, language, and repository URL.

### **Entity**
An instance of a blueprint that represents a real-world resource or concept. Entities contain actual data that conforms to their blueprint's schema.

**Example**: An entity called "ecommerce-api" based on the "Service" blueprint, with specific values for team, language, etc.

### **Integration**
A connection between Port and external systems that automatically syncs data. Integrations keep Port's catalog up-to-date with real-world resources.

**Example**: GitHub integration that automatically creates entities for repositories and updates them when code changes.

### **Scorecard**
A set of rules that evaluate entities against quality, compliance, or maturity criteria. Scorecards provide automated assessment and improvement tracking.

**Example**: A "Service Maturity" scorecard that checks if services have documentation, tests, and monitoring.

### **Widget**
A visual component on dashboards that displays data in various formats like charts, tables, or metrics. Widgets help users understand their software catalog at a glance.

**Example**: A pie chart widget showing the distribution of programming languages across services.

## Port-Specific Terminology

### **Builder**
The Port interface section where administrators configure blueprints, integrations, actions, and other Port resources. Requires appropriate permissions to access.

### **Catalog**
The main view in Port that displays all entities organized by their blueprints. Users can search, filter, and interact with entities from the catalog.

### **Data Source**
Any external system that provides data to Port through integrations. Common data sources include Git repositories, CI/CD systems, and cloud providers.

### **Entity Page**
A detailed view of a specific entity showing all its properties, related entities, available actions, and scorecard results.

### **Mapping**
The configuration that defines how data from external systems is transformed and stored as Port entities. Uses JQ language for data transformation.

### **Property**
A field within a blueprint that defines what data can be stored for entities. Properties have types (string, number, boolean, etc.) and validation rules.

### **Relation**
A connection between blueprints that defines how entities can be linked together. Relations help model real-world relationships between resources.

### **Run**
An execution instance of an action. Each time a user triggers an action, it creates a run that tracks the execution status and results.

## Technical Terms

### **JQ Language**
A lightweight data processing language used in Port for transforming data from external systems into entity properties.

**Example**: `.name` extracts the name field, `.language // "Unknown"` provides a fallback value.

### **JSON Schema**
The format used to define blueprint properties and their validation rules. Follows standard JSON Schema specifications.

### **Webhook**
HTTP callbacks that external systems can send to Port to trigger updates or actions. Used for real-time data synchronization.

### **YAML Configuration**
The format used for defining integrations, blueprints, and other Port configurations. More human-readable than JSON.

## Blueprint Properties

### **Array Property**
A property that can contain multiple values of the same type.

**Example**: A "tags" property that stores multiple string values like ["backend", "api", "python"].

### **Boolean Property**
A true/false property used for yes/no questions or feature flags.

**Example**: A "has_monitoring" property indicating whether a service has monitoring enabled.

### **Enum Property**
A property with a predefined set of allowed values.

**Example**: An "environment" property with values limited to ["development", "staging", "production"].

### **Number Property**
A numeric property that can store integers or decimals.

**Example**: A "port_number" property storing the service's listening port.

### **Object Property**
A complex property that contains nested key-value pairs.

**Example**: A "metadata" property storing structured information about a service.

### **String Property**
A text property that can store any string value, optionally with format validation.

**Example**: A "repository_url" property with URL format validation.

### **Aggregate Property**
A property that automatically calculates values based on data from related entities or collections. Aggregate properties perform operations like counting, summing, averaging, or finding min/max values across multiple entities.

**Example**: A "total_services" property on a Team blueprint that counts all services owned by that team, or an "average_test_coverage" property that calculates the mean test coverage across all team services.

### **Calculation Property**
A property that computes values using mathematical expressions or formulas based on other properties within the same entity. Calculation properties use JQ expressions to transform and combine existing property values.

**Example**: A "health_score" property that calculates a weighted score based on multiple factors like `(.test_coverage * 0.4) + (.documentation_score * 0.3) + (.security_score * 0.3)`, or a "days_since_deployment" property that calculates the difference between current date and last deployment date.

## Action Types

### **GitHub Action**
An action that triggers a GitHub workflow when executed. Commonly used for deployments, testing, and automation.

### **HTTP Action**
An action that makes HTTP requests to external APIs or webhooks when triggered.

### **Kafka Action**
An action that publishes messages to Kafka topics for event-driven workflows.

### **Webhook Action**
An action that sends HTTP POST requests to specified URLs with entity and input data.

## Integration Types

### **GitHub Integration**
Syncs repositories, pull requests, releases, and other GitHub resources as Port entities.

### **GitLab Integration**
Similar to GitHub but for GitLab repositories and resources.

### **Jenkins Integration**
Syncs Jenkins jobs, builds, and pipeline information.

### **Kubernetes Integration**
Syncs Kubernetes resources like deployments, services, and pods.

### **Custom Integration**
User-defined integrations that connect to any system with an API.

## Scorecard Elements

### **Rule**
A single criterion within a scorecard that evaluates entities against specific conditions.

**Example**: "Has README" rule checking if a repository has documentation.

### **Level**
The difficulty or importance tier of a scorecard rule (Bronze, Silver, Gold).

### **Query**
The condition logic that determines whether an entity passes a scorecard rule.

### **Score**
The calculated result of all scorecard rules for an entity, often shown as a percentage.

## Dashboard Components

### **Filter**
A mechanism to limit which entities are displayed in widgets based on property values.

### **iFrame Widget**
A widget that embeds external web content like Grafana dashboards or documentation.

### **Line Chart Widget**
A widget that displays trends and changes over time using line graphs.

### **Number Chart Widget**
A widget that displays single numeric values or key performance indicators.

### **Pie Chart Widget**
A widget that shows proportional data using circular charts.

### **Table Widget**
A widget that displays entity data in rows and columns for detailed viewing.

## User Roles and Permissions

### **Admin**
Users with full access to configure Port, including blueprints, integrations, and user management.

### **Member**
Regular users who can view entities, execute actions, and use Port features but cannot modify configurations.

### **Viewer**
Users with read-only access to Port entities and dashboards.

## API and Development

### **API Token**
Authentication credentials used to access Port's REST API programmatically.

### **Client ID/Secret**
OAuth-style credentials used for API authentication and integration setup.

### **Port CLI**
Command-line interface tool for managing Port configurations and automating tasks.

### **SDK**
Software development kits available in various programming languages for Port integration.

## Common Patterns

### **Service Catalog**
A common Port use case where services are modeled as entities with properties like team ownership, technology stack, and deployment information.

### **Infrastructure Catalog**
Modeling cloud resources, servers, and infrastructure components as Port entities.

### **Team Ownership**
Assigning entities to teams for responsibility and access control purposes.

### **Environment Tracking**
Modeling different deployment environments (dev, staging, prod) and their relationships to services.

## Troubleshooting Terms

### **Mapping Error**
Issues with JQ expressions or data transformation in integrations.

### **Permission Denied**
Access control issues preventing users from viewing or modifying resources.

### **Rate Limiting**
API throttling that occurs when too many requests are made in a short time.

### **Sync Failure**
Problems with integrations not updating entity data from external systems.

### **Validation Error**
Issues with entity data not conforming to blueprint property requirements.

## Best Practice Concepts

### **Data Consistency**
Ensuring entity properties follow consistent naming and formatting conventions across blueprints.

### **Incremental Sync**
Updating only changed data rather than full refreshes to improve performance.

### **Progressive Enhancement**
Starting with simple Port configurations and gradually adding complexity.

### **Schema Evolution**
Managing changes to blueprint schemas over time without breaking existing entities.

---

This glossary provides definitions for key Port concepts and terminology used throughout the workshop. For more detailed information, refer to the [API Reference](api-reference.md) and [Best Practices Guide](best-practices.md).