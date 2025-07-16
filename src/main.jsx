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
import { ToastContainer } from "react-toastify";
import { FilterProvider } from "./context/FilterProvider.jsx";
import { BookingProvider } from "./context/BookingProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FilterProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <IncludesProvider>
            <ImagesProvider>
              <BookingProvider >
                <Provider store={store}>
                  <App />
                  <ToastContainer />

                </Provider>
              </BookingProvider>
            </ImagesProvider>
          </IncludesProvider>
        </LocalizationProvider>
      </FilterProvider>
    </BrowserRouter>
  </StrictMode>
);
