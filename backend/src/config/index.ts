export const config = {
  JWKS_URI: process.env.JWKS_URI || '',
  JWT_ISSUER: process.env.JWT_ISSUER || '',
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || '',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost:5432/bootstrap',
  PORT: parseInt(process.env.PORT || '3000', 10),
};
