import HomePage from "@/components/index/home/HomePage";
import DefaultLayout from "@/layouts/default-layout/DefaultLayout";
import { useSEO } from "@/lib/hooks/useSeo";

export default function Page() {
  return <HomePage />;
}
Page.Layout = DefaultLayout;

export async function getServerSideProps() {
  const seo = useSEO("Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi", {
    description: "Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi",
    image: "/images/Logo-2.png",
    keyword: "yolo",
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
      })
    ),
  };
}

// <!-- HTML Meta Tags -->
// <title>undefined</title>
// <meta name="description" content="undefined">

// <!-- Facebook Meta Tags -->
// <meta property="og:url" content="https://ecommerce-shop-fe.vercel.app/">
// <meta property="og:type" content="website">
// <meta property="og:title" content="undefined">
// <meta property="og:description" content="undefined">
// <meta property="og:image" content="">

// <!-- Twitter Meta Tags -->
// <meta name="twitter:card" content="summary_large_image">
// <meta property="twitter:domain" content="ecommerce-shop-fe.vercel.app">
// <meta property="twitter:url" content="https://ecommerce-shop-fe.vercel.app/">
// <meta name="twitter:title" content="undefined">
// <meta name="twitter:description" content="undefined">
// <meta name="twitter:image" content="">

// <!-- Meta Tags Generated via https://www.opengraph.xyz -->
