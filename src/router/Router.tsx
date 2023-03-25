import { createBrowserRouter } from "react-router-dom";
import { NavigationGuard } from "./NavigationGuard";

import Chat from "../components/chat/Chat";
import ErrorPage from "../components/error/ErrorPage";
import Overview from "../components/overview/Overview";

const isAuth = () => {
  return true;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationGuard beforeEnter={isAuth} redirectPath="/overview" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/overview",
    element: <Overview />,
  },
]);
