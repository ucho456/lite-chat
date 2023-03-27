import { createBrowserRouter } from "react-router-dom";
import { NavigationGuard } from "./NavigationGuard";
import { useAppSelector } from "../app/hooks";
import Room from "../components/room/Room";
import ErrorPage from "../components/error/ErrorPage";
import Top from "../components/top/Top";

const isAuth = (): boolean => {
  const uid = useAppSelector((state) => state.auth.uid);
  return uid ? true : false;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
  {
    path: "/room",
    element: <NavigationGuard beforeEnter={isAuth} redirectPath="/" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/room/:room_id",
        element: <Room />,
      },
    ],
  },
]);
