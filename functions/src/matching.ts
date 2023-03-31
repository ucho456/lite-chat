import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Timestamp } from "firebase-admin/firestore";
import { roomConverter, userConverter } from "./converter";
const firestore = admin.firestore();

const sleep = (second: number) =>
  new Promise((resolve) => setTimeout(resolve, second * 1000));

const matching = functions
  .region("asia-northeast1")
  .https.onCall(async (data, context) => {
    const meUid = data.uid as string; //Todo contextから取得すべき
    const youSex = data.youSex as "man" | "woman";
    const meRef = firestore.doc(`users/${meUid}`).withConverter(userConverter);
    let responseBody: { roomId: string | null; ok: boolean } = {
      roomId: null,
      ok: false,
    };

    for (let i = 0; i < 100; i++) {
      functions.logger.log(`${i + 1}回目`);
      /** Get 1 waiting user within 1 minute ago. */
      let youUid = "";
      await firestore
        .collection("users")
        .withConverter(userConverter)
        .where("waitingState", "==", "waiting")
        .where("sex", "==", youSex)
        .orderBy("waitingStartAt")
        .startAt(
          Timestamp.fromDate(new Date(new Date().getTime() - 1 * 60 * 1000))
        )
        .endAt(Timestamp.fromDate(new Date()))
        .limit(20)
        .get()
        .then((result) => {
          result.forEach((doc) => {
            if (doc.exists && doc.id !== meUid) {
              youUid = doc.id;
            }
          });
        });
      functions.logger.log({ youUid });

      /** If there are no waiting users, break if me matched, else wait 3 seconds and continue looping */
      if (youUid === "") {
        const meSnap = await firestore
          .doc(`users/${meUid}`)
          .withConverter(userConverter)
          .get();
        if (meSnap.data()?.waitingState === "matched") {
          responseBody = { roomId: meSnap.data()?.roomId!, ok: true };
          break;
        } else {
          functions.logger.log("sleep");
          await sleep(3);
          continue;
        }
      }

      const result: { roomId: string | null; ok: boolean } =
        await firestore.runTransaction(async (t) => {
          /** Check if me and you are waiting */
          const meSnap = await t.get(meRef);
          if (meSnap.data()?.waitingState! === "matched") {
            return {
              roomId: meSnap.data()?.roomId!,
              ok: true,
            };
          }
          const youRef = firestore
            .doc(`users/${youUid}`)
            .withConverter(userConverter);
          const youSnap = await t.get(youRef);
          if (youSnap.data()?.waitingState! === "matched") {
            return { roomId: null, ok: false };
          }

          /** Create a room and match me and you */
          const roomRef = firestore
            .collection("rooms")
            .doc()
            .withConverter(roomConverter);
          const roomId = roomRef.id;
          t.create(roomRef, {
            id: roomId,
            users: {
              A: {
                uid: meSnap.id,
                name: meSnap.data()?.name!,
                photo: meSnap.data()?.photo!,
              },
              B: {
                uid: youSnap.id,
                name: youSnap.data()?.name!,
                photo: youSnap.data()?.photo!,
              },
            },
            isLeave: false,
            limitAt: Timestamp.now(),
          });
          t.update(meRef, { waitingState: "matched", roomId });
          t.update(youRef, { waitingState: "matched", roomId });
          return { roomId, ok: true };
        });

      if (result.ok) {
        responseBody = result;
        break;
      }
    }

    return responseBody;
  });

export default matching;
