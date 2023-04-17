import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import RtcClient from "@/utils/RtcClient";

type Props = {
  rtcClient: RtcClient;
};

const WaitingRemote = (props: Props) => {
  const { rtcClient } = props;
  const [searchParams] = useSearchParams();
  const youUid = searchParams.get("youUid");
  const handleConnect = async () => {
    if (!youUid) return;
    await rtcClient.connect(youUid);
  };

  if (rtcClient.localPeerName === "") return <></>;
  if (rtcClient.remotePeerName !== "") return <></>;
  return (
    <div>
      <Button onClick={handleConnect}>接続</Button>
    </div>
  );
};

export default WaitingRemote;
