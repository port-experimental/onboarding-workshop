#!/bin/bash
# Usage: ./scripts/bulk-upsert-services.sh services.csv
# CSV format: identifier,title,language,team

[[ -z "$1" || ! -f "$1" ]] && { echo "Usage: $0 services.csv"; exit 1; }

TOKEN_RESPONSE=$(curl -s -X POST https://api.getport.io/v1/auth/access_token \
  -H "Content-Type: application/json" \
  -d "{\"clientId\": \"$PORT_CLIENT_ID\", \"clientSecret\": \"$PORT_CLIENT_SECRET\"}")

TOKEN=$(echo "$TOKEN_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['accessToken'])")

while IFS=',' read -r identifier title language team; do
  [[ "$identifier" == "identifier" ]] && continue  # skip header row
  body=$(jq -n --arg id "$identifier" --arg t "$title" --arg l "$language" --arg tm "$team" \
    '{identifier:$id,title:$t,properties:{language:$l},relations:{team:$tm}}')
  curl -s -X POST "https://api.getport.io/v1/blueprints/service/entities?upsert=true&merge=true" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$body"
  echo "Upserted: $identifier"
done < "$1"
