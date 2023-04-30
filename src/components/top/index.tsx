import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
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
  const QAs = [
    {
      q: "ブラウザで動きません",
      a: "対応していない可能性があります。",
    },
    {
      q: "ブラウザで動きません1",
      a: "対応していない可能性があります。",
    },
    {
      q: "ブラウザで動きません2",
      a: "対応していない可能性があります。",
    },
    {
      q: "ブラウザで動きません3",
      a: "対応していない可能性があります。",
    },
    {
      q: "ブラウザで動きません4",
      a: "対応していない可能性があります。",
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
      <section className="q-a">
        <h2>ー よくある質問 ー</h2>
        <div className="container">
          {QAs.map((qa) => (
            <Accordion style={{ maxWidth: "90%", margin: "0 auto" }} key={qa.q}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{qa.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{qa.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </section>
      <section className="lets-try">
        <h2>ー さぁ始めましょう！ ー</h2>
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
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <ul className="footer-links">
                <li>
                  <a href="/terms-of-use">利用規約</a>
                </li>
                <li>
                  <a href="/contact">お問い合わせ</a>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <p className="copy-right">© 2023 Lite chat</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Top;
