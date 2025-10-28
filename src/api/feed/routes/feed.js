'use strict';
module.exports = {
  routes: [{ method: 'GET', path: '/feed', handler: 'feed.index', config: { auth: false, policies: [] } }],
};