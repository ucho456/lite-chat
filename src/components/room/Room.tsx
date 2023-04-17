import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logout, Phone, Send } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import useMessage from "@/hooks/useMessage";
import { useAppSelector } from "@/store/hooks";
import { createMessage } from "@/utils/writeToFirestore";
import RoomMessage from "@/components/room/RoomMessage";
import "./Room.scss";

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const rooms = useAppSelector((state) => state.rooms.rooms);
  const room = rooms.find((r) => r.id === roomId);
  const { messages } = useMessage();

  const user = useAppSelector((state) => state.user.user);
  const [me, setMe] = useState<RoomUser | null>(null);
  const [you, setYou] = useState<RoomUser | null>(null);
  useEffect(() => {
    if (!room || !user) return;
    const userA = room.inviteeUser;
    const userB = room.invitedUser;
    if (userA.uid === user.uid) {
      setMe(userA);
      setYou(userB);
    } else {
      setMe(userB);
      setYou(userA);
    }
  }, [room, user]);

  const [inputText, setInputText] = useState<string>("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (
      !user ||
      !roomId ||
      !bodyRef ||
      !bodyRef.current ||
      !room ||
      inputText === ""
    ) {
      return;
    }

    await createMessage(roomId, user, inputText, room);
    setInputText("");
    bodyRef.current.scrollTo(
      0,
      bodyRef.current.scrollHeight - bodyRef.current.clientHeight,
    );
  };

  const navigate = useNavigate();
  const handleLeave = () => {
    navigate("/");
  };
  const handlePhone = () => {
    if (!me || !you) return;
    navigate(`/room/${roomId}/phone?meUid=${me.uid}&youUid=${you.uid}`);
  };

  if (!me || !you) return <></>;
  return (
    <div className="room">
      <div className="header">
        <div className="container">
          <div className="photo-column">
            {you.photo ? (
              <Avatar src={you.photo} />
            ) : (
              <Avatar src="/avatar.png" />
            )}
          </div>
          <div className="name-column">{you.name}</div>
          <div className="phone-column">
            <IconButton onClick={() => handlePhone()}>
              <Phone fontSize="large" />
            </IconButton>
          </div>
          <div className="leave-column">
            <IconButton onClick={() => handleLeave()}>
              <Logout fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="container" ref={bodyRef}>
          {messages.map((m) => (
            <RoomMessage key={m.id} message={m} meUid={me.uid} />
          ))}
        </div>
      </div>
      <div className="footer">
        <form>
          <div className="container">
            <div className="input-column">
              <textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setInputText(e.target.value)
                }
                value={inputText}
              />
            </div>
            <div className="button-column">
              <IconButton
                type="submit"
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  sendMessage(e)
                }
              >
                <Send fontSize="large" />
              </IconButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Room;
