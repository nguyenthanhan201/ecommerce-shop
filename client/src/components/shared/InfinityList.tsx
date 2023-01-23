import { Product } from "@/lib/redux/types/product.type";
import { useEffect, useRef, useState } from "react";

import Grid from "./Grid";
import ProductCard from "./ProductCard";

type InfinityListProps = {
  data: Product[];
};

const InfinityList = (props: InfinityListProps) => {
  const perLoad = 6;
  const listRef = useRef<any>(null);

  const [data, setData] = useState<any[]>([]);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(props.data.slice(0, perLoad));
    setIndex(1);
  }, [props.data]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          console.log("bottom reach");
          setLoad(true);
        }
      }
    });
    return () => window.removeEventListener("scroll", () => {});
  }, [listRef]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad + index;
        const end = start + perLoad;

        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data.map((item: any) => (
          <ProductCard key={Math.random()} product={item} />
        ))}
      </Grid>
    </div>
  );
};

export default InfinityList;
