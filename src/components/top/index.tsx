import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { signInWithPopup } from "firebase/auth";
import { useSnackbar } from "@/contexts/Snackbar";
import useUser from "@/hooks/useUser";
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/modules/authSlice";
import { auth, googleAuthProvider } from "@/firebase";
import DialogSignup from "@/components/top/DialogSignup";
import "./index.scss";

const Top = () => {
  const features = [
    {
      title: "無料",
      text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
      photo: "https://placehold.jp/300x300.png",
    },
    {
      title: "シンプル",
      text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
      photo: "https://placehold.jp/300x300.png",
    },
    {
      title: "すぐにマッチ",
      text: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト",
      photo: "https://placehold.jp/300x300.png",
    },
  ];
  /** Sign in */
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { getUserDoc } = useUser();
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleSignIn = async (): Promise<void> => {
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
      <header>
        <div className="container">
          <img src="https://placehold.jp/150x50.png" />
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <div className="left">
            <div className="text">
              <h2>
                <span className="desktop">
                  インストール不要のチャットサービス
                </span>
                <span className="mobile">
                  インストール不要の
                  <br />
                  チャットサービス
                </span>
              </h2>
              <p>
                Lite
                chatはチャットやビデオ通話を気軽に楽しめる無料サービスです。
              </p>
              <p>さぁ始めましょう！</p>
            </div>
            <div className="buttons">
              <DialogSignup />
              <LoadingButton
                className="sign-in-button"
                loading={loading}
                variant="contained"
                onClick={handleSignIn}
              >
                サインイン
              </LoadingButton>
            </div>
          </div>
          <div className="right">
            <img src="/hero.png" alt="hero image" />
          </div>
        </div>
      </section>
      <section className="features">
        <h2>ー 特徴 ー</h2>
        <div className="container">
          {features.map((f) => (
            <div className="feature" key={f.title}>
              <img src={f.photo} alt="feature" />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Top;
