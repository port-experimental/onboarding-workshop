# Live Workshop Part 2: The Incident Management Lifecycle

This workshop guides participants through building an end-to-end incident management process orchestrated by Port. It's a 2-hour, hands-on session that assumes completion of the "Part 1" onboarding workshop.

## Workshop Goal

By the end of this workshop, you will have built a system where:
1.  Incidents from PagerDuty are automatically ingested into Port using the native integration.
2.  Developers can use self-service actions within Port to manage the entire incident lifecycle.
3.  Incident data provides an automatic feedback loop into service quality scorecards, creating a culture of continuous improvement.

## Modules

- **[Module 1: Configuring the Native PagerDuty Integration](./01-native-integration/README.md)**
  - **Objective:** Connect Port to PagerDuty and configure it to ingest `Incidents` and `Services`.
  - **Key Tasks:** Install the PagerDuty integration, configure data mappings, and run the integration to populate the software catalog.

- **[Module 2: Advanced Self-Service Actions](./02-advanced-actions/README.md)**
  - **Objective:** Empower developers with powerful actions to manage incidents directly from Port.
  - **Key Tasks:** Create actions to acknowledge and resolve incidents by calling the PagerDuty API, and an action to generate a postmortem document.

- **[Module 3: The Scorecard Feedback Loop](./03-scorecard-feedback-loop/README.md)**
  - **Objective:** Use incident data to drive real-time updates to service quality scorecards.
  - **Key Tasks:** Add an `incidents` property to the `Service` blueprint and update scorecard rules to reflect incident impact.

- **[Module 4: Productionizing with Terraform](./04-productionizing-with-terraform/README.md)**
  - **Objective:** Convert all manually created resources into managed Terraform code.
  - **Key Tasks:** Define blueprints, actions, and scorecards in HCL, and use `terraform import` to take ownership of the resources created in the UI without downtime.

## Prerequisites

- Completion of the "Part 1" onboarding workshop.
- A working Port environment with Admin permissions.
- A PagerDuty account with Admin permissions to generate an API key.
- Terraform v1.0+ installed.
