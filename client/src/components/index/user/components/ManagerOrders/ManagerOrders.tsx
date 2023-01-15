import Img from "@/components/shared/Img/Img";
import { tokens } from "@/lib/theme/theme";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getOrdersAPI } from "api/orderServices";
import Loading from "components/shared/Loading/Loading";
import { formatDate, numberWithCommans } from "lib/helpers/parser";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { useEffect, useMemo, useState } from "react";

export type TypeRowProduct = {
  _id?: number;
  title: string;
  image01: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  createdAt: string;
};

const columns: any = [
  {
    field: "actions1",
    headerName: "Title",
    flex: 1,
    headerAlign: "center",
    align: "left",
    renderCell: (row: any) => {
      return (
        <div className="flex flex-col gap-2">
          {Object.values(row.row.order).map((item: any) => {
            const { size, color, product } = item[0];
            return (
              <div className="flex items-center gap-2">
                <Img
                  src={product.image01}
                  alt={product.image01}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <p
                  style={{ whiteSpace: "break-spaces" }}
                >{`${product.title}-${size}-${color}`}</p>
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "createdAt",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (row: any) => formatDate(row.row.createdAt, "date"),
  },
  {
    field: "actions2",
    headerName: "Price",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (row: any) => {
      return (
        <div className="flex flex-col gap-2">
          {Object.values(row.row.order).map((item: any) => {
            const { quantity, product } = item[0];
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                {numberWithCommans(product.price * quantity)} ₫
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    field: "actions3",
    headerName: "actions",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: () => {
      return <> {"Hoàn thành"}</>;
    },
  },
];

const ManagerOrders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const auth = useAppSelector((state) => state.auth.auth);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const convertOrders = useMemo(() => {
    if (!orders.length) return [];
    let arr: TypeRowProduct[] = [];
    orders.forEach((order) => {
      // console.log("👌 ~ order", order);
      const createdAt = new Date(order.createdAt || "");
      const day = createdAt.getDate();
      const month = createdAt.getMonth() + 1;
      const year = createdAt.getFullYear();

      Object.values(order.order).forEach((item: any) => {
        // console.log("👌 ~ item", item);
        const { color, size, quantity } = item[0];
        const { title, image01, price } = item[0].product;
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
        // console.log(res);
        setOrders(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [auth?._id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
                textAlign: "center",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid
              getRowHeight={() => "auto"}
              checkboxSelection
              rows={orders}
              columns={columns}
              getRowId={(row) => row._id!}
            />
          </Box>
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
                      <img src={image01} alt={title} />
                      {title}-{size}-{color}
                    </td>
                    <td>{createdAt || "null"}</td>
                    <td>{numberWithCommans(price * quantity)} ₫</td>
                    <td>Hoàn thành</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ManagerOrders;
