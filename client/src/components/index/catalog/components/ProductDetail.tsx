import ProductView from "@/components/shared/ProductView/ProductView";
import Section, { SectionBody } from "@/components/shared/Section";
import { Product } from "@/lib/redux/slices/products";
import { useRouter } from "next/router";

const ProductDetailPage = () => {
  const router = useRouter();
  const product: any = router.query;

  return (
    <Section>
      <SectionBody>{<ProductView product={product} />}</SectionBody>
    </Section>
  );
};

export default ProductDetailPage;
