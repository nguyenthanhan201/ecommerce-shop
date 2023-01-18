import { createOrderAPI } from "@/api/orderServices";
import CartItem from "@/components/index/cart/components/CartItem";
import Button from "@/components/shared/Button";
import { numberWithCommans } from "@/lib/helpers/parser";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { useToast } from "@/lib/providers/toast-provider";
import { CartItem as CartItemType } from "@/lib/redux/slices/cartItems";
import Link from "next/link";
import { useMemo } from "react";

const CartPage = () => {
  const toast = useToast();
  const cartItems = useAppSelector((state) => state.cartItems.value);

  const handleCreateOrder = () => {
    if (cartItems && Object.keys(cartItems).length === 0)
      return toast.error("Giỏ hàng trống", { autoClose: 300 });
    return createOrderAPI(totalPrice)
      .then((res) => (window.location.href = res.data))
      .catch((err) => toast.error(err.message));
  };

  const totalPrice = useMemo(() => {
    let total = 0;
    if (!cartItems) return total;
    Object.values(cartItems).map((item: [CartItemType]) => {
      const quantity = item[0].quantity;
      return (total += Number(item[0].idProduct.price) * quantity);
    });
    return total;
  }, [cartItems]);
  return (
    <div className="cart">
      <div className="cart_info">
        <div className="cart_info_txt">
          <p>
            Bạn đang có {cartItems && Object.keys(cartItems).length} sản phẩm
            trong giỏ hàng
          </p>
          <div className="cart_info_txt_price">
            <span>Thành tiền</span>
            <span>{numberWithCommans(totalPrice)}</span>
          </div>
        </div>
        <div className="cart_info_btn">
          <Button size="block" onClick={handleCreateOrder}>
            đặt hàng
          </Button>
          <Link href="/">
            <Button size="block">tiếp tục mua hàng</Button>
          </Link>
        </div>
      </div>
      <div className="cart_list">
        {cartItems &&
          Object.values(cartItems).map((item, index) => {
            // console.log("👌 ~ item", item);
            return (
              <CartItem
                key={index}
                product={item[0].idProduct}
                quantity={item[0].quantity}
                size={item[0].size}
                color={item[0].color}
              />
            );
          })}
        <p className="text-red-500">
          Lưu ý: vào link sau để lấy thông tin thanh toán&nbsp;
          <Link
            href="https://sandbox.vnpayment.vn/apis/vnpay-demo/"
            target="_blank"
            className="text-blue-500"
          >
            https://sandbox.vnpayment.vn/apis/vnpay-demo/
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CartPage;
