import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { router } from "./router/Router";
import "./index.scss";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
