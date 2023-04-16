import { Avatar, IconButton } from "@mui/material";
import { Logout, Phone, Send } from "@mui/icons-material";
import "./Room.scss";
import RoomMessage from "./RoomMessage";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import useRoom from "../../hooks/useRoom";
import useMessage from "../../hooks/useMessage";

const defaultRoomUser: { uid: string; name: string; photo: string | null } = {
  uid: "",
  name: "",
  photo: null,
};

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { addMessageDoc, messages } = useMessage();
  const { room } = useRoom();

  const authUid = useAppSelector((state) => state.auth.uid);
  const [me, setMe] = useState<{
    uid: string;
    name: string;
    photo: string | null;
  }>(defaultRoomUser);
  const [you, setYou] = useState<{
    uid: string;
    name: string;
    photo: string | null;
  }>(defaultRoomUser);
  useEffect(() => {
    if (!room) return;
    const userA = room.inviteeUser;
    const userB = room.invitedUser;
    if (userA.uid === authUid) {
      setMe(userA);
      setYou(userB);
    } else {
      setMe(userB);
      setYou(userA);
    }
  }, [room]);

  const [inputText, setInputText] = useState<string>("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!roomId || !bodyRef || !bodyRef.current || inputText === "") {
      return;
    }

    await addMessageDoc(inputText);
    setInputText("");
    bodyRef.current.scrollTo(
      0,
      bodyRef.current.scrollHeight - bodyRef.current.clientHeight
    );
  };

  const navigate = useNavigate();
  const handleLeave = () => {
    navigate("/");
  };
  const handlePhone = () => {
    navigate(`/room/${roomId}/phone?meUid=${me.uid}&youUid=${you.uid}`);
  };

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
