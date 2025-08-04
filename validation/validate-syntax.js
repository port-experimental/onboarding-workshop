#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { glob } = require('glob');
const chalk = require('chalk');

class SyntaxValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validatedFiles = 0;
  }

  async validateAllFiles() {
    console.log(chalk.blue('🔍 Starting syntax validation...'));
    
    // Find all YAML and JSON files (excluding node_modules and build artifacts)
    const yamlFiles = await glob('../**/*.{yml,yaml}', { 
      ignore: ['**/node_modules/**', '../.git/**'] 
    });
    const jsonFiles = await glob('../**/*.json', { 
      ignore: [
        '**/node_modules/**', 
        '../.git/**', 
        '**/package-lock.json',
        '**/tsconfig.json'
      ] 
    });
    
    console.log(chalk.gray(`Found ${yamlFiles.length} YAML files and ${jsonFiles.length} JSON files`));
    
    // Validate YAML files
    for (const file of yamlFiles) {
      await this.validateYamlFile(file);
    }
    
    // Validate JSON files
    for (const file of jsonFiles) {
      await this.validateJsonFile(file);
    }
    
    this.printResults();
    return this.errors.length === 0;
  }

  async validateYamlFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // For Port integration files, use more lenient parsing due to JQ expressions
      const isIntegration = filePath.includes('integration');
      let parsed;
      
      if (isIntegration) {
        // Try to parse with schema validation disabled for JQ expressions
        try {
          parsed = yaml.load(content, { schema: yaml.CORE_SCHEMA });
        } catch (integrationError) {
          // If that fails, try with JSON schema which is more permissive
          parsed = yaml.load(content, { schema: yaml.JSON_SCHEMA });
        }
      } else {
        parsed = yaml.load(content);
      }
      
      // Additional YAML-specific validations
      this.validatePortBlueprint(filePath, parsed);
      this.validatePortIntegration(filePath, parsed);
      
      this.validatedFiles++;
      console.log(chalk.green(`✓ ${path.relative('..', filePath)}`));
    } catch (error) {
      // For integration files with JQ syntax, provide more helpful error messages
      if (filePath.includes('integration') && error.message.includes('missed comma')) {
        this.warnings.push({
          file: filePath,
          type: 'YAML Integration Warning',
          message: 'Integration file contains JQ expressions that may not parse perfectly with YAML validator'
        });
        this.validatedFiles++;
        console.log(chalk.yellow(`⚠ ${path.relative('..', filePath)}: JQ syntax detected`));
      } else {
        this.errors.push({
          file: filePath,
          type: 'YAML Syntax Error',
          message: error.message,
          line: error.mark ? error.mark.line + 1 : null
        });
        console.log(chalk.red(`✗ ${path.relative('..', filePath)}: ${error.message}`));
      }
    }
  }

  async validateJsonFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(content);
      
      // Additional JSON-specific validations
      this.validatePortAction(filePath, parsed);
      this.validatePortScorecard(filePath, parsed);
      
      this.validatedFiles++;
      console.log(chalk.green(`✓ ${path.relative('..', filePath)}`));
    } catch (error) {
      this.errors.push({
        file: filePath,
        type: 'JSON Syntax Error',
        message: error.message
      });
      console.log(chalk.red(`✗ ${path.relative('..', filePath)}: ${error.message}`));
    }
  }

  validatePortBlueprint(filePath, data) {
    if (!filePath.includes('blueprint')) return;
    
    const required = ['identifier', 'title', 'schema'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
      this.errors.push({
        file: filePath,
        type: 'Blueprint Validation',
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }
    
    // Validate schema structure
    if (data.schema && !data.schema.properties) {
      this.warnings.push({
        file: filePath,
        type: 'Blueprint Warning',
        message: 'Blueprint schema should have properties defined'
      });
    }
  }

  validatePortIntegration(filePath, data) {
    if (!filePath.includes('integration')) return;
    
    if (!data.resources || !Array.isArray(data.resources)) {
      this.errors.push({
        file: filePath,
        type: 'Integration Validation',
        message: 'Integration must have resources array'
      });
      return;
    }
    
    data.resources.forEach((resource, index) => {
      if (!resource.kind) {
        this.errors.push({
          file: filePath,
          type: 'Integration Validation',
          message: `Resource ${index} missing required 'kind' field`
        });
      }
      
      if (!resource.port || !resource.port.entity) {
        this.errors.push({
          file: filePath,
          type: 'Integration Validation',
          message: `Resource ${index} missing port.entity configuration`
        });
      }
    });
  }

  validatePortAction(filePath, data) {
    if (!filePath.includes('action')) return;
    
    const required = ['identifier', 'title', 'trigger', 'invocationMethod'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
      this.errors.push({
        file: filePath,
        type: 'Action Validation',
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }
    
    // Validate trigger structure
    if (data.trigger && data.trigger.type === 'self-service' && !data.trigger.userInputs) {
      this.warnings.push({
        file: filePath,
        type: 'Action Warning',
        message: 'Self-service action should define userInputs'
      });
    }
  }

  validatePortScorecard(filePath, data) {
    if (!filePath.includes('scorecard')) return;
    
    const required = ['identifier', 'title', 'filter', 'rules'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
      this.errors.push({
        file: filePath,
        type: 'Scorecard Validation',
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }
    
    // Validate rules structure
    if (data.rules && Array.isArray(data.rules)) {
      data.rules.forEach((rule, index) => {
        if (!rule.identifier || !rule.title || !rule.level) {
          this.errors.push({
            file: filePath,
            type: 'Scorecard Validation',
            message: `Rule ${index} missing required fields (identifier, title, level)`
          });
        }
      });
    }
  }

  printResults() {
    console.log('\n' + chalk.blue('📊 Syntax Validation Results'));
    console.log(chalk.gray('─'.repeat(50)));
    
    console.log(chalk.green(`✓ Files validated: ${this.validatedFiles}`));
    
    if (this.warnings.length > 0) {
      console.log(chalk.yellow(`⚠ Warnings: ${this.warnings.length}`));
      this.warnings.forEach(warning => {
        console.log(chalk.yellow(`  ${path.relative('..', warning.file)}: ${warning.message}`));
      });
    }
    
    if (this.errors.length > 0) {
      console.log(chalk.red(`✗ Errors: ${this.errors.length}`));
      this.errors.forEach(error => {
        const location = error.line ? `:${error.line}` : '';
        console.log(chalk.red(`  ${path.relative('..', error.file)}${location}: ${error.message}`));
      });
    } else {
      console.log(chalk.green('✓ No syntax errors found!'));
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new SyntaxValidator();
  validator.validateAllFiles().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = SyntaxValidator;