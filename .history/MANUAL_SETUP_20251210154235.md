# 🔧 Manual GitHub Pages Setup (Recommended)

The automatic enablement is causing issues. Follow these manual steps instead:

## ✅ Step-by-Step Manual Setup

### Step 1: Go to Repository Settings

Open this link in your browser:
```
https://github.com/ashurauza/resume-analyser-pro/settings/pages
```

Or navigate manually:
1. Go to your repository: https://github.com/ashurauza/resume-analyser-pro
2. Click the **"Settings"** tab (top right)
3. Scroll down the left sidebar
4. Click **"Pages"** under "Code and automation"

### Step 2: Configure Source

In the Pages settings page:

1. Find the **"Build and deployment"** section
2. Under **"Source"**, click the dropdown menu
3. Select **"GitHub Actions"** (NOT "Deploy from a branch")
4. The page will automatically save

**What you should see:**
```
Source: [GitHub Actions] ✓
```

### Step 3: Verify Repository is Public

GitHub Pages (free tier) requires a public repository:

1. Go to: https://github.com/ashurauza/resume-analyser-pro/settings
2. Scroll to the **"Danger Zone"** at the bottom
3. Make sure it says **"Change repository visibility"**
4. If it says "Private", click "Change visibility" and make it Public

### Step 4: Update and Push Workflow

I've simplified the workflow to remove automatic enablement. Let's commit and push:

```bash
cd /Users/ashutoshkumarsingh/Desktop/resume-analyzer-pro
git add .github/workflows/deploy.yml
git commit -m "Simplify workflow - remove automatic enablement"
git push origin main
```

### Step 5: Trigger Deployment

After pushing, the workflow should automatically run. Or manually trigger it:

1. Go to: https://github.com/ashurauza/resume-analyser-pro/actions
2. Click on **"Deploy to GitHub Pages"** workflow in the left sidebar
3. Click the **"Run workflow"** button (right side)
4. Click the green **"Run workflow"** button in the dropdown

### Step 6: Wait for Deployment

- The workflow takes 1-2 minutes to complete
- Watch the Actions page for progress
- Look for a green checkmark ✅

### Step 7: Visit Your Site

Once deployment succeeds:
```
https://ashurauza.github.io/resume-analyser-pro/
```

## 🔍 Troubleshooting

### Issue: "Registration failed"
**Solution:** Remove the automatic enablement (already done in the new workflow)

### Issue: "Not Found" or "Pages not enabled"
**Solution:** Manually enable Pages in Settings → Pages → Source: GitHub Actions

### Issue: Workflow shows "Waiting"
**Solution:** 
1. Check Settings → Actions → General
2. Enable "Read and write permissions"
3. Re-run the workflow

### Issue: "Resource not accessible by integration"
**Solution:**
1. Go to Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"
4. Save and re-run workflow

### Issue: Build succeeds but deploy fails
**Solution:**
1. Verify Pages is enabled (Settings → Pages)
2. Verify repository is Public
3. Check that "github-pages" environment exists (Settings → Environments)

## 📋 Quick Checklist

- [ ] Repository is **Public**
- [ ] Settings → Pages → Source is **"GitHub Actions"**
- [ ] Settings → Actions → General → Workflow permissions: **"Read and write"**
- [ ] Commit and push the updated workflow
- [ ] Workflow runs successfully
- [ ] Site is live

## 🎯 Expected Result

After completing these steps:
- ✅ Workflow completes with green checkmarks
- ✅ Actions page shows successful deployment
- ✅ Site is accessible at: https://ashurauza.github.io/resume-analyser-pro/

## 📞 Still Having Issues?

If you're still stuck:
1. Check the Actions tab for detailed error logs
2. Verify all checkboxes above are completed
3. Try manually running the workflow from Actions tab
4. Check if there are any security restrictions on your GitHub account

---

**Most Common Fix:** Just enable Pages manually in Settings → Pages → Source: GitHub Actions
