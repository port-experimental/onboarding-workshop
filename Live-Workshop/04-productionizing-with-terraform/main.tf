terraform {
  required_providers {
    port = {
      source  = "port-labs/port"
      version = "~> 1.0"
    }
  }
}

provider "port" {
  client_id     = var.port_client_id
  client_secret = var.port_client_secret
}

# Postmortem Blueprint
resource "port_blueprint" "postmortem" {
  identifier = "postmortem"
  title      = "Postmortem"
  icon       = "Document"
  properties {
    string_props {
      identifier = "title"
      title      = "Title"
    }
    string_props {
      identifier = "status"
      title      = "Status"
      enum       = ["DRAFT", "IN_REVIEW", "COMPLETED"]
    }
    string_props {
      identifier = "summary"
      title      = "Summary"
      format     = "markdown"
    }
    string_props {
      identifier = "lessonsLearned"
      title      = "Lessons Learned"
      format     = "markdown"
    }
  }
  relations {
    identifier = "incident"
    title      = "Related Incident"
    target     = "pagerdutyIncident"
    required   = true
  }
}

# Acknowledge Incident Action
resource "port_action" "acknowledge_incident" {
  identifier           = "Acknowledge" # This needs to match the Action Identifier from the UI exactly
  title                = "Acknowledge"
  blueprint_identifier = "pagerdutyIncident"
  trigger              = "DAY-2"
  invocation_method {
    type   = "WEBHOOK"
    url    = "https://api.pagerduty.com/incidents/{{.entity.identifier}}/"
    method = "PUT"
    headers = {
      "Authorization" = "Token token={{ secrets.PAGERDUTY_API_KEY }}"
      "Content-Type"  = "application/json"
      "Accept"        = "application/vnd.pagerduty+json;version=2"
      "From"          = "{{ secrets.PAGERDUTY_USER_EMAIL }}"
    }
    body = jsonencode({
      incident = {
        type   = "incident_reference"
        status = "acknowledged"
      }
    })
  }
}



