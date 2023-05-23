import { useEffect, useState } from "react";
import { linkWithPopup } from "firebase/auth";
import { useSnackbar } from "@/contexts/Snackbar";
import { auth, googleAuthProvider } from "@/firebase";
import Header from "@/components/rooms/Header";
import List from "@/components/rooms/List";
import "./index.scss";

const Rooms = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const currentUser = auth.currentUser;
  useEffect(() => {
    if (!currentUser) return;
    setIsAnonymous(currentUser.isAnonymous);
  }, [currentUser]);

  const { openSnackbar } = useSnackbar();
  const handleAuthenticateGoogle = async () => {
    if (!currentUser) return;
    try {
      await linkWithPopup(currentUser, googleAuthProvider);
      setIsAnonymous(false);
      openSnackbar("google認証に成功しました。", "success");
    } catch {
      openSnackbar("google認証に失敗しました。", "error");
    }
  };
  return (
    <div className="rooms">
      <Header />
      <div className="spacer" />
      <div className="list">
        <List />
        {isAnonymous ? (
          <p>
            現在お試しサインイン中です。
            <span>
              データの永続化を行うには
              <span onClick={handleAuthenticateGoogle}>こちら</span>
              からGoogle認証を行ってください。
            </span>
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Rooms;
