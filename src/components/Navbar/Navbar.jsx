import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { Navbar as Bar, Container, NavDropdown, Nav } from "react-bootstrap";
import logo from "../../images/logo.png";
import "./Navbar.css";

function Navbar(props) {
  const [user] = useAuthState(auth);

  return (
    <div className="fixed-top border">
      <Bar className="nav" expand="lg" variant="light">
        <Container>
          <Bar.Brand>
            <Link to="/">
              {" "}
              <img className="logo" src={logo} />{" "}
            </Link>
          </Bar.Brand>
          <Bar.Toggle aria-controls="basic-navbar-nav" />
          <Bar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {" "}
              {!user && (
                <Link to="/login" className="link">
                  Login
                </Link>
              )}
              {!user && (
                <Link to="/register" className="link">
                  Sign Up
                </Link>
              )}
              {user && user.uid == "q879qcxcrudqvyYCOAJeFfBcibs1" && (
                <Link to="/create" className="link">
                  Create an Article
                </Link>
              )}
            </Nav>
            <div>
              {user && (
                <div className="link">
                  <span className="pe-4">
                    Signed in as {user.displayName || user.email}
                  </span>
                  <button
                    className="btn btn-primary btn-sm me-3"
                    onClick={() => {
                      signOut(auth);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </Bar.Collapse>
        </Container>
      </Bar>
    </div>
  );
}

export default Navbar;
