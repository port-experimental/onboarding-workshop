#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { glob } = require('glob');
const chalk = require('chalk');

class LinkValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.checkedLinks = new Set();
    this.validatedFiles = 0;
    this.timeout = 5000; // 5 seconds timeout for testing
  }

  async validateAllLinks() {
    console.log(chalk.blue('🔗 Starting link validation...'));
    
    // Find all markdown files (excluding node_modules and build artifacts)
    const markdownFiles = await glob('../**/*.md', { ignore: ['**/node_modules/**', '../.git/**'] });
    
    console.log(chalk.gray(`Found ${markdownFiles.length} markdown files`));
    
    for (const file of markdownFiles) {
      await this.validateLinksInFile(file);
    }
    
    this.printResults();
    return this.errors.length === 0;
  }

  async validateLinksInFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const links = this.extractLinks(content);
      
      console.log(chalk.gray(`Checking ${links.length} links in ${path.relative('..', filePath)}`));
      
      for (const link of links) {
        await this.validateLink(filePath, link);
      }
      
      this.validatedFiles++;
    } catch (error) {
      this.errors.push({
        file: filePath,
        type: 'File Read Error',
        message: error.message
      });
    }
  }

  extractLinks(content) {
    const links = [];
    
    // Extract markdown links [text](url)
    const markdownLinkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const url = match[2];
      if (this.isExternalLink(url)) {
        links.push({
          text: match[1],
          url: url,
          type: 'markdown'
        });
      }
    }
    
    // Extract bare URLs
    const urlRegex = /https?:\/\/[^\s\)]+/g;
    while ((match = urlRegex.exec(content)) !== null) {
      const url = match[0];
      if (this.isExternalLink(url) && !links.some(link => link.url === url)) {
        links.push({
          text: url,
          url: url,
          type: 'bare'
        });
      }
    }
    
    return links;
  }

  isExternalLink(url) {
    return url.startsWith('http://') || url.startsWith('https://');
  }

  async validateLink(filePath, link) {
    // Skip if we've already checked this link
    if (this.checkedLinks.has(link.url)) {
      return;
    }
    
    this.checkedLinks.add(link.url);
    
    try {
      // Special handling for known problematic domains
      if (this.shouldSkipLink(link.url)) {
        this.warnings.push({
          file: filePath,
          type: 'Link Skipped',
          message: `Skipped validation for: ${link.url}`,
          link: link
        });
        return;
      }
      
      const response = await axios.head(link.url, {
        timeout: this.timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Workshop-Link-Checker/1.0)'
        },
        validateStatus: (status) => status < 500 // Accept redirects and client errors
      });
      
      if (response.status >= 400) {
        this.errors.push({
          file: filePath,
          type: 'Broken Link',
          message: `HTTP ${response.status}: ${link.url}`,
          link: link
        });
        console.log(chalk.red(`✗ ${response.status}: ${link.url}`));
      } else {
        console.log(chalk.green(`✓ ${link.url}`));
      }
      
    } catch (error) {
      // Try GET request if HEAD fails
      try {
        const response = await axios.get(link.url, {
          timeout: this.timeout,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Workshop-Link-Checker/1.0)'
          },
          validateStatus: (status) => status < 500,
          maxRedirects: 5
        });
        
        if (response.status >= 400) {
          this.errors.push({
            file: filePath,
            type: 'Broken Link',
            message: `HTTP ${response.status}: ${link.url}`,
            link: link
          });
          console.log(chalk.red(`✗ ${response.status}: ${link.url}`));
        } else {
          console.log(chalk.green(`✓ ${link.url}`));
        }
        
      } catch (secondError) {
        this.errors.push({
          file: filePath,
          type: 'Link Error',
          message: `${secondError.code || 'Unknown error'}: ${link.url}`,
          link: link
        });
        console.log(chalk.red(`✗ ${secondError.code || 'Error'}: ${link.url}`));
      }
    }
    
    // Add small delay to be respectful to servers
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  shouldSkipLink(url) {
    const skipPatterns = [
      // Skip localhost and internal URLs
      /^https?:\/\/localhost/,
      /^https?:\/\/127\.0\.0\.1/,
      /^https?:\/\/0\.0\.0\.0/,
      // Skip placeholder URLs
      /example\.com/,
      /your-organization/,
      // Skip URLs that commonly block automated requests
      /linkedin\.com/,
      /facebook\.com/,
      /twitter\.com/,
      // Skip URLs that require authentication
      /app\.getport\.io/
    ];
    
    return skipPatterns.some(pattern => pattern.test(url));
  }

  printResults() {
    console.log('\n' + chalk.blue('📊 Link Validation Results'));
    console.log(chalk.gray('─'.repeat(50)));
    
    console.log(chalk.green(`✓ Files validated: ${this.validatedFiles}`));
    console.log(chalk.gray(`🔗 Unique links checked: ${this.checkedLinks.size}`));
    
    if (this.warnings.length > 0) {
      console.log(chalk.yellow(`⚠ Warnings: ${this.warnings.length}`));
      this.warnings.forEach(warning => {
        console.log(chalk.yellow(`  ${path.relative('..', warning.file)}: ${warning.message}`));
      });
    }
    
    if (this.errors.length > 0) {
      console.log(chalk.red(`✗ Broken links: ${this.errors.length}`));
      this.errors.forEach(error => {
        console.log(chalk.red(`  ${path.relative('..', error.file)}: ${error.message}`));
      });
    } else {
      console.log(chalk.green('✓ All links are accessible!'));
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new LinkValidator();
  validator.validateAllLinks().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = LinkValidator;