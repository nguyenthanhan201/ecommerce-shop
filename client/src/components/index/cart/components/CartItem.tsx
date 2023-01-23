import Img from "@/components/shared/Img/Img";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { createCartItemAPI, deleteCartItemAPI } from "api/cartServices";
import { getSalePrice, numberWithCommans } from "lib/helpers/parser";
import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { useToast } from "lib/providers/toast-provider";
import { Product } from "lib/redux/slices/products";
import { GET_CART_ITEMS } from "lib/redux/types";
import Link from "next/link";

type CartItemProps = {
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

const CartItem = ({ product, quantity, size, color }: CartItemProps) => {
  const auth = useAppSelector((state) => state.auth.auth);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleDeleteCartItem = () => {
    if (!auth) return toast.error("Please login to delete cart item");
    return toast.promise(
      "Xóa sản phẩm khỏi giỏ hàng thành công",
      deleteCartItemAPI(auth._id, product._id, size, color).then(() => {
        dispatch({ type: GET_CART_ITEMS, payload: auth._id });
      }),
      "Đã có lỗi xảy ra"
    );
  };

  const updateQuantity = (type: string) => {
    if (!auth) return toast.error("Please login to update cart item");
    switch (type) {
      case "-":
        if (quantity === 1) return handleDeleteCartItem();
        return toast.promise(
          "Cập nhật giỏ hàng thành công",
          createCartItemAPI(auth._id, product._id, size, color, -1).then(() => {
            dispatch({ type: GET_CART_ITEMS, payload: auth._id });
          }),
          "Đã có lỗi xảy ra"
        );
      case "+":
        if (product.stock === quantity) return toast.error("Quá số lượng hàng");
        return toast.promise(
          "Cập nhật giỏ hàng thành công",
          createCartItemAPI(auth._id, product._id, size, color, 1).then(() => {
            dispatch({ type: GET_CART_ITEMS, payload: auth._id });
          }),
          "Đã có lỗi xảy ra"
        );
      default:
        return;
    }
  };

  return (
    <div className="cart_item">
      <div className="cart_item_image">
        <Img
          src={product.image01}
          alt={product.image01}
          width={100}
          height={100}
          className="rounded-lg"
        />
      </div>
      <div className="cart_item_info">
        {product.deletedAt ? (
          <p className="text-red-500">Sản phẩm đã bị ẩn</p>
        ) : (
          <>
            <div className="cart_item_info_name">
              <Link href={`/catalog/${product.slug}`}>
                {`${product.title} - ${color} - ${size}`}
              </Link>
            </div>
            <div className="cart_item_info_price">
              {product.discount ? (
                <div className="flex items-center gap-1">
                  <p>
                    {numberWithCommans(
                      getSalePrice(product.price, product.discount)
                    )}
                  </p>
                  <del className="text-[10px]">
                    {numberWithCommans(Number(product.price))}
                  </del>
                </div>
              ) : (
                numberWithCommans(Number(product.price))
              )}
            </div>
            <div className="cart_item_info_quantity">
              <div className="product_info_item_quantity">
                <div
                  className="product_info_item_quantity_btn"
                  onClick={() => updateQuantity("-")}
                >
                  -
                </div>
                <div className="product_info_item_quantity_input">
                  {quantity}
                </div>
                <div
                  className="product_info_item_quantity_btn"
                  onClick={() => updateQuantity("+")}
                >
                  +
                </div>
              </div>
            </div>
          </>
        )}
        <div className="cart_item_info_del">
          <DeleteOutlineOutlinedIcon
            onClick={handleDeleteCartItem}
            fontSize="large"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
export default CartItem;
