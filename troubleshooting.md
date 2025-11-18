# Port Workshop Troubleshooting Guide

A comprehensive guide to resolving common issues encountered during the Port Workshop. This guide covers Port-specific errors, integration problems, and workshop-related troubleshooting.

## 🚨 Quick Issue Resolution

### Most Common Issues

| Issue | Quick Fix | Detailed Section |
|-------|-----------|------------------|
| Cannot access Port | Check URL, try incognito mode | [Port Access Issues](#port-access-issues) |
| Missing Builder section | Verify admin permissions | [Permission Issues](#permission-issues) |
| JavaScript errors | Clear cache, disable extensions | [Browser Issues](#browser-issues) |
| Integration failures | Use fallback examples | [Integration Issues](#integration-issues) |
| Terraform errors | Check installation, use UI alternative | [Terraform Issues](#terraform-issues) |

## 🔧 Port Access Issues

### Cannot Load Port Instance

**Symptoms:**
- Page won't load or times out
- "This site can't be reached" error
- SSL certificate warnings

**Solutions:**

1. **Verify URL Format**
   ```
   Correct: https://your-org.getport.io
   Incorrect: http://your-org.getport.io (missing 's')
   Incorrect: your-org.getport.io (missing protocol)
   ```

2. **Network Troubleshooting**
   ```bash
   # Test basic connectivity
   ping your-org.getport.io
   
   # Test HTTPS access
   curl -I https://your-org.getport.io
   
   # Check DNS resolution
   nslookup your-org.getport.io
   ```

3. **Browser Troubleshooting**
   - Try incognito/private mode
   - Clear browser cache and cookies
   - Disable browser extensions temporarily
   - Try a different browser

4. **Corporate Network Issues**
   - Check with IT about firewall rules
   - Verify proxy settings
   - Try mobile hotspot as alternative
   - Request whitelist for `*.getport.io`

### Login Problems

**Symptoms:**
- Invalid credentials error
- Redirect loops after login
- SSO authentication failures

**Solutions:**

1. **Credential Verification**
   - Double-check username/password
   - Ensure caps lock is off
   - Try password reset if available

2. **SSO Issues**
   - Contact IT for SSO configuration
   - Verify you're in correct organization
   - Check if account needs activation

3. **Session Issues**
   - Clear all cookies for getport.io
   - Close all browser tabs and restart
   - Try different browser

## 🔐 Permission Issues

### Missing Builder Access

**Symptoms:**
- No Builder button in top-right corner
- "Access Denied" when trying to access Builder
- Limited menu options

**Solutions:**

1. **Role Verification**
   - Contact Port administrator
   - Request admin or builder permissions
   - Verify organization membership

2. **Trial Account Limitations**
   - Some trial accounts have limited permissions
   - Upgrade to full trial if needed
   - Use demo environment as alternative

3. **Temporary Workarounds**
   - Use UI-only exercises
   - Follow along with screenshots
   - Focus on conceptual learning

### Cannot Create/Edit Resources

**Symptoms:**
- Grayed-out buttons
- "Insufficient permissions" errors
- Read-only interface

**Solutions:**

1. **Permission Escalation**
   - Request write permissions
   - Use admin account if available
   - Switch to trial account

2. **Alternative Approaches**
   - Use export/import functionality
   - Work with configuration files
   - Use fallback examples

## 🌐 Browser Issues

### JavaScript Errors

**Symptoms:**
- Console errors in browser dev tools
- Broken interface elements
- Non-functional buttons

**Solutions:**

1. **Browser Compatibility**
   ```
   Supported Browsers:
   - Chrome 90+
   - Firefox 88+
   - Safari 14+
   - Edge 90+
   ```

2. **Extension Conflicts**
   - Disable ad blockers
   - Disable privacy extensions
   - Try incognito mode
   - Reset browser to defaults

3. **Cache Issues**
   ```bash
   # Clear browser data
   1. Open browser settings
   2. Privacy/Security section
   3. Clear browsing data
   4. Select "All time"
   5. Include cookies and cache
   ```

### Interface Problems

**Symptoms:**
- Missing widgets or components
- Layout issues
- Slow loading

**Solutions:**

1. **Display Settings**
   - Check browser zoom level (should be 100%)
   - Verify screen resolution
   - Try different window size

2. **Performance Issues**
   - Close unnecessary tabs
   - Restart browser
   - Check system resources

## 🔗 Integration Issues

### GitHub Integration Failures

**Symptoms:**
- Cannot connect to GitHub
- API rate limits exceeded
- Authentication failures

**Solutions:**

1. **Use Fallback Data**
   ```bash
   # Use pre-configured examples
   cp examples/fallback/github-repositories.json ./
   # Import manually through Port UI
   ```

2. **Alternative Git Providers**
   - Use GitLab examples
   - Use Bitbucket configurations
   - Focus on Port concepts vs. specific integrations

3. **Network Issues**
   - Check if GitHub is blocked
   - Verify API access
   - Use mobile hotspot

### API Connection Problems

**Symptoms:**
- Timeout errors
- Authentication failures
- Rate limiting

**Solutions:**

1. **Fallback Mode**
   - Use mock data from `/examples/fallback/`
   - Complete exercises with UI only
   - Focus on configuration concepts

2. **Network Troubleshooting**
   ```bash
   # Test API connectivity
   curl -I https://api.github.com
   curl -I https://api.getport.io
   ```

## 🏗️ Terraform Issues

### Installation Problems

**Symptoms:**
- `terraform: command not found`
- Version compatibility issues
- Permission errors

**Solutions:**

1. **Installation Verification**
   ```bash
   # Check if installed
   terraform --version
   
   # Install on macOS
   brew install terraform
   
   # Install on Windows
   choco install terraform
   
   # Install on Linux
   wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
   unzip terraform_1.6.0_linux_amd64.zip
   sudo mv terraform /usr/local/bin/
   ```

2. **Alternative Approaches**
   - Use Port UI for configuration
   - Work with JSON/YAML files directly
   - Skip Terraform module if needed

### Terraform Execution Errors

**Symptoms:**
- Plan/apply failures
- Provider authentication issues
- Resource conflicts

**Solutions:**

1. **Common Fixes**
   ```bash
   # Reinitialize
   terraform init -upgrade
   
   # Clear state issues
   terraform refresh
   
   # Force unlock if stuck
   terraform force-unlock <lock-id>
   ```

2. **Port Provider Issues**
   - Verify API credentials
   - Check provider version
   - Use latest provider documentation

## 📱 Workshop-Specific Issues

### Missing Workshop Data

**Symptoms:**
- Empty catalog
- No example entities
- Missing blueprints

**Solutions:**

1. **Import Sample Data**
   ```bash
   # Use fallback examples
   cd examples/fallback/
   # Import through Port UI or API
   ```

2. **Manual Setup**
   - Create blueprints manually
   - Add sample entities
   - Follow step-by-step guides

### Exercise Failures

**Symptoms:**
- Steps don't work as described
- Different UI than screenshots
- Missing features

**Solutions:**

1. **Version Differences**
   - Port UI updates frequently
   - Focus on concepts vs. exact steps
   - Adapt to current interface

2. **Environment Differences**
   - Trial vs. full accounts have different features
   - Some integrations may not be available
   - Use alternatives when needed

## 🆘 Getting Help

### Self-Service Resources

1. **Documentation**
   - [Port Documentation](https://docs.port.io/)
   - [Workshop Setup Guide](setup-guide.md)
   - [Fallback Examples](examples/fallback/)

2. **Validation Tools**
   ```bash
   # Run environment check
   ./validation/validate-environment.sh https://app.port.io
   
   # Or use Node.js version
   node validation/environment-check.js https://app.port.io
   ```

### Community Support

1. **Port Community**
   - Community forums
   - Discord/Slack channels
   - GitHub discussions

2. **Workshop Support**
   - Contact workshop facilitator
   - Check workshop repository issues
   - Use workshop discussion forums

### Escalation Process

1. **Level 1**: Self-service troubleshooting
2. **Level 2**: Community support
3. **Level 3**: Workshop facilitator
4. **Level 4**: Port technical support

## 📋 Prevention Checklist

### Pre-Workshop Validation
- [ ] Port instance accessible
- [ ] Login credentials working
- [ ] Browser compatibility verified
- [ ] Network connectivity tested
- [ ] Optional tools installed

### During Workshop
- [ ] Regular environment checks
- [ ] Fallback options ready
- [ ] Alternative approaches prepared
- [ ] Help resources bookmarked

### Post-Issue Recovery
- [ ] Document what worked
- [ ] Update troubleshooting notes
- [ ] Share solutions with others
- [ ] Prevent similar issues

---

**Still Having Issues?** Contact the workshop facilitator or refer to the [Setup Guide](setup-guide.md) for additional help.