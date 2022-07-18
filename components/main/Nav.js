import React, { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../context/shopContext";
import MiniCart from "./MiniCart";
import { BsBag } from "react-icons/bs";
export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);

  var cartQuantity= 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });
  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex item-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a>
            <span>Sicrles</span>
          </a>
        </Link>
        <a className="text-md font-bold cursor-pointer">Cart ({cartQuantity})</a>
        <div className="nav-cart">
            <a
              className="text-md font-bold cursor-pointer"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <div className="relative">
                <BsBag size="1.5rem" />
                <div
                  style={{ fontSize: "10px", left: "10px" }}
                  className="absolute top-1 text-sm"
                >
                  {cartQuantity}
                </div>
              </div>
            </a>
          </div>
        <MiniCart cart={cart}/>
      </div>
    </header>
  );
}
