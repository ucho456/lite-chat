import { RouteProps, Navigate, Outlet } from "react-router-dom";

type Props = {
  beforeEnter: () => boolean;
  redirectPath: string;
} & RouteProps;

export const NavigationGuard = ({ beforeEnter, redirectPath }: Props) => {
  const beforeEnterResult = beforeEnter();
  return beforeEnterResult ? <Outlet /> : <Navigate to={redirectPath} />;
};
