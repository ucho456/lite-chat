import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { getCallColRef } from "@/utils/firestore";

type Props = {
  roomId: string | undefined;
  you: RoomUser | null;
};

const useWatchPhoneRequest = ({ roomId, you }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!roomId || !you) return;
    const callColRef = getCallColRef(roomId);
    const unsubscribe = onSnapshot(callColRef, async (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const result = window.confirm(
            `${you.name}さんからビデオ電話のリクエストを受けました。通話しますか？`,
          );
          if (result) {
            navigate(`/rooms/${roomId}/phone?callId=${change.doc.id}`);
          }
        }
      });
    });
    return () => unsubscribe();
  }, [roomId, navigate, you]);
};

export default useWatchPhoneRequest;
