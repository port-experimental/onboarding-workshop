# TechCorp Examples

This directory contains generic examples based on **TechCorp**, a fictional software development company. These examples are designed to be realistic but organization-agnostic, allowing anyone to follow the workshop without requiring specific organizational integrations.

## Directory Structure

```
examples/
├── README.md                           # This file
├── techcorp-data-model.md             # Complete TechCorp company overview
├── blueprints/                        # Blueprint configurations
│   ├── service-blueprint.yaml         # Service/application blueprint
│   ├── team-blueprint.yaml            # Development team blueprint
│   ├── environment-blueprint.yaml     # Environment/infrastructure blueprint
│   ├── release-blueprint.yaml         # GitHub release blueprint
│   ├── pull-request-blueprint.yaml    # GitHub pull request blueprint
│   ├── jenkins-job-blueprint.yaml     # Jenkins CI/CD job blueprint
│   ├── jenkins-build-blueprint.yaml   # Jenkins build execution blueprint
│   └── k8s-deployment-blueprint.yaml  # Kubernetes deployment blueprint
├── integrations/                      # Integration configurations
│   ├── github-integration.yml         # GitHub repositories, PRs, releases
│   ├── jenkins-integration.yml        # Jenkins CI/CD integration
│   └── kubernetes-integration.yml     # Kubernetes deployments and services
├── actions/                           # Self-service action examples
│   ├── deploy-service.json            # Service deployment action
│   ├── create-service.json            # New service creation action
│   └── update-readme.json             # README documentation update
└── scorecards/                        # Scorecard configurations
    ├── service-quality.json           # Service quality metrics
    └── team-productivity.json         # Team productivity metrics
```

## TechCorp Overview

**TechCorp** is a modern software development company that:
- Builds cloud-native applications and services
- Follows DevOps best practices
- Maintains a microservices architecture
- Uses popular technologies and frameworks

### Key Services
- **ecommerce-api** - Core e-commerce platform (Python/Django)
- **mobile-app** - Customer mobile application (React Native)
- **analytics-service** - Real-time analytics (Java/Spring Boot)
- **payment-gateway** - Payment processing (Node.js)
- **user-management** - Authentication service (Python/FastAPI)

### Teams
- **Frontend Team** - Led by Sarah Chen (6 developers)
- **Backend Team** - Led by Mike Rodriguez (8 developers)
- **DevOps Team** - Led by Alex Johnson (4 engineers)
- **QA Team** - Led by Lisa Park (5 testers)
- **Data Team** - Led by David Kim (3 engineers)

## Using These Examples

### 1. Blueprint Examples
The blueprint examples define comprehensive data models for:
- **Services** - Applications and microservices with language, framework, and team ownership
- **Teams** - Development teams with contact info, focus areas, and technology stacks
- **Environments** - Infrastructure environments with cloud provider, region, and monitoring settings
- **Releases** - GitHub releases with deployment status and version tracking
- **Pull Requests** - Code review workflow with size estimation and CI status
- **Jenkins Jobs** - CI/CD pipeline jobs with build status and service relationships

### 2. Integration Examples
The integration templates demonstrate how to connect external systems:
- **GitHub Integration** - Maps repositories to services, imports PRs and releases with enhanced metadata
- **Jenkins Integration** - Connects CI/CD pipelines with build status and test results
- **Kubernetes Integration** - Imports deployments, services, and pods with health monitoring

### 3. Action Examples
The self-service action templates cover common developer workflows:
- **Deploy Service** - Environment-specific deployments with rollback and notifications
- **Create Service** - New service scaffolding with repository, CI/CD, and configuration setup
- **Update README** - Automated documentation updates with standardized templates

### 4. Scorecard Examples
The scorecard templates measure quality across different dimensions:
- **Service Quality** - Documentation, technology compliance, team ownership, and production readiness
- **Team Productivity** - Team structure, contact information, service ownership, and technology focus

## Customization

These examples can be easily customized by:
1. Replacing "TechCorp" with your organization name
2. Updating team names and structures
3. Modifying service names and technologies
4. Adjusting scorecard rules to match your standards

## Repository References

All examples use the `techcorp` GitHub organization:
- `techcorp/ecommerce-api`
- `techcorp/mobile-app`
- `techcorp/analytics-service`
- `techcorp/payment-gateway`
- `techcorp/user-management`
- `techcorp/port-actions` (for workflow automation)

These can be replaced with your actual repositories or used with public repositories for demonstration purposes.