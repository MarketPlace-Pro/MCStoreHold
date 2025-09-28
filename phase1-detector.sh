#!/bin/bash
echo "🚀 PHASE 1: Basic Structure Detection"
echo "======================================"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

check_exists() {
    if [ -e "$1" ]; then
        echo -e "${GREEN}✅ FOUND: $1${NC}"
        return 0
    else
        echo -e "${RED}❌ MISSING: $1${NC}"
        return 1
    fi
}

check_github() {
    if [ -d ".git" ]; then
        echo -e "${GREEN}✅ Git repository initialized${NC}"
        git status --short
    else
        echo -e "${RED}❌ No Git repository${NC}"
    fi
}

check_website_structure() {
    echo -e "\n${BLUE}📁 WEBSITE STRUCTURE CHECK:${NC}"
    files=("index.html" "css/" "js/" "products/" "cart/" "account/")
    for file in "${files[@]}"; do
        check_exists "$file"
    done
}

main() {
    echo -e "${BLUE}🔍 Scanning basic structure...${NC}"
    echo -e "Current directory: $(pwd)"
    ls -la
    check_github
    check_website_structure
    echo -e "\n${GREEN}🎉 Phase 1 complete!${NC}"
}

main
