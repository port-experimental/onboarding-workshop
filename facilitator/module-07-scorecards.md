# Module 6: Scorecards - Facilitator Notes

## Workshop Delivery Guidance

**Pre-Module Setup (10 minutes)**
- Ensure participants have completed Module 5 (actions working)
- Verify access to Builder → Data Model → Scorecards section
- Have sample scorecard JSON configurations ready
- Test scorecard evaluation with existing entities

**Module Timing**
- **Concepts Introduction**: 15-20 minutes (scorecards, levels, rules)
- **Production Readiness Exercise**: 25-30 minutes (create complete scorecard)
- **Level Logic Explanation**: 10-15 minutes (how scoring works)
- **Security Compliance Exercise**: 15-20 minutes (second scorecard)
- **Best Practices Discussion**: 10-15 minutes

**Key Teaching Points**
1. **Quality is Measurable**: Scorecards make subjective quality objective
2. **Progressive Levels**: Each level should be meaningfully harder than the last
3. **Rule Logic**: Understanding AND/OR combinations and level requirements
4. **Organizational Alignment**: Scorecards should reflect real business priorities

## Demonstration Flow

**Live Demo Sequence:**
1. Show existing scorecards and their impact on entities
2. Navigate to scorecard creation interface
3. Build Production Readiness scorecard step-by-step
4. Explain JSON structure and each component
5. Test rules against real entities
6. Show how level determination works with examples
7. Demonstrate filter application

## JSON Teaching Strategy

**Start with Structure:**
```json
{
  "identifier": "simple_scorecard",
  "title": "Simple Scorecard",
  "levels": [...],
  "rules": [...]
}
```

**Add Levels Gradually:**
```json
"levels": [
  {"color": "red", "title": "Basic"},
  {"color": "yellow", "title": "Good"},
  {"color": "green", "title": "Excellent"}
]
```

**Build Rules Incrementally:**
```json
"rules": [
  {
    "identifier": "has_description",
    "title": "Has Description",
    "level": "Good",
    "query": {
      "combinator": "and",
      "conditions": [
        {
          "operator": "isNotEmpty",
          "property": "description"
        }
      ]
    }
  }
]
```

## Common Questions & Answers

**Q: "Why is my service showing 'Basic' when it should be higher?"**  
A: Check that it passes ALL rules for the target level AND all lower levels. One failing rule drops the entire level.

**Q: "Can I have rules that apply to multiple levels?"**  
A: No, each rule applies to exactly one level. But entities must pass all lower-level rules too.

**Q: "How often do scorecards update?"**  
A: Scorecards evaluate in real-time as entity data changes, typically within minutes.

**Q: "Can I weight rules differently?"**  
A: Not directly. All rules at a level are equally important. Use level hierarchy for importance.

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| All entities show "Basic" | Check rule syntax, verify property names match exactly |
| Rules not evaluating | Validate JSON syntax, check operator compatibility with data types |
| Unexpected level results | Review level logic: entity must pass ALL rules at level AND below |
| Scorecard not appearing | Check filters, ensure they don't exclude all entities |
| Performance issues | Simplify complex rules, avoid deeply nested conditions |

## Extension Activities

**For Fast Learners:**
- Create additional scorecards for different quality aspects
- Experiment with complex rule combinations
- Design scorecards for other blueprint types (Teams, Environments)
- Try relationship-based rules

**For Groups:**
- Discuss quality frameworks from their organizations
- Brainstorm scorecard ideas for different stakeholder needs
- Share experiences with quality metrics and KPIs
- Design a comprehensive quality strategy for TechCorp

## Assessment Checkpoints

Ensure participants can demonstrate:
- [ ] Create a new scorecard with multiple levels
- [ ] Write rules using different operators and conditions
- [ ] Understand how level determination works
- [ ] Apply filters to limit scorecard scope
- [ ] Interpret scorecard results and entity levels
- [ ] Explain the business value of quality tracking

## Advanced Discussion Topics

**Scorecard Strategy:**
- Aligning scorecards with business objectives
- Balancing aspirational vs achievable standards
- Evolution of quality standards over time
- Integration with performance reviews and incentives

**Technical Considerations:**
- Rule performance and optimization
- Data quality impact on scorecard accuracy
- Automation of quality improvements
- Integration with CI/CD for quality gates

**Organizational Change:**
- Introducing scorecards without creating blame culture
- Getting buy-in from development teams
- Using scorecards for positive reinforcement
- Measuring scorecard adoption and impact

## Hands-On Workshop Extension

**Quality Framework Design (25 minutes):**
1. **Scenario**: "Design a comprehensive quality framework for TechCorp"
2. **Requirements**: 
   - 3 different scorecards (Production, Security, Developer Experience)
   - Each with 3-4 levels and appropriate rules
   - Consider different stakeholder perspectives
3. **Deliverable**: Scorecard specifications with business justification
4. **Discussion**: Compare approaches and identify common patterns

## Rule Design Patterns

**Common Quality Checks:**
- **Documentation**: Has README, API docs, runbooks
- **Testing**: Has unit tests, integration tests, coverage thresholds
- **Security**: Vulnerability scanning, dependency updates, access controls
- **Operations**: Monitoring, logging, alerting, SLA compliance
- **Compliance**: Code review, approval processes, audit trails

**Rule Complexity Progression:**
1. **Simple Existence**: Does field have a value?
2. **Value Matching**: Does field equal specific value?
3. **Threshold Checking**: Is numeric value above/below threshold?
4. **Pattern Matching**: Does string match expected pattern?
5. **Relationship Rules**: Are related entities in expected state?

## Scorecard Governance

**Best Practices:**
- **Stakeholder Input**: Include teams in scorecard design
- **Regular Review**: Update scorecards as standards evolve
- **Clear Communication**: Explain why each rule matters
- **Positive Framing**: Focus on improvement, not punishment
- **Actionable Rules**: Teams should know how to improve scores

**Common Pitfalls:**
- **Too Many Rules**: Overwhelming teams with excessive requirements
- **Unrealistic Standards**: Setting impossible-to-achieve Gold levels
- **Static Scorecards**: Never updating rules as practices evolve
- **Blame Culture**: Using scorecards punitively instead of constructively