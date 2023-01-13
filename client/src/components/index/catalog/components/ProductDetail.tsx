import ProductView from "@/components/shared/ProductView/ProductView";
import Section, { SectionBody } from "@/components/shared/Section";
import { useRouter } from "next/router";

const ProductDetailPage = () => {
  const router = useRouter();
  const product = router.query;

  return (
    <Section>
      <SectionBody>{<ProductView product={product} />}</SectionBody>
    </Section>
  );
};

export default ProductDetailPage;
