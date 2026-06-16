#!/bin/bash
# =============================================================
# Kartik Chopade Portfolio - GitHub Pages Deployment Script
# =============================================================
# Usage: bash deploy-to-github.sh <your-github-username> <repo-name>
# Example: bash deploy-to-github.sh kartik-chopade kartik-portfolio

USERNAME=$1
REPO=$2

if [ -z "$USERNAME" ] || [ -z "$REPO" ]; then
  echo "Usage: bash deploy-to-github.sh <github-username> <repo-name>"
  echo "Example: bash deploy-to-github.sh kartikchopade kartik-portfolio"
  exit 1
fi

echo "🚀 Setting up GitHub Pages deployment..."
echo "   GitHub Username: $USERNAME"
echo "   Repository Name: $REPO"
echo ""

# Initialize git if not already
if [ ! -d ".git" ]; then
  git init
  git branch -M main
fi

# Set remote
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/$USERNAME/$REPO.git

# Stage all files
git add .
git commit -m "Deploy: Kartik Chopade Portfolio" --allow-empty

echo ""
echo "✅ Ready! Now:"
echo "1. Create the repo at: https://github.com/new"
echo "   Name: $REPO | Set to PUBLIC | Do NOT add README"
echo ""
echo "2. Push the code:"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   Go to: https://github.com/$USERNAME/$REPO/settings/pages"
echo "   Source: GitHub Actions"
echo ""
echo "4. Your site will be live at:"
echo "   https://$USERNAME.github.io/$REPO"
