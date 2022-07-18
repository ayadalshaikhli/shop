import "tailwindcss/tailwind.css";
import Layout from "../components/main/Layout";

import { useRouter } from "next/router";
import ShopProvider from "../context/shopContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ShopProvider>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </ShopProvider>
  );
}

export default MyApp;
