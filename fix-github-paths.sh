#!/bin/bash
echo "🔧 Fixing GitHub Pages paths for /m/ subdirectory..."

# Backup original file
cp index.html index.html.backup.$(date +%Y%m%d_%H%M%S)

# Fix all paths for subdirectory
sed -i 's|href="css/|href="./css/|g' index.html
sed -i 's|src="js/|src="./js/|g' index.html
sed -i 's|href="products/|href="./products/|g' index.html
sed -i 's|href="cart/|href="./cart/|g' index.html
sed -i 's|href="account/|href="./account/|g' index.html
sed -i 's|urlParams.get|new URLSearchParams(window.location.search).get|g' index.html

# Fix Font Awesome CDN
sed -i 's|https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css|https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css|g' index.html

echo "✅ Paths fixed! Commit and push to see changes."
