import * as functions from "firebase-functions";

const matching = functions
  .region("asia-northeast1")
  .https.onCall(async (data, context) => {
    return "Hello, functions";
  });

export default matching;
