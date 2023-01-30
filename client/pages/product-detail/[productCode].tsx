import ProductDetailPage from "@/components/index/product-detail/ProductDetailPage";
import DefaultLayout from "@/layouts/default-layout/DefaultLayout";
import { useSEO } from "@/lib/hooks/useSeo";
import { NextPageContext } from "next";

const Page = ({ query }: any) => {
  return <ProductDetailPage product={query} />;
};

export default Page;
Page.Layout = DefaultLayout;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const seo = useSEO(String(query.title), {
    description: String(query.description),
    image: String(query.image01),
    keyword: "yolo",
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
        query,
      })
    ),
  };
};