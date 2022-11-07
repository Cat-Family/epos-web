import { FC } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import authAtom from "../state/authState";
import userInfoAtom from "../state/userState";

interface IRequireAuth {
  allowedRoles: Array<number>;
}
const RequireAuth: FC<IRequireAuth> = ({ allowedRoles }) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [auth, setAuth] = useRecoilState(authAtom);
  const location = useLocation();

  return localStorage.getItem("authInfo") ? (
    JSON.parse(localStorage.getItem("userInfo") || "")?.basicInfo?.auths.find(
      (role: any) => allowedRoles?.includes(role)
    ) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/users/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
