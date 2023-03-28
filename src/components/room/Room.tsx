import { Avatar, IconButton } from "@mui/material";
import { Logout, Phone, Send } from "@mui/icons-material";
import "./Room.scss";
import RoomDialog from "./RoomDialog";
import RoomMessage from "./RoomMessage";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { messageConverter, roomConverter } from "../../utils/converter";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";

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
  limitAt: new Date(),
};

const defaultRoomUser: RoomUser = { uid: "", name: "", photo: null };

const Room = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [room, setRoom] = useState<Room>(defaultRoom);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    const roomRef = doc(db, "rooms", roomId).withConverter(roomConverter);
    const unsubscribe = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        setRoom(doc.data());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [roomId]);

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (!roomId) {
      return;
    }
    const messageCollectionRef = collection(
      db,
      "rooms",
      roomId,
      "messages"
    ).withConverter(messageConverter);
    const q = query(messageCollectionRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnap) => {
      const result: Message[] = [];
      querySnap.forEach((doc) => {
        result.push(doc.data());
      });
      setMessages(result);
    });
    return () => {
      unsubscribe();
    };
  }, [roomId]);

  const [me, setMe] = useState<RoomUser>(defaultRoomUser);
  const [you, setYou] = useState<RoomUser>(defaultRoomUser);

  // const uid = useAppSelector((state) => state.auth.uid)
  const authUid = "Zp9V68ZeLOzCdLoXHdNBWLsdA3u0";
  useEffect(() => {
    if (!room) {
      return;
    }
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
        <div className="container">
          {messages.map((m) => (
            <RoomMessage key={m.id} message={m.text} meId={me.uid} />
          ))}
        </div>
      </div>
      <div className="footer">
        <form>
          <div className="container">
            <div className="input-column">
              <textarea />
            </div>
            <div className="button-column">
              <IconButton type="submit">
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
