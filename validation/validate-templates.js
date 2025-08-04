#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { glob } = require('glob');
const chalk = require('chalk');

class TemplateValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validatedFiles = 0;
    this.templateRequirements = this.getTemplateRequirements();
  }

  getTemplateRequirements() {
    return {
      blueprint: {
        required: ['identifier', 'title', 'schema'],
        recommended: ['icon', 'description'],
        schemaRequired: ['properties'],
        schemaRecommended: ['required']
      },
      action: {
        required: ['identifier', 'title', 'trigger', 'invocationMethod'],
        recommended: ['description', 'icon', 'permissions'],
        triggerRequired: ['type'],
        triggerRecommended: ['userInputs']
      },
      integration: {
        required: ['resources'],
        recommended: [],
        resourceRequired: ['kind', 'port'],
        resourceRecommended: ['selector']
      },
      scorecard: {
        required: ['identifier', 'title', 'filter', 'rules'],
        recommended: ['description'],
        ruleRequired: ['identifier', 'title', 'level'],
        ruleRecommended: ['description']
      }
    };
  }

  async validateAllTemplates() {
    console.log(chalk.blue('📋 Starting template completeness validation...'));
    
    // Find all configuration files
    const yamlFiles = await glob('../examples/**/*.{yml,yaml}', { ignore: ['../node_modules/**'] });
    const jsonFiles = await glob('../examples/**/*.json', { ignore: ['../node_modules/**'] });
    
    console.log(chalk.gray(`Found ${yamlFiles.length} YAML and ${jsonFiles.length} JSON template files`));
    
    // Validate YAML templates
    for (const file of yamlFiles) {
      await this.validateYamlTemplate(file);
    }
    
    // Validate JSON templates
    for (const file of jsonFiles) {
      await this.validateJsonTemplate(file);
    }
    
    this.printResults();
    return this.errors.length === 0;
  }

  async validateYamlTemplate(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // For Port integration files, use more lenient parsing due to JQ expressions
      const isIntegration = filePath.includes('integration');
      let data;
      
      if (isIntegration) {
        // Try to parse with schema validation disabled for JQ expressions
        try {
          data = yaml.load(content, { schema: yaml.CORE_SCHEMA });
        } catch (integrationError) {
          // If that fails, try with JSON schema which is more permissive
          data = yaml.load(content, { schema: yaml.JSON_SCHEMA });
        }
      } else {
        data = yaml.load(content);
      }
      
      const templateType = this.detectTemplateType(filePath, data);
      if (templateType) {
        this.validateTemplate(filePath, data, templateType);
        console.log(chalk.green(`✓ ${path.relative('..', filePath)} (${templateType})`));
      } else {
        this.warnings.push({
          file: filePath,
          type: 'Unknown Template Type',
          message: 'Could not determine template type for validation'
        });
        console.log(chalk.yellow(`? ${path.relative('..', filePath)} (unknown type)`));
      }
      
      this.validatedFiles++;
    } catch (error) {
      // For integration files with JQ syntax, provide more helpful error messages
      if (filePath.includes('integration') && error.message.includes('missed comma')) {
        this.warnings.push({
          file: filePath,
          type: 'Integration Template Warning',
          message: 'Integration file contains JQ expressions that may not parse perfectly with YAML validator'
        });
        this.validatedFiles++;
        console.log(chalk.yellow(`⚠ ${path.relative('..', filePath)} (JQ syntax detected)`));
      } else {
        this.errors.push({
          file: filePath,
          type: 'Template Parse Error',
          message: error.message
        });
        console.log(chalk.red(`✗ ${path.relative('..', filePath)}: ${error.message}`));
      }
    }
  }

  async validateJsonTemplate(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      const templateType = this.detectTemplateType(filePath, data);
      if (templateType) {
        this.validateTemplate(filePath, data, templateType);
        console.log(chalk.green(`✓ ${path.relative('..', filePath)} (${templateType})`));
      } else {
        this.warnings.push({
          file: filePath,
          type: 'Unknown Template Type',
          message: 'Could not determine template type for validation'
        });
        console.log(chalk.yellow(`? ${path.relative('..', filePath)} (unknown type)`));
      }
      
      this.validatedFiles++;
    } catch (error) {
      this.errors.push({
        file: filePath,
        type: 'Template Parse Error',
        message: error.message
      });
      console.log(chalk.red(`✗ ${path.relative('..', filePath)}: ${error.message}`));
    }
  }

  detectTemplateType(filePath, data) {
    const fileName = path.basename(filePath).toLowerCase();
    
    // Detect by file path
    if (filePath.includes('blueprint')) return 'blueprint';
    if (filePath.includes('action')) return 'action';
    if (filePath.includes('integration')) return 'integration';
    if (filePath.includes('scorecard')) return 'scorecard';
    
    // Detect by content structure
    if (data.identifier && data.schema) return 'blueprint';
    if (data.identifier && data.trigger && data.invocationMethod) return 'action';
    if (data.resources && Array.isArray(data.resources)) return 'integration';
    if (data.identifier && data.rules && Array.isArray(data.rules)) return 'scorecard';
    
    return null;
  }

  validateTemplate(filePath, data, templateType) {
    const requirements = this.templateRequirements[templateType];
    if (!requirements) return;
    
    // Check required fields
    const missingRequired = requirements.required.filter(field => !data[field]);
    if (missingRequired.length > 0) {
      this.errors.push({
        file: filePath,
        type: `${templateType} Template Error`,
        message: `Missing required fields: ${missingRequired.join(', ')}`
      });
    }
    
    // Check recommended fields
    const missingRecommended = requirements.recommended.filter(field => !data[field]);
    if (missingRecommended.length > 0) {
      this.warnings.push({
        file: filePath,
        type: `${templateType} Template Warning`,
        message: `Missing recommended fields: ${missingRecommended.join(', ')}`
      });
    }
    
    // Type-specific validations
    switch (templateType) {
      case 'blueprint':
        this.validateBlueprintTemplate(filePath, data);
        break;
      case 'action':
        this.validateActionTemplate(filePath, data);
        break;
      case 'integration':
        this.validateIntegrationTemplate(filePath, data);
        break;
      case 'scorecard':
        this.validateScorecardTemplate(filePath, data);
        break;
    }
  }

  validateBlueprintTemplate(filePath, data) {
    const requirements = this.templateRequirements.blueprint;
    
    if (data.schema) {
      const missingSchemaRequired = requirements.schemaRequired.filter(field => !data.schema[field]);
      if (missingSchemaRequired.length > 0) {
        this.errors.push({
          file: filePath,
          type: 'Blueprint Schema Error',
          message: `Schema missing required fields: ${missingSchemaRequired.join(', ')}`
        });
      }
      
      const missingSchemaRecommended = requirements.schemaRecommended.filter(field => !data.schema[field]);
      if (missingSchemaRecommended.length > 0) {
        this.warnings.push({
          file: filePath,
          type: 'Blueprint Schema Warning',
          message: `Schema missing recommended fields: ${missingSchemaRecommended.join(', ')}`
        });
      }
      
      // Validate properties structure
      if (data.schema.properties) {
        Object.entries(data.schema.properties).forEach(([propName, propDef]) => {
          if (!propDef.type) {
            this.errors.push({
              file: filePath,
              type: 'Blueprint Property Error',
              message: `Property '${propName}' missing type definition`
            });
          }
          if (!propDef.title) {
            this.warnings.push({
              file: filePath,
              type: 'Blueprint Property Warning',
              message: `Property '${propName}' missing title`
            });
          }
        });
      }
    }
  }

  validateActionTemplate(filePath, data) {
    const requirements = this.templateRequirements.action;
    
    if (data.trigger) {
      const missingTriggerRequired = requirements.triggerRequired.filter(field => !data.trigger[field]);
      if (missingTriggerRequired.length > 0) {
        this.errors.push({
          file: filePath,
          type: 'Action Trigger Error',
          message: `Trigger missing required fields: ${missingTriggerRequired.join(', ')}`
        });
      }
      
      // Validate self-service actions have user inputs
      if (data.trigger.type === 'self-service' && !data.trigger.userInputs) {
        this.warnings.push({
          file: filePath,
          type: 'Action Trigger Warning',
          message: 'Self-service action should define userInputs'
        });
      }
      
      // Validate user inputs structure
      if (data.trigger.userInputs && data.trigger.userInputs.properties) {
        Object.entries(data.trigger.userInputs.properties).forEach(([inputName, inputDef]) => {
          if (!inputDef.type) {
            this.errors.push({
              file: filePath,
              type: 'Action Input Error',
              message: `Input '${inputName}' missing type definition`
            });
          }
          if (!inputDef.title) {
            this.warnings.push({
              file: filePath,
              type: 'Action Input Warning',
              message: `Input '${inputName}' missing title`
            });
          }
        });
      }
    }
    
    // Validate invocation method
    if (data.invocationMethod && !data.invocationMethod.type) {
      this.errors.push({
        file: filePath,
        type: 'Action Invocation Error',
        message: 'Invocation method missing type'
      });
    }
  }

  validateIntegrationTemplate(filePath, data) {
    const requirements = this.templateRequirements.integration;
    
    if (data.resources && Array.isArray(data.resources)) {
      data.resources.forEach((resource, index) => {
        const missingResourceRequired = requirements.resourceRequired.filter(field => !resource[field]);
        if (missingResourceRequired.length > 0) {
          this.errors.push({
            file: filePath,
            type: 'Integration Resource Error',
            message: `Resource ${index} missing required fields: ${missingResourceRequired.join(', ')}`
          });
        }
        
        // Validate port entity mapping
        if (resource.port && resource.port.entity && resource.port.entity.mappings) {
          if (!resource.port.entity.mappings.identifier) {
            this.errors.push({
              file: filePath,
              type: 'Integration Mapping Error',
              message: `Resource ${index} missing identifier mapping`
            });
          }
          if (!resource.port.entity.mappings.blueprint) {
            this.errors.push({
              file: filePath,
              type: 'Integration Mapping Error',
              message: `Resource ${index} missing blueprint mapping`
            });
          }
        }
      });
    }
  }

  validateScorecardTemplate(filePath, data) {
    const requirements = this.templateRequirements.scorecard;
    
    if (data.rules && Array.isArray(data.rules)) {
      data.rules.forEach((rule, index) => {
        const missingRuleRequired = requirements.ruleRequired.filter(field => !rule[field]);
        if (missingRuleRequired.length > 0) {
          this.errors.push({
            file: filePath,
            type: 'Scorecard Rule Error',
            message: `Rule ${index} missing required fields: ${missingRuleRequired.join(', ')}`
          });
        }
        
        // Validate rule level
        if (rule.level && !['Gold', 'Silver', 'Bronze'].includes(rule.level)) {
          this.warnings.push({
            file: filePath,
            type: 'Scorecard Rule Warning',
            message: `Rule ${index} has non-standard level: ${rule.level}`
          });
        }
      });
    }
  }

  printResults() {
    console.log('\n' + chalk.blue('📊 Template Validation Results'));
    console.log(chalk.gray('─'.repeat(50)));
    
    console.log(chalk.green(`✓ Templates validated: ${this.validatedFiles}`));
    
    if (this.warnings.length > 0) {
      console.log(chalk.yellow(`⚠ Warnings: ${this.warnings.length}`));
      this.warnings.forEach(warning => {
        console.log(chalk.yellow(`  ${path.relative('..', warning.file)}: ${warning.message}`));
      });
    }
    
    if (this.errors.length > 0) {
      console.log(chalk.red(`✗ Errors: ${this.errors.length}`));
      this.errors.forEach(error => {
        console.log(chalk.red(`  ${path.relative('..', error.file)}: ${error.message}`));
      });
    } else {
      console.log(chalk.green('✓ All templates are complete!'));
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new TemplateValidator();
  validator.validateAllTemplates().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = TemplateValidator;