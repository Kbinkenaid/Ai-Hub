# AI Innovation Hub

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/kbinkenaids-projects/v0-ai-hub)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/tjWwSuFVaK1)

A platform that automatically discovers, categorizes, and showcases the most innovative AI-powered tools and solutions from across the web.

## 🤖 Automated Features

This project includes a complete automation system that:

- **🔍 Discovers new AI tools** - Automatically crawls .ai/.io domains and AI directories weekly
- **🚫 Prevents duplicates** - Advanced deduplication using URL, name, and description similarity
- **🏷️ Smart categorization** - AI-powered categorization into productivity, design, development, etc.
- **📧 Email notifications** - Weekly summary emails for the developer
- **🚀 Auto-deployment** - Pushes updates to GitHub and deploys to Vercel automatically

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Automation**: GitHub Actions, Node.js scraping
- **Data**: JSON-based tool storage
- **Deployment**: Vercel
- **Notifications**: Nodemailer with SMTP

## 📁 Project Structure

```
├── data/
│   └── tools.json          # AI tools database
├── scripts/
│   ├── scraper.js          # Web scraping automation
│   └── email-notifier.js   # Email notification system
├── .github/workflows/
│   └── weekly-update.yml   # GitHub Actions automation
├── components/
│   ├── tools-grid.tsx      # Display AI tools grid
│   └── ...                 # Other UI components
└── app/
    └── ...                 # Next.js app structure
```

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Setting Up Automation

1. **GitHub Secrets** (Required for automation):
   ```
   EMAIL_TO=kbinkenaid@gmail.com
   EMAIL_FROM=noreply@yourdomain.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   ```

2. **Manual Testing**:
   ```bash
   # Test the scraper
   node scripts/scraper.js
   
   # Test email notifications
   node scripts/email-notifier.js
   ```

3. **GitHub Actions**:
   - Runs automatically every Monday at 9:00 AM UTC
   - Can be triggered manually via GitHub Actions tab
   - Sends email notifications on success/failure

## 📊 How It Works

### Weekly Automation Process

1. **Discovery Phase**
   - Scrapes ProductHunt AI category
   - Crawls AI tool directories
   - Monitors RSS feeds for new tools

2. **Processing Phase**
   - Checks for duplicates against existing database
   - Categorizes tools using keyword analysis
   - Extracts relevant tags and metadata

3. **Integration Phase**
   - Updates `data/tools.json` with new findings
   - Commits changes to GitHub repository
   - Triggers Vercel deployment

4. **Notification Phase**
   - Sends developer email with summary
   - Includes breakdown by category
   - Provides links to view changes

### v0.dev Integration

This project seamlessly integrates with v0.dev:

1. **UI Design**: Continue using [v0.dev](https://v0.dev/chat/projects/tjWwSuFVaK1) for design changes
2. **Data Updates**: Automation handles content updates automatically
3. **Deployment**: Both design changes and data updates deploy via Vercel
4. **No Conflicts**: v0 handles UI, automation handles data - perfect harmony!

### Email Notifications

You'll receive beautifully formatted emails containing:

- 📈 Number of new tools discovered
- 📂 Category breakdown  
- 🔗 Links to GitHub commits and live site
- ⏰ Next scheduled update
- 🚨 Error alerts if automation fails

## 🎨 Features

- **Responsive Design** - Works on all devices
- **Dark/Light Mode** - Theme toggle support
- **Search & Filter** - Find tools by category, name, or description
- **Real-time Updates** - Automatic weekly content updates
- **SEO Optimized** - Built for search engine visibility

## 🔧 Customization

### Adding New Data Sources

Edit `scripts/scraper.js` to add new websites:

```javascript
const newSources = [
  'https://example-ai-directory.com',
  'https://another-ai-site.com/tools'
]
```

### Modifying Categories

Update the categories in `data/tools.json`:

```json
{
  "categories": [
    {
      "id": "your-category",
      "name": "Your Category", 
      "description": "Description here",
      "icon": "🔧"
    }
  ]
}
```

## 📧 Email Configuration

The system supports multiple email providers:

- **Gmail**: Use App Passwords for authentication
- **SendGrid**: Professional email delivery service
- **SMTP**: Any standard SMTP provider

## 🚀 Deployment

### Vercel (Current Setup)

Your project is live at: **[https://vercel.com/kbinkenaids-projects/v0-ai-hub](https://vercel.com/kbinkenaids-projects/v0-ai-hub)**

1. v0.dev changes auto-deploy via Vercel
2. GitHub Actions automation also triggers deployments
3. Both work together seamlessly

## 🔒 Security

- Email credentials stored in GitHub Secrets
- No sensitive data in codebase
- Rate limiting on scraping requests
- Secure HTTPS connections only

---

**Note**: This automation system is designed to be completely hands-off. Once configured, it will discover, categorize, and publish new AI tools automatically every week, keeping your site fresh and up-to-date without any manual intervention while maintaining full compatibility with your v0.dev workflow.
