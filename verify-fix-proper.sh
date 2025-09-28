#!/bin/bash
echo "🔍 Proper Verification from Project Directory..."

# Go to project directory
cd ~/marketplace-pro.github.io

echo "1. 📁 Current Directory:"
pwd

echo ""
echo "2. 🔗 Repository Access:"
git remote -v

echo ""
echo "3. 🏗️  Structure Check:"
./phase1-detector.sh

echo ""
echo "4. 🌐 Live Site Check:"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" https://MarketPlace-Pro.github.io/

echo ""
echo "5. 📊 GitHub Pages Status:"
gh api repos/MarketPlace-Pro/MarketPlace-Pro.github.io/pages | grep -E '"status|"html_url"'

echo ""
echo "🎉 PROPER VERIFICATION COMPLETE!"
