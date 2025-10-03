// Export Platform Product Database
const exportProducts = [
    {
        id: 'exp-wine-001',
        name: 'Stellenbosch Cabernet Sauvignon 2022',
        category: 'wine',
        supplier: 'Stellenbosch Vineyards',
        origin: 'Western Cape, South Africa',
        price: 150, // ZAR per bottle
        unit: 'bottle',
        minOrder: 120, // cases
        certification: ['EU Organic', 'Wine of Origin'],
        description: 'Premium South African red wine with rich berry flavors',
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=300',
        exportMarkets: ['EU', 'China', 'USA'],
        shipping: 'Container (1200 cases)',
        leadTime: '15-30 days'
    },
    {
        id: 'exp-citrus-001',
        name: 'Fresh Valencia Oranges',
        category: 'fruits',
        supplier: 'Citrus Farms SA',
        origin: 'Limpopo, South Africa',
        price: 8, // ZAR per kg
        unit: 'kilogram',
        minOrder: 10000, // kg
        certification: ['GlobalGAP', 'PPECB', 'Phytosanitary'],
        description: 'Sweet, juicy oranges perfect for export markets',
        image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=300',
        exportMarkets: ['China', 'EU', 'Middle East'],
        shipping: 'Refrigerated Container',
        leadTime: '7-14 days'
    },
    {
        id: 'exp-craft-001',
        name: 'Zulu Beaded Artwork',
        category: 'crafts',
        supplier: 'African Crafts Collective',
        origin: 'KwaZulu-Natal, South Africa',
        price: 250, // ZAR per piece
        unit: 'piece',
        minOrder: 100,
        certification: ['Fair Trade', 'Authentic African'],
        description: 'Handcrafted traditional Zulu beadwork',
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=300',
        exportMarkets: ['EU', 'USA', 'Japan'],
        shipping: 'Air Freight',
        leadTime: '10-20 days'
    },
    {
        id: 'exp-textile-001',
        name: 'Shweshwe Traditional Fabric',
        category: 'textiles',
        supplier: 'Da Gama Textiles',
        origin: 'Eastern Cape, South Africa',
        price: 85, // ZAR per meter
        unit: 'meter',
        minOrder: 1000,
        certification: ['OEKO-TEX', 'Traditional Design'],
        description: 'Authentic South African printed cotton fabric',
        image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=300',
        exportMarkets: ['EU', 'USA', 'Global Fashion'],
        shipping: 'Container',
        leadTime: '20-30 days'
    },
    {
        id: 'exp-spice-001',
        name: 'Premium Rooibos Tea',
        category: 'spices',
        supplier: 'Rooibos Limited',
        origin: 'Cederberg, South Africa',
        price: 120, // ZAR per kg
        unit: 'kilogram',
        minOrder: 500,
        certification: ['EU Organic', 'FDA Approved', 'Halal'],
        description: '100% pure organic Rooibos tea, caffeine-free',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300',
        exportMarkets: ['EU', 'China', 'USA', 'Japan'],
        shipping: 'Container',
        leadTime: '15-25 days'
    },
    {
        id: 'exp-wine-002',
        name: 'Chenin Blanc 2023',
        category: 'wine',
        supplier: 'Fairview Wines',
        origin: 'Paarl, South Africa',
        price: 130,
        unit: 'bottle',
        minOrder: 100,
        certification: ['Sustainable', 'Wine of Origin'],
        description: 'Crisp white wine with tropical fruit notes',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300',
        exportMarkets: ['EU', 'UK', 'Canada'],
        shipping: 'Container',
        leadTime: '15-30 days'
    }
];

// Export Categories
const exportCategories = {
    wine: {
        name: 'Wine & Spirits',
        description: 'Premium South African wines and spirits',
        markets: ['EU', 'China', 'USA', 'UK'],
        certifications: ['Wine of Origin', 'EU Organic', 'FDA']
    },
    fruits: {
        name: 'Fruits & Agriculture',
        description: 'Fresh fruits and agricultural products',
        markets: ['China', 'EU', 'Middle East', 'Asia'],
        certifications: ['GlobalGAP', 'PPECB', 'Phytosanitary']
    },
    crafts: {
        name: 'Crafts & Minerals',
        description: 'Traditional crafts and mineral products',
        markets: ['EU', 'USA', 'Japan', 'Global'],
        certifications: ['Fair Trade', 'Authentic', 'Ethical Sourcing']
    },
    textiles: {
        name: 'Textiles & Fashion',
        description: 'African textiles and fashion products',
        markets: ['EU', 'USA', 'Global Fashion'],
        certifications: ['OEKO-TEX', 'Traditional Design']
    },
    spices: {
        name: 'Spices & Foods',
        description: 'African spices and food products',
        markets: ['EU', 'China', 'USA', 'Global'],
        certifications: ['Organic', 'FDA', 'Halal']
    }
};

// Market Requirements
const marketRequirements = {
    EU: {
        certifications: ['CE Mark', 'EU Organic', 'REACH'],
        documentation: ['Certificate of Origin', 'Phytosanitary Certificate'],
        taxes: 'VAT 15-27%',
        shipping: 'Container, Air Freight'
    },
    China: {
        certifications: ['GACC Registration', 'CIQ Certificate'],
        documentation: ['Health Certificate', 'Certificate of Origin'],
        taxes: 'VAT 13%, Customs Duties 5-30%',
        shipping: 'Container, Rail'
    },
    USA: {
        certifications: ['FDA Approval', 'USDA Organic'],
        documentation: ['FDA Prior Notice', 'Commercial Invoice'],
        taxes: 'Customs Duties 0-20%',
        shipping: 'Container, Air Freight'
    }
};
