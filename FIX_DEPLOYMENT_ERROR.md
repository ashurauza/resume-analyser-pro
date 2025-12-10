# 🔧 Fix GitHub Pages Deployment Error

## The Error You Saw
```
HttpError: Not Found
Get Pages site failed. Please verify that the repository has Pages enabled
```

This means GitHub Pages needs to be manually enabled in your repository settings first.

## ✅ Solution: Enable GitHub Pages Manually

### Step-by-Step Instructions

1. **Go to your repository settings:**
   - Visit: https://github.com/ashurauza/resume-analyser-pro/settings/pages
   - Or: Go to your repo → Click "Settings" tab → Click "Pages" in sidebar

2. **Configure the source:**
   - Under "Build and deployment" section
   - Find "Source" dropdown
   - **Select: "GitHub Actions"** (NOT "Deploy from a branch")
   - The page will auto-save

3. **Trigger the deployment:**
   - Go to: https://github.com/ashurauza/resume-analyser-pro/actions
   - Click on "Actions" tab
   - You should see the workflow running automatically
   - OR click "Deploy to GitHub Pages" → "Run workflow" → "Run workflow"

4. **Wait for deployment:**
   - The workflow takes 1-2 minutes
   - Watch for a green checkmark ✅
   - Once complete, your site is live!

## 🌐 Your Live Site URL

After successful deployment:
**https://ashurauza.github.io/resume-analyser-pro/**

## 📸 Visual Guide

### What to select in GitHub Pages settings:
```
Source: [GitHub Actions]  ← Select this!
        (Not "Deploy from a branch")
```

### Where to find it:
1. Repository → Settings (top menu)
2. Pages (left sidebar, under "Code and automation")
3. Source dropdown → GitHub Actions

## 🔍 Verify It's Enabled

After enabling, you should see:
- A new section showing "Your site is live at https://ashurauza.github.io/resume-analyser-pro/"
- The Actions tab shows a deployment running
- No more "Not Found" errors

## 🆘 Still Having Issues?

If you still see errors after enabling Pages:

1. **Check repository visibility:**
   - Go to Settings → General
   - Repository must be Public for free GitHub Pages
   - Or have GitHub Pro/Team for private repos

2. **Check Actions permissions:**
   - Go to Settings → Actions → General
   - Enable "Read and write permissions"
   - Enable "Allow GitHub Actions to create and approve pull requests"

3. **Re-run the workflow:**
   - Go to Actions tab
   - Click on the failed workflow
   - Click "Re-run all jobs"

## 📋 Quick Checklist

- [ ] Repository is Public (or you have GitHub Pro)
- [ ] Go to Settings → Pages
- [ ] Set Source to "GitHub Actions"
- [ ] Wait for page to save (usually instant)
- [ ] Go to Actions tab
- [ ] See workflow running/completed
- [ ] Visit your site URL

---

**Need more help?** Check the Actions tab for detailed error logs:
https://github.com/ashurauza/resume-analyser-pro/actions
