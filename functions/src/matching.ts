import * as functions from "firebase-functions";

const matching = functions
  .region("asia-northeast1")
  .https.onCall(async (data, context) => {
    return "Hello, functions";
  });

// const matching = functions
//   .region("asia-northeast1")
//   .https.onRequest(async (req, res) => {
//     // return "Hello, functions";
//     res.send("あああ");
//   });

export default matching;
