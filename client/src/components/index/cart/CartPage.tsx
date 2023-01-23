import { createOrderAPI } from "@/api/orderServices";
import CartItem from "@/components/index/cart/components/CartItem";
import Button from "@/components/shared/Button";
import { getSalePrice, numberWithCommans } from "@/lib/helpers/parser";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { useToast } from "@/lib/providers/toast-provider";
import { CartItem as CartItemType } from "@/lib/redux/types/cartItem.type";
import Link from "next/link";
import { useMemo } from "react";

const CartPage = () => {
  const toast = useToast();
  const cartItems = useAppSelector((state) => state.cartItems.value);
  // console.log("👌 ~ cartItems", cartItems);
  const filteredCartItems = useMemo(() => {
    if (!cartItems) return [];
    const asArray = Object.entries(cartItems).map(([key, value]) => {
      return {
        ...value,
        _id: key,
      };
    });

    // filter out cart items with products are not hidden
    return asArray.filter((item) => item[0].idProduct.deletedAt === null);
  }, [cartItems]);
  const totalPrice = useMemo(() => {
    let total = 0;
    if (!filteredCartItems) return total;
    Object.values(filteredCartItems).map((item: [CartItemType]) => {
      const quantity = item[0].quantity;

      // if product is on sale then use sale price else use price from product
      return (total += item[0].idProduct.discount
        ? getSalePrice(item[0].idProduct.price, item[0].idProduct.discount) *
          quantity
        : Number(item[0].idProduct.price) * quantity);
    });
    return total;
  }, [filteredCartItems]);

  const handleCreateOrder = () => {
    if (filteredCartItems && filteredCartItems.length === 0)
      return toast.error("Giỏ hàng trống", { autoClose: 300 });
    return createOrderAPI(totalPrice, cartItems)
      .then((res) => (window.location.href = res.data))
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="cart">
      <div className="cart_info">
        <div className="cart_info_txt">
          <p>
            Bạn đang có {filteredCartItems && filteredCartItems.length} sản phẩm
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
