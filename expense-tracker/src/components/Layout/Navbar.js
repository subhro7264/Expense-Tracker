import React, { Fragment } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth";
import Themes from '../Pages/Themes';

const NavBar = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const isActive =useSelector((state) => state.expense.isActive);
  const isLoggedIn = !!token;
  const active=!!isActive;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/auth", { replace: true });
  };

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
        Expense Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn && (
                <Nav.Link as={NavLink} exact to="/">
                  Home
                </Nav.Link>
              )}
              {isLoggedIn && (
                <Nav.Link as={NavLink} to="/Add-Expenses">
                  Add Expense
                </Nav.Link>
              )}

     {isLoggedIn && (
                <Nav.Link as={NavLink} to="/profilePage">
                  Profile
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
            <Nav>
              {active&&<Themes/>}
              {/* <Themes/> */}
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavBar;
