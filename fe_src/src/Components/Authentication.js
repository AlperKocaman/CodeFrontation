import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";
function Authentication() {
  const NotFound = () => window.location.assign('/');
  return (
        <Router>
          <SignUp path="/signUp" />
          <SignIn path="/" />
          <PasswordReset path = "/passwordReset" />
          <NotFound default />
        </Router>
  );
}

export default Authentication;
