# Module 4: Dashboards - Facilitator Notes

## Workshop Delivery Guidance

**Pre-Module Setup (10 minutes)**
- Ensure participants have completed Module 3 (data is flowing into Port)
- Verify entities exist in the catalog (Services, GitHub Releases, etc.)
- Test widget creation interface beforehand
- Have examples of good and bad dashboard designs ready

**Module Timing**
- **Concepts Introduction**: 15-20 minutes (dashboard types, widget overview)
- **Dashboard Creation**: 20-25 minutes (create TechCorp Engineering Dashboard)
- **Widget Configuration**: 25-30 minutes (table, pie chart, number chart, markdown)
- **Team Dashboard Exercise**: 15-20 minutes (Backend team dashboard)
- **Best Practices Discussion**: 10-15 minutes

**Key Teaching Points**
1. **Audience-Driven Design**: Different dashboards for different users
2. **Widget Selection**: Match widget type to data and purpose
3. **Filter Strategy**: Use filters to focus on relevant data
4. **Layout Matters**: Visual hierarchy and organization principles

## Demonstration Flow

**Live Demo Sequence:**
1. Show existing dashboards and discuss their purposes
2. Create new dashboard page step-by-step
3. Add table widget with property customization
4. Demonstrate filter creation and testing
5. Add pie chart and number chart widgets
6. Show markdown widget for documentation
7. Discuss layout and visual organization

## Widget Teaching Strategy

**Start with Purpose:**
- "What question are we trying to answer?"
- "Who will use this dashboard?"
- "What action should they take based on this data?"

**Then Choose Widget Type:**
- **Tables**: Detailed information, actionable items
- **Charts**: Trends, distributions, comparisons
- **Numbers**: Key metrics, KPIs
- **Markdown**: Context, documentation, instructions

## Common Questions & Answers

**Q: "How many widgets should I put on one dashboard?"**  
A: Start with 3-5 key widgets. Add more only if they serve the dashboard's purpose.

**Q: "Can I use the same widget on multiple dashboards?"**  
A: No, but you can create similar widgets with the same configuration.

**Q: "Why isn't my filter working?"**  
A: Check property names match exactly, verify data types, test with simple filters first.

**Q: "Can I control who sees which dashboards?"**  
A: Dashboard visibility is controlled by Port's permission system and page settings.

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| No data in widgets | Check if entities exist, verify blueprint selection |
| Filter not working | Validate property names, check data types |
| Widget looks empty | Ensure filter isn't too restrictive |
| Charts showing "Other" | Limit categories or group similar values |
| Slow dashboard loading | Reduce number of widgets or add more specific filters |

## Extension Activities

**For Fast Learners:**
- Create additional dashboard pages for different teams
- Experiment with advanced filter combinations
- Try different chart types and configurations
- Create executive summary dashboard

**For Groups:**
- Discuss dashboard design principles
- Share examples of effective dashboards from their organizations
- Brainstorm dashboard ideas for different stakeholders
- Review and critique each other's dashboard designs

## Assessment Checkpoints

Ensure participants can demonstrate:
- [ ] Create a new dashboard page
- [ ] Add and configure different widget types
- [ ] Apply filters to focus on specific data
- [ ] Customize widget properties and layout
- [ ] Explain design decisions and widget choices

## Advanced Discussion Topics

**Dashboard Strategy:**
- Role-based dashboard design
- Information hierarchy and visual flow
- Mobile and responsive considerations
- Dashboard governance and standards

**Performance Optimization:**
- Widget loading strategies
- Filter efficiency
- Data refresh patterns
- Caching considerations

**User Experience:**
- Dashboard discoverability
- Navigation patterns
- Interactive elements
- Accessibility considerations

## Design Workshop Activity

**Dashboard Design Challenge (20 minutes):**
1. **Scenario**: "Design a dashboard for TechCorp's CTO"
2. **Requirements**: 
   - High-level metrics only
   - Focus on quality and performance
   - Monthly review cadence
3. **Deliverable**: Sketch or describe 3-4 key widgets
4. **Discussion**: Compare approaches and rationale