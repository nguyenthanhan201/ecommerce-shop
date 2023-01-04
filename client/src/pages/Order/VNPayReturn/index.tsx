import { clearCartByIdAuthAPI } from "api/cartServices";
import Button from "components/shared/Button";
import DefaultLayout from "layouts/default-layout/DefaultLayout";
import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { GET_CART_ITEMS } from "lib/redux/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VNPayReturn.scss";

const VNPayReturn = () => {
  const auth = useAppSelector((state) => state.auth.auth);
  const dispatch = useAppDispatch();
  const [responseCode, setResponseCode] = useState<string>("");
  const query = window.location.search;
  const tempParams = JSON.parse(
    '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  );

  useEffect(() => {
    setResponseCode(tempParams.vnp_ResponseCode);
  }, [tempParams]);

  useEffect(() => {
    if (!auth || responseCode !== "00") return;
    clearCartByIdAuthAPI(auth._id).then(() => {
      dispatch({ type: GET_CART_ITEMS });
    });
  }, [responseCode, auth, dispatch]);

  return (
    <DefaultLayout>
      <div className="vnpay-return">
        {responseCode === "00" ? (
          <p className="vnpay-return__text--success">Thanh toán thành công</p>
        ) : (
          <p className="vnpay-return__text--error">Thanh toán thất bại</p>
        )}
        <Button>
          <Link to={"/"}>Quay lại trang chủ</Link>
        </Button>
      </div>
    </DefaultLayout>
  );
};

export default VNPayReturn;
