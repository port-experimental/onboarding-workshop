# Advanced Challenge: Custom Integration Development

**Difficulty**: 🔴 Advanced | **Estimated Time**: 90-120 minutes  
**Prerequisites**: Module 11 completed

---

## Scenario

TechCorp uses an internal ticketing system called **TechTrack** for tracking engineering work items. TechTrack exposes a REST API but has no Port integration. Your task: build a custom integration that keeps Port's catalog in sync with TechTrack tickets.

A mock TechTrack API is available at `https://jsonplaceholder.typicode.com/todos` (using JSONPlaceholder as a stand-in — it has a similar list-of-items structure).

---

## Requirements

### 1. Create the TechTrack Ticket blueprint

Create a blueprint with identifier `techtrack_ticket` and these properties:

| Property | Type | Required |
|----------|------|----------|
| `status` | String (enum: `open`, `in_progress`, `done`) | Yes |
| `priority` | Number (1 = highest) | No |
| `completed` | Boolean | Yes |

Add a relation to `Service` blueprint (many tickets can belong to one service).

### 2. Populate via REST API (warmup)

Using the Port REST API from Module 11, upsert 5 tickets manually. Use the JSONPlaceholder endpoint to fetch real data:

```bash
curl https://jsonplaceholder.typicode.com/todos?_limit=5
```

Map each item to the `techtrack_ticket` blueprint: `id` → identifier, `title` → title, `completed` → `completed` property.

### 3. Build an Ocean integration

Scaffold an Ocean integration that:
- Fetches all todos from `https://jsonplaceholder.typicode.com/todos`
- Maps them to `techtrack_ticket` entities
- Sets `status` based on `completed`: `true` → `"done"`, `false` → `"open"`
- Runs a full resync on demand

### 4. Set up a webhook for real-time updates

Configure an inbound Port webhook that listens for "ticket updated" events. Use this sample payload to test your mapping:

```json
{
  "event": "ticket.updated",
  "ticket": {
    "id": 42,
    "title": "Fix payment timeout",
    "completed": true,
    "userId": 3
  }
}
```

The webhook mapping should upsert the ticket entity with the updated `completed` and `status` values.

---

## Success Criteria

- [ ] `techtrack_ticket` blueprint exists in Builder with correct properties and service relation
- [ ] 5+ ticket entities exist in Port (upserted via REST API)
- [ ] Ocean integration syncs all todos from JSONPlaceholder and maps status correctly
- [ ] Inbound webhook exists in Builder → Data Sources
- [ ] Pasting the sample payload in the webhook **Test** tab generates a valid entity preview

## Bonus Challenges

- Add a Port automation that fires when a ticket's `completed` property changes to `true` and upserts the entity with `status: "done"`
- Add the `open_ticket_count` aggregation property to the Service blueprint (count of related `techtrack_ticket` entities where `completed = false`)
- Secure the webhook with secret validation
