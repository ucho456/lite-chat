import { createBrowserRouter } from "react-router-dom";
import { NavigationGuard } from "./NavigationGuard";

import Chat from "../components/chat/Chat";
import ErrorPage from "../components/error/ErrorPage";
import Welcome from "../components/welcome/Welcome";

const isAuth = () => {
  return true;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationGuard beforeEnter={isAuth} redirectPath="/welcome" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
]);
