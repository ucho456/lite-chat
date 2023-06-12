import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { SnackbarContextProvider } from "@/contexts/Snackbar";
import { store } from "@/store/store";
import Router from "@/Router";
import "./main.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarContextProvider>
        <Router />
      </SnackbarContextProvider>
    </Provider>
  </StrictMode>,
);
