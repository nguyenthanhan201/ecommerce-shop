import { updateViewsProductAPI } from "api/productServices";
import { numberWithCommans } from "lib/helpers/parser";
import { Product } from "lib/redux/slices/products";
import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Img from "./Img";

const ProductViewModel = lazy(() => import("./ProductViewModel"));

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [sourceURL, setSourceURL] = useState(product.image01);
  const [open, setOpen] = useState(false);

  const handleIncreaseViewsProduct = () => {
    if (!product._id) return;
    updateViewsProductAPI(product._id).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="product-card">
      <div className="container-product-card">
        <ul className="thumb">
          <li className="child-shoes">
            <img
              src={product.image01}
              alt="img01"
              onClick={() => setSourceURL(product.image01)}
              loading="lazy"
              height="80%"
              width="80%"
            />
          </li>
          <li className="child-shoes">
            <img
              src={product.image02}
              alt="img02"
              onClick={() => setSourceURL(product.image02)}
              loading="lazy"
              height="80%"
              width="80%"
            />
          </li>
        </ul>
        <div className="imgBox">
          <h2>{product.title}</h2>
          <Link
            to={`/catalog/${product.slug}`}
            state={{
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
            }}
            onClick={handleIncreaseViewsProduct}
          >
            <Img src={sourceURL} alt="imgPreview" className="shoess" />
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
