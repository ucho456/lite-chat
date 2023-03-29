import * as admin from "firebase-admin";
import matching from "./matching";

admin.initializeApp();

module.exports = {
  matching,
};
