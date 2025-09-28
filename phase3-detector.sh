#!/bin/bash
echo "🚀 PHASE 3: E-commerce Features Detection"
echo "========================================="

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

check_ecommerce_features() {
    echo -e "\n${BLUE}🛒 E-COMMERCE FEATURES CHECK:${NC}"
    
    if grep -r "cart\\|addToCart\\|checkout" js/ *.html 2>/dev/null; then
        echo -e "${GREEN}✅ Shopping cart code found${NC}"
    else
        echo -e "${RED}❌ No cart functionality detected${NC}"
    fi
    
    if [ -d "products" ] || grep -r "product" *.html 2>/dev/null; then
        echo -e "${GREEN}✅ Product structure found${NC}"
    else
        echo -e "${RED}❌ No product pages detected${NC}"
    fi
}

check_render_api() {
    echo -e "\n${BLUE}🌐 RENDER API INTEGRATION CHECK:${NC}"
    
    if grep -r "render.com\\|api\\|fetch\\|POST\\|GET" js/ *.html 2>/dev/null; then
        echo -e "${GREEN}✅ API integration code found${NC}"
        echo -e "${YELLOW}📡 Found API calls:${NC}"
        grep -h "fetch\\|axios" js/*.js *.html 2>/dev/null | grep -o "['\"][^'\"]*['\"]" | head -5
    else
        echo -e "${RED}❌ No API integration detected${NC}"
    fi
}

main() {
    echo -e "${BLUE}🔍 Scanning e-commerce features...${NC}"
    check_ecommerce_features
    check_render_api
    echo -e "\n${GREEN}🎉 Phase 3 complete!${NC}"
}

main
