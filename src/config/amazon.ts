export const amazonConfig = {
  // These should be moved to environment variables
  MARKETPLACE_ID: process.env.NEXT_PUBLIC_AMAZON_MARKETPLACE_ID,
  SELLER_ID: process.env.NEXT_PUBLIC_AMAZON_SELLER_ID,
  ACCESS_KEY: process.env.AMAZON_ACCESS_KEY,
  SECRET_KEY: process.env.AMAZON_SECRET_KEY,
  ROLE_ARN: process.env.AMAZON_ROLE_ARN,
  APP_ID: process.env.AMAZON_APP_ID,
  AWS_REGION: process.env.AMAZON_AWS_REGION || 'us-east-1',
  // Add other marketplace-specific configurations here
  endpoints: {
    sandbox: 'https://sandbox.sellingpartnerapi-na.amazon.com',
    production: 'https://sellingpartnerapi-na.amazon.com',
  }
}
