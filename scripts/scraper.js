const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

class AIToolScraper {
  constructor() {
    this.toolsFilePath = path.join(__dirname, '../data/tools.json');
    this.existingTools = this.loadExistingTools();
    this.newTools = [];
    this.categories = [
      'productivity', 'design', 'development', 'marketing', 'writing', 'research'
    ];
  }

  loadExistingTools() {
    try {
      const data = fs.readFileSync(this.toolsFilePath, 'utf8');
      const parsed = JSON.parse(data);
      return parsed.tools || [];
    } catch (error) {
      console.log('No existing tools file found, starting fresh');
      return [];
    }
  }

  // Check if tool already exists (deduplication)
  isDuplicate(toolData) {
    return this.existingTools.some(existing => 
      existing.url === toolData.url || 
      existing.name.toLowerCase() === toolData.name.toLowerCase() ||
      this.calculateSimilarity(existing.description, toolData.description) > 0.8
    );
  }

  // Simple similarity calculation
  calculateSimilarity(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = Array(len2 + 1).fill(null).map(() => Array(len1 + 1).fill(null));

    for (let i = 0; i <= len1; i++) matrix[0][i] = i;
    for (let j = 0; j <= len2; j++) matrix[j][0] = j;

    for (let j = 1; j <= len2; j++) {
      for (let i = 1; i <= len1; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return 1 - matrix[len2][len1] / Math.max(len1, len2);
  }

  // Categorize tool using keywords
  categorizeToolBasic(name, description) {
    const text = (name + ' ' + description).toLowerCase();
    
    const categoryKeywords = {
      'productivity': ['productivity', 'workflow', 'task', 'organization', 'planning', 'efficiency'],
      'design': ['design', 'image', 'graphics', 'visual', 'creative', 'art', 'ui', 'ux'],
      'development': ['code', 'development', 'programming', 'api', 'developer', 'software', 'github'],
      'marketing': ['marketing', 'social', 'analytics', 'seo', 'campaign', 'leads', 'sales'],
      'writing': ['writing', 'content', 'text', 'copywriting', 'blog', 'article', 'documentation'],
      'research': ['research', 'data', 'analysis', 'insights', 'survey', 'intelligence', 'knowledge']
    };

    let bestCategory = 'productivity';
    let maxScore = 0;

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      const score = keywords.reduce((sum, keyword) => {
        return sum + (text.includes(keyword) ? 1 : 0);
      }, 0);
      
      if (score > maxScore) {
        maxScore = score;
        bestCategory = category;
      }
    }

    return bestCategory;
  }

  // Scrape ProductHunt for AI tools
  async scrapeProductHunt() {
    try {
      console.log('Scraping ProductHunt for AI tools...');
      const response = await axios.get('https://www.producthunt.com/topics/artificial-intelligence', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const tools = [];

      $('.styles_item__Dk_nz').each((i, element) => {
        try {
          const $el = $(element);
          const name = $el.find('[data-test="product-item-name"]').text().trim();
          const description = $el.find('.styles_colorBase__6kbIA').text().trim();
          const url = $el.find('a').first().attr('href');

          if (name && description && url) {
            const fullUrl = url.startsWith('http') ? url : `https://www.producthunt.com${url}`;
            const toolData = {
              id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
              name,
              description,
              url: fullUrl,
              category: this.categorizeToolBasic(name, description),
              tags: this.extractTags(name, description),
              featured: false,
              addedDate: new Date().toISOString().split('T')[0],
              logo: '/placeholder.svg',
              pricing: 'unknown'
            };

            if (!this.isDuplicate(toolData)) {
              tools.push(toolData);
            }
          }
        } catch (error) {
          console.log('Error parsing ProductHunt item:', error.message);
        }
      });

      return tools.slice(0, 10); // Limit to 10 new tools
    } catch (error) {
      console.log('Error scraping ProductHunt:', error.message);
      return [];
    }
  }

  // Extract tags from name and description
  extractTags(name, description) {
    const text = (name + ' ' + description).toLowerCase();
    const commonTags = ['ai', 'automation', 'ml', 'analytics', 'saas', 'api', 'tool', 'platform'];
    
    return commonTags.filter(tag => text.includes(tag)).slice(0, 3);
  }

  // Scrape AI domain directories
  async scrapeAIDomains() {
    const domains = [
      'https://theresanaiforthat.com/newest/',
      'https://www.futuretools.io/tools'
    ];

    const tools = [];
    
    for (const domain of domains) {
      try {
        console.log(`Scraping ${domain}...`);
        const response = await axios.get(domain, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 10000
        });

        const $ = cheerio.load(response.data);
        
        // Generic selectors for AI tool listings
        const selectors = [
          '.tool-card', '.product-card', '[data-testid="tool"]',
          '.grid-item', '.list-item', '.tool-item'
        ];

        for (const selector of selectors) {
          $(selector).each((i, element) => {
            if (tools.length >= 5) return false; // Limit per site
            
            try {
              const $el = $(element);
              const name = $el.find('h2, h3, .title, .name').first().text().trim();
              const description = $el.find('p, .description, .summary').first().text().trim();
              const link = $el.find('a').first().attr('href');

              if (name && description && link) {
                const url = link.startsWith('http') ? link : `${new URL(domain).origin}${link}`;
                const toolData = {
                  id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                  name,
                  description: description.substring(0, 200),
                  url,
                  category: this.categorizeToolBasic(name, description),
                  tags: this.extractTags(name, description),
                  featured: false,
                  addedDate: new Date().toISOString().split('T')[0],
                  logo: '/placeholder.svg',
                  pricing: 'unknown'
                };

                if (!this.isDuplicate(toolData)) {
                  tools.push(toolData);
                }
              }
            } catch (error) {
              console.log('Error parsing tool item:', error.message);
            }
          });
          
          if (tools.length > 0) break; // Found tools with this selector
        }
      } catch (error) {
        console.log(`Error scraping ${domain}:`, error.message);
      }
    }

    return tools;
  }

  // Main scraping function
  async scrapeNewTools() {
    console.log('Starting AI tool discovery...');
    
    const sources = [
      this.scrapeProductHunt(),
      this.scrapeAIDomains()
    ];

    const results = await Promise.allSettled(sources);
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        this.newTools.push(...result.value);
        console.log(`Source ${index + 1} found ${result.value.length} new tools`);
      } else {
        console.log(`Source ${index + 1} failed:`, result.reason.message);
      }
    });

    // Remove duplicates within new tools
    this.newTools = this.newTools.filter((tool, index, arr) => 
      arr.findIndex(t => t.url === tool.url || t.name === tool.name) === index
    );

    console.log(`Total new tools found: ${this.newTools.length}`);
    return this.newTools;
  }

  // Save updated tools to file
  saveUpdatedTools() {
    try {
      const existingData = this.loadExistingData();
      const updatedTools = [...this.existingTools, ...this.newTools];
      
      const updatedData = {
        ...existingData,
        tools: updatedTools,
        lastUpdated: new Date().toISOString(),
        totalTools: updatedTools.length
      };

      fs.writeFileSync(this.toolsFilePath, JSON.stringify(updatedData, null, 2));
      console.log(`Updated tools.json with ${this.newTools.length} new tools`);
      
      return {
        newToolsCount: this.newTools.length,
        totalTools: updatedTools.length,
        categories: this.getCategoryBreakdown()
      };
    } catch (error) {
      console.error('Error saving tools:', error);
      throw error;
    }
  }

  loadExistingData() {
    try {
      const data = fs.readFileSync(this.toolsFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {
        tools: [],
        categories: [
          { id: "productivity", name: "Productivity", description: "AI tools to boost your productivity and efficiency", icon: "⚡" },
          { id: "design", name: "Design", description: "Creative AI tools for design and visual content", icon: "🎨" },
          { id: "development", name: "Development", description: "AI-powered development and coding tools", icon: "💻" },
          { id: "marketing", name: "Marketing", description: "AI tools for marketing and business growth", icon: "📈" },
          { id: "writing", name: "Writing", description: "AI assistants for writing and content creation", icon: "✍️" },
          { id: "research", name: "Research", description: "AI tools for data analysis and research", icon: "🔬" }
        ],
        lastUpdated: new Date().toISOString(),
        totalTools: 0
      };
    }
  }

  getCategoryBreakdown() {
    const breakdown = {};
    this.newTools.forEach(tool => {
      breakdown[tool.category] = (breakdown[tool.category] || 0) + 1;
    });
    return breakdown;
  }
}

module.exports = AIToolScraper;

// Run if called directly
if (require.main === module) {
  const scraper = new AIToolScraper();
  scraper.scrapeNewTools()
    .then(() => scraper.saveUpdatedTools())
    .then((results) => {
      console.log('Scraping completed successfully!');
      console.log('Results:', results);
    })
    .catch(error => {
      console.error('Scraping failed:', error);
      process.exit(1);
    });
}