import { Component, ReactNode } from "react";
import { deletePhoneDocs } from "@/utils/firestore";

type Props = {
  pc: RTCPeerConnection;
  roomId: string;
};

class Header extends Component<Props> {
  componentWillUnmount(): void {
    deletePhoneDocs(this.props.roomId);
    this.props.pc.close();
  }
  render(): ReactNode {
    return <div>Header</div>;
  }
}

export default Header;
