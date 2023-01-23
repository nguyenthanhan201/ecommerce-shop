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
  // useEffect(() => {
  //   if (window.Worker) {
  //     getData.postMessage(processList.getData);
  //   }
  // }, [getData]);

  // useEffect(() => {
  //   if (window.Worker) {
  //     getData.onmessage = (e: MessageEvent) => {
  //       startTransition(() => setProducts(e.data));
  //     };
  //   }
  // }, [getData]);
  return (
    <>
      {/* {hero slider} */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={false}
        timeOut={1000}
      />
      {/* {end hero slider} */}
      {/* policy section */}
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
      {/* end policy section */}

      {/* best selling section */}
      <Section>
        <SectionTitle>top sản phẩm bản chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {products &&
              products.map((item: Product) => {
                // console.log("👌 ~ products", products);
                if (!item.image01) return null;
                return <ProductCard key={item.title} product={item} />;
              })}
          </Grid>
        </SectionBody>
      </Section>
      {/* end best selling section */}

      {/* new arrival section */}
      {/* <Section>
          <SectionTitle>sản phẩm mới</SectionTitle>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {productData
                .getProducts(8)
                .concat(products)
                .map((item) => {
                  if (!item.title) return null;
                  return (
                    <ProductCard
                      key={item.title}
                      img01={item.image01}
                      img02={item.image02}
                      name={item.title}
                      price={Number(item.price)}
                      slug={item.slug}
                    />
                  );
                })}
            </Grid>
          </SectionBody>
        </Section> */}
      {/* end new arrival section */}

      {/* banner */}
      <Section>
        <SectionBody>
          {/* <Link to="/catalog"> */}
          {/* <img src={banner} alt="" /> */}
          <SlideBanner />
          {/* </Link> */}
        </SectionBody>
      </Section>
      {/* end banner */}

      {/* popular product */}
      {/* <Section>
            <SectionTitle>phổ biến</SectionTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {productData.getProducts(12).map((item) => (
                  <ProductCard key={item.title} product={item as any} />
                ))}
              </Grid>
            </SectionBody>
          </Section> */}
      {/* end popular product */}
    </>
  );
};
export default memo(HomePage);
