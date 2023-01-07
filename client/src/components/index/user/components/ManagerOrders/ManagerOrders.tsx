import { getOrdersAPI } from "api/orderServices";
import Img from "components/shared/Img";
import Loading from "components/shared/Loading/Loading";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { useEffect, useMemo, useState } from "react";
import "./ManagerOrders.scss";

type TypeRowProduct = {
  title: string;
  image01: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  createdAt: string;
};

const ManagerOrders = () => {
  const auth = useAppSelector((state) => state.auth.auth);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const convertOrders = useMemo(() => {
    let arr: TypeRowProduct[] = [];
    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt || "");
      const day = createdAt.getDate();
      const month = createdAt.getMonth() + 1;
      const year = createdAt.getFullYear();

      Object.values(order.order).forEach((item: any) => {
        // console.log("👌 ~ item", item);
        const { color, size, quantity } = item[0];
        const { title, image01, price } = item[0].idProduct;
        arr.push({
          title,
          image01,
          price,
          size,
          color,
          quantity,
          createdAt: `${day}/${month}/${year}`,
        });
      });
    });

    return arr;
  }, [orders]);

  useEffect(() => {
    setIsLoading(true);
    if (!auth?._id) return;
    getOrdersAPI(auth._id)
      .then((res) => {
        setOrders(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [auth]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <table className="table">
          <tbody>
            <tr className="title">
              <th>Sản phẩm</th>
              <th>Ngày mua</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
            {convertOrders.map((item: TypeRowProduct, index: number) => {
              // console.log("👌 ~ item", item);
              const {
                title,
                image01,
                price,
                size,
                color,
                quantity,
                createdAt,
              } = item;
              return (
                <tr key={index} className="table__item">
                  <td className="table__item-1">
                    <Img src={image01} alt={title} />
                    {title}-{size}-{color}
                  </td>
                  <td>{createdAt || "null"}</td>
                  <td>{price * quantity}</td>
                  <td>Hoàn thành</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ManagerOrders;
