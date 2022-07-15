import ProductPageContent from "../../components/productpage/ProductPageContent";
import client from "../../lib/shopify";



const Post = ({product}) =>{
    
    return (
        <ProductPageContent product={ product}/>
    )
}




export async function getServerSideProps({ query }) {
  
  const product = await client.product.fetch(query.productId[0]);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }, // will be passed to the page component as props
  };
}

  export default Post;