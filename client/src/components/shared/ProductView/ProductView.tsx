/* eslint-disable react-hooks/exhaustive-deps */
import { createCartItemAPI } from "api/cartServices";
import { numberWithCommans } from "lib/helpers/parser";
import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { useToast } from "lib/providers/toast-provider";
import { GET_CART_ITEMS } from "lib/redux/types";
import { useRouter } from "next/router";
import { memo, useCallback, useState } from "react";
import Button from "../Button";
import Loading from "../Loading/Loading";
import ImagePreview from "./components/ImagePreview";

type ProductViewProps = {
  product?: any;
};

const ProductView = ({ product }: ProductViewProps) => {
  const toast = useToast();
  const auth = useAppSelector((state) => state.auth.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [previewImg, setReviewImg] = useState(product.image01);
  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [choosenItems, setChoosenItems] = useState({
    color: undefined,
    size: undefined,
    quantity: 1,
  });
  const { color, size, quantity } = choosenItems;
  // console.log("👌 ~ color", color);

  const updateQuantity = (types: any) => {
    if (types === "plus") {
      setChoosenItems({
        ...choosenItems,
        quantity: choosenItems.quantity + 1,
      });
    } else {
      setChoosenItems({
        ...choosenItems,
        quantity: choosenItems.quantity - 1 < 1 ? 1 : choosenItems.quantity - 1,
      });
    }
  };

  const check = () => {
    // console.log("👌 ~ color", color);
    if (color === undefined) {
      // console.log("👌 ~ color", color);
      // alert('Vui lòng chọn màu');
      toast.error("Vui lòng chọn màu!");
      return false;
    }
    if (size === undefined) {
      // alert('Vui lòng chọn kích thước');
      toast.error("Vui lòng chọn kích thước!");
      return false;
    }
    if (product._id === undefined) {
      toast.error("Sản phẩm không tồn tại!");
      return false;
    }
    return true;
  };

  const addToCart = () => {
    if (!check()) return;
    const { color, size, quantity } = choosenItems;
    createCartItemAPI(auth!._id, product._id, size!, color!, quantity)
      .then((res) => {
        if (res) {
          dispatch({ type: GET_CART_ITEMS, payload: auth!._id });
          toast.success("Thêm giỏ hàng thành công");
        }
      })
      .catch(() => {
        toast.error("Thêm giỏ hàng thất bại");
      });
  };

  const gotoCart = () => {
    if (check()) router.push("/cart");
  };

  const handleExpand = useCallback(() => {
    setDescriptionExpand(!descriptionExpand);
  }, []);

  if (product === undefined) return <Loading />;
  return (
    <>
      <div className="product">
        <div className="product_image">
          <div className="product_image_list">
            <div
              className="product_image_list_item"
              onClick={() => {
                setReviewImg(product.image01);
              }}
            >
              <img src={product.image01} alt="" />
            </div>
            <div
              className="product_image_list_item"
              onClick={() => {
                setReviewImg(product.image02);
              }}
            >
              <img src={product.image02} alt="" />
            </div>
          </div>
          <ImagePreview previewImg={previewImg} />
          <div
            className={`product-description ${
              descriptionExpand ? "expand" : ""
            }`}
          >
            <div className="product-description_title">Chi tiết sản phẩm</div>
            <div
              className="product-description_content"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
            <div className="product-description_toggle">
              <Button
                size="sm"
                onClick={handleExpand}
                icon={""}
                animate={false}
              >
                {descriptionExpand ? "Thu gọn" : "Xem thêm"}
              </Button>
            </div>
          </div>
        </div>
        <div className="product_info">
          <h1 className="product_info_title">{product.title}</h1>
          <div className="product_info_item">
            <span className="product_info_item_price">
              {numberWithCommans(product.price)}đ
            </span>
          </div>
          <div className="product_info_item">
            <div className="product_info_item_title">Màu sắc</div>
            <div className="product_info_item_list">
              {product.colors.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`product_info_item_list_item ${
                    color === item ? "active" : ""
                  }`}
                  onClick={() =>
                    setChoosenItems({ ...choosenItems, color: item })
                  }
                >
                  <div className={`circle bg-${item}`}></div>
                </div>
              ))}
            </div>
          </div>
          <div className="product_info_item">
            <div className="product_info_item_title">Kích cỡ</div>
            <div className="product_info_item_list">
              {product.size.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`product_info_item_list_item ${
                    size === item ? "active" : ""
                  }`}
                  onClick={() =>
                    setChoosenItems({ ...choosenItems, size: item })
                  }
                >
                  <div className="product_info_item_list_item_size">{item}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="product_info_item">
            <div className="product_info_item_title">Số lượng</div>
            <div className="product_info_item_quantity">
              <div
                className="product_info_item_quantity_btn"
                onClick={() => updateQuantity("minus")}
              >
                -
              </div>
              <div className="product_info_item_quantity_input">{quantity}</div>
              <div
                className="product_info_item_quantity_btn"
                onClick={() => updateQuantity("plus")}
              >
                +
              </div>
            </div>
          </div>
          <div className="product_info_item">
            <Button onClick={addToCart} icon={""} animate={false}>
              thêm vào giỏ
            </Button>
            <Button onClick={gotoCart} icon={""} animate={false}>
              mua ngay
            </Button>
          </div>
        </div>
        <div
          className={`product-description mobile ${
            descriptionExpand ? "expand" : ""
          }`}
        >
          <div className="product-description_title">Chi tiết sản phẩm</div>
          <div
            className="product-description_content"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className="product-description_toggle">
            <Button size="sm" onClick={handleExpand} icon={""} animate={false}>
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(ProductView);
