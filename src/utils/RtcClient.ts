export type SetRtcClient = (
  rtcClient: RtcClient,
  me: string,
  you: string
) => void;

export default class RtcClient {
  rtcPeerConnection: RTCPeerConnection;
  meUid: string;
  youUid: string;
  _setRtcClient: SetRtcClient;
  mediaStream: MediaStream | null;

  constructor(setRtcClient: SetRtcClient) {
    this.rtcPeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    });
    this.meUid = "";
    this.youUid = "";
    this._setRtcClient = setRtcClient;
    this.mediaStream = null;
  }

  setUids(meUid: string, youUid: string) {
    this.meUid = meUid;
    this.youUid = youUid;
  }

  setRtcClient() {
    this._setRtcClient(this, this.meUid, this.youUid);
  }

  async getUserMedia() {
    try {
      const constrains = { audio: true, video: true };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constrains);
    } catch (error: any) {
      alert(error.message);
    }
  }
}
