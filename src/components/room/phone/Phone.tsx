import Waiting from "./Waiting";
import VideoArea from "./VideoArea";
import { useReducer, useRef, useState } from "react";
import RtcClient, { SetRtcClient } from "../../../utils/RtcClient";
import { useAppSelector } from "../../../store/hooks";
import useOneTimeMountEffect from "../../../hooks/useOneTimeMountEffect";

const VideoPhone = () => {
  const authUid = useAppSelector((state) => state.auth.uid);
  const [rtcClient, _setRtcClient] = useState<RtcClient | null>(null);
  const remoteVideoRef = useRef(null);
  const [, forceRender] = useReducer((boolean) => !boolean, false);

  const setRtcClient: SetRtcClient = (rtcClient: RtcClient) => {
    _setRtcClient(rtcClient);
    forceRender();
  };

  useOneTimeMountEffect(() => {
    if (!authUid) return;
    const init = async () => {
      const client = new RtcClient(remoteVideoRef, setRtcClient, authUid);
      await client.setMediaStream();
    };
    init();
  });

  if (rtcClient === null) return <></>;
  return (
    <div>
      <Waiting rtcClient={rtcClient} />
      <VideoArea rtcClient={rtcClient} />
    </div>
  );
};

export default VideoPhone;
