import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import DialogSignup from "@/components/Top/DialogSignup";
import DialogTermsOfService from "@/components/Top/DialogTermsOfService";
import { TopStyled } from "@/components/Top/styled";
import { useSnackbar } from "@/contexts/Snackbar";
import useUser from "@/hooks/useUser";
import { useAppDispatch } from "@/store/hooks";
import { signIn } from "@/store/modules/authSlice";
import { MATCH_LIMIT, MESSAGE_LIMIT } from "@/utils/constants";
import { auth, googleAuthProvider } from "@/firebase";

const Top = () => {
  const features = [
    {
      title: "無料で手軽に利用可能",
      text: "完全無料で利用可能です。簡単なプロフィールを入力してすぐに開始できます。",
      photo: "/images/free.webp",
    },
    {
      title: "シンプルな使い勝手",
      text: "誰にでも使いやすいように、シンプルなレイアウトと必要最低限の機能に限定しています。",
      photo: "/images/simple.webp",
    },
    {
      title: "簡単にマッチング",
      text: "相手の性別と年代を選択するだけで、条件に合う人とランダムにマッチングできます。煩雑な設定や操作は不要です。",
      photo: "/images/easy-match.webp",
    },
  ];
  const QAs = [
    {
      q: "18歳未満は利用可能ですか?",
      a: "利用規約より、18歳未満の方の利用を禁止しております。18歳未満の方は本サービスのご利用をご遠慮下さい。また本サービスが原因でユーザーに損害が生じた場合、管理者は一切責任を負いませんので予めご了承下さい。",
    },
    {
      q: "推奨ブラウザはありますか?",
      a: "『Google Chrome』の最新バージョンにて動作をテストしています。その他のブラウザでの動作については保証致しかねますのでご了承下さい。",
    },
    {
      q: "マッチング数の上限はありますか?",
      a: `現在のマッチング数の上限は${MATCH_LIMIT}件です。上限到達後に別のユーザーとマッチしたい場合、既存のユーザーをブロックする事で枠を空ける必要があります。`,
    },
    {
      q: "過去のメッセージの内容が遡れません。",
      a: `最新のメッセージから${MESSAGE_LIMIT}件表示する仕様になっています。今後のアップデートでメッセージを遡る機能を追加します。今暫くお待ち下さいませ。`,
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

  /** Sign in for test user */
  const [searchParams] = useSearchParams();
  const testUser = searchParams.get("testUser");
  const handleSignInTest = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: "taro" | "hanako",
  ): Promise<void> => {
    e.preventDefault();
    const env = import.meta.env;
    const email = user === "taro" ? env.VITE_TARO_EMAIL : env.VITE_HANAKO_EMAIL;
    const password =
      user === "taro" ? env.VITE_TARO_PASSWORD : env.VITE_HANAKO_PASSWORD;
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
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
    <TopStyled>
      <header>
        <div className="container">
          <img src="https://placehold.jp/150x50.png" alt="logo" />
          <div onClick={handleSignIn}>サインイン</div>
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
              {testUser === "true" ? (
                <>
                  <LoadingButton
                    className="sign-in-button"
                    loading={loading}
                    variant="contained"
                    onClick={(e) => handleSignInTest(e, "taro")}
                  >
                    太郎サインイン
                  </LoadingButton>
                  <LoadingButton
                    className="sign-in-button"
                    loading={loading}
                    variant="contained"
                    onClick={(e) => handleSignInTest(e, "hanako")}
                  >
                    花子サインイン
                  </LoadingButton>
                </>
              ) : (
                <>
                  <DialogSignup />
                </>
              )}
            </div>
          </div>
          <div className="right">
            <img src="/images/hero.webp" alt="hero image" />
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
          {QAs.map((qa, i) => (
            <Accordion style={{ maxWidth: "90%", margin: "0 auto" }} key={qa.q}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id={`panel${i}-header`}
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
                    href="https://twitter.com/lite_chat"
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
    </TopStyled>
  );
};

export default Top;
