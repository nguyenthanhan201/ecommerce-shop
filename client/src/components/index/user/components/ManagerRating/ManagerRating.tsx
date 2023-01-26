import Modal from "@/components/shared/Modal/Modal";
import { formatDate } from "@/lib/helpers/parser";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { Rating } from "@/lib/redux/types/rating.type";
import { RatingServices } from "@/lib/repo/rating.repo";
import { tokens } from "@/lib/theme/theme";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ModalRating = dynamic(() => import("./ModalRating"), { ssr: false });

const ManagerRating = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const auth = useAppSelector((state) => state.auth.auth);
  const [ratings, setRatings] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);

  useEffect(() => {
    if (!auth?._id) return;
    RatingServices.getRatingByIdAuth(auth?._id).then((res) => {
      setRatings(res);
    });
  }, [auth?._id]);

  const columns: GridColDef[] = [
    {
      field: "actions1",
      headerName: "Title",
      flex: 1,
      headerAlign: "center",
      align: "left",
      renderCell: (row: GridCellParams) => {
        // console.log("👌 ~ row", row.row);
        return <>{row.row.idProduct.title}</>;
      },
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (row: GridCellParams) =>
        formatDate(row.row.createdAt, "date"),
    },
    {
      field: "actions2",
      headerName: "rating",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (row: GridCellParams) => row.row.rating,
    },
    {
      field: "actions3",
      headerName: "comment",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (row: GridCellParams) => row.row.comment,
    },
    {
      field: "actions4",
      headerName: "actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (row: GridCellParams) => (
        <button
          className={`cursor-pointer text-white px-2 py-1 rounded ${
            !row.row.comment ? "bg-green-500" : "bg-gray-500"
          } outline-none border-none`}
          onClick={() => {
            setOpen(true);
            setSelectedRating(row.row);
          }}
          disabled={row.row.comment ? true : false}
        >
          {row.row.comment ? "Đã đánh giá" : "Đánh giá"}
        </button>
      ),
    },
  ];

  return (
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
          rows={ratings}
          columns={columns}
          getRowId={(row) => row._id!}
        />
      </Box>
      <Modal open={open} handleClose={() => setOpen(false)}>
        {open && selectedRating && (
          <ModalRating selectedRating={selectedRating} />
        )}
      </Modal>
    </>
  );
};

export default ManagerRating;
