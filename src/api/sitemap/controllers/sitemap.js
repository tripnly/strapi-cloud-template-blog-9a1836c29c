'use strict';
const escapeXml = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
module.exports = {
  async index(ctx) {
    const FRONTEND = process.env.FRONTEND_SITE_URL || 'https://lisboacitypass.tripnly.com';
    const entries = await strapi.db.query('api::article.article').findMany({
      where: { publishedAt: { $notNull: true } },
      orderBy: { publishedAt: 'desc' },
      limit: 500,
      select: ['slug','updatedAt','publishedAt'],
    });
    const urls = entries.map(e => {
      const loc = `${FRONTEND}/blog/${e.slug}`;
      const lastmod = new Date(e.updatedAt || e.publishedAt || Date.now()).toISOString();
      return `<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`;
    });
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${escapeXml(FRONTEND + '/blog')}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
  ${urls.join('\n  ')}
</urlset>`;
    ctx.set('Content-Type','application/xml; charset=utf-8');
    ctx.body = xml;
  },
};