import { MouseEvent } from "react";
import { Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Action } from "@/components/room";
import "./Footer.scss";

type Props = {
  height: number;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: React.Dispatch<Action>;
  onClick: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => Promise<void>;
};

const Footer = ({ height, textareaRef, value, onChange, onClick }: Props) => {
  return (
    <div className="room-footer" style={{ height: height + "px" }}>
      <form style={{ height: height - 20 + "px" }}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) =>
            onChange({
              type: "input",
              payload: { text: e.target.value, height },
            })
          }
        />
        <div className="button-column">
          <IconButton type="submit" onClick={(e) => onClick(e)}>
            <Send fontSize="large" />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default Footer;
