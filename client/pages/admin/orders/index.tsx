import { tokenAPI } from "@/api/authServices";
import Img from "@/components/shared/Img/Img";
import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import { getSalePrice, numberWithCommans } from "@/lib/helpers/parser";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { useToast } from "@/lib/providers/toast-provider";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllOrdersAPI } from "api/orderServices";
import Header from "components/index/admin/components/Header";
import { tokens } from "lib/theme/theme";
import { useEffect, useMemo, useState } from "react";

type TypeRowProduct = {
  _id?: number;
  title: string;
  image01: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  createdAt: string;
  discount: number | null;
};

const columns: any = [
  {
    field: "actions1",
    headerName: "Title",
    flex: 1,
    headerAlign: "center",
    align: "left",
    renderCell: (row: any) => {
      const { title, image01, size, color } = row.row;
      return (
        <div className="flex items-center gap-2">
          <Img
            src={image01}
            alt={image01}
            width={30}
            height={30}
            className="rounded-full"
            hasNotplaceholder
          />
          <p
            style={{ whiteSpace: "break-spaces" }}
          >{`${title}-${size}-${color}`}</p>
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
    cellClassName: "name-column--cell",
  },
  {
    field: "actions2",
    headerName: "price",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (row: any) => {
      const { quantity, price, discount } = row.row;
      return discount
        ? numberWithCommans(quantity * getSalePrice(price, discount))
        : numberWithCommans(quantity * price);
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

const Page = () => {
  const auth = useAppSelector((state) => state.auth.auth);
  const toast = useToast();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  // console.log("👌 ~ orders", orders);
  const convertOrders = useMemo(() => {
    if (!orders.length) return [];
    let arr: TypeRowProduct[] = [];
    orders.forEach((order: any) => {
      // console.log("👌 ~ order", order);
      const createdAt = new Date(order.createdAt || "");
      const day = createdAt.getDate();
      const month = createdAt.getMonth() + 1;
      const year = createdAt.getFullYear();

      Object.values(order.order).forEach((item: any) => {
        // console.log("👌 ~ item", item);
        const { color, size, quantity } = item[0];
        const { title, image01, price, discount } = item[0].product;
        arr.push({
          _id: Math.random() + 1,
          title,
          image01,
          price,
          size,
          color,
          quantity,
          discount,
          createdAt: `${day}/${month}/${year}`,
        });
      });
    });

    return arr;
  }, [orders]);
  // console.log("👌 ~ convertOrders", convertOrders);

  useEffect(() => {
    getAllOrdersAPI()
      .then((res) => setOrders(res))
      .catch((err) => {
        if (err.response.data.error.name === "TokenExpiredError" && auth) {
          toast.promise(
            "Làm mới access token thành công. Làm mới trang để tiếp tục",
            tokenAPI(auth?.email)
              .then((res) => {
                localStorage.setItem("token", res.accessToken);
              })
              .catch((err) => {
                Promise.reject(err);
              }),
            "Làm mới access token thất bại"
          );
        }
      });
  }, [auth]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Orders" subtitle="Welcome to orders dashboard" />
      </Box>
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
          checkboxSelection
          rows={convertOrders}
          columns={columns}
          getRowId={(row) => row._id!}
        />
      </Box>
    </Box>
  );
};

export default Page;
Page.Layout = AdminLayout;
