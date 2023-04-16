import { signInWithPopup } from "firebase/auth";
import SignupDialog from "./SignupDialog";
import { auth, googleAuthProvider } from "../../firebase";
import useUser from "../../hooks/useUser";
import { useSnackbar } from "../../contexts/Snackbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../store/hooks";
import { signIn } from "../../store/modules/authSlice";

const Top = () => {
  const { getUserDoc } = useUser();
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      dispatch(signIn(userCredential.user.uid));
      const user = await getUserDoc(userCredential.user.uid);
      if (user) {
        openSnackbar("サインインしました。", "success");
        navigate("/rooms");
      } else {
        openSnackbar("サインアップを完了させて下さい", "warning");
      }
    } catch {
      openSnackbar("サインインに失敗しました。", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="top">
      <div className="container">
        <div className="logo-row">
          <img src="/logo.png" />
        </div>
        <div className="discription-row">
          <p>
            登録・インストール不要。チャットや通話を気軽に楽しめるサービスです。さぁ始めましょう！
          </p>
        </div>
        <SignupDialog />
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={handleLogin}
        >
          ログイン
        </LoadingButton>
      </div>
    </div>
  );
};

export default Top;
