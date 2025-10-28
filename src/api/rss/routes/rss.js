'use strict';
module.exports = {
  routes: [{ method: 'GET', path: '/rss.xml', handler: 'rss.index', config: { auth: false, policies: [] } }],
};