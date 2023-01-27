import Grid from "@/components/shared/Grid";
import HeroSlider from "@/components/shared/HeroSlider";
import PolicyCard from "@/components/shared/PolicyCard";
import Section, {
  SectionBody,
  SectionTitle,
} from "@/components/shared/Section";
import { Product } from "@/lib/redux/types/product.type";
import { heroSliderData, policy } from "@/utils/index";
import dynamic from "next/dynamic";
import { memo } from "react";
// import { ScrollContainer } from "react-scroll-motion";

const ProductCard = dynamic(import("@/components/shared/ProductCard"), {
  ssr: false,
});
const SlideBanner = dynamic(import("@/components/shared/SlideBanner"), {
  ssr: false,
});

const HomePage = ({ products }: any) => {
  return (
    <>
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={false}
        timeOut={1000}
      />
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <PolicyCard
                key={index}
                name={item.name}
                description={item.description}
                icon={item.icon}
              ></PolicyCard>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>top sản phẩm bản chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {products.length > 0 &&
              products.map((item: Product) => {
                // console.log("👌 ~ products", products);
                if (!item.image01) return null;
                return <ProductCard key={item.title} product={item} />;
              })}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <SlideBanner />
        </SectionBody>
      </Section>
    </>
  );
};
export default memo(HomePage);
