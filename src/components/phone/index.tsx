import { useReducer } from "react";
import useRtcClient from "@/hooks/useRtcClient";

const Phone = () => {
  const { handleConnect, localVideoRef, remoteVideoRef, rtcPeerConnection } =
    useRtcClient();

  const [, forceRender] = useReducer((boolean) => !boolean, false);

  return (
    <div>
      <button onClick={handleConnect}>おせ</button>
      <video autoPlay muted ref={localVideoRef} />
    </div>
  );
};

export default Phone;
