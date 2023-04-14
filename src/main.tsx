import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Router from "./Router";
import "./index.scss";
import { SnackbarContextProvider } from "./contexts/Snackbar";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarContextProvider>
        <Router />
      </SnackbarContextProvider>
    </Provider>
  </StrictMode>
);
