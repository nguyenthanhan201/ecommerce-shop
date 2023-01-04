import React from "react";
import { useLocation } from "react-router-dom";
import Helmet from "../components/shared/Helmet";
import ProductView from "../components/shared/ProductView/ProductView";
import Section, { SectionBody } from "../components/shared/Section";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state;

  // const relatedProducts = productData.getProducts(8);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title={product.title}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      {/* <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section> */}
    </Helmet>
  );
};

export default ProductDetail;
