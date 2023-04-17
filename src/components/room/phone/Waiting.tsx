import RtcClient from "@/utils/RtcClient";
import WaitingLocal from "@/components/room/phone/WaitingLocal";
import WaitingRemote from "@/components/room/phone/WaitingRemote";

type Props = {
  rtcClient: RtcClient;
};

const Waiting = (props: Props) => {
  const { rtcClient } = props;
  return (
    <div>
      <WaitingLocal rtcClient={rtcClient} />
      <WaitingRemote rtcClient={rtcClient} />
    </div>
  );
};

export default Waiting;
