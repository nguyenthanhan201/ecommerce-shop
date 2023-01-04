import {
  Cancel,
  CheckCircle,
  Info,
  WarningOutlined,
} from "@mui/icons-material";
import React, { createContext, ReactNode, useContext } from "react";
import {
  toast as toastify,
  ToastContainer,
  ToastContent,
  ToastOptions,
  Zoom,
} from "react-toastify";

const ToastContext = createContext<{
  default: (content: ToastContent, options?: ToastOptions | undefined) => void;
  success: (
    content: ToastContent,
    options?: ToastOptions | undefined
  ) => React.ReactText;
  error: (
    content: ToastContent,
    options?: ToastOptions | undefined
  ) => React.ReactText;
  promise: (
    contentSuccess: ToastContent,
    func: Promise<any>,
    contentError: ToastContent,
    options?: ToastOptions | undefined
  ) => React.ReactText;
}>(null as any);

export function ToastProvider({ children }: any) {
  const defaultOptions: ToastOptions = {
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    pauseOnFocusLoss: false,
    bodyClassName: "font-medium",
    closeButton: false,
    icon: false,
    toastId: "toast",
  };
  const icons = {
    info: <Info />,
    success: <CheckCircle sx={{ fontSize: "60px", color: "green" }} />,
    error: <Cancel style={{ color: "red" }} />,
    warn: <WarningOutlined />,
    loading: <></>,
  };

  const createToastContent = (
    type: "info" | "success" | "error" | "warn" | "loading",
    content?: ToastContent
  ) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <i>{icons[type]}</i>
      {content !== "" ? (
        <div style={{ marginTop: "20px" }}>{content as ReactNode}</div>
      ) : (
        <></>
      )}
    </div>
  );

  const toast = {
    default: (content: ToastContent, options?: ToastOptions) =>
      toastify(content, { ...defaultOptions, ...options }),
    success: (content: ToastContent, options?: ToastOptions) =>
      toastify.success(createToastContent("success", content), {
        className: "",
        ...defaultOptions,
        ...options,
        style: { color: "green" },
      }),
    error: (content: ToastContent, options?: ToastOptions) =>
      toastify.error(createToastContent("error", content), {
        className: "",
        ...defaultOptions,
        ...options,
        style: { color: "red" },
      }),
    promise: (
      content: ToastContent,
      func: Promise<any>,
      contentError?: ToastContent,
      options?: ToastOptions
    ) =>
      toastify.promise(
        func,
        {
          pending: {
            render() {
              return createToastContent("loading", "Đang tải...");
            },
            icon: false,
          },
          success: {
            render() {
              return createToastContent("success", content);
            },
            icon: false,
          },
          error: {
            render({ data }: any) {
              // console.log("👌 ~ data", data);
              // When the promise reject, data will contains the error
              return createToastContent(
                "error",
                data?.message || contentError || "Tải thất bại"
              );
            },
            icon: false,
          },
        },
        {
          ...defaultOptions,

          ...options,
        }
      ),
  };

  return (
    <ToastContext.Provider value={toast as any}>
      {children}
      <ToastContainer
        position="top-center"
        containerId="toast-root"
        limit={1}
        transition={Zoom}
        className=""
      />
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
