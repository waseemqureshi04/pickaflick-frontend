import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DOMAIN = 'https://pickaflick.live';
// Output to build folder
const OUTPUT_FILE = path.resolve(__dirname, '../dist/sitemap.xml');

// All routes based on user request
const routes = [
  '/',
  '/homepage',
  '/login',
  '/register',
  '/reset-password',
  '/home',
  '/studio',
  '/gpt',
  '/privacy-policy',
  '/terms-of-service',
];

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split('T')[0];

const generateSitemap = async () => {
  console.log('Generating sitemap...');

  const today = formatDate(new Date());

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  routes.forEach(route => {
    // Higher priority for main landing pages
    let priority = '0.8';
    if (route === '/' || route === '/homepage') {
        priority = '1.0';
    } else if (['/privacy-policy', '/terms-of-service'].includes(route)) {
        priority = '0.5';
    }

    sitemapContent += `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  });

  sitemapContent += `</urlset>`;

  try {
    // Ensure build directory exists
    const buildDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }
    
    fs.writeFileSync(OUTPUT_FILE, sitemapContent);
    console.log(`Sitemap generated successfully at ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error writing sitemap:', error);
    process.exit(1);
  }
};

generateSitemap();
