import { createBrowserRouter } from "react-router-dom";

import Chat from "./components/chat/Chat";
import ErrorPage from "./components/error/ErrorPage";
import Overview from "./components/overview/Overview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/overview",
    element: <Overview />,
    errorElement: <ErrorPage />,
  },
]);
