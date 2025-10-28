'use strict';
const escapeXml = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
module.exports = {
  async index(ctx) {
    const FRONTEND = process.env.FRONTEND_SITE_URL || 'https://lisboacitypass.tripnly.com';
    const STRAPI_BASE = process.env.STRAPI_PUBLIC_URL || process.env.STRAPI_ADMIN_BACKEND_URL || '';
    const siteTitle = 'Tripnly – Lisboa City Pass Blog';
    const siteLink  = `${FRONTEND}/blog`;
    const siteDesc  = 'Travel tips, itineraries, and hidden gems in Lisbon.';

    const entries = await strapi.db.query('api::article.article').findMany({
      where: { publishedAt: { $notNull: true } },
      orderBy: { publishedAt: 'desc' },
      limit: 50,
      populate: { cover: true, author: true, category: true },
      select: ['title','slug','description','publishedAt','updatedAt','address','lat','lng'],
    });

    const items = entries.map(e => {
      const url = `${FRONTEND}/blog/${e.slug}`;
      const date = new Date(e.publishedAt || Date.now()).toUTCString();
      const coverUrl = e?.cover?.url || e?.cover?.formats?.large?.url || e?.cover?.formats?.medium?.url || e?.cover?.formats?.small?.url || '';
      const absCover = coverUrl ? (coverUrl.startsWith('http') ? coverUrl : `${STRAPI_BASE}${coverUrl}`) : '';
      return `
  <item>
    <title>${escapeXml(e.title || '')}</title>
    <link>${escapeXml(url)}</link>
    <guid>${escapeXml(url)}</guid>
    <pubDate>${date}</pubDate>
    <description>${escapeXml(e.description || '')}</description>
    ${absCover ? `<enclosure url="${escapeXml(absCover)}" type="image/jpeg" />` : ''}
  </item>`;
    }).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(siteTitle)}</title>
  <link>${escapeXml(siteLink)}</link>
  <description>${escapeXml(siteDesc)}</description>
  <language>en</language>
  ${items}
</channel>
</rss>`;
    ctx.set('Content-Type','application/rss+xml; charset=utf-8');
    ctx.body = rss;
  },
};