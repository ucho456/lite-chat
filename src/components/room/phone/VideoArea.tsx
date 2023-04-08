import RtcClient from "../../../utils/RtcClient";
import VideoLocal from "./VideoLocal";
import VideoRemote from "./VideoRemote";

type Props = {
  rtcClient: RtcClient;
};

const VideoArea = (props: Props) => {
  const { rtcClient } = props;

  return (
    <div>
      <VideoLocal rtcClient={rtcClient} />
      <VideoRemote rtcClient={rtcClient} />
    </div>
  );
};

export default VideoArea;
