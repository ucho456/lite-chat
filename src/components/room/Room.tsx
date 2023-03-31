import { Avatar, IconButton } from "@mui/material";
import { Logout, Phone, Send } from "@mui/icons-material";
import "./Room.scss";
import RoomDialog from "./RoomDialog";
import RoomMessage from "./RoomMessage";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { messageConverter, roomConverter } from "../../utils/converter";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import useDocument from "../../hooks/useDocument";
import useSubCollection from "../../hooks/useSubCollection";
import { db } from "../../firebase";

const defaultRoom: Room = {
  id: "",
  users: {
    A: {
      uid: "",
      name: "",
      photo: null,
    },
    B: {
      uid: "",
      name: "",
      photo: null,
    },
  },
  isLeave: false,
  limitAt: Timestamp.fromDate(new Date()),
};

const defaultRoomUser: RoomUser = { uid: "", name: "", photo: null };

const Room = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  //Todo: マッチした後roomが取れてない。
  const { document: room } = useDocument<Room>(
    "rooms",
    roomId,
    roomConverter,
    defaultRoom
  );

  const { subCollection: messages } = useSubCollection<Message>(
    "rooms",
    roomId,
    "messages",
    messageConverter,
    [orderBy("createdAt", "asc")]
  );

  //[Todo: 開発用] 匿名認証でuidが定まらない為。後々削除する。
  let authUid = useAppSelector((state) => state.auth.uid);
  authUid = "Zp9V68ZeLOzCdLoXHdNBWLsdA3u0";
  const [me, setMe] = useState<RoomUser>(defaultRoomUser);
  const [you, setYou] = useState<RoomUser>(defaultRoomUser);
  useEffect(() => {
    const userA = room.users.A;
    const userB = room.users.B;
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
    if (
      !roomId ||
      !authUid ||
      !bodyRef ||
      !bodyRef.current ||
      inputText === ""
    ) {
      return;
    }

    const messageRef = collection(
      db,
      "rooms",
      roomId,
      "messages"
    ).withConverter(messageConverter);
    await addDoc(messageRef, {
      id: doc(messageRef).id,
      uid: authUid,
      text: inputText,
      createdAt: serverTimestamp(),
    });
    setInputText("");
    bodyRef.current.scrollTo(
      0,
      bodyRef.current.scrollHeight - bodyRef.current.clientHeight
    );
  };

  const handlePhone = () => {
    window.alert("phone");
  };

  const handleLeave = () => {
    navigate("/");
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
            <RoomMessage key={m.id} message={m.text} meUid={me.uid} />
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
      <RoomDialog />
    </div>
  );
};

export default Room;
