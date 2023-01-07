import { createOrderAPI } from "api/orderServices";
import CartItem from "components/index/cart/components/CartItem";
import Button from "components/shared/Button";
import { numberWithCommans } from "lib/helpers/parser";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { useToast } from "lib/providers/toast-provider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Helmet from "../components/shared/Helmet";

const Cart = () => {
  const toast = useToast();
  const cartItems = useAppSelector((state) => state.cartItems.value);
  // console.log("👌 ~ cartItems", cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCreateOrder = () => {
    if (cartItems && Object.keys(cartItems).length === 0)
      return toast.error("Giỏ hàng trống");
    return createOrderAPI(totalPrice)
      .then((res) => (window.location.href = res.data))
      .catch((err) => toast.error(err.message));
  };

  // const handleAddOrder = () => {
  //   addOrderAPI(cartItems)
  //     .then((res) => {
  //       // const cartItems: any = Object.values(res)[0];
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    if (!cartItems) return;
    let total = 0;
    Object.values(cartItems).map((item) => {
      const quantity = item[0].quantity;
      return (total += Number(item[0].idProduct.price) * quantity);
    });
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <Helmet title="Giỏ hàng">
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
            <Link to="/">
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
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
