import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyle } from "./utils";
import { ThemeToggleProvider } from "./context/ThemeContext";
import { ResponsiveProvider } from "./context/ResposiveContext";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        hideProgressBar={true}
        position="bottom-right"
        autoClose={800}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        style={{ fontSize: "1rem" }}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <PersistGate persistor={persistor}>
        <ResponsiveProvider>
          <ThemeToggleProvider>
            <GlobalStyle />
            <App />
          </ThemeToggleProvider>
        </ResponsiveProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
