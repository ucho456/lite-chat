import RtcClient from "@/utils/RtcClient";
import VideoLocal from "@/components/room/phone/VideoLocal";
import VideoRemote from "@/components/room/phone/VideoRemote";

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
