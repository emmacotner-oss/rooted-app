# Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new (make sure you're logged in as emmacotner-oss)
2. Repository name: `rooted-app`
3. Description: `Pop culture through a biblical lens - A Christian perspective on trending topics`
4. Set to **Public**
5. **Do NOT initialize** with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Push to GitHub

After creating the repository, run these commands in the rooted-app directory:

```bash
git remote add origin https://github.com/emmacotner-oss/rooted-app.git
git branch -M main
git push -u origin main
```

You may need to authenticate with a Personal Access Token (PAT) if not already set up.

## Step 3: Deploy to Vercel

1. Go to https://vercel.com and sign in
2. Click **Add New Project**
3. Click **Import Git Repository**
4. Select **GitHub** and authorize if needed
5. Find and select `emmacotner-oss/rooted-app`
6. Keep all default settings (Vercel auto-detects Next.js)
7. Click **Deploy**

Vercel will automatically:
- Install dependencies
- Build the project
- Deploy to a production URL
- Set up automatic deployments for future commits

## Step 4: Get Your Live URL

After deployment completes (2-3 minutes), Vercel will provide your live URL:
- Production: `https://rooted-app.vercel.app` (or similar)
- You can also set up a custom domain in Vercel settings

## Environment Variables

Currently none needed! The app uses static data and requires no API keys or secrets.

## Future Updates

To deploy updates:
1. Make changes locally
2. Commit: `git add . && git commit -m "Your update message"`
3. Push: `git push`
4. Vercel will automatically deploy the changes

---

✨ That's it! Your app will be live and accessible to anyone.
