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
import DialogTermsOfService from "./DialogTermsOfService";

const Top = () => {
  const features = [
    {
      title: "無料で手軽に利用可能",
      text: "完全無料で利用可能です。Googleアカウントをお持ちの方はすぐに利用できます。",
      photo: "/free.png",
    },
    {
      title: "シンプルな使い勝手",
      text: "誰にでも使いやすいように、シンプルなレイアウトと必要最低限の機能に限定しています。",
      photo: "/simple.png",
    },
    {
      title: "簡単にマッチング",
      text: "相手の性別と年代を選択するだけで、条件に合う人とランダムにマッチングできます。煩雑な設定や操作は不要です。",
      photo: "/easy-match.png",
    },
  ];
  const QAs = [
    {
      q: "18歳未満は利用可能ですか？",
      a: "利用規約より、18歳未満の方の利用を禁止しております。18歳未満の方は本サービスのご利用をご遠慮下さい。また本サービスが原因でユーザーに損害が生じた場合、管理者は一切責任を負いませんので予めご了承下さい。",
    },
    {
      q: "推奨ブラウザはありますか？",
      a: "『Google Chrome』『Safari』『Microsoft Edge』の最新バージョンにて動作をテストしています。その他のブラウザでの動作については保証致しかねますのでご了承下さい。",
    },
    {
      q: "メールアドレスとパスワードでサインアップする事はできますか？",
      a: "現時点でGoogleアカウント以外でサインアップする方法はございません。",
    },
    {
      q: "マッチング数の上限はありますか？",
      a: "現在のマッチング数の上限は30件です。上限到達後に別のユーザーとマッチしたい場合、既存のユーザーをブロックする事で枠を空ける必要があります。",
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
          <a
            href="https://twitter.com/ucho456"
            target="_blank"
            rel="noreferrer"
          >
            お問い合わせ
          </a>
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
                  <DialogTermsOfService
                    text="利用規約"
                    textStyle={{ fontSize: "16px", color: "white" }}
                  />
                </li>
                <li>
                  <a
                    href="https://twitter.com/ucho456"
                    target="_blank"
                    rel="noreferrer"
                  >
                    お問い合わせ
                  </a>
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
