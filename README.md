# SG Recycle Website & CMS

Complete website solution for SG Recycle - Singapore's innovative recycling technology company.

## 🏗️ Project Structure

```
strona3/
├── sgrecycle-site/     # Next.js Frontend (Port 3000)
├── sgrecycle-cms/      # Strapi CMS Backend (Port 1337)
├── prompts            # Development prompts
└── SG Recycle Brand Identity (2025).txt
```

## 🚀 Features

### Frontend (Next.js 14)
- ✅ SEO-optimized with dynamic sitemap & robots.txt
- ✅ Responsive design with SG Recycle branding
- ✅ Hero section with recycling animations (GSAP)
- ✅ Impact counters with Framer Motion
- ✅ Blog listing & individual post pages
- ✅ Contact form with validation
- ✅ Production-ready build

### Backend (Strapi 5)
- ✅ Blog post management
- ✅ GraphQL & REST API
- ✅ SEO fields for each post
- ✅ Media upload for featured images
- ✅ Public API access configured

## 🎨 Brand Colors
- Eco Green: `#6CBF3F`
- Deep Blue: `#004F9E`
- Sky Blue: `#3FA9F5`
- Neutral Gray: `#D9D9D9`

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

1. **Start Strapi CMS:**
   ```bash
   cd sgrecycle-cms
   npm install
   npm run develop
   ```
   Access at: http://localhost:1337

2. **Start Next.js Frontend:**
   ```bash
   cd sgrecycle-site
   npm install
   npm run dev
   ```
   Access at: http://localhost:3000

### Environment Variables

#### Frontend (.env.local)
```
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Backend (.env)
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

## 📦 Deployment

### Railway (Development)
- Frontend: Auto-deploy from Git
- Backend: Auto-deploy from Git

### VPS (Production)
- Ubuntu 24.04
- PM2 process manager
- Nginx reverse proxy
- SSL with Let's Encrypt

## 📚 API Endpoints

### Blog Posts
- `GET /api/posts` - List all published posts
- `GET /api/posts/:slug` - Get post by slug
- `GET /graphql` - GraphQL playground

### Sample API Response
```json
{
  "data": {
    "id": 1,
    "title": "Revolutionary Plastic Bottle Recycling Technology",
    "slug": "revolutionary-plastic-bottle-recycling-technology",
    "excerpt": "Discover how SG Recycle's innovative...",
    "content": "...",
    "publishedAt": "2025-08-15T00:00:00.000Z",
    "featuredImage": {
      "url": "/uploads/featured-image.jpg"
    },
    "seo": {
      "metaTitle": "Revolutionary Plastic Recycling Technology | SG Recycle",
      "metaDescription": "Learn about SG Recycle's advanced...",
      "metaImage": {
        "url": "/uploads/og-image.jpg"
      }
    }
  }
}
```

## 📈 SEO Features
- Dynamic sitemap.xml generation
- Robots.txt configuration
- Open Graph meta tags
- Twitter Cards
- Structured data (JSON-LD)
- Canonical URLs
- Image optimization with next/image

## 🔒 Security
- CORS configured for frontend domains
- Public API access only for published posts
- Admin panel protected
- Environment variables for sensitive data

## 📱 Technologies Used

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- GSAP
- next/image optimization

### Backend
- Strapi 5.22.0
- SQLite (development)
- GraphQL plugin
- SEO plugin
- Media library

## 👥 Team
- Development: Claude + User collaboration
- Brand Identity: SG Recycle team
- Deployment: Railway + VPS options

---

**Created for SG Recycle - Reimagining Waste for a Sustainable Future** 🌱
