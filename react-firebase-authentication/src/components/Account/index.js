import React from "react";
import { AuthUserContext, withAuthorization } from "../Session";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import { SignUpPageStyle }  from '../SignUp/SignUpStyle';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <SignUpPageStyle>
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
      </SignUpPageStyle>
    )}
  </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);