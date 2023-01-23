import Img from "@/components/shared/Img/Img";
import { tokens } from "@/lib/theme/theme";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getOrdersAPI } from "api/orderServices";
import Loading from "components/shared/Loading/Loading";
import {
  formatDate,
  getSalePrice,
  numberWithCommans,
} from "lib/helpers/parser";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { useEffect, useState } from "react";

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
                  ? getSalePrice(product.price, product.discount) * quantity
                  : numberWithCommans(price * quantity)}
                ₫
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
  // console.log("👌 ~ orders", orders);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        </>
      )}
    </>
  );
};

export default ManagerOrders;
