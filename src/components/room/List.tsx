import { useEffect } from "react";
import useMessage from "@/hooks/useMessage";
import { scrollBottom } from "@/utils/scrollBottom";
import "./List.scss";

type Props = {
  bodyRef: React.RefObject<HTMLDivElement>;
  me: RoomUser;
};

const List = ({ bodyRef, me }: Props) => {
  /** messages */
  const { messages } = useMessage();

  /** Scroll bottom after mounted */
  const bodyCurrent = bodyRef.current;
  useEffect(() => {
    scrollBottom(bodyCurrent);
  }, [bodyCurrent]);

  return (
    <div className="room-list">
      <div className="container" ref={bodyRef}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`room-message ${me.uid === m.uid ? "right" : "left"}`}
          >
            <p>{m.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
