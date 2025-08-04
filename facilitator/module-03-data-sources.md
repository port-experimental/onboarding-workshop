# Module 3: Data Sources - Facilitator Notes

## Workshop Delivery Guidance

**Pre-Module Setup (10 minutes)**
- Ensure participants have completed Module 2 (GitHub Release blueprint exists)
- Verify access to Builder → Data Sources section
- Have sample GitHub API responses ready for demonstration
- Test the integration editor interface beforehand

**Module Timing**
- **Concepts Introduction**: 20-25 minutes (integrations, data flow, JQ basics)
- **Hands-On Exercise**: 30-40 minutes (configure GitHub release mapping)
- **Service Blueprint Exercise**: 15-20 minutes (update existing mapping)
- **Troubleshooting & Q&A**: 10-15 minutes

**Key Teaching Points**
1. **Data Flow**: External System → Integration → Mapping → Port Entities
2. **JQ is Powerful**: Show simple examples before complex transformations
3. **Test Early, Test Often**: Always use the test panel before saving
4. **Selector Queries**: Explain how to filter data at ingestion time

## Demonstration Flow

**Live Demo Sequence:**
1. Navigate to Builder → Data Sources and explain the interface
2. Open existing GitHub integration and show the three-panel layout
3. Demonstrate the "Kinds to Test" with real GitHub data
4. Walk through JQ syntax with simple examples
5. Build the release mapping step-by-step
6. Show testing process and expected results
7. Save and demonstrate the sync process

## JQ Teaching Strategy

**Start Simple:**
```yaml
# Basic field extraction
.name → "ecommerce-api"
.description → "TechCorp's main API service"
```

**Add Complexity Gradually:**
```yaml
# Nested fields
.repository.name → "ecommerce-api"

# Type conversion
.id | tostring → "12345"

# Conditional logic
if .archived then "archived" else "active" end
```

## Common Questions & Answers

**Q: "Why do we need JQ? Can't Port just import everything?"**  
A: JQ allows transformation and filtering. Raw API data rarely matches your blueprint structure perfectly.

**Q: "What if the API response doesn't have a field I'm mapping?"**  
A: The mapping will result in null/empty values. Use conditional logic or default values.

**Q: "How often does Port sync data from integrations?"**  
A: Depends on configuration, typically every few minutes to hours. Can also trigger manual syncs.

**Q: "Can I map the same API field to multiple blueprint properties?"**  
A: Yes, you can reuse API fields and transform them differently for different properties.

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| No test data showing | Check if integration is properly connected to GitHub |
| JQ syntax errors | Validate syntax in test panel, check for typos |
| Mapping not creating entities | Verify blueprint identifier matches exactly |
| Required fields missing | Ensure all required blueprint properties are mapped |
| Relationship errors | Check that related entities exist with correct identifiers |

## Extension Activities

**For Fast Learners:**
- Explore other GitHub "kinds" (issues, pull_requests)
- Try mapping additional Service properties
- Experiment with complex JQ transformations

**For Groups:**
- Discuss integration strategies for their organization's tools
- Share experiences with API integrations
- Brainstorm additional data sources that would be valuable

## Assessment Checkpoints

Ensure participants can demonstrate:
- [ ] Navigate the three-panel integration editor
- [ ] Write basic JQ expressions for field extraction
- [ ] Test mapping configurations before saving
- [ ] Successfully create entities from API data
- [ ] Troubleshoot common mapping issues

## Advanced Discussion Topics

**Integration Patterns:**
- Batch vs real-time data synchronization
- Handling API rate limits and failures
- Data consistency and conflict resolution

**JQ Best Practices:**
- Error handling in transformations
- Performance considerations for complex mappings
- Reusable transformation patterns

**Operational Considerations:**
- Monitoring integration health
- Managing integration credentials securely
- Planning for API changes and versioning