# Port Workshop Setup Guide

Complete step-by-step instructions for preparing your environment for the Port Workshop.

## 🎯 Quick Setup Overview

**Before the Workshop Day:**
1. **Port Access** - Get your Port instance ready (15 minutes)
2. **Browser Setup** - Ensure compatibility (5 minutes)
3. **Tool Installation** - Install optional tools (15-30 minutes)
4. **Environment Validation** - Run validation scripts (5 minutes)

**Total Preparation Time**: 30-60 minutes

## 🌐 Port Instance Setup

### Option 1: Port Trial Account (Recommended)

**Best for**: Full workshop experience with all features

1. **Sign Up for Trial**
   - Visit [Port Demo Portal](https://app.port.io/)
   - Click **"Start Free Trial"**
   - Use your work email address
   - Complete the signup process

2. **Access Your Instance**
   - Check your email for access credentials
   - Your instance URL will be: `https://app.port.io`
   - Bookmark this URL for easy access

3. **Verify Access**
   - Log in to your Port instance
   - You should see the Port home page
   - Click **Builder** in the top-right to verify admin access

### Option 2: Port Demo Environment

**Best for**: Quick start without account setup

1. **Access Demo Environment**
   - Use shared demo instance: `https://app.getport.io`
   - Login credentials will be provided by workshop facilitator
   - Note: This is a shared environment with limited permissions

2. **Important Limitations**
   - Read-only access to some features
   - Cannot create permanent configurations
   - Suitable for following along with examples

### Option 3: Existing Port Instance

**Best for**: Teams with existing Port setup

1. **Contact Your Admin**
   - Request access to your organization's Port instance
   - Ensure you have **Builder** permissions for hands-on exercises
   - Get your instance URL from your administrator

2. **Verify Permissions**
   - Confirm you can access the Builder section
   - Test creating a simple entity or blueprint
   - Request additional permissions if needed

## 🛠️ Tool Installation

### Required Tools

#### 1. Text Editor

**VS Code (Recommended)**
- **Download**: [Visual Studio Code](https://code.visualstudio.com/)
- **Installation**:
  ```bash
  # macOS
  brew install --cask visual-studio-code
  
  # Windows
  winget install Microsoft.VisualStudioCode
  
  # Or download installer from website
  ```

**Alternative Editors**
- Any text editor that supports YAML/JSON syntax highlighting
- Vim, nano, Sublime Text, or Atom

### Optional Tools (Recommended)

#### 3. Terraform (for Module 7)

**Install Terraform**:
```bash
# macOS
brew install terraform

# Windows (Chocolatey)
choco install terraform

# Windows (Winget)
winget install Hashicorp.Terraform

# Linux (Ubuntu/Debian)
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

**Verify Installation**:
```bash
terraform --version
# Should output: Terraform v1.6.0 or later
```

#### 4. Git (for Examples and Challenges)

**Install Git**:
```bash
# macOS
brew install git

# Windows
winget install Git.Git

# Linux (Ubuntu/Debian)
sudo apt install git
```

**Verify Installation**:
```bash
git --version
# Should output: git version 2.30.0 or later
```

## 🔍 Environment Validation

### Automated Validation

Run our validation scripts to check your setup:

#### Bash Script (Linux/macOS/Windows Git Bash)

```bash
# Navigate to workshop directory
cd /path/to/CS\ Chatter\ Workshop

# Run validation script
chmod +x validation/validate-environment.sh
./validation/validate-environment.sh https://app.port.io
```

#### Node.js Script (All Platforms)

```bash
# Navigate to validation directory
cd validation

# Install dependencies (first time only)
npm install

# Run validation
node environment-check.js https://app.port.io
```

### Manual Validation Checklist

#### ✅ Port Access Validation
- [ ] Can access your Port instance URL without errors
- [ ] Can log in with your credentials
- [ ] Home page displays correctly
- [ ] Navigation menu is visible (Home, Catalog, Self-Service)
- [ ] Builder section is accessible (top-right corner)
- [ ] No JavaScript errors in browser console (F12 → Console)

#### ✅ Browser Validation
- [ ] Using supported browser version
- [ ] JavaScript is enabled
- [ ] Local storage is working (login persists)
- [ ] Can access external sites (network connectivity)

#### ✅ Tool Validation
- [ ] Text editor installed and working
- [ ] Terraform installed (if doing Module 7): `terraform --version`
- [ ] Git installed (optional): `git --version`
- [ ] Node.js installed (optional): `node --version`

#### ✅ Network Validation
Test connectivity to required services:
```bash
# Test Port API access
curl -I https://api.port.io

# Test GitHub API access
curl -I https://api.github.com

# Test Terraform registry access
curl -I https://registry.terraform.io
```

## 🚨 Troubleshooting Common Issues

### Tool Installation Issues

#### Terraform Installation

**Common Issues**:
- Permission errors during installation
- Command not found after installation
- Version conflicts

**Solutions**:
```bash
# Check if Terraform is in PATH
which terraform

# Add to PATH if needed (bash/zsh)
echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc
source ~/.bashrc

# Verify installation
terraform --version
```

#### Git Installation

**Common Issues**:
- Git not found in PATH
- SSH key configuration
- HTTPS vs SSH authentication

**Solutions**:
```bash
# Configure Git (first time setup)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Test Git installation
git --version
```

## 🔧 Workshop Day Preparation

### Pre-Workshop Checklist

#### Day Before Workshop
- [ ] Complete all setup steps above
- [ ] Run validation scripts successfully
- [ ] Bookmark your Port instance URL
- [ ] Test login and navigation
- [ ] Install optional tools if doing advanced modules

#### Workshop Day
- [ ] Have Port credentials ready
- [ ] Ensure stable internet connection
- [ ] Close unnecessary applications
- [ ] Have backup browser ready
- [ ] Keep troubleshooting guide accessible

### Emergency Backup Plans

#### If Port Access Fails
1. **Use Demo Environment**: Workshop facilitator can provide shared demo access
2. **Follow Along Mode**: Watch demonstrations and work with screenshots
3. **Local Examples**: Use provided configuration files for learning concepts

#### If Tools Don't Work
1. **Terraform Alternative**: Use Port UI for Module 7 instead of code
2. **Git Alternative**: Download examples as ZIP files
3. **Browser Issues**: Try different browser or incognito mode

## 📞 Getting Help

### During Setup

1. **Self-Service Resources**:
   - This setup guide
   - [Troubleshooting Guide](troubleshooting.md)
   - [Port Documentation](https://docs.getport.io/)

2. **Community Support**:
   - Port community forums
   - Workshop discussion channels
   - GitHub repository issues

### Workshop Day Support

1. **Facilitator**: Contact workshop facilitator for immediate help
2. **Peer Support**: Work with other participants
3. **Fallback Options**: Use alternative approaches when needed

## 🎯 Success Criteria

You're ready for the workshop when:

### ✅ Technical Readiness
- [ ] Port instance accessible and login working
- [ ] Builder section available (admin permissions)
- [ ] Browser compatibility confirmed
- [ ] Validation scripts pass without errors

### ✅ Environment Readiness
- [ ] Stable internet connection
- [ ] Required tools installed and tested
- [ ] Backup options identified
- [ ] Help resources bookmarked

### ✅ Knowledge Readiness
- [ ] Understand workshop structure and learning paths
- [ ] Know how to access troubleshooting resources
- [ ] Familiar with Port basic navigation
- [ ] Ready to follow along with exercises

## 📋 Quick Reference

### Essential URLs
- **Your Port Instance**: `https://your-org.getport.io`
- **Port Documentation**: `https://docs.getport.io/`
- **Workshop Repository**: Location of this workshop content
- **Validation Scripts**: `./validation/` directory

### Key Credentials
- **Port Login**: Your Port username/password or SSO
- **API Access**: Available in Builder → ... → Credentials (for advanced exercises)

### Support Contacts
- **Workshop Facilitator**: [Contact information from facilitator]
- **Technical Support**: Port community and documentation
- **Emergency Backup**: Demo environment access if personal setup fails

---

**Questions?** Contact the workshop facilitator or refer to the [Troubleshooting Guide](troubleshooting.md) for additional help.

**Ready to start?** Return to the [Workshop Home](README.md) and choose your [learning path](README.md#learning-paths)!
