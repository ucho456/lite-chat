import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "./RoomFooter.scss";

type Props = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  onClick: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => Promise<void>;
};

const RoomFooter = ({ value, onChange, onClick }: Props) => {
  return (
    <div className="room-footer">
      <form>
        <div className="container">
          <div className="input-column">
            <textarea
              onChange={(e) => onChange(e.target.value)}
              value={value}
            />
          </div>
          <div className="button-column">
            <IconButton type="submit" onClick={(e) => onClick(e)}>
              <Send fontSize="large" />
            </IconButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RoomFooter;
