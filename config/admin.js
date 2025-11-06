// config/admin.js
module.exports = ({ env }) => ({
  // Admin panel session JWT (for admin login sessions)
  auth: {
    // Prefer ADMIN_JWT_SECRET, else fall back to Cloud default JWT_SECRET
    secret: env('ADMIN_JWT_SECRET', env('JWT_SECRET', 'dev-admin-jwt-secret-change-me')),
  },

  // Required for generating/verifying Admin API tokens (v5)
  apiToken: {
    // Prefer ADMIN_API_TOKEN_SALT; if Cloud only exposes API_TOKEN_SALT (read-only), use that
    salt: env('ADMIN_API_TOKEN_SALT', env('API_TOKEN_SALT', 'dev-admin-api-token-salt-change-me')),
  },

  // Optional: used by the transfer feature (content transfer tokens)
  transfer: {
    token: {
      // Prefer TRANSFER_TOKEN_SALT, else dev fallback
      salt: env('TRANSFER_TOKEN_SALT', 'dev-transfer-token-salt-change-me'),
    },
  },

  // Optional flags
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
