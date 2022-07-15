import { useEffect, useState } from "react";
import ProductList from "../components/fontpage/ProductList";

import client, { getProductsInCollection } from "../lib/shopify"

export default function Home(props) {

  const collections = props.collections;
  const products = props.products;

  const [homePage, setHomePage] = useState({});
  const [paint, setPaint] = useState({});
  useEffect(() => {
    collections.forEach(collection => {
      if(collection.title === 'Home Page'){
        setHomePage(collection);
      }
      if(collection.title === 'Paint'){
        setPaint(collection);
      }
    })

  })





  return (
    <div className="">

     <ProductList products={products} collections={collections} />

    </div>
  )
}




// https://nextjs.org/docs/basic-features/data-fetching/get-static-props
// NextJs Data Fetching
export const getServerSideProps = async (context) => {
  const products = await client.product.fetchAll();
  const collections = await client.collection.fetchAll();
  const infos = await client.shop.fetchInfo();
  const policies = await client.shop.fetchPolicies();

  return {
    props: {
      infos: JSON.parse(JSON.stringify(infos)),
      policies: JSON.parse(JSON.stringify(policies)),
      products: JSON.parse(JSON.stringify(products)),
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
};
