#!/bin/bash
echo "🚀 PHASE 2: API & Business Setup Detection"
echo "==========================================="

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

check_api() {
    echo -e "\n${BLUE}🔗 API STATUS CHECK:${NC}"
    if check_exists "js/api.js"; then
        echo -e "${YELLOW}📡 API configuration found${NC}"
    fi
    if check_exists ".env" || check_exists "config.json"; then
        echo -e "${GREEN}🔐 Environment configuration found${NC}"
    fi
}

check_business() {
    echo -e "\n${BLUE}🏢 BUSINESS SETUP CHECK:${NC}"
    docs=("business-plan.md" "supplier-list.csv" "price-list.json")
    for doc in "${docs[@]}"; do
        check_exists "$doc"
    done
}

main() {
    echo -e "${BLUE}🔍 Scanning API & Business...${NC}"
    check_api
    check_business
    echo -e "\n${GREEN}🎉 Phase 2 complete!${NC}"
}

main
