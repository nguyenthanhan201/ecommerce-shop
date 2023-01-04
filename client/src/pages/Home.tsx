import Loading from "components/shared/Loading/Loading";
import { Product } from "lib/redux/slices/products";
import { processList } from "longProcesses/enums";
import { memo, useEffect, useMemo, useState } from "react";
import { ScrollContainer } from "react-scroll-motion";
import heroSliderData from "../assets/fake-data/hero-slider";
import policy from "../assets/fake-data/policy";
import Grid from "../components/shared/Grid";
import Helmet from "../components/shared/Helmet";
import HeroSlider from "../components/shared/HeroSlider";
import PolicyCard from "../components/shared/PolicyCard";
import ProductCard from "../components/shared/ProductCard";
import Section, {
  SectionBody,
  SectionTitle,
} from "../components/shared/Section";
import SlideBanner from "../components/shared/SlideBanner";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const getData: Worker = useMemo(
    () =>
      new Worker(
        new URL("../longProcesses/getDataProducts.ts", import.meta.url)
      ),
    []
  );

  useEffect(() => {
    if (window.Worker) {
      getData.postMessage(processList.getData);
      setLoading(false);
    }
  }, [getData]);

  useEffect(() => {
    if (window.Worker) {
      getData.onmessage = (e: MessageEvent) => {
        setProducts(e.data);
      };
    }
  }, [getData]);

  return (
    <Helmet title="Trang chủ">
      <ScrollContainer>
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
            {loading ? (
              <Loading />
            ) : (
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {products.map((item: Product) => {
                  // console.log("👌 ~ products", products);
                  if (!item.image01) return null;
                  return <ProductCard key={item.title} product={item} />;
                })}
              </Grid>
            )}
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
      </ScrollContainer>
    </Helmet>
  );
};

export default memo(Home);
