import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import DialogProfile from "@/components/commons/DialogProfile";
import { deletePhoneDocs } from "@/utils/firestore";
import "./Header.scss";

type Props = {
  pc: RTCPeerConnection;
  localStream: MediaStream | null;
  callId: string | null;
  roomId: string;
  you: RoomUser;
};

class Header extends Component<Props> {
  componentWillUnmount(): void {
    this.props.pc.close();
    this.props.localStream?.getTracks().forEach((track) => track.stop());
    if (this.props.callId) {
      deletePhoneDocs(this.props.roomId, this.props.callId);
    }
  }
  render(): ReactNode {
    return (
      <div className="phone-header">
        <div className="container">
          <div className="leave-column">
            <Link to={`/rooms/${this.props.roomId}`}>
              <IconButton>
                <ChevronLeft fontSize="large" />
              </IconButton>
            </Link>
          </div>
          <div className="photo-column">
            <DialogProfile you={this.props.you} />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
