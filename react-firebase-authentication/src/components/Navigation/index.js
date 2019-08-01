import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";

import * as ROUTES from "../../constants/routes";
import * as ROLES from '../../constants/roles';

import { AuthUserContext } from "../Session";
import '../Navigation/navigation.css';

import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown } from "mdbreact";


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
  <MDBNavbar color="#9c27b0 purple" dark expand="md">
       <MDBNavItem>
        <MDBNavLink to={ROUTES.LANDING}>Welcome</MDBNavLink>
      </MDBNavItem>
     
      <MDBNavItem>
        <MDBNavLink to={ROUTES.HOME}>Home</MDBNavLink>
      </MDBNavItem>

      <MDBNavItem>
        <MDBNavLink to={ROUTES.ACCOUNT}>Account</MDBNavLink>
      </MDBNavItem>
        
      <MDBNavItem>
      {!!authUser.roles[ROLES.ADMIN] && (
      <MDBNavLink to={ROUTES.ACCOUNT}>Admin</MDBNavLink>
      )}
      </MDBNavItem>

      <MDBNavItem>
      <MDBNavLink to={ROUTES.HOME}>  <SignOutButton />  </MDBNavLink>
      </MDBNavItem>


</MDBNavbar>
)



class NavigationNonAuth extends Component {
  state = {
    isOpen: false
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  
  render() {
    return (
      <MDBNavbar color="#9c27b0 purple" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Parentips</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to={ROUTES.LANDING}>Welcome</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to={ROUTES.SIGN_IN}>Sign In</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              {/* <MDBNavLink to="#!">Pricing</MDBNavLink> */}
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        
        </MDBCollapse>
      </MDBNavbar>
      );

      
    }
  }


export default Navigation;







