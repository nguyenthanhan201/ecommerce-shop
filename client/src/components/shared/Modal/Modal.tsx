import { Modal as ModalMUI } from "@mui/material";
import React from "react";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  children: any;
};

const Modal = React.forwardRef((props: ModalProps, ref: any) => {
  return (
    <ModalMUI open={props.open} onClose={props.handleClose} keepMounted={false}>
      <div className="modal">{props.children}</div>
    </ModalMUI>
  );
});

export default Modal;
