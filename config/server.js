// config/server.js
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [
      'dev_key_1_replace_me',
      'dev_key_2_replace_me',
      'dev_key_3_replace_me',
      'dev_key_4_replace_me',
    ]),
  },
  webhooks: { populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false) },
});