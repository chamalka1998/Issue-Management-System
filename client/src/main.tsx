import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // 1. Import Provider
import { store } from "./app/store"; // 2. Import your Store
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 3. Wrap everything in the Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
