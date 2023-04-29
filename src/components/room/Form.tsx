import { useReducer, useRef } from "react";
import { Send } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { createMessage } from "@/utils/firestore";
import { scrollBottom } from "@/utils/scrollBottom";
import "./Form.scss";

type State = { text: string; height: number };

type Action = { type: "input"; payload: State } | { type: "reset" };

type Props = {
  user: User;
  room: Room;
  bodyRef: React.RefObject<HTMLDivElement>;
};

const Form = ({ user, room, bodyRef }: Props) => {
  /** Text form */
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const defaultTextarea = { text: "", height: 70 };
  const [textarea, setTextarea] = useReducer(
    (_state: State, action: Action): State => {
      const textareaHeight = textareaRef.current?.scrollHeight as number;
      const paddingHeight = 20;
      const footerHeight = textareaHeight + paddingHeight;
      const maxHeight = 170;
      if (action.type === "input") {
        return {
          text: action.payload.text,
          height: footerHeight <= maxHeight ? footerHeight : maxHeight,
        };
      } else {
        return { ...defaultTextarea };
      }
    },
    defaultTextarea,
  );
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setTextarea({
      type: "input",
      payload: { text: e.target.value, height: 0 },
    });
  };

  /** Send message */
  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!user || !room || textarea.text === "") return;
    await createMessage(room.id, user, textarea.text, room);
    setTextarea({ type: "reset" });
    scrollBottom(bodyRef.current);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    handleSubmit(e);
  };

  return (
    <div className="room-form" style={{ height: textarea.height + "px" }}>
      <form style={{ height: textarea.height - 20 + "px" }}>
        <textarea
          ref={textareaRef}
          value={textarea.text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={500}
        />
        <div className="button-column">
          <IconButton type="submit" onClick={handleSubmit}>
            <Send fontSize="large" />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default Form;
