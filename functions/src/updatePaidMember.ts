import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const updatePaidMember = functions
  .region("asia-northeast1")
  .auth.user()
  .onCreate(async (user) => {
    await admin.auth().setCustomUserClaims(user.uid, {
      initSetting: false,
      suspended: false,
      subscription: false,
    });
    return null;
  });

export default updatePaidMember;
