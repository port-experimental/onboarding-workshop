#!/usr/bin/env node

const chalk = require('chalk');
const SyntaxValidator = require('./validate-syntax');
const LinkValidator = require('./validate-links');
const TemplateValidator = require('./validate-templates');
const ChallengeValidator = require('./validate-challenges');

class ComprehensiveValidator {
  constructor() {
    this.results = {
      syntax: null,
      links: null,
      templates: null,
      challenges: null
    };
  }

  async runAllValidations() {
    console.log(chalk.blue.bold('🚀 Starting comprehensive workshop validation...\n'));
    
    const startTime = Date.now();
    let allPassed = true;
    
    try {
      // Run syntax validation
      console.log(chalk.blue('1/4 Running syntax validation...'));
      const syntaxValidator = new SyntaxValidator();
      this.results.syntax = await syntaxValidator.validateAllFiles();
      allPassed = allPassed && this.results.syntax;
      
      console.log('\n' + chalk.gray('─'.repeat(60)) + '\n');
      
      // Run link validation
      console.log(chalk.blue('2/4 Running link validation...'));
      const linkValidator = new LinkValidator();
      this.results.links = await linkValidator.validateAllLinks();
      allPassed = allPassed && this.results.links;
      
      console.log('\n' + chalk.gray('─'.repeat(60)) + '\n');
      
      // Run template validation
      console.log(chalk.blue('3/4 Running template validation...'));
      const templateValidator = new TemplateValidator();
      this.results.templates = await templateValidator.validateAllTemplates();
      allPassed = allPassed && this.results.templates;
      
      console.log('\n' + chalk.gray('─'.repeat(60)) + '\n');
      
      // Run challenge validation
      console.log(chalk.blue('4/4 Running challenge validation...'));
      const challengeValidator = new ChallengeValidator();
      this.results.challenges = await challengeValidator.validateAllChallenges();
      allPassed = allPassed && this.results.challenges;
      
    } catch (error) {
      console.error(chalk.red(`Validation failed with error: ${error.message}`));
      allPassed = false;
    }
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    this.printSummary(duration, allPassed);
    
    return allPassed;
  }

  printSummary(duration, allPassed) {
    console.log('\n' + chalk.blue.bold('📊 VALIDATION SUMMARY'));
    console.log(chalk.gray('═'.repeat(60)));
    
    const statusIcon = (passed) => passed ? chalk.green('✓') : chalk.red('✗');
    const statusText = (passed) => passed ? chalk.green('PASSED') : chalk.red('FAILED');
    
    console.log(`${statusIcon(this.results.syntax)} Syntax Validation: ${statusText(this.results.syntax)}`);
    console.log(`${statusIcon(this.results.links)} Link Validation: ${statusText(this.results.links)}`);
    console.log(`${statusIcon(this.results.templates)} Template Validation: ${statusText(this.results.templates)}`);
    console.log(`${statusIcon(this.results.challenges)} Challenge Validation: ${statusText(this.results.challenges)}`);
    
    console.log(chalk.gray('─'.repeat(60)));
    
    if (allPassed) {
      console.log(chalk.green.bold('🎉 ALL VALIDATIONS PASSED!'));
      console.log(chalk.green('The workshop content meets all quality standards.'));
    } else {
      console.log(chalk.red.bold('❌ SOME VALIDATIONS FAILED'));
      console.log(chalk.red('Please review the errors above and fix the issues.'));
    }
    
    console.log(chalk.gray(`\n⏱️  Total validation time: ${duration}s`));
    
    // Provide next steps
    console.log('\n' + chalk.blue('📋 Next Steps:'));
    if (allPassed) {
      console.log(chalk.green('• Workshop content is ready for use'));
      console.log(chalk.green('• Consider running validations regularly during development'));
      console.log(chalk.green('• Set up CI/CD integration for automated validation'));
    } else {
      console.log(chalk.yellow('• Fix the reported errors and warnings'));
      console.log(chalk.yellow('• Run individual validators for specific issues:'));
      console.log(chalk.gray('  - npm run validate:syntax'));
      console.log(chalk.gray('  - npm run validate:links'));
      console.log(chalk.gray('  - npm run validate:templates'));
      console.log(chalk.gray('  - npm run validate:challenges'));
      console.log(chalk.yellow('• Re-run full validation after fixes'));
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new ComprehensiveValidator();
  validator.runAllValidations().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error(chalk.red(`Fatal error: ${error.message}`));
    process.exit(1);
  });
}

module.exports = ComprehensiveValidator;