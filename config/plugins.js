// config/plugins.js
module.exports = ({ env }) => ({
  'google-maps': {
    enabled: true,
    config: {
      apiKey: env('GOOGLE_MAPS_API_KEY'), // set this in Cloud env vars
    },
  },
});
