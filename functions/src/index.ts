import * as admin from "firebase-admin";
admin.initializeApp();

import matching from "./matching";

module.exports = {
  matching,
};
