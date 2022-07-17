import { all, fork } from "redux-saga/effects";

import auth from "./auth";
import account from "./account";
import emission from "./emission";
import listings from "./listings";
import facility from "./facility";
import dashboard from "./dashboard";
import users from "./users";
import company from "./company";
import approval from "./approval";
import audit from "./audit";
import tickets from "./tickets";
import reports from "./reports";
import emissionComments from "./emissionComments";
import assessment from "./assessment";

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(auth),
    fork(account),
    fork(emission),
    fork(listings),
    fork(facility),
    fork(dashboard),
    fork(users),
    fork(company),
    fork(approval),
    fork(audit),
    fork(tickets),
    fork(reports),
    fork(emissionComments),
    fork(assessment),
  ]);
}
