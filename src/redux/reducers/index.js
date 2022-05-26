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

const rootReducer = {
  ...auth,
  ...account,
  ...emission,
  ...listings,
  ...facility,
  ...dashboard,
  ...users,
  ...company,
  ...approval,
  ...audit,
  ...tickets,
  ...reports,
};

export default rootReducer;
