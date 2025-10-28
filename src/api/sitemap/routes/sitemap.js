'use strict';
module.exports = {
  routes: [{ method: 'GET', path: '/sitemap.xml', handler: 'sitemap.index', config: { auth: false, policies: [] } }],
};