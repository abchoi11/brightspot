import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";

function Navbar(props) {
  const [user] = useAuthState(auth);

  return (
    <div className="fixed-top border" style={{ backgroundColor: "whitesmoke" }}>
      <nav className="navbar">
        <div>
          <h2>hello</h2>
        </div>
        <Link className="nav-link" to="/">
          Home{" "}
        </Link>
        <Link className="nav-link" to="/login">
          Login{" "}
        </Link>
        <Link className="nav-link" to="/register">
          Sign Up{" "}
        </Link>
        <Link className="nav-link" to="/create">
          Add Article{" "}
        </Link>
        <div>
          {user && (
            <>
              <span className="pe-4">
                Signed is as {user.displayName || user.email}
              </span>
              <button className="btn btn-primary btn-sm me-3" onClick={() =>{signOut(auth)}}>Logout</button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
