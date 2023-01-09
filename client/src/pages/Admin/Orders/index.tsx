import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllOrdersAPI } from "api/orderServices";
import Header from "components/index/admin/components/Header";
import { TypeRowProduct } from "components/index/user/components/ManagerOrders/ManagerOrders";
import { tokens } from "lib/theme/theme";
import { useEffect, useMemo, useState } from "react";

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
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={image01}
            alt=""
            style={{
              borderRadius: "50%",
              border: `2px solid ${color}`,
              borderColor: `${color}`,
              backgroundColor: `${color}`,
              boxShadow: "none",
              cursor: "pointer",
              height: "50px",
              width: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: `${color}`,
            }}
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
      const { quantity, price } = row.row;
      return <> {quantity * price}</>;
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
        const { title, image01, price } = item[0].product;
        arr.push({
          _id: Math.random() + 1,
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
    getAllOrdersAPI().then((res) => setOrders(res));
  }, []);
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
