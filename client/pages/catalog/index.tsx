import CatalogPage from "@/components/index/catalog/CataLogPage";
import DefaultLayout from "@/layouts/default-layout/DefaultLayout";
import { useSEO } from "@/lib/hooks/useSeo";

export default function Page() {
  return <CatalogPage />;
}

Page.Layout = DefaultLayout;
export const getServerSideProps = async () => {
  const seo = useSEO("Danh sách sản phẩm");

  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
      })
    ),
  };
};