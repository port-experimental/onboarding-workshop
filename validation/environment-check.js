#!/usr/bin/env node

/**
 * Port Workshop Environment Validation Script
 * Validates environment setup before starting the workshop
 */

const https = require('https');
const { execSync } = require('child_process');

class EnvironmentValidator {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            warnings: 0,
            details: []
        };
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = {
            'info': '✓',
            'warn': '⚠',
            'error': '✗',
            'header': '📋'
        }[type] || 'ℹ';
        
        console.log(`${prefix} ${message}`);
        
        this.results.details.push({
            timestamp,
            type,
            message
        });
    }

    async checkPortAccess(portUrl) {
        this.log('Checking Port instance access...', 'header');
        
        if (!portUrl) {
            this.log('No Port URL provided. Please set PORT_URL environment variable', 'error');
            this.results.failed++;
            return false;
        }

        try {
            const url = new URL(portUrl);
            
            return new Promise((resolve) => {
                const req = https.request({
                    hostname: url.hostname,
                    port: url.port || 443,
                    path: '/',
                    method: 'HEAD',
                    timeout: 10000
                }, (res) => {
                    if (res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 301) {
                        this.log(`Port instance accessible at ${portUrl}`, 'info');
                        this.results.passed++;
                        resolve(true);
                    } else {
                        this.log(`Port instance returned status ${res.statusCode}`, 'warn');
                        this.results.warnings++;
                        resolve(false);
                    }
                });

                req.on('error', (err) => {
                    this.log(`Cannot access Port instance: ${err.message}`, 'error');
                    this.results.failed++;
                    resolve(false);
                });

                req.on('timeout', () => {
                    this.log('Port instance access timed out', 'error');
                    this.results.failed++;
                    resolve(false);
                });

                req.end();
            });
        } catch (error) {
            this.log(`Invalid Port URL: ${error.message}`, 'error');
            this.results.failed++;
            return false;
        }
    }

    checkBrowserRequirements() {
        this.log('Checking browser requirements...', 'header');
        
        // Check if running in browser environment
        if (typeof window !== 'undefined') {
            // Browser environment checks
            const checks = [
                {
                    name: 'JavaScript',
                    test: () => true, // If this runs, JS is enabled
                    required: true
                },
                {
                    name: 'Local Storage',
                    test: () => typeof localStorage !== 'undefined',
                    required: true
                },
                {
                    name: 'Session Storage',
                    test: () => typeof sessionStorage !== 'undefined',
                    required: true
                },
                {
                    name: 'WebSocket Support',
                    test: () => typeof WebSocket !== 'undefined',
                    required: false
                }
            ];

            checks.forEach(check => {
                try {
                    if (check.test()) {
                        this.log(`${check.name} supported`, 'info');
                        this.results.passed++;
                    } else {
                        const level = check.required ? 'error' : 'warn';
                        this.log(`${check.name} not supported`, level);
                        if (check.required) {
                            this.results.failed++;
                        } else {
                            this.results.warnings++;
                        }
                    }
                } catch (error) {
                    const level = check.required ? 'error' : 'warn';
                    this.log(`${check.name} check failed: ${error.message}`, level);
                    if (check.required) {
                        this.results.failed++;
                    } else {
                        this.results.warnings++;
                    }
                }
            });
        } else {
            this.log('Running in Node.js environment - browser checks skipped', 'warn');
            this.results.warnings++;
        }
    }

    checkOptionalTools() {
        this.log('Checking optional tools...', 'header');
        
        const tools = [
            {
                name: 'Terraform',
                command: 'terraform --version',
                required: false,
                module: 'Module 7 (Terraform)'
            },
            {
                name: 'Git',
                command: 'git --version',
                required: false,
                module: 'Examples and Challenges'
            },
            {
                name: 'VS Code',
                command: 'code --version',
                required: false,
                module: 'Configuration editing'
            }
        ];

        tools.forEach(tool => {
            try {
                execSync(tool.command, { stdio: 'pipe' });
                this.log(`${tool.name} installed`, 'info');
                this.results.passed++;
            } catch (error) {
                this.log(`${tool.name} not installed (needed for ${tool.module})`, 'warn');
                this.results.warnings++;
            }
        });
    }

    checkNetworkRequirements() {
        this.log('Checking network requirements...', 'header');
        
        const endpoints = [
            'https://docs.getport.io',
            'https://api.github.com',
            'https://registry.terraform.io'
        ];

        return Promise.all(endpoints.map(endpoint => {
            return new Promise((resolve) => {
                const url = new URL(endpoint);
                const req = https.request({
                    hostname: url.hostname,
                    port: 443,
                    path: '/',
                    method: 'HEAD',
                    timeout: 5000
                }, (res) => {
                    this.log(`${endpoint} accessible`, 'info');
                    this.results.passed++;
                    resolve(true);
                });

                req.on('error', () => {
                    this.log(`${endpoint} not accessible`, 'warn');
                    this.results.warnings++;
                    resolve(false);
                });

                req.on('timeout', () => {
                    this.log(`${endpoint} timed out`, 'warn');
                    this.results.warnings++;
                    resolve(false);
                });

                req.end();
            });
        }));
    }

    generateReport() {
        this.log('Environment Validation Report', 'header');
        console.log('='.repeat(50));
        console.log(`✓ Passed: ${this.results.passed}`);
        console.log(`⚠ Warnings: ${this.results.warnings}`);
        console.log(`✗ Failed: ${this.results.failed}`);
        console.log('='.repeat(50));

        if (this.results.failed === 0) {
            console.log('🎉 Environment ready for Port Workshop!');
            if (this.results.warnings > 0) {
                console.log('⚠️  Some optional features may not be available.');
            }
        } else {
            console.log('❌ Environment setup incomplete. Please address the failed checks above.');
        }

        return this.results.failed === 0;
    }

    async validate(portUrl) {
        console.log('🔍 Port Workshop Environment Validation');
        console.log('=====================================\n');

        await this.checkPortAccess(portUrl);
        this.checkBrowserRequirements();
        this.checkOptionalTools();
        await this.checkNetworkRequirements();

        console.log('\n');
        return this.generateReport();
    }
}

// CLI usage
if (require.main === module) {
    const portUrl = process.env.PORT_URL || process.argv[2];
    
    if (!portUrl) {
        console.log('Usage: node environment-check.js <PORT_URL>');
        console.log('   or: PORT_URL=https://your-org.getport.io node environment-check.js');
        process.exit(1);
    }

    const validator = new EnvironmentValidator();
    validator.validate(portUrl).then(success => {
        process.exit(success ? 0 : 1);
    });
}

module.exports = EnvironmentValidator;