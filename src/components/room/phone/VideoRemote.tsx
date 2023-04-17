import RtcClient from "@/utils/RtcClient";

type Props = {
  rtcClient: RtcClient;
};

const VideoRemote = (props: Props) => {
  const { rtcClient } = props;
  return (
    <div>
      <video autoPlay ref={rtcClient.remoteVideoRef} />
    </div>
  );
};

export default VideoRemote;
