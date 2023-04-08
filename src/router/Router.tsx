import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { NavigationGuard } from "./NavigationGuard";
import { useAppSelector } from "../store/hooks";
import Room from "../components/room/Room";
import ErrorPage from "../components/error/ErrorPage";
import Top from "../components/top/Top";
import Phone from "../components/room/phone/Phone";

const isAuth = (): boolean => {
  const authUid = useAppSelector((state) => state.auth.uid);
  return authUid ? true : false;
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
        path: ":roomId",
        element: <Room />,
      },
      {
        path: ":roomId/phone",
        element: <Phone />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

/**
 * Todo: 下記の方式に変更する。課題: roomにリダイレクトされた時に遷移する部屋どうする？
 */
// type Props = {
//   needAuth: boolean;
//   redirectPath: string;
// };

// const IsAuth = (props: Props) => {
//   const { needAuth, redirectPath } = props;
//   const authUid = useAppSelector((state) => state.auth.uid);
//   return (needAuth && authUid) || (!needAuth && !authUid) ? (
//     <Outlet />
//   ) : (
//     <Navigate to={redirectPath} />
//   );
// };

// const Router = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={<IsAuth needAuth={false} redirectPath="/room" />}
//         >
//           <Route path="/" element={<Top />} />
//         </Route>
//         <Route path="/room" element={<IsAuth needAuth redirectPath="/" />}>
//           <Route path="/room/:roomId" element={<Room />} />
//           <Route path="/room/:roomId/phone" element={<Phone />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

export default Router;
