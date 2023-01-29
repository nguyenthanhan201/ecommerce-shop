import Img from "@/components/shared/Img/Img";
import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import {
  formatDate,
  getSalePrice,
  numberWithCommans,
} from "@/lib/helpers/parser";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { useToast } from "@/lib/providers/toast-provider";
import { AuthServices } from "@/lib/repo/auth.repo";
import { OrderServices } from "@/lib/repo/order.repo";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Box, Button as ButtonMUI, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/index/admin/components/Header";
import { tokens } from "lib/theme/theme";
import { useEffect, useMemo, useState } from "react";
import { useExcelDownloder } from "react-xls";

const columns: any = [
  {
    field: "idAuth",
    headerName: "User",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "actions1",
    headerName: "Title",
    flex: 1,
    headerAlign: "center",
    align: "left",
    renderCell: (row: any) => {
      return (
        <div className="flex flex-col gap-2">
          {Object.values(row.row.order).map((item: any, index: number) => {
            const { size, color, product } = item[0];
            return (
              <div className="flex items-center gap-2" key={index}>
                <Img
                  src={product.image01}
                  alt={product.image01}
                  width={30}
                  height={30}
                  className="rounded-full"
                  hasNotplaceholder
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
          {Object.values(row.row.order).map((item: any, index: number) => {
            const { quantity, price, product } = item[0];
            return (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                {product.discount
                  ? numberWithCommans(
                      getSalePrice(product.price, product.discount) * quantity
                    )
                  : numberWithCommans(price * quantity)}
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

const Page = () => {
  const { ExcelDownloder } = useExcelDownloder();
  const auth = useAppSelector((state) => state.auth.auth);
  const toast = useToast();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState<any>([]);
  // console.log("👌 ~ orders", orders);

  const convertOrdersToExcel = () => {
    if (orders.length <= 0) return;
    const data = Object.values(orders).map((item: any) => {
      const { idAuth, createdAt, order } = item;
      // in cột order có nhiều sản phẩm nên phải map ra
      const Purchaseorders = Object.values(order).map(
        (item2: any) => item2[0].product.title
      );
      // in cột price có nhiều sản phẩm nên phải map ra
      const PurchasePrice = Object.values(order).map(
        (item2: any) => item2[0].product.price
      );
      return {
        idAuth,
        createdAt,
        order: Purchaseorders.map((item3: any) => item3).join("; "),
        price: PurchasePrice.map((item3: any) => item3).join("; "),
      };
    });
    return { Data1: [...data] };
  };

  useEffect(() => {
    if(!auth?.email) return;
    OrderServices.getAll()
      .then((res) => {
        // console.log("👌 ~ res", res);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log("👌 ~ err", err);
        if (
          err.response.data.error.name === "TokenExpiredError" &&
          auth?.email
        ) {
          toast.promise(
            "Làm mới access token thành công. Làm mới trang để tiếp tục",
            AuthServices.token(auth?.email)
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
  }, [auth?.email]);

  const ButtonExcel = useMemo(() => {
    if (!convertOrdersToExcel()) return null;
    return (
      <Box>
        <ButtonMUI
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <ExcelDownloder
            data={convertOrdersToExcel()}
            filename="book"
            type="link" // or type={'button'}
            className="flex items-center"
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Xuất Excel
          </ExcelDownloder>
        </ButtonMUI>
      </Box>
    );
  }, [convertOrdersToExcel]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Orders" subtitle="Welcome to orders dashboard" />
        {ButtonExcel}
      </Box>
      <Box
        m="20px 0 0 0"
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
    </Box>
  );
};

export default Page;
Page.Layout = AdminLayout;
