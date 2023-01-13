import { updateViewsProductAPI } from "api/productServices";
import { numberWithCommans } from "lib/helpers/parser";
import { Product } from "lib/redux/slices/products";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import Button from "./Button";
import Img from "./Img/Img";

const ProductViewModel = dynamic(() => import("./ProductViewModel"));

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [sourceURL, setSourceURL] = useState(product.image01);
  const [open, setOpen] = useState(false);

  const childImg = useMemo(() => {
    return [product.image01, product.image02];
  }, [product]);

  const handleIncreaseViewsProduct = () => {
    if (!product._id) return;
    updateViewsProductAPI(product._id);
  };

  return (
    <div className="product-card">
      <div className="container-product-card">
        <ul className="thumb">
          {childImg.map((child, index) => (
            <li className="child-shoes" key={index}>
              <div className="w-[80%] h-[80%] relative">
                <Img
                  src={child}
                  alt={child}
                  onClick={() => setSourceURL(child)}
                  loading="lazy"
                  layout="fill"
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="imgBox">
          <h2>{product.title}</h2>
          <Link
            href={{
              pathname: `/product-detail/${product.slug}`,
              query: {
                _id: product._id,
                title: product.title,
                image01: product.image01,
                image02: product.image02,
                price: product.price,
                slug: product.slug,
                size: product.size,
                categorySlug: product.categorySlug,
                colors: product.colors,
                description: product.description,
              },
            }}
            shallow={true}
            prefetch={false}
            onClick={handleIncreaseViewsProduct}
          >
            <img src={sourceURL} alt={product.title} className="shoess" />
          </Link>
          <ul className="size">
            <span>Giá</span>
            <li>{numberWithCommans(Number(product.price))}&#x00111;</li>
            {/* <li>
              <del>{numberWithCommans(399000)} &#x00111;</del>
            </li> */}
          </ul>
          <Button
            size="sm"
            icon="bx bx-cart"
            animate={true}
            onClick={() => setOpen(true)}
          >
            chọn mua
          </Button>
        </div>
      </div>
      <ProductViewModel product={product} setOpen={setOpen} open={open} />
    </div>
  );
};

export default ProductCard;
