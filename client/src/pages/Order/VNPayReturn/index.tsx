import { addOrderAPI } from "api/orderServices";
import Button from "components/shared/Button";
import Helmet from "components/shared/Helmet";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { useToast } from "lib/providers/toast-provider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VNPayReturn.scss";

const VNPayReturn = () => {
  const toast = useToast();
  const auth = useAppSelector((state) => state.auth.auth);
  const [responseCode, setResponseCode] = useState<string>("");
  const query = window.location.search;

  useEffect(() => {
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
      addOrderAPI(auth._id).then((res) => {
        console.log("👌 ~ res", res);
      }),
      "Xử lí đơn hàng thất bại"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?._id]);

  return (
    <Helmet title="VNPay">
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
    </Helmet>
  );
};

export default VNPayReturn;
