import { lazy, useEffect, Suspense } from "react";
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
import Top from "@/components/top";
const Room = lazy(() => import("@/components/room"));
const Rooms = lazy(() => import("@/components/rooms"));
const Error = lazy(() => import("@/components/error"));
const Phone = lazy(() => import("@/components/phone"));

const IsAuth = () => {
  /** Loading at the root to persist reactive data to the store */
  useUser();
  useRooms();

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
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Top />} />
          <Route path="/rooms" element={<IsAuth />}>
            <Route path="" element={<Rooms />} />
            <Route path=":roomId" element={<Room />} />
            <Route path=":roomId/phone" element={<Phone />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
