#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const chalk = require('chalk');

class ChallengeValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.validatedFiles = 0;
    this.challengeRequirements = this.getChallengeRequirements();
  }

  getChallengeRequirements() {
    return {
      beginner: {
        required: ['# ', '## Objective', '## Prerequisites', '## Instructions', '## Success Criteria'],
        recommended: ['## Hints', '## Resources', '## Next Steps'],
        maxComplexity: 3,
        shouldHaveStepByStep: true
      },
      intermediate: {
        required: ['# ', '## Objective', '## Prerequisites', '## Instructions', '## Success Criteria'],
        recommended: ['## Hints', '## Extension Challenges', '## Resources'],
        maxComplexity: 6,
        shouldHaveStepByStep: false
      },
      advanced: {
        required: ['# ', '## Objective', '## Prerequisites', '## Success Criteria'],
        recommended: ['## Extension Challenges', '## Resources'],
        maxComplexity: 10,
        shouldHaveStepByStep: false
      }
    };
  }

  async validateAllChallenges() {
    console.log(chalk.blue('🎯 Starting challenge validation...'));
    
    // Find all challenge files
    const challengeFiles = await glob('../challenges/**/*.md', { ignore: ['../node_modules/**'] });
    
    console.log(chalk.gray(`Found ${challengeFiles.length} challenge files`));
    
    for (const file of challengeFiles) {
      await this.validateChallenge(file);
    }
    
    this.printResults();
    return this.errors.length === 0;
  }

  async validateChallenge(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const difficulty = this.detectDifficulty(filePath);
      
      if (difficulty) {
        this.validateChallengeStructure(filePath, content, difficulty);
        this.validateChallengeContent(filePath, content, difficulty);
        console.log(chalk.green(`✓ ${path.relative('..', filePath)} (${difficulty})`));
      } else {
        this.warnings.push({
          file: filePath,
          type: 'Unknown Difficulty',
          message: 'Could not determine challenge difficulty level'
        });
        console.log(chalk.yellow(`? ${path.relative('..', filePath)} (unknown difficulty)`));
      }
      
      this.validatedFiles++;
    } catch (error) {
      this.errors.push({
        file: filePath,
        type: 'Challenge Read Error',
        message: error.message
      });
      console.log(chalk.red(`✗ ${path.relative('..', filePath)}: ${error.message}`));
    }
  }

  detectDifficulty(filePath) {
    const pathLower = filePath.toLowerCase();
    if (pathLower.includes('beginner')) return 'beginner';
    if (pathLower.includes('intermediate')) return 'intermediate';
    if (pathLower.includes('advanced')) return 'advanced';
    return null;
  }

  validateChallengeStructure(filePath, content, difficulty) {
    const requirements = this.challengeRequirements[difficulty];
    
    // Check required sections
    const missingRequired = requirements.required.filter(section => {
      return !content.includes(section);
    });
    
    if (missingRequired.length > 0) {
      this.errors.push({
        file: filePath,
        type: `${difficulty} Challenge Structure Error`,
        message: `Missing required sections: ${missingRequired.join(', ')}`
      });
    }
    
    // Check recommended sections
    const missingRecommended = requirements.recommended.filter(section => {
      return !content.includes(section);
    });
    
    if (missingRecommended.length > 0) {
      this.warnings.push({
        file: filePath,
        type: `${difficulty} Challenge Structure Warning`,
        message: `Missing recommended sections: ${missingRecommended.join(', ')}`
      });
    }
    
    // Validate step-by-step instructions for beginners
    if (requirements.shouldHaveStepByStep) {
      const hasNumberedSteps = /^\d+\./m.test(content);
      const hasStepByStep = /step \d+/i.test(content) || hasNumberedSteps;
      
      if (!hasStepByStep) {
        this.warnings.push({
          file: filePath,
          type: 'Beginner Challenge Warning',
          message: 'Beginner challenges should include step-by-step instructions'
        });
      }
    }
  }

  validateChallengeContent(filePath, content, difficulty) {
    const requirements = this.challengeRequirements[difficulty];
    
    // Validate objective clarity
    const objectiveMatch = content.match(/## Objective\s*\n(.*?)(?=\n##|\n$)/s);
    if (objectiveMatch) {
      const objective = objectiveMatch[1].trim();
      if (objective.length < 50) {
        this.warnings.push({
          file: filePath,
          type: 'Challenge Content Warning',
          message: 'Objective section seems too brief (< 50 characters)'
        });
      }
      
      // Check for action verbs in objectives
      const actionVerbs = ['create', 'build', 'implement', 'configure', 'set up', 'develop', 'design'];
      const hasActionVerb = actionVerbs.some(verb => objective.toLowerCase().includes(verb));
      
      if (!hasActionVerb) {
        this.warnings.push({
          file: filePath,
          type: 'Challenge Content Warning',
          message: 'Objective should include clear action verbs (create, build, implement, etc.)'
        });
      }
    }
    
    // Validate success criteria
    const successMatch = content.match(/## Success Criteria\s*\n(.*?)(?=\n##|\n$)/s);
    if (successMatch) {
      const successCriteria = successMatch[1].trim();
      const criteriaCount = (successCriteria.match(/^[-*]\s/gm) || []).length;
      
      if (criteriaCount === 0) {
        this.errors.push({
          file: filePath,
          type: 'Challenge Content Error',
          message: 'Success criteria should be formatted as a bulleted list'
        });
      } else if (criteriaCount < 2) {
        this.warnings.push({
          file: filePath,
          type: 'Challenge Content Warning',
          message: 'Consider adding more specific success criteria (found only 1)'
        });
      }
    }
    
    // Validate complexity based on difficulty
    const complexity = this.assessComplexity(content);
    if (complexity > requirements.maxComplexity) {
      this.warnings.push({
        file: filePath,
        type: 'Challenge Complexity Warning',
        message: `Challenge complexity (${complexity}) may be too high for ${difficulty} level (max: ${requirements.maxComplexity})`
      });
    }
    
    // Check for Port-specific content
    const portTerms = ['blueprint', 'entity', 'action', 'scorecard', 'dashboard', 'integration'];
    const hasPortContent = portTerms.some(term => content.toLowerCase().includes(term));
    
    if (!hasPortContent) {
      this.warnings.push({
        file: filePath,
        type: 'Challenge Content Warning',
        message: 'Challenge should include Port-specific terminology and concepts'
      });
    }
    
    // Validate code examples for practical challenges
    const hasCodeBlocks = content.includes('```');
    const hasYamlJson = /```(yaml|json|yml)/i.test(content);
    
    if (difficulty !== 'advanced' && !hasCodeBlocks) {
      this.warnings.push({
        file: filePath,
        type: 'Challenge Content Warning',
        message: 'Consider adding code examples or configuration snippets'
      });
    }
    
    if (hasCodeBlocks && !hasYamlJson) {
      this.warnings.push({
        file: filePath,
        type: 'Challenge Content Warning',
        message: 'Port challenges typically include YAML or JSON configuration examples'
      });
    }
  }

  assessComplexity(content) {
    let complexity = 0;
    
    // Count different complexity indicators
    const indicators = [
      { pattern: /blueprint/gi, weight: 1 },
      { pattern: /integration/gi, weight: 2 },
      { pattern: /action/gi, weight: 1 },
      { pattern: /scorecard/gi, weight: 2 },
      { pattern: /dashboard/gi, weight: 1 },
      { pattern: /terraform/gi, weight: 3 },
      { pattern: /api/gi, weight: 2 },
      { pattern: /webhook/gi, weight: 2 },
      { pattern: /jq/gi, weight: 2 },
      { pattern: /```/g, weight: 0.5 } // Code blocks
    ];
    
    indicators.forEach(indicator => {
      const matches = content.match(indicator.pattern);
      if (matches) {
        complexity += matches.length * indicator.weight;
      }
    });
    
    return Math.round(complexity);
  }

  printResults() {
    console.log('\n' + chalk.blue('📊 Challenge Validation Results'));
    console.log(chalk.gray('─'.repeat(50)));
    
    console.log(chalk.green(`✓ Challenges validated: ${this.validatedFiles}`));
    
    // Group results by difficulty
    const resultsByDifficulty = {
      beginner: { errors: 0, warnings: 0 },
      intermediate: { errors: 0, warnings: 0 },
      advanced: { errors: 0, warnings: 0 },
      unknown: { errors: 0, warnings: 0 }
    };
    
    [...this.errors, ...this.warnings].forEach(issue => {
      const difficulty = this.detectDifficulty(issue.file) || 'unknown';
      if (this.errors.includes(issue)) {
        resultsByDifficulty[difficulty].errors++;
      } else {
        resultsByDifficulty[difficulty].warnings++;
      }
    });
    
    Object.entries(resultsByDifficulty).forEach(([difficulty, counts]) => {
      if (counts.errors > 0 || counts.warnings > 0) {
        console.log(chalk.gray(`  ${difficulty}: ${counts.errors} errors, ${counts.warnings} warnings`));
      }
    });
    
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
      console.log(chalk.green('✓ All challenges meet quality standards!'));
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new ChallengeValidator();
  validator.validateAllChallenges().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = ChallengeValidator;