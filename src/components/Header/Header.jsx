import React from "react";
import "./Header.css";
import { TypeAnimation } from "react-type-animation";

function Header(props) {
  return (
    <div className="header">
      <TypeAnimation
        // Same String at the start will only be typed once, initially
        sequence={[
          "Hello 👋",
          3000,
          "My Name is Alex Choi",
          1500,
          "I am a Student at Brown University 🏫",
          1000,
          "I am a Coder 👨‍💻",
          1500,
          "I am a Writer ✍️",
          1000,
          "I am Excited to Connect! 🤝",
          1000,
        ]}
        speed={50} // Custom Speed from 1-99 - Default Speed: 40
        style={{ fontSize: "3em" }}
        wrapper="span" // Animation will be rendered as a <span>
        repeat={Infinity} // Repeat this Animation Sequence infinitely
      />
    </div>
  );
}

export default Header;
