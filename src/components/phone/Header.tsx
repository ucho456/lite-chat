import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { deletePhoneDocs } from "@/utils/firestore";
import DialogProfile from "@/components/commons/DialogProfile";
import "./Header.scss";

type Props = {
  pc: RTCPeerConnection;
  roomId: string;
  you: RoomUser;
};

class Header extends Component<Props> {
  componentWillUnmount(): void {
    deletePhoneDocs(this.props.roomId);
    this.props.pc.close();
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
