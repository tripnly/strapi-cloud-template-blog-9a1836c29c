// config/middlewares.js

module.exports = [
  'strapi::errors',

  // Security + CSP so Google Maps tiles/scripts work inside the Strapi Admin
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // allow outgoing API calls
          'connect-src': ["'self'", 'https:', 'http:'],
          // allow Google Maps scripts in the admin UI
          'script-src': ["'self'", "'unsafe-inline'", 'https://maps.googleapis.com'],
          // images (include Google Maps tile domains)
          'img-src': [
            "'self'", 'data:', 'blob:', 'https:', 'http:',
            'https://maps.gstatic.com', 'https://maps.googleapis.com',
            'https://khm.google.com', 'https://khm0.google.com', 'https://khm1.google.com',
            'https://khms0.google.com', 'https://khms1.google.com', 'https://khms2.google.com', 'https://khms3.google.com',
            'https://streetviewpixels-pa.googleapis.com',
            'https://market-assets.strapi.io',
          ],
          // media (video tiles, etc.)
          'media-src': [
            "'self'", 'data:', 'blob:', 'https:', 'http:',
            'https://maps.gstatic.com', 'https://maps.googleapis.com',
          ],
          // if you embed Google Maps iframes anywhere
          'frame-src': [
            "'self'", 'https://www.google.com', 'https://maps.google.com',
          ],
          // do not force upgrade (keeps http allowed when needed)
          upgradeInsecureRequests: null,
        },
      },
    },
  },

  // CORS: allow your SPA in dev and prod
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:5173',
        'http://localhost:5175',
        'https://lisboncard-tripnly.web.app',       // Firebase Hosting
        'https://lisboacitypass.tripnly.com',       // Custom domain
        'https://lisboncard-tripnly.firebaseapp.com', // Optional fallback
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      // Be explicit so preflight accepts Authorization and common browser headers
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
      credentials: true,
      keepHeaderOnError: true,
    },
  },

  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];