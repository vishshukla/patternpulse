# Deployment Guide - Production Architecture

## 🎯 Your Questions Answered

### 1. Where will the cron job exist?

**Short Answer**: GitHub Actions (recommended) OR your Mac OR cloud server

**Best Option**: **GitHub Actions** ⭐
- Runs in GitHub's cloud (free!)
- No server needed
- Always running 24/7
- Auto-commits results to your repo

### 2. Where/who will host the extension?

**Chrome Web Store** hosts the extension
- Users download it from there
- Chrome auto-updates users
- You upload new versions manually (or auto with CI/CD)

### 3. Database/storage concerns before launch?

**File-based** (current): Bundled in extension - works fine! ✅
**Cloud-based** (future): Supabase - optional upgrade later

### 4. Where to put Groq API key?

**CRITICAL**: ⚠️ **NEVER in extension code!**
- GitHub Secrets (for GitHub Actions)
- Environment variables (your Mac/server)
- NOT in any committed files
- NOT in the extension (users would see it!)

---

## 🏗️ Complete Production Architecture

```
┌─────────────────────────────────────────────┐
│  GITHUB ACTIONS (Recommended)               │
│  ├─ Cron job runs every 6 hours            │
│  ├─ Groq API key stored in GitHub Secrets  │
│  ├─ Generates aiProblemDatabase.js         │
│  └─ Auto-commits to repository              │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  GITHUB REPOSITORY                          │
│  ├─ Extension source code                  │
│  ├─ aiProblemDatabase.js (updated daily)   │
│  └─ Version controlled                      │
└─────────────────────────────────────────────┘
                    ↓ (manual or auto)
┌─────────────────────────────────────────────┐
│  CHROME WEB STORE                           │
│  ├─ Extension hosted here                  │
│  ├─ Users download from here                │
│  └─ Auto-updates users                      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  USERS' BROWSERS                            │
│  ├─ Extension installed                    │
│  ├─ Loads aiProblemDatabase.js (bundled)   │
│  └─ Works offline ✅                        │
└─────────────────────────────────────────────┘
```

---

## 🚀 Setup Guide: GitHub Actions (Recommended)

### Step 1: Push Code to GitHub

```bash
# If not already a git repo
cd /Users/veesh/projs/extension
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub (github.com/new)
# Then push
git remote add origin https://github.com/YOUR_USERNAME/patternpulse.git
git branch -M main
git push -u origin main
```

### Step 2: Add Groq API Key to GitHub Secrets

1. Go to your repo on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GROQ_API_KEY`
5. Value: Your Groq API key
6. Click **Add secret**

**IMPORTANT**: This keeps your API key safe! It's encrypted and never exposed.

### Step 3: Enable GitHub Actions

1. Go to **Actions** tab in your repo
2. Click **"I understand my workflows, go ahead and enable them"**
3. The workflow will run automatically every 6 hours
4. You can also trigger it manually: **Actions** → **AI Problem Solver** → **Run workflow**

### Step 4: Verify It Works

```bash
# Wait for first run (or trigger manually)
# Then check your repo - you should see a new commit:
# "🤖 AI Solver: Solved 15 more problems"

# Pull the changes locally
git pull

# Check updated database
node -e "console.log(require('./aiProblemDatabase.js').AI_PROBLEM_DATABASE.length)"
```

---

## 📦 Publishing Extension to Chrome Web Store

### Initial Setup

1. **Create Developer Account**
   - Go to: https://chrome.google.com/webstore/devconsole
   - Pay one-time $5 fee

2. **Prepare Extension**
   ```bash
   # Create zip file
   cd /Users/veesh/projs/extension
   zip -r patternpulse.zip . -x "*.git*" -x "node_modules/*" -x "*.md" -x "*.sh" -x "*.log"
   ```

3. **Upload to Chrome Web Store**
   - Click **New Item**
   - Upload `patternpulse.zip`
   - Fill in:
     - Name: PatternPulse
     - Description: (see landing page)
     - Category: Developer Tools
     - Icons: Use the icons you created
     - Screenshots: Take screenshots of extension in action

4. **Submit for Review**
   - Usually approved in 24-48 hours
   - Users can then install it!

### Updating the Extension

**Option A: Manual** (Simple)
```bash
# After GitHub Actions generates new database
git pull  # Get latest aiProblemDatabase.js
zip -r patternpulse-v1.1.zip . -x "*.git*" -x "node_modules/*"
# Upload to Chrome Web Store Developer Console
```

**Option B: Automated** (Advanced)
- Use Chrome Web Store API
- Auto-publish on new database updates
- Requires additional setup

---

## 🗄️ Database & Storage Concerns

### What You Need Before Launch:

#### ✅ Required
1. **aiProblemDatabase.js** (file-based)
   - Size: ~1-3 MB (3,053 problems)
   - Bundled in extension
   - Works offline
   - Already set up! ✅

2. **Chrome Storage** (built-in)
   - For user stats/progress
   - Already using `chrome.storage.local`
   - No setup needed ✅

#### ❌ NOT Required (Optional Future Upgrades)
1. **Supabase** (cloud database)
   - Only if you want real-time updates
   - Costs: Free tier OK, then $25/month
   - Can add later

2. **Analytics**
   - Google Analytics for extension
   - Mixpanel, PostHog, etc.
   - Optional

3. **User Authentication**
   - Not needed for current features
   - Could add for premium features

### Current Architecture (File-Based):

```javascript
// Extension loads database on startup
const { AI_PROBLEM_DATABASE } = require('./aiProblemDatabase.js');

// User stats stored locally
chrome.storage.local.set({
  userStats: { /* ... */ },
  cachedProblems: AI_PROBLEM_DATABASE
});

// No backend needed! ✅
```

**Pros:**
- ✅ Simple
- ✅ Fast
- ✅ Works offline
- ✅ No backend costs
- ✅ No maintenance

**Cons:**
- ❌ Updates delayed (24-48h for Chrome Web Store review)
- ❌ All users get same database

This is **perfect for launch**! Upgrade to Supabase later if needed.

---

## 🔐 API Key Security - CRITICAL!

### ✅ Where API Key SHOULD Be:

**GitHub Actions (Production):**
```yaml
# In .github/workflows/ai-solver.yml
env:
  GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
```
Stored in GitHub Secrets (encrypted) ✅

**Your Mac (Development):**
```bash
# In ~/.zshrc
export GROQ_API_KEY="your-key-here"
```
Only on your machine ✅

**VPS/Cloud Server (If you use one):**
```bash
# In ~/.bashrc or environment config
export GROQ_API_KEY="your-key-here"
```
Only on server ✅

### ❌ Where API Key SHOULD NEVER Be:

**Extension Code:**
```javascript
// ❌ NEVER DO THIS
const API_KEY = "gsk_...";  // Users can see this!
```

**Committed to Git:**
```bash
# ❌ NEVER DO THIS
echo "GROQ_API_KEY=gsk_..." >> .env
git add .env
git commit
```

**In Any Public File:**
- Not in manifest.json
- Not in contentScript.js
- Not in any .js file
- Not in README.md

### Why This Matters:

```
If API key is in extension code:
  → Users inspect extension
  → Find your API key
  → Use it for their own projects
  → Your quota gets exhausted
  → Groq might block your key
  → Extension stops working ❌
```

**Solution**: API key ONLY lives where cron job runs (GitHub Actions, your Mac, or server)

---

## 📊 Storage Breakdown

### What Gets Stored Where:

```
┌────────────────────────────────────────────┐
│  GITHUB ACTIONS / YOUR MAC / SERVER       │
│  Purpose: Generate database               │
│  Storage:                                  │
│  ├─ Groq API Key (env variable)           │
│  ├─ Node.js code                           │
│  └─ Temporary files                        │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  GITHUB REPOSITORY                         │
│  Purpose: Version control                  │
│  Storage:                                  │
│  ├─ Extension source code                 │
│  ├─ aiProblemDatabase.js (~1-3 MB)        │
│  └─ Documentation                          │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  CHROME WEB STORE                          │
│  Purpose: Distribute extension             │
│  Storage:                                  │
│  ├─ Extension .zip file (~2-4 MB)         │
│  └─ Metadata (name, description, etc)      │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│  USER'S BROWSER (Each User)               │
│  Purpose: Run extension                    │
│  Storage:                                  │
│  ├─ Extension files (~2-4 MB)             │
│  ├─ aiProblemDatabase.js (bundled)        │
│  └─ chrome.storage.local:                 │
│      ├─ User stats (~10 KB)               │
│      ├─ Streak data                        │
│      └─ Attempt history                    │
└────────────────────────────────────────────┘
```

### No External Database Needed!

Everything works with:
- ✅ Files bundled in extension
- ✅ Chrome's built-in storage API
- ✅ No backend server
- ✅ No database costs

---

## 🎯 Complete Deployment Checklist

### Before Launch:

- [ ] **Code on GitHub**
  ```bash
  git push origin main
  ```

- [ ] **GitHub Actions Set Up**
  - [ ] Workflow file created (`.github/workflows/ai-solver.yml`)
  - [ ] Groq API key in GitHub Secrets
  - [ ] First run successful

- [ ] **Database Generated**
  - [ ] At least 500 problems solved (recommended)
  - [ ] Hints quality verified
  - [ ] Patterns accurate

- [ ] **Extension Ready**
  - [ ] Icons created (16px, 48px, 128px)
  - [ ] manifest.json complete
  - [ ] Tested in Chrome
  - [ ] No console errors

- [ ] **Chrome Web Store Account**
  - [ ] Developer account created ($5 fee)
  - [ ] Payment method added

- [ ] **Documentation**
  - [ ] Landing page live
  - [ ] Privacy policy (if collecting data)
  - [ ] Support email/contact

### Launch Day:

- [ ] **Upload to Chrome Web Store**
  - [ ] Create zip file
  - [ ] Upload
  - [ ] Fill in all fields
  - [ ] Submit for review

- [ ] **Wait for Approval** (24-48 hours)

- [ ] **Promote**
  - [ ] Post on Reddit (r/leetcode, r/CSCareerQuestions)
  - [ ] Tweet about it
  - [ ] Share landing page

### After Launch:

- [ ] **Monitor GitHub Actions**
  - [ ] Check runs daily
  - [ ] Verify database updates

- [ ] **Update Extension Weekly**
  - [ ] Pull latest database
  - [ ] Upload new version to Chrome Web Store
  - [ ] Users auto-update

- [ ] **Gather Feedback**
  - [ ] Monitor reviews
  - [ ] Fix bugs
  - [ ] Add requested features

---

## 💰 Cost Breakdown

### Required Costs:
- **Chrome Web Store**: $5 one-time ✅
- **Groq API**: $0 (free tier) ✅
- **GitHub**: $0 (free) ✅
- **Domain** (optional): $12/year

**Total Required**: **$5 one-time** 🎉

### Optional Costs (Future):
- **Supabase**: $0-25/month (free tier OK)
- **VPS** (if not using GitHub Actions): $5-10/month
- **Premium domain**: $10-50/year
- **Analytics**: $0-29/month

**Recommended Start**: **Just $5** for Chrome Web Store!

---

## 🎯 Recommended Setup (Best for You)

### Phase 1: Launch (This Week)

**Hosting:**
- ✅ GitHub Actions for cron job (FREE)
- ✅ GitHub for code hosting (FREE)
- ✅ Chrome Web Store for distribution ($5)

**Database:**
- ✅ File-based (bundled in extension)
- ✅ No backend needed

**Total Cost**: **$5 one-time**

### Phase 2: Growth (Month 2+)

**If** you get 1,000+ users:
- Consider Supabase for real-time updates ($0-25/month)
- Add analytics (optional)

### Phase 3: Scale (Month 6+)

**If** you get 10,000+ users:
- Premium features with auth
- Backend API
- Team/enterprise pricing

---

## 🔧 Quick Setup Commands

### 1. Setup GitHub Actions:

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/patternpulse.git
git push -u origin main

# Add Groq API key to GitHub Secrets (do this in GitHub UI)
# Settings → Secrets → New secret
# Name: GROQ_API_KEY
# Value: your-key-here
```

### 2. Verify It Works:

```bash
# Trigger workflow manually (GitHub UI)
# Actions → AI Problem Solver → Run workflow

# Check results
git pull
node -e "console.log(require('./aiProblemDatabase.js').AI_PROBLEM_DATABASE.length)"
```

### 3. Package for Chrome Web Store:

```bash
# Create zip
zip -r patternpulse.zip \
  manifest.json \
  contentScript.js \
  popup.html \
  popup.js \
  storage.js \
  shield.css \
  icons/ \
  aiProblemDatabase.js \
  problemDatabase.js

# Upload to: https://chrome.google.com/webstore/devconsole
```

---

## 🎉 Summary

### Your Questions - Final Answers:

1. **Where will cron job exist?**
   → GitHub Actions (FREE, runs in cloud, 24/7)

2. **Who hosts the extension?**
   → Chrome Web Store (Google hosts it, users download from there)

3. **Database/storage concerns?**
   → File-based is fine! No external database needed until 1,000+ users

4. **Where to put Groq API key?**
   → GitHub Secrets (for GitHub Actions)
   → NEVER in extension code or committed files!

### Architecture:
```
GitHub Actions (cron) → GitHub Repo → Chrome Web Store → Users
                ↑
           Groq API Key
         (in GitHub Secrets)
```

### Costs:
- **Required**: $5 (Chrome Web Store)
- **Optional**: $0 with GitHub Actions
- **Future**: Consider Supabase if needed

### Next Step:
```bash
# Push code to GitHub
git push origin main

# Add Groq API key to GitHub Secrets
# Let GitHub Actions run automatically!
```

You're ready to launch! 🚀
