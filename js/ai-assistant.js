// AfriTrade AI Assistant - Intelligent Export Assistant
class AfriTradeAI {
    constructor() {
        this.conversationHistory = [];
        this.userContext = {
            userType: 'unknown', // 'buyer', 'supplier', 'visitor'
            interests: [],
            previousQuestions: []
        };
        this.initializeAI();
    }

    initializeAI() {
        this.loadConversationHistory();
        this.setupEventListeners();
        this.updateAnalytics();
        console.log('🤖 AfriTrade AI Assistant initialized');
    }

    setupEventListeners() {
        // Enter key support
        document.getElementById('userInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const userInput = document.getElementById('userInput');
        const message = userInput.value.trim();
        
        if (!message) return;

        // Add user message to chat
        this.addMessageToChat(message, 'user');
        userInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process message and generate response
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.addMessageToChat(response, 'ai');
            this.hideTypingIndicator();
            
            // Update conversation history
            this.conversationHistory.push({
                question: message,
                answer: response,
                timestamp: new Date().toISOString()
            });
            
            this.saveConversationHistory();
            this.updateUserContext(message);
        }, 1000 + Math.random() * 2000); // Simulate AI thinking time
    }

    generateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Product-related queries
        if (lowerMessage.includes('wine') || lowerMessage.includes('alcohol') || lowerMessage.includes('drink')) {
            return this.handleWineQuery(userMessage);
        }
        else if (lowerMessage.includes('fruit') || lowerMessage.includes('agriculture') || lowerMessage.includes('produce')) {
            return this.handleFruitQuery(userMessage);
        }
        else if (lowerMessage.includes('craft') || lowerMessage.includes('mineral') || lowerMessage.includes('art')) {
            return this.handleCraftQuery(userMessage);
        }
        else if (lowerMessage.includes('textile') || lowerMessage.includes('fabric') || lowerMessage.includes('clothing')) {
            return this.handleTextileQuery(userMessage);
        }
        else if (lowerMessage.includes('spice') || lowerMessage.includes('tea') || lowerMessage.includes('food')) {
            return this.handleSpiceQuery(userMessage);
        }
        
        // Export procedure queries
        else if (lowerMessage.includes('export') || lowerMessage.includes('ship') || lowerMessage.includes('logistics')) {
            return this.handleExportQuery(userMessage);
        }
        else if (lowerMessage.includes('certif') || lowerMessage.includes('compliance') || lowerMessage.includes('standard')) {
            return this.handleCertificationQuery(userMessage);
        }
        else if (lowerMessage.includes('supplier') || lowerMessage.includes('manufacturer') || lowerMessage.includes('producer')) {
            return this.handleSupplierQuery(userMessage);
        }
        
        // Market intelligence
        else if (lowerMessage.includes('market') || lowerMessage.includes('opportunity') || lowerMessage.includes('demand')) {
            return this.handleMarketQuery(userMessage);
        }
        else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('calculate')) {
            return this.handlePricingQuery(userMessage);
        }
        
        // General help
        else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            return this.getHelpResponse();
        }
        
        // Default response
        else {
            return this.getDefaultResponse(userMessage);
        }
    }

    handleWineQuery(message) {
        const responses = [
            "🍷 **South African Wine Export Insights:**\n\n" +
            "• **Top Varieties:** Chenin Blanc, Pinotage, Cabernet Sauvignon\n" +
            "• **Key Markets:** EU (35%), China (25%), USA (20%)\n" +
            "• **Average MOQ:** 100-150 cases\n" +
            "• **Lead Time:** 15-30 days\n" +
            "• **Certifications Needed:** Wine of Origin, EU Organic, FDA\n\n" +
            "I can connect you with premium wine estates in Stellenbosch, Franschhoek, and Paarl regions.",

            "🇿🇦 **Wine Export Procedures:**\n\n" +
            "1. **Supplier Verification:** Check Wine & Spirit Board registration\n" +
            "2. **Export Documentation:** Certificate of Origin, Phytosanitary Certificate\n" +
            "3. **Shipping:** Temperature-controlled containers recommended\n" +
            "4. **Target Markets:** EU prefers organic, China likes premium packaging\n\n" +
            "Would you like specific supplier recommendations?",

            "📊 **Wine Market Intelligence:**\n\n" +
            "• **Growth Trend:** +15% year-over-year to China\n" +
            "• **Premium Demand:** Luxury wines growing at 25% annually\n" +
            "• **New Opportunities:** Asian markets for sparkling wines\n" +
            "• **Competitive Pricing:** South African wines offer 30% better value than European counterparts\n\n" +
            "I can analyze specific market opportunities for you."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleFruitQuery(message) {
        const responses = [
            "🍋 **Fresh Fruit Export Overview:**\n\n" +
            "• **Top Products:** Citrus, Avocados, Table Grapes, Blueberries\n" +
            "• **Key Markets:** China (40%), EU (30%), Middle East (15%)\n" +
            "• **Seasonality:** Year-round availability with proper planning\n" +
            "• **Certifications:** GlobalGAP, PPECB, Phytosanitary required\n\n" +
            "South Africa is the 2nd largest citrus exporter globally.",

            "🚚 **Fruit Logistics:**\n\n" +
            "• **Shipping:** Refrigerated containers essential\n" +
            "• **Lead Time:** 7-21 days depending on destination\n" +
            "• **Packaging:** Specialized to prevent bruising\n" +
            "• **Seasonal Planning:** Crucial for consistent supply\n\n" +
            "I can help calculate shipping costs and find reliable logistics partners.",

            "📈 **Fruit Market Opportunities:**\n\n" +
            "• **Avocados:** +200% demand growth in China\n" +
            "• **Blueberries:** Superfood trend driving 30% annual growth\n" +
            "• **Organic Fruits:** Premium pricing in EU markets\n" +
            "• **Exotic Varieties:** Growing demand for unique African fruits\n\n" +
            "Let me find the best fruit suppliers for your target market."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleExportQuery(message) {
        const responses = [
            "🌍 **Export Process Simplified:**\n\n" +
            "1. **Product Selection:** Choose certified suppliers\n" +
            "2. **Documentation:** Certificate of Origin, Commercial Invoice, Packing List\n" +
            "3. **Logistics:** Select shipping method (air/sea), arrange insurance\n" +
            "4. **Customs:** Ensure all import requirements are met\n" +
            "5. **Payment:** Secure international payment processing\n\n" +
            "I can guide you through each step based on your product and destination.",

            "📋 **Essential Export Documents:**\n\n" +
            "• **Commercial Invoice**\n" +
            "• **Packing List**\n" +
            "• **Certificate of Origin**\n" +
            "• **Bill of Lading/Air Waybill**\n" +
            "• **Insurance Certificate**\n" +
            "• **Phytosanitary Certificate** (for agricultural products)\n\n" +
            "Our platform automates most documentation processes.",

            "🚢 **Logistics Options:**\n\n" +
            "• **Sea Freight:** Cost-effective for large volumes (15-45 days)\n" +
            "• **Air Freight:** Fast but expensive (3-10 days)\n" +
            "• **Refrigerated:** Essential for perishables\n" +
            "• **Consolidated:** Shared containers for smaller shipments\n\n" +
            "I can compare shipping options and costs for your specific needs."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleMarketQuery(message) {
        const responses = [
            "📊 **Current Market Opportunities:**\n\n" +
            "• **China:** Growing middle class demanding premium foods and wines\n" +
            "• **EU:** Strong demand for organic and sustainable products\n" +
            "• **USA:** African crafts and unique products trending\n" +
            "• **Middle East:** High demand for halal-certified foods\n\n" +
            "I can provide detailed market analysis for specific products.",

            "🎯 **High-Growth Export Categories:**\n\n" +
            "1. **Premium Wines** (+23% to China)\n" +
            "2. **Avocados** (+45% global demand)\n" +
            "3. **Rooibos Tea** (+18% health-conscious markets)\n" +
            "4. **African Crafts** (+30% luxury and tourism markets)\n" +
            "5. **Macadamia Nuts** (+25% healthy snack market)\n\n" +
            "Which category interests you most?",

            "🌐 **Regional Market Insights:**\n\n" +
            "**EU Market:**\n" +
            "• Prefers certified organic products\n" +
            "• Willing to pay premium for sustainability\n" +
            "• Strong wine and fruit consumption\n\n" +
            "**Asian Markets:**\n" +
            "• Growing health consciousness\n" +
            "• Luxury goods demand increasing\n" +
            "• Prefer established brands\n\n" +
            "I can tailor recommendations to your target region."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getHelpResponse() {
        return "🤖 **How I Can Help You:**\n\n" +
            "**Product Information:**\n" +
            "• Detailed product specifications\n" +
            "• Supplier recommendations\n" +
            "• Pricing and MOQ details\n\n" +
            "**Export Guidance:**\n" +
            "• Step-by-step export procedures\n" +
            "• Documentation requirements\n" +
            "• Logistics and shipping options\n\n" +
            "**Market Intelligence:**\n" +
            "• Current market trends\n" +
            "• Opportunity analysis\n" +
            "• Competitive insights\n\n" +
            "**Business Support:**\n" +
            "• Certification requirements\n" +
            "• Payment processing\n" +
            "• Risk assessment\n\n" +
            "What would you like to know today?";
    }

    getDefaultResponse(message) {
        const defaultResponses = [
            "I'm here to help with African export business. Could you tell me more about what you're looking for?",
            "That's an interesting question about African exports. Let me connect you with the right information.",
            "I specialize in African export markets. Are you looking for products, suppliers, or export guidance?",
            "As your AI export assistant, I can help with product sourcing, market analysis, or logistics. What specifically interests you?",
            "South Africa offers diverse export opportunities. Would you like information about wines, fruits, crafts, or other products?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    addMessageToChat(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'ai') {
            messageDiv.innerHTML = `<strong>AfriTrade AI:</strong> ${this.formatMessage(message)}`;
        } else {
            messageDiv.innerHTML = `<strong>You:</strong> ${this.formatMessage(message)}`;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    formatMessage(message) {
        // Convert line breaks to HTML
        return message.replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        document.getElementById('aiTyping').style.display = 'block';
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }

    hideTypingIndicator() {
        document.getElementById('aiTyping').style.display = 'none';
    }

    quickQuestion(question) {
        document.getElementById('userInput').value = question;
        this.sendMessage();
    }

    updateUserContext(question) {
        // Simple context tracking
        if (question.toLowerCase().includes('buy') || question.toLowerCase().includes('purchase')) {
            this.userContext.userType = 'buyer';
        } else if (question.toLowerCase().includes('sell') || question.toLowerCase().includes('supply')) {
            this.userContext.userType = 'supplier';
        }
        
        this.userContext.previousQuestions.push(question);
        if (this.userContext.previousQuestions.length > 10) {
            this.userContext.previousQuestions.shift();
        }
    }

    updateAnalytics() {
        // Simulate real-time analytics updates
        setInterval(() => {
            document.getElementById('trendingProducts').textContent = 
                Math.floor(8 + Math.random() * 4);
            document.getElementById('activeSuppliers').textContent = 
                Math.floor(45 + Math.random() * 10);
            document.getElementById('marketOpportunities').textContent = 
                Math.floor(10 + Math.random() * 6);
        }, 5000);
    }

    saveConversationHistory() {
        localStorage.setItem('afritradeAI_conversation', JSON.stringify(this.conversationHistory));
    }

    loadConversationHistory() {
        const saved = localStorage.getItem('afritradeAI_conversation');
        if (saved) {
            this.conversationHistory = JSON.parse(saved);
        }
    }
}

// Global functions for HTML onclick events
function sendMessage() {
    if (window.aiAssistant) {
        window.aiAssistant.sendMessage();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function quickQuestion(question) {
    if (window.aiAssistant) {
        window.aiAssistant.quickQuestion(question);
    }
}

// Initialize AI when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.aiAssistant = new AfriTradeAI();
});
