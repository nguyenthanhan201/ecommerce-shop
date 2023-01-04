import { Box, Modal as ModalMUI } from "@mui/material";
import "./Modal.scss";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  children: any;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto" as "auto",
};

const Modal = (props: ModalProps) => {
  return (
    <ModalMUI
      open={props.open}
      onClose={props.handleClose}
      className="modal"
      keepMounted={false}
    >
      <Box sx={style}>{props.children}</Box>
    </ModalMUI>
  );
};

export default Modal;
