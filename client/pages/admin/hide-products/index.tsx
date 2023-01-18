import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokenAPI } from "api/authServices";
import { deleteProductAPI, unhideProductAPI } from "api/productServices";
import Header from "components/index/admin/components/Header";
import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useAppSelector } from "lib/hooks/useAppSelector";
import useAuth from "lib/hooks/useAuth";
import { useToast } from "lib/providers/toast-provider";
import { Product } from "lib/redux/slices/products";
import { GET_HIDE_PRODUCTS } from "lib/redux/types";
import { tokens } from "lib/theme/theme";
import { useEffect } from "react";

const Page = () => {
  useAuth();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const products: Product[] = useAppSelector(
    (state) => state.products.products
  );
  const errProducts: string | null = useAppSelector(
    (state) => state.products.err
  );
  // console.log("👌 ~ errProducts", errProducts);
  const auth = useAppSelector((state) => state.auth.auth);
  // console.log("👌 ~ auth", auth);

  const columns: any = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "slug",
      headerName: "slug",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "categorySlug",
      headerName: "categorySlug",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "description",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "size",
      headerName: "size",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "colors",
      headerName: "colors",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: "Hoạt động",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (row: any) => {
        return (
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              style={{ backgroundColor: "#70d8bd" }}
              onClick={() => {
                handleShowProduct(row.row._id);
              }}
            >
              Hiện
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#70d8bd" }}
              onClick={() => {
                deleteProductAPI(row.row._id).then(() => {
                  dispatch({ type: GET_HIDE_PRODUCTS });
                });
              }}
            >
              Xóa
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch({ type: GET_HIDE_PRODUCTS });
  }, [dispatch]);

  useEffect(() => {
    if (errProducts === "TokenExpiredError" && auth) {
      tokenAPI(auth?.email)
        .then((res) => {
          toast.error("Token đã hết hạn");
          localStorage.setItem("token", res.accessToken);
        })
        .catch((err) => {
          toast.error("Refresh token đã hết hạn");
          console.log("🚀 ~ file: index.tsx ~ line 100 ~ err", err);
          // localStorage.removeItem("token");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errProducts, auth]);

  const handleShowProduct = (id: string) => {
    toast.promise(
      "Hiện sản phẩm thành công",
      unhideProductAPI(id).then(() => {
        dispatch({ type: GET_HIDE_PRODUCTS });
      }),
      "Hiện sản phẩm thất bại"
    );
  };

  return (
    <Box m="20px">
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Header
          title="Sản phẩm ẩn"
          subtitle="Chào mừng tới quản lí sản phẩm ẩn"
        />
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
          rows={products}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Page;
Page.Layout = AdminLayout;
