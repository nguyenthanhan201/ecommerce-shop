/* eslint-disable react-hooks/exhaustive-deps */
import { useDevice } from "@/lib/hooks/useDevice";
import { Product } from "@/lib/redux/types/product.type";
import { Rating } from "@/lib/redux/types/rating.type";
import { CartServices } from "@/lib/repo/cart.repo";
import { RatingServices } from "@/lib/repo/rating.repo";
import { getSalePrice, numberWithCommans } from "lib/helpers/parser";
import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { useToast } from "lib/providers/toast-provider";
import { GET_CART_ITEMS } from "lib/redux/types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import Img from "../Img/Img";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";
import ImagePreview from "./components/ImagePreview";

const RatingMUI = dynamic(() => import("@mui/material/Rating"), {
  ssr: false,
});
const ModalSeeComments = dynamic(
  () => import("./components/ModalSeeComments"),
  {
    ssr: false,
  }
);

type ProductViewProps = {
  product: Product;
};
type ChoosenItemType = {
  color: string | undefined;
  size: string | undefined;
  quantity: number;
};

const ProductView = ({ product }: ProductViewProps) => {
  const { t } = useTranslation("product");
  const { isMobile } = useDevice();
  const toast = useToast();
  const auth = useAppSelector((state) => state.auth.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [previewImg, setReviewImg] = useState<string>("");
  const [descriptionExpand, setDescriptionExpand] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [choosenItems, setChoosenItems] = useState<ChoosenItemType>({
    color: undefined,
    size: undefined,
    quantity: 1,
  });
  const [ratings, setRatings] = useState<Rating[]>([]);
  // console.log("???? ~ ratings", ratings);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { color, size, quantity } = choosenItems;

  useEffect(() => {
    setReviewImg(product.image01);
    setDescription(product.description);
    RatingServices.getRatingByIdProduct(product._id).then((res) => {
      setRatings(res);
    });
  }, []);

  const ratingValue = useMemo(() => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, cur) => acc + cur.rating, 0);
    return sum / ratings.length;
  }, [ratings]);

  const updateQuantity = (types: any) => {
    if (types === "plus") {
      if (product.stock == quantity) return;
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
    console.log("oki");
    const toastErr = (msg: string) => toast.error(msg);
    if (color === undefined) {
      toastErr("Vui l??ng ch???n m??u!");
      return false;
    }
    if (size === undefined) {
      toastErr("Vui l??ng ch???n k??ch th?????c!");
      return false;
    }
    if (product._id === undefined) {
      toastErr("S???n ph???m kh??ng t???n t???i!");
      return false;
    }
    return true;
  };

  const addToCart = () => {
    if (!check()) return;
    const { color, size, quantity } = choosenItems;
    CartServices.createCartItem(auth!._id, product._id, size!, color!, quantity)
      .then((res) => {
        if (res) {
          dispatch({ type: GET_CART_ITEMS, payload: auth!._id });
          toast.success("Th??m gi??? h??ng th??nh c??ng");
        }
      })
      .catch(() => {
        toast.error("Th??m gi??? h??ng th???t b???i");
      });
  };

  const gotoCart = () => {
    if (check()) router.push("/cart");
  };

  const handleExpand = useCallback(() => {
    setDescriptionExpand((prev) => !prev);
  }, []);

  if (product === undefined) return <Loading />;
  return (
    <>
      <div className="product">
        <div className="product_image">
          <div className="product_image_list">
            {[product.image01, product.image02].map((child, index) => (
              <div
                key={index}
                className="product_image_list_item"
                onClick={() => setReviewImg(child)}
              >
                <Img src={child} alt={child} layout="fill" />
              </div>
            ))}
          </div>
          {previewImg && <ImagePreview previewImg={previewImg} />}
          <div
            className={`product-description ${
              descriptionExpand ? "expand" : ""
            }`}
          >
            <div className="product-description_title">Chi ti???t s???n ph???m</div>
            <div className="product-description_content">
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
            <div className="product-description_toggle">
              <Button
                size="sm"
                onClick={handleExpand}
                icon={""}
                animate={false}
              >
                {descriptionExpand ? "Thu g???n" : "Xem th??m"}
              </Button>
            </div>
            {!descriptionExpand && <div className="gradient" />}
          </div>
        </div>
        <div className="product_info">
          <h1 className="product_info_title">{product.title}</h1>
          <div className="flex gap-2 items-start">
            {ratings.length > 0 && ratings[0].rating !== 0 ? (
              <div
                className="flex flex-col gap-1 cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <RatingMUI value={ratingValue} readOnly />
                <small className="text-[10px]">Nh???n ????? xem ????nh gi??</small>
              </div>
            ) : (
              "Ch??a c?? ????nh gi??"
            )}
            <p>{product.sold} ???? b??n</p>
          </div>
          <div className="product_info_item">
            <div className="product_info_item_price">
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
          </div>
          <div className="product_info_item">
            <div className="product_info_item_title">{t("color")}</div>
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
            <div className="product_info_item_title">{t("size")}</div>
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
          {product.stock > 0 ? (
            <>
              <div className="product_info_item">
                <div className="product_info_item_title">{t("quantity")}</div>
                <div className="product_info_item_quantity">
                  <div
                    className="product_info_item_quantity_btn"
                    onClick={() => updateQuantity("minus")}
                  >
                    -
                  </div>
                  <div className="product_info_item_quantity_input">
                    {quantity}
                  </div>
                  <div
                    className="product_info_item_quantity_btn"
                    onClick={() => updateQuantity("plus")}
                  >
                    +
                  </div>
                  <p className="stock">
                    {t("available")} {product.stock}
                  </p>
                </div>
              </div>
              <div className="product_info_item">
                <Button onClick={addToCart} icon={""} animate={false}>
                  {t("add_to_cart")}
                </Button>
                <Button onClick={gotoCart} icon={""} animate={false}>
                  {t("buy_now")}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-red-500 text-32 mt-6">H???t h??ng</p>
          )}
        </div>
        {isMobile && (
          <div
            className={`product-description mobile ${
              descriptionExpand ? "expand" : ""
            }`}
          >
            <div className="product-description_title">Chi ti???t s???n ph???m</div>
            <div
              className="product-description_content"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div className="product-description_toggle">
              <Button
                size="sm"
                onClick={handleExpand}
                icon={""}
                animate={false}
              >
                {descriptionExpand ? "Thu g???n" : "Xem th??m"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <Modal open={showModal} handleClose={() => setShowModal(false)}>
        {showModal && <ModalSeeComments ratings={ratings} />}
      </Modal>
    </>
  );
};
export default memo(ProductView);
