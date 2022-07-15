import React from "react";
import Link from "next/link";

function Nav() {
  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex item-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a>
            <span>Sicrles</span>
          </a>
        </Link>
        <a className="text-md font-bold cursor-pointer">Cart</a>
      </div>
    </header>
  );
}

export default Nav;
