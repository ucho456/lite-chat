import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import RtcClient from "@/utils/RtcClient";

type Props = {
  rtcClient: RtcClient;
};

const WaitingLocal = (props: Props) => {
  const { rtcClient } = props;
  const authUid = useAppSelector((state) => state.auth.uid);

  useEffect(() => {
    if (!authUid) return;
    const startListening = async () => {
      await rtcClient.startListening(authUid);
    };
    startListening();
  }, [authUid]);

  if (rtcClient.localPeerName !== "") return <></>;

  return <div>WaitingLocal</div>;
};

export default WaitingLocal;
