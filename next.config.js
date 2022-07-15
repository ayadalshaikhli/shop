module.exports = {
  // Next.js can be configured to use other locales by default.
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
  },

  // Next.js server configuration to pull Images from Shopify
  images: {
    domains: ['cdn.shopify.com']
  }
}