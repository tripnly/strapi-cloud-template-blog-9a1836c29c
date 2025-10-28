'use strict';
const pick = (o, ks) => Object.fromEntries(ks.map(k => [k, o?.[k]]));
module.exports = {
  async index(ctx) {
    const FRONTEND = process.env.FRONTEND_SITE_URL || 'https://lisboacitypass.tripnly.com';
    const STRAPI_BASE = process.env.STRAPI_PUBLIC_URL || process.env.STRAPI_ADMIN_BACKEND_URL || '';

    const entries = await strapi.db.query('api::article.article').findMany({
      where: { publishedAt: { $notNull: true } },
      orderBy: { publishedAt: 'desc' },
      limit: 50,
      populate: { cover: true, author: true, category: true },
      select: ['title','slug','description','publishedAt','address','lat','lng'],
    });

    const feed = entries.map(e => {
      const coverUrl = e?.cover?.url
        || e?.cover?.formats?.large?.url
        || e?.cover?.formats?.medium?.url
        || e?.cover?.formats?.small?.url
        || '';
      const image = coverUrl ? (coverUrl.startsWith('http') ? coverUrl : `${STRAPI_BASE}${coverUrl}`) : '';
      return {
        ...pick(e, ['title','slug','description']),
        url: `${FRONTEND}/blog/${e.slug}`,
        publishedAt: e.publishedAt,
        author: e.author?.name || 'Tripnly',
        category: e.category?.name || 'General',
        address: e.address || '',
        lat: e.lat != null ? Number(e.lat) : null,
        lng: e.lng != null ? Number(e.lng) : null,
        image,
      };
    });

    ctx.body = { feed, count: feed.length, site: FRONTEND, generatedAt: new Date().toISOString() };
  },
};