import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./admin/redux/store/store.js";
import App from "./App.jsx";
import "./index.css";
import { IncludesProvider } from "./admin/context/IncludesContext.jsx";
import { ImagesProvider } from "./admin/context/ImagesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <ImagesProvider>
            <IncludesProvider>
              <App />
            </IncludesProvider>
          </ImagesProvider>
        </Provider>
      </LocalizationProvider>
    </BrowserRouter>
  </StrictMode>
);
