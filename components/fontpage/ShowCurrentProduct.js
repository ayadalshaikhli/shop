import client from "../../lib/shopify";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";

const ShowCurrentProduct = ({ handle }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    client.product.fetchByHandle(handle).then(setProduct);
  }, []);

  if (!product) {
    return "Loading...";
  }
  const productt = product.attrs;

  const images = [];

  productt.images.map((image, i) => {
    images.push(
      <SwiperSlide key={`slide-${i}`}>
        <Image
          src={image.src}
          alt={image.altText}
          width={"400px"}
          height={"300px"}
        />
      </SwiperSlide>
    );
  });

  return (
    <div
      id="project-toggle"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "80vh",

        zIndex: "1",
      }}
      className=" bg-blue-500 rounded-md  flex flex-col  justify-center items-center space-y-8 md:flex-col md:items-center md:space-y-5 md:justify-start md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto z-50 "
    >
      <button className=" absolute top-0 right-5 text-3xl" onClick={() => {}}>
        X
      </button>
      <div className="w-11/12 sticky max-w-md border bg-blue-500 border-blue-600 rounded-2xl overflow-hidden shadow-lg md:w-64 pt-10 mt-2">
        <div className="relative h-full w-full">
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            direction={"vertical"}
            pagination={{ clickable: true }}
            spaceBetween={30}
            mousewheel={{ mousewheel: true }}
            className="h-64  "
            loop="true"
          >
            {images}
          </Swiper>
        </div>
      </div>
      <div>
        <ProductForm product={productt} />
      </div>
    </div>
  );
};

export default ShowCurrentProduct;
