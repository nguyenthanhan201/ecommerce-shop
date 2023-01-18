import CartPage from "@/components/index/cart/CartPage";
import DefaultLayout from "@/layouts/default-layout/DefaultLayout";
import { useSEO } from "@/lib/hooks/useSeo";

const Page = () => {
  return <CartPage />;
};

export default Page;
Page.Layout = DefaultLayout;

export const getServerSideProps = async () => {
  const seo = useSEO("Giỏ hàng");

  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
      })
    ),
  };
};
