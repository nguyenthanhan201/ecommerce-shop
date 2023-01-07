import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./sass/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
