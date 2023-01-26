import { Product } from "@/lib/redux/types/product.type";
import { ProductServices } from "@/lib/repo/product.repo";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { getSalePrice, numberWithCommans } from "lib/helpers/parser";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import Img from "./Img/Img";

const ProductViewModel = dynamic(() => import("./ProductViewModel"), {
  ssr: false,
});

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [sourceURL, setSourceURL] = useState(product.image01);
  const [open, setOpen] = useState(false);

  const handleIncreaseViewsProduct = () => {
    if (!product._id) return;
    ProductServices.updateViewsProduct(product._id);
  };

  return (
    <div className="product-card">
      <div className="container-product-card">
        <ul className="thumb">
          {[product.image01, product.image02].map((child, index) => (
            <li className="child-shoes" key={index}>
              <div>
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
                stock: product.stock,
                image01: product.image01,
                image02: product.image02,
                price: product.price,
                slug: product.slug,
                size: product.size,
                categorySlug: product.categorySlug,
                colors: product.colors,
                description: product.description,
                discount: product.discount,
                sold: product.sold,
              },
            }}
            onClick={handleIncreaseViewsProduct}
            className="shoess"
          >
            <Img src={sourceURL} alt={product.title} layout="fill" />
          </Link>
          <div className="size">
            <span>Giá</span>
            {product.discount ? (
              <>
                <p>
                  {numberWithCommans(
                    getSalePrice(product.price, product.discount)
                  )}
                </p>
                <del>{numberWithCommans(Number(product.price))}</del>
              </>
            ) : (
              <p>{numberWithCommans(Number(product.price))}</p>
            )}
          </div>
          <Button
            size="sm"
            icon={<ShoppingCartOutlinedIcon fontSize="inherit" />}
            animate={true}
            onClick={() => setOpen(true)}
          >
            chọn mua
          </Button>
        </div>
      </div>
      {open && (
        <ProductViewModel open={open} product={product} setOpen={setOpen} />
      )}
    </div>
  );
};

export default ProductCard;
