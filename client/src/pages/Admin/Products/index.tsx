import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { hideProductAPI } from "api/productServices";
import Header from "components/index/admin/components/Header";
import ModalAddProduct from "components/index/admin/products/ModalAddProduct";
import Modal from "components/shared/Modal/Modal";
import { useAppDispatch } from "lib/hooks/useAppDispatch";
import { useAppSelector } from "lib/hooks/useAppSelector";
import { useToast } from "lib/providers/toast-provider";
import { Product } from "lib/redux/slices/products";
import { GET_PRODUCTS } from "lib/redux/types";
import { tokens } from "lib/theme/theme";
import { useEffect, useState } from "react";

const Products = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const products: Product[] = useAppSelector(
    (state) => state.products.products
  );
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  const columns: any = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   headerAlign: "center",
    //   align: "center",
    //   cellClassName: "name-column--cell",
    // },
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
        // console.log("👌 ~ row", row.row);
        return (
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              style={{ backgroundColor: "#70d8bd" }}
              onClick={() => {
                setSelectedProduct(row.row);
                setOpen(!open);
              }}
            >
              sửa
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#70d8bd" }}
              onClick={() => {
                hideProduct(row.row._id);
              }}
            >
              Ẩn
            </Button>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch({ type: GET_PRODUCTS });
  }, [dispatch]);

  const hideProduct = (id: string) => {
    toast.promise(
      "Ẩn sản phẩm thành công",
      hideProductAPI(id).then(() => {
        dispatch({ type: GET_PRODUCTS });
      }),
      "Ẩn sản phẩm thất bại"
    );
  };

  return (
    <>
      <Box m="20px">
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Header title="Sản phẩm" subtitle="Chào mừng tới quản lí sản phẩm" />
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={() => {
                setOpen(!open);
              }}
            >
              Thêm sản phẩm
            </Button>
          </Box>
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
      <Modal
        open={open}
        handleClose={() => {
          setOpen(!open);
          setSelectedProduct(undefined);
        }}
      >
        <ModalAddProduct product={selectedProduct} />
      </Modal>
    </>
  );
};

export default Products;
