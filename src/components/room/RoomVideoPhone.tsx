import { Phone } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type Props = {
  me: RoomUser;
  you: RoomUser;
};

const RoomVideoPhone = (props: Props) => {
  const { me, you } = props;

  const getMedia = async () => {
    const constraints = { audio: true, video: true };
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handlePhone = async () => {
    await getMedia();
  };

  return (
    <div>
      <IconButton onClick={() => handlePhone()}>
        <Phone fontSize="large" />
      </IconButton>
    </div>
  );
};

export default RoomVideoPhone;
