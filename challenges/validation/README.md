# Challenge Validation Scripts

This directory contains validation scripts and success criteria for Port workshop challenges.

## Structure

- `beginner/` - Validation scripts for beginner challenges
- `intermediate/` - Validation scripts for intermediate challenges  
- `advanced/` - Validation scripts for advanced challenges
- `common/` - Shared validation utilities

## Usage

Each challenge has corresponding validation scripts that can be used to:
- Verify challenge completion
- Check configuration correctness
- Validate data integrity
- Test functionality

## Validation Types

### Configuration Validation
- Blueprint schema validation
- Action configuration validation
- Integration setup validation
- Dashboard widget validation

### Data Validation
- Entity creation validation
- Relationship validation
- Property validation
- Data consistency checks

### Functional Validation
- Action execution validation
- Integration sync validation
- Dashboard functionality validation
- User experience validation

## Running Validations

Validation scripts can be run manually or integrated into automated testing workflows.

```bash
# Run all validations for a specific challenge
./validate-challenge.sh beginner/first-blueprint

# Run specific validation type
./validate-config.sh blueprints/team

# Run all beginner challenge validations
./validate-level.sh beginner
```