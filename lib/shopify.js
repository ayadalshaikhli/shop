

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
import Client from "shopify-buy";



// https://www.npmjs.com/package/shopify-buy
const client = Client.buildClient({
    domain: `${domain}`,
    storefrontAccessToken: `${storefrontAccessToken}`,
  });
  
  export default client;

// Create an empty checkout
const checkout = client.checkout.create().then((checkout) => {
  // Do something with the checkout
  console.log(checkout);
});

async function ShopifyData(query) {
    const URL = `https://${domain}/api/2022-07/graphql.json`;

// Doc https://shopify.dev/api/examples/storefront-api

    const options = {
        endpoint: URL,
        method: 'POST',
        headers: {
            'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query})
    }

    try{
        const data = await fetch(URL, options).then(response => {
           return  response.json();
        });
        return data;
    } catch (error) { throw new Error("Product not fetched") }} 


    export async function getProductsInCollection(){
        const query = `
        {
            collection(handle: "frontpage"){
              title
              products(first: 25){
                edges{
                  node{
                    id
                    title
                    handle
                    images(first: 5){
                      edges{
                        node{
                            originalSrc
                          altText
                          
                        }
                      }
                    }
                  }
                }
              }
            }
          }`

          const response = await ShopifyData(query);
          const allProducts = response.data.collection.products.edges ? response.data.collection.products.edges : [];

          return allProducts;

    }
 
    export async function createCheckout(id, quantity) {
      const query = `
        mutation {
          checkoutCreate(input: {
            lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
          }) {
            checkout {
              id
              webUrl
            }
          }
        }`;
    
      const response = await ShopifyData(query);
    
      const checkout = response.data.checkoutCreate.checkout
        ? response.data.checkoutCreate.checkout
        : [];
    
      return checkout;
    }



export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`;
  });

  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}