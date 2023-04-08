import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Room from "./components/room/Room";
import Rooms from "./components/room/Rooms";
import ErrorPage from "./components/error/ErrorPage";
import Top from "./components/top/Top";
import Phone from "./components/room/phone/Phone";
import { useEffect } from "react";
import { auth } from "./firebase";
import { isFirstAuthChecked } from "./store/modules/authSlice";

type Props = {
  needAuth: boolean;
  redirect: string;
};

const IsAuth = (props: Props) => {
  const { needAuth, redirect } = props;

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
  } else if ((needAuth && uid) || (!needAuth && !uid)) {
    return <Outlet />;
  } else {
    return <Navigate to={redirect} />;
  }
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<IsAuth needAuth={false} redirect="/rooms" />}>
          <Route path="/" element={<Top />} />
        </Route>
        <Route path="/rooms" element={<IsAuth needAuth redirect="/" />}>
          <Route path="" element={<Rooms />} />
          <Route path=":roomId" element={<Room />} />
          <Route path=":roomId/phone" element={<Phone />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
