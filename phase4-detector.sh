#!/bin/bash
echo "🚀 PHASE 4: Stage Analysis & Recommendations"
echo "============================================"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

determine_stage() {
    echo -e "\n${BLUE}🎯 PROJECT STAGE ANALYSIS:${NC}"
    
    local total_checks=0
    local passed_checks=0
    
    if [ -f "index.html" ]; then
        ((passed_checks++))
    fi
    ((total_checks++))
    
    if [ -d "css" ] && [ "$(ls -A css/ 2>/dev/null)" ]; then
        ((passed_checks++))
    fi
    ((total_checks++))
    
    if [ -d "js" ] && [ "$(ls -A js/ 2>/dev/null)" ]; then
        ((passed_checks++))
    fi
    ((total_checks++))
    
    if grep -q "fetch\\|axios\\|api" js/*.html *.js 2>/dev/null; then
        ((passed_checks++))
    fi
    ((total_checks++))
    
    if [ -f "business-plan.md" ] || [ -f "supplier-list.csv" ]; then
        ((passed_checks++))
    fi
    ((total_checks++))
    
    local percentage=$((passed_checks * 100 / total_checks))
    
    echo -e "Progress: $passed_checks/$total_checks checks passed ($percentage%)"
    
    if [ $percentage -lt 20 ]; then
        echo -e "${RED}📊 STAGE 1: PLANNING PHASE${NC}"
        echo "Focus: Basic project setup and planning"
    elif [ $percentage -lt 40 ]; then
        echo -e "${YELLOW}📊 STAGE 2: DEVELOPMENT STARTED${NC}"
        echo "Focus: Building core website structure"
    elif [ $percentage -lt 60 ]; then
        echo -e "${YELLOW}📊 STAGE 3: CORE FUNCTIONALITY${NC}"
        echo "Focus: Adding features and API integration"
    elif [ $percentage -lt 80 ]; then
        echo -e "${GREEN}📊 STAGE 4: TESTING PHASE${NC}"
        echo "Focus: Polish, testing, and optimization"
    else
        echo -e "${GREEN}📊 STAGE 5: READY FOR LAUNCH${NC}"
        echo "Focus: Deployment and scaling"
    fi
}

provide_recommendations() {
    echo -e "\n${BLUE}💡 RECOMMENDED NEXT STEPS:${NC}"
    
    if [ ! -f "index.html" ]; then
        echo "1. Create basic index.html structure"
    fi
    
    if [ ! -d "css" ]; then
        echo "2. Setup CSS directory and design system"
    fi
    
    if [ ! -d "js" ]; then
        echo "3. Create JavaScript functionality directory"
    fi
    
    if ! grep -q "api" js/*.js 2>/dev/null; then
        echo "4. Implement basic API integration"
    fi
    
    if ! grep -q "cart" js/*.js 2>/dev/null; then
        echo "5. Add shopping cart functionality"
    fi
}

main() {
    echo -e "${BLUE}🔍 Analyzing stage & recommendations...${NC}"
    determine_stage
    provide_recommendations
    echo -e "\n${GREEN}🎉 Phase 4 complete!${NC}"
}

main
