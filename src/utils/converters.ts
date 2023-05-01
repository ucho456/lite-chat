import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(u: User): DocumentData {
    return {
      uid: u.uid,
      name: u.name,
      photo: u.photo,
      sex: u.sex,
      era: u.era,
      selfIntroduction: u.selfIntroduction,
      life: u.life,
      roomCount: u.roomCount,
      blocks: u.blocks,
      lastActionAt: u.lastActionAt,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const d = snapshot.data();
    return {
      uid: snapshot.id,
      name: d.name,
      photo: d.photo,
      sex: d.sex,
      era: d.era,
      selfIntroduction: d.selfIntroduction,
      life: d.life,
      blocks: d.blocks,
      roomCount: d.roomCount,
    };
  },
};

export const roomConverter: FirestoreDataConverter<Room> = {
  toFirestore(r: Room): DocumentData {
    return {
      inviteeUser: r.inviteeUser,
      invitedUser: r.invitedUser,
      userUids: r.userUids,
      isBlock: r.isBlock,
      lastMessage: r.lastMessage,
      lastActionAt: r.lastActionAt,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Room {
    const d = snapshot.data();
    return {
      id: snapshot.id,
      inviteeUser: d.inviteeUser,
      invitedUser: d.invitedUser,
      userUids: d.userUids,
      isBlock: d.isBlock,
      lastMessage: d.lastMessage,
    };
  },
};

export const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore(m: Message): DocumentData {
    return {
      uid: m.uid,
      text: m.text,
      createdAt: m.createdAt,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Message {
    const d = snapshot.data();
    return {
      id: snapshot.id,
      uid: d.uid,
      text: d.text,
    };
  },
};

export const callConverter: FirestoreDataConverter<Call> = {
  toFirestore(c: Call): DocumentData {
    return {
      offer: c.offer,
      answer: c.answer,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Call {
    const d = snapshot.data();
    return {
      offer: d.offer,
      answer: d.answer,
    };
  },
};

export const offerCandidateConverter: FirestoreDataConverter<OfferCandidate> = {
  toFirestore(o: OfferCandidate): DocumentData {
    return {
      candidate: o.candidate,
      sdpMid: o.sdpMid,
      sdpMLineIndex: o.sdpMLineIndex,
      usernameFragment: o.usernameFragment,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): OfferCandidate {
    const d = snapshot.data();
    return {
      candidate: d.candidate,
      sdpMid: d.sdpMid,
      sdpMLineIndex: d.sdpMLineIndex,
      usernameFragment: d.usernameFragment,
    };
  },
};

export const answerCandidateConverter: FirestoreDataConverter<AnswerCandidate> =
  {
    toFirestore(a: AnswerCandidate): DocumentData {
      return {
        candidate: a.candidate,
        sdpMid: a.sdpMid,
        sdpMLineIndex: a.sdpMLineIndex,
        usernameFragment: a.usernameFragment,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): AnswerCandidate {
      const d = snapshot.data();
      return {
        candidate: d.candidate,
        sdpMid: d.sdpMid,
        sdpMLineIndex: d.sdpMLineIndex,
        usernameFragment: d.usernameFragment,
      };
    },
  };
