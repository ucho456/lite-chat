import { lazy, useEffect, Suspense, StrictMode } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import Top from "@/components/Top";
import { SnackbarContextProvider } from "@/contexts/Snackbar";
import useRooms from "@/hooks/useRooms";
import useUser from "@/hooks/useUser";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { isFirstAuthChecked } from "@/store/modules/authSlice";
import { store } from "@/store/store";
import { auth } from "@/firebase";
import "./main.css";

const Room = lazy(() => import("@/components/Room"));
const Rooms = lazy(() => import("@/components/Rooms"));
const Error = lazy(() => import("@/components/Error"));
const Phone = lazy(() => import("@/components/Phone"));

const IsAuth = () => {
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
    return null;
  } else if (uid) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarContextProvider>
        <Router>
          <Suspense fallback={null}>
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
        </Router>
      </SnackbarContextProvider>
    </Provider>
  </StrictMode>,
);
