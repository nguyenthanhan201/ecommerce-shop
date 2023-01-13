import { addOrderAPI } from "api/orderServices";
import Button from "components/shared/Button";
import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { useToast } from "lib/providers/toast-provider";
import { GET_CART_ITEMS } from "lib/redux/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const VNPayReturnPage = () => {
  const toast = useToast();
  const auth = useAppSelector((state) => state.auth.auth);
  const [responseCode, setResponseCode] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const query = window.location.search;
    const tempParams = JSON.parse(
      '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
      }
    );
    setResponseCode(tempParams.vnp_ResponseCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!auth || responseCode !== "00") return;
    toast.promise(
      "Xử lí đơn hàng thành công",
      addOrderAPI(auth._id).then(() => {
        // console.log("👌 ~ res", res);
        dispatch({ type: GET_CART_ITEMS });
      }),
      "Xử lí đơn hàng thất bại"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?._id]);

  return (
    <div className="vnpay-return">
      {responseCode === "00" ? (
        <p className="vnpay-return__text--success">Thanh toán thành công</p>
      ) : (
        <p className="vnpay-return__text--error">Thanh toán thất bại</p>
      )}
      <Button>
        <Link href="/">Quay lại trang chủ</Link>
      </Button>
    </div>
  );
};

export default VNPayReturnPage;
