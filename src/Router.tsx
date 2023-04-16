import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Room from "./components/room/Room";
import Rooms from "./components/rooms/Rooms";
import ErrorPage from "./components/error/ErrorPage";
import Top from "./components/top/Top";
import Phone from "./components/room/phone/Phone";
import { useEffect } from "react";
import { auth } from "./firebase";
import { isFirstAuthChecked } from "./store/modules/authSlice";
import useRooms from "./hooks/useRooms";
import useUser from "./hooks/useUser";

const IsAuth = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loginUser) => {
      const uid = loginUser ? loginUser.uid : null;
      dispatch(isFirstAuthChecked({ uid, checked: true }));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const { uid, checked } = useAppSelector((state) => state.auth);
  if (!checked) {
    return <></>;
  } else if (uid) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

const Router = () => {
  useUser();
  useRooms();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Top />} />
        <Route path="/rooms" element={<IsAuth />}>
          <Route path="" element={<Rooms />} />
          <Route path=":roomId" element={<Room />} />
          <Route path=":roomId/phone" element={<Phone />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
