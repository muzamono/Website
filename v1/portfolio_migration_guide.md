# Portfolio Website Migration Guide: GitHub Pages to Next.js + AWS

## Phase 1: Development Environment Setup

### Prerequisites
```bash
# Install Node.js (LTS version)
# Download from nodejs.org or use package manager
node --version  # Should be 18+ or 20+
npm --version
```

### Project Initialization
```bash
# Create new Next.js project
npx create-next-app@latest my-portfolio
cd my-portfolio

# Install additional dependencies
npm install gray-matter remark remark-html date-fns
npm install -D @tailwindcss/typography
```

## Phase 2: Project Structure

```
my-portfolio/
├── public/
│   ├── images/
│   │   ├── projects/
│   │   └── gallery/
│   └── favicon.ico
├── content/
│   ├── posts/
│   │   ├── my-first-post.md
│   │   └── data-pipeline-project.md
│   └── projects/
│       └── etl-dashboard.md
├── components/
│   ├── Layout.js
│   ├── BlogCard.js
│   ├── ProjectCard.js
│   └── PhotoGallery.js
├── pages/
│   ├── index.js          # Homepage
│   ├── blog/
│   │   ├── index.js      # Blog listing
│   │   └── [slug].js     # Individual blog posts
│   ├── projects/
│   │   ├── index.js      # Projects portfolio
│   │   └── [slug].js     # Project details
│   ├── gallery.js        # Photo gallery
│   └── api/              # API routes (if needed)
└── lib/
    └── posts.js          # Utility functions for content
```

## Phase 3: Content Management Setup

### Markdown Blog Posts
Create `content/posts/my-first-post.md`:
```markdown
---
title: 'My Data Engineering Journey'
date: '2024-01-15'
excerpt: 'How I built my first ETL pipeline'
coverImage: '/images/etl-diagram.jpg'
tags: ['data-engineering', 'python', 'aws']
---

# My Data Engineering Journey

Your blog content goes here with **markdown** formatting.

## Code Examples
```python
def process_data(df):
    return df.groupby('category').sum()
```

Images: ![ETL Pipeline](/images/projects/etl-pipeline.png)
```

### Content Management Utilities
Create `lib/posts.js`:
```javascript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      content,
      ...data,
    };
  });
  
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    content,
    ...data,
  };
}
```

## Phase 4: AWS Hosting Setup

### S3 Bucket Configuration
```bash
# AWS CLI commands
aws s3 mb s3://your-portfolio-bucket-name
aws s3 website s3://your-portfolio-bucket-name --index-document index.html --error-document error.html
```

### CloudFront Distribution
1. Go to AWS CloudFront Console
2. Create distribution
3. Origin domain: your-portfolio-bucket-name.s3-website-region.amazonaws.com
4. Default root object: index.html
5. Error pages: 404 -> /404.html

### Build and Deploy Script
Create `package.json` scripts:
```json
{
  "scripts": {
    "build": "next build && next export",
    "deploy": "npm run build && aws s3 sync out/ s3://your-portfolio-bucket-name --delete",
    "dev": "next dev"
  }
}
```

## Phase 5: Content Management Interface

### Option A: Forestry CMS (Recommended)
1. Connect your GitHub repository to Forestry
2. Configure content models for posts, projects
3. Write/edit content through web interface
4. Auto-deploy on content changes

### Option B: Decap CMS (Free, Self-hosted)
Create `public/admin/config.yml`:
```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/images"
public_folder: "/images"

collections:
  - name: "posts"
    label: "Blog Posts"
    folder: "content/posts"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Excerpt", name: "excerpt", widget: "text"}
      - {label: "Cover Image", name: "coverImage", widget: "image"}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Body", name: "body", widget: "markdown"}
```

## Phase 6: Migration Strategy

### Step 1: Content Migration
1. Export your current GitHub Pages content
2. Convert HTML to Markdown format
3. Organize images in `/public/images/` folder
4. Create frontmatter for each post

### Step 2: Feature Implementation Order
1. ✅ Basic Next.js setup
2. ✅ Homepage with portfolio overview
3. ✅ Blog listing and individual post pages
4. ✅ Project showcase pages
5. ✅ Photo gallery component
6. ✅ CMS integration
7. ✅ AWS deployment

### Step 3: Testing
```bash
# Local development
npm run dev  # Visit http://localhost:3000

# Build for production
npm run build
npm run deploy  # Deploy to AWS S3
```

## Phase 7: Advanced Features (Later)

### Image Optimization
- Next.js Image component for automatic optimization
- WebP format conversion
- Responsive images

### SEO & Analytics
- Next.js Head component for meta tags
- Google Analytics integration
- Open Graph tags for social sharing

### Performance
- Static generation for all content
- CDN distribution through CloudFront
- Image lazy loading

## Monthly Costs Estimate

- **S3 Storage**: $1-3/month
- **CloudFront**: $1-5/month
- **Route 53** (custom domain): $0.50/month
- **Total**: ~$3-9/month

## Content Management Workflow (After Setup)

1. **New blog post**: Login to CMS → Write post → Publish
2. **Upload photos**: Drag & drop in CMS interface
3. **Update projects**: Edit markdown files through CMS
4. **Deploy**: Automatic on content changes

This setup gives you WordPress-like ease of content management with modern performance and much lower costs than traditional hosting.
