import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";
import "./Register.css"

function Register(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      navigate("/");
    } catch (e) {
        window.alert(e.code)
    }
  };

  return (
    <div className="register-container bg-light">
      <h1>Register</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control register-input"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control register-input"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control register-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br></br>
      <button className="btn btn-primary" onClick={handleSignUp}>
        {" "}
        Register{" "}
      </button>
    </div>
  );
}

export default Register;
