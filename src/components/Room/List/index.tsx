import { useEffect } from "react";
import { ListStyled } from "@/components/Room/List/styled";
import useMessage from "@/hooks/useMessage";
import { scrollBottom } from "@/utils/scrollBottom";

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
    <ListStyled>
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
    </ListStyled>
  );
};

export default List;
