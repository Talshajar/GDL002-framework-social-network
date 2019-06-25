import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";

import * as ROUTES from "../../constants/routes";
import * as ROLES from '../../constants/roles';

import { AuthUserContext } from "../Session";
import '../Navigation/navigation.css';


const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);
const NavigationAuth = ({ authUser }) => (


  
  // <ul class="menu">
  //   <li ><a href="#" >menu</a></li>
  //   <li ><a href="#" >search</a></li>
  //   <li title="pencil"><a href="#" class="pencil">pencil</a></li>
  //   <li title="about"><a href="#" class="active about">about</a></li>
  //   <li title="archive"><a href="#" class="archive">archive</a></li>
  //   <li ><a href="#" class="contact">contact</a></li>
  // </ul>

  
  <ul className="menu">
    <li title="contact">
      <Link to={ROUTES.LANDING} className="contact">Landing</Link>
    </li>
    <li title="home">
      <Link to={ROUTES.HOME} id="menu-button" className="menu-button home">Home</Link>
    </li>
    <li title="search">
      <Link to={ROUTES.ACCOUNT} className="search">Account</Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
  

);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;







