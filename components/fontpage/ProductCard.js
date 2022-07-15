import Image from "next/image";
import Link from "next/link";
import ProductPageContent from "../../components/productpage/ProductPageContent";
import { useState } from "react";
import client from "../../lib/shopify";
import { formatter } from "../../utils/helpers";
import ShowCurrentProduct from "./ShowCurrentProduct";

const ProductCard = ({ product }) => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  // pro
  const { handle, title, id } = product;

  const { altText, src } = product.images[0];

  const price = product.variants[0].price;

  return (
    <>
      {/* <Link key={product.id} href={`/product/${id}`}> */}

      <div onClick={handleClick}>
        <div>
          {/* 👇️ show elements on click */}
          {isShown && (
            <div>
              <ShowCurrentProduct handle={handle} />
            </div>
          )}

          {/* 👇️ show component on click */}
          {isShown && <h1></h1>}
        </div>
        <a className="group text-left">
          <div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
            <div className="relative group-hover:opacity-75 h-72">
              <Image src={src} alt={altText} layout="fill" objectFit="cover" />
            </div>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-700">
            {formatter.format(price)}
          </p>
        </a>
      </div>

      {/* </Link> */}
    </>
  );
};

// export async function getStaticProps({ handle }) {
//   const pro = await client.product.fetchByHandle(handle);

//   const dodo = JSON.parse(JSON.stringify(pro));
//   console.log(dodo);

//   return {
//     props: {
//       dodo,
//     },
//   };
// }
// export async function getServerSideProps({ handle }) {
//   console.log(handle);
//   const product = await client.product.fetch(handle);
//   return {
//     props: {
//       mark: JSON.parse(JSON.stringify(product)),
//     }, // will be passed to the page component as props
//   };
// }
// export async function getServerSideProps({ query }) {
//   const mark = await client.product.fetch(query.productId[0]);
//   console.log(mark);
//   return {
//     props: {
//       mark: JSON.parse(JSON.stringify(mark)),
//     }, // will be passed to the page component as props
//   };
// }

export default ProductCard;
