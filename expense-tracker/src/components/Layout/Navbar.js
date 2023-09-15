import React, { Fragment, useContext } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import AuthContext from "../store/auth-context";

const NavBar = ({ onShowCart }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/auth", { replace: true });
  };

  return (
    <Fragment>
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand as={NavLink} to="/">Subhro</Navbar.Brand>
          <Nav className="me-auto">
            {isLoggedIn && (
              <Nav.Link exact as={NavLink} to="/">
                Home
              </Nav.Link>
            )}
           
            {isLoggedIn && (
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link as={NavLink} to="/contactUs">
                Contact Us
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {!isLoggedIn && (
              <Nav.Link as={NavLink} to="/auth">
                Login
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Button variant="outline-danger" onClick={logoutHandler}>
                Logout
              </Button>
            )}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Fragment>
  );
};

export default NavBar;