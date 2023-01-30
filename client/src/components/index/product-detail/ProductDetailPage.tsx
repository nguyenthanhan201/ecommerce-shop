import ProductView from "@/components/shared/ProductView/ProductView";
import Section, { SectionBody } from "@/components/shared/Section";

const ProductDetailPage = ({ product }: any) => {
  return (
    <Section>
      <SectionBody>
        <ProductView product={product} />
      </SectionBody>
    </Section>
  );
};

export default ProductDetailPage;
