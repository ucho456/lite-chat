import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import useRooms from "@/hooks/useRooms";
import useUser from "@/hooks/useUser";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { isFirstAuthChecked } from "@/store/modules/authSlice";
import { auth } from "@/firebase";
import ErrorPage from "@/components/error/ErrorPage";
import Room from "@/components/room";
import Phone from "@/components/room/phone/Phone";
import Rooms from "@/components/rooms/Rooms";
import Top from "@/components/top/Top";

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
  }, [dispatch]);

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
  /** Loading at the root to persist reactive data to the store */
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
