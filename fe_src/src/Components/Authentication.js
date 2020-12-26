import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";
function Authentication() {
  return (

        <Router>
          <SignUp path="/signUp" />
          <SignIn default path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>

  );
}

export default Authentication;
