

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;
import Client from "shopify-buy";



// https://www.npmjs.com/package/shopify-buy
const client = Client.buildClient({
    domain: `${domain}`,
    storefrontAccessToken: `${storefrontAccessToken}`,
  });
  
  export default client;



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
 
