#!/bin/bash

# CI/CD Validation Script for Port Workshop
# This script runs all validation checks and provides appropriate exit codes

set -e

echo "🚀 Starting Port Workshop Content Validation"
echo "=============================================="

# Change to validation directory
cd "$(dirname "$0")"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run comprehensive validation
echo "🔍 Running comprehensive validation..."
npm test

# Check exit code
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ All validations passed! Workshop content is ready."
    exit 0
else
    echo ""
    echo "❌ Some validations failed. Please review the output above."
    echo ""
    echo "💡 Quick fixes:"
    echo "  • Run individual validators to isolate issues"
    echo "  • Check syntax errors in YAML/JSON files"
    echo "  • Update broken links or mark them as expected"
    echo "  • Add missing sections to challenge files"
    echo ""
    exit 1
fi