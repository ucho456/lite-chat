import { onSnapshot } from "firebase/firestore";
import useSignal from "../hooks/useSignal";
const { deleteSignalDoc, getSignalDocRef, setSignalDoc } = useSignal();

export type SetRtcClient = (rtcClient: RtcClient) => void;

export default class RtcClient {
  rtcPeerConnection: RTCPeerConnection;
  localPeerName: string;
  remotePeerName: string;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  _setRtcClient: SetRtcClient;
  mediaStream: MediaStream | null;
  // isSaveReceivedSessionDescription: boolean;

  constructor(
    remoteVideoRef: React.RefObject<HTMLVideoElement>,
    setRtcClient: SetRtcClient,
    localPeerName: string
  ) {
    this.rtcPeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    });
    this.localPeerName = localPeerName;
    this.remotePeerName = "";
    this.remoteVideoRef = remoteVideoRef;
    this._setRtcClient = setRtcClient;
    this.mediaStream = null;
    // this.isSaveReceivedSessionDescription = false;
  }

  setRtcClient() {
    this._setRtcClient(this);
  }

  async startListening(localPeerName: string) {
    this.localPeerName = localPeerName;
    this.setRtcClient();
    const signalRef = getSignalDocRef(this.localPeerName);
    await deleteSignalDoc(this.localPeerName);
    onSnapshot(signalRef, async (doc) => {
      if (doc.exists()) {
        const { candidate, sender, sessionDescription, type } = doc.data();
        switch (type) {
          case "offer":
            // if (sessionDescription && !this.isSaveReceivedSessionDescription) {
            //   this.isSaveReceivedSessionDescription = true;
            //   await this.sendAnswer(sender, sessionDescription);
            // }
            if (sessionDescription) {
              await this.sendAnswer(sender, sessionDescription);
            }
            break;
          case "answer":
            // if (sessionDescription && !this.isSaveReceivedSessionDescription) {
            //   this.isSaveReceivedSessionDescription = true;
            //   await this.saveReceivedSessionDescription(sessionDescription);
            // }
            if (sessionDescription) {
              await this.saveReceivedSessionDescription(sessionDescription);
            }
            break;
          case "candidate":
            if (candidate) {
              await this.addIceCandidate(candidate);
            }
            break;
          default:
            this.setRtcClient();
            break;
        }
      }
    });
  }

  async setMediaStream() {
    try {
      const constrains = { audio: true, video: true };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constrains);
      const audioTrack = this.mediaStream.getAudioTracks()[0];
      this.rtcPeerConnection.addTrack(audioTrack, this.mediaStream);
      const videoTrack = this.mediaStream.getVideoTracks()[0];
      this.rtcPeerConnection.addTrack(videoTrack, this.mediaStream);
      this.setRtcClient();
    } catch (error: any) {
      alert(error.message);
    }
  }

  async connect(remotePeerName: string) {
    this.remotePeerName = remotePeerName;
    this.setOnicecandidateCallback();
    this.setOntrack();
    await this.sendOffer();
    this.setRtcClient();
  }

  setOnicecandidateCallback() {
    this.rtcPeerConnection.onicecandidate = async ({ candidate }) => {
      if (candidate && this.rtcPeerConnection.localDescription) {
        const sessionDescription =
          this.rtcPeerConnection.localDescription.toJSON();
        await setSignalDoc(this.remotePeerName, {
          type: "candidate",
          sender: this.localPeerName,
          sessionDescription,
          candidate: candidate.toJSON(),
        });
      }
    };
  }

  setOntrack() {
    this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
      if (
        rtcTrackEvent.track.kind !== "video" ||
        !this.remoteVideoRef.current
      ) {
        return;
      }
      const remoteMediaStream = rtcTrackEvent.streams[0];
      this.remoteVideoRef.current.srcObject = remoteMediaStream;
      this.setRtcClient();
    };
    this.setRtcClient();
  }

  async sendOffer() {
    try {
      const offer = await this.rtcPeerConnection.createOffer();
      await this.rtcPeerConnection.setLocalDescription(offer);
      if (this.rtcPeerConnection.localDescription) {
        await setSignalDoc(this.remotePeerName, {
          type: "offer",
          sender: this.localPeerName,
          sessionDescription: { type: offer.type, sdp: offer.sdp },
          candidate: null,
        });
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  async sendAnswer(sender: string, sessionDescription: SessionDescription) {
    try {
      /** recieved offer */
      this.remotePeerName = sender;
      this.setOnicecandidateCallback();
      this.setOntrack();
      await this.rtcPeerConnection.setRemoteDescription(sessionDescription);

      /** send answer */
      const answer = await this.rtcPeerConnection.createAnswer();
      await this.rtcPeerConnection.setLocalDescription(answer);
      if (this.rtcPeerConnection.localDescription) {
        const sessionDescription =
          this.rtcPeerConnection.localDescription.toJSON();
        await setSignalDoc(this.remotePeerName, {
          type: "answer",
          sender: this.localPeerName,
          sessionDescription,
          candidate: null,
        });
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  async saveReceivedSessionDescription(sessionDescription: SessionDescription) {
    try {
      await this.rtcPeerConnection.setRemoteDescription(sessionDescription);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async addIceCandidate(candidate: RTCIceCandidateInit) {
    try {
      const iceCandidate = new RTCIceCandidate(candidate);
      await this.rtcPeerConnection.addIceCandidate(iceCandidate);
    } catch (error: any) {
      alert(error.message);
    }
  }
}
