import { memo, useState } from "react";
import { Avatar, Dialog } from "@mui/material";
import { AVATAR_SIZE_L, ERAS, MAN, WOMAN } from "@/utils/constants";
import "./DialogProfile.scss";

type Props = {
  you: RoomUser;
};

const DialogProfile = memo(({ you }: Props) => {
  /** Dialog switch */
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sex = you.sex === "man" ? MAN : WOMAN;
  const era = ERAS.find((e) => e.value === you.era);

  if (!era) return <></>;
  return (
    <div className="dialog-profile">
      <div className="user-column" onClick={handleOpen}>
        <Avatar className="avatar" src={you.photo ?? "/images/avatar.webp"} />
        <div className="name">{you.name}</div>
      </div>
      <Dialog className="dialog-profile" open={open} onClose={handleClose}>
        <div className="container">
          <div className="photo-row">
            <Avatar
              src={you.photo ?? "/images/avatar.webp"}
              sx={{
                width: AVATAR_SIZE_L,
                height: AVATAR_SIZE_L,
                margin: "0 auto",
              }}
            />
          </div>
          <div className="profile-row">
            <p className="name">{you.name}</p>
            <p>
              {sex} {era.name}
            </p>
            <p>{you.selfIntroduction}</p>
          </div>
        </div>
      </Dialog>
    </div>
  );
});

DialogProfile.displayName = "DialogProfile";

export default DialogProfile;
