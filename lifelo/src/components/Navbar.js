import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <div className="Navbar-title">Lifelo</div>

        <div className="Navbar-links">
          <div className="Navbar-link">Home</div>
          <div className="Navbar-link">About</div>
          <div className="Navbar-link">Contact</div>

          <div className="Navbar-link Navbar-link--button">Sign Up</div>
          <div className="Navbar-link Navbar-link--button">Log In</div>
          <div className="Navbar-link Navbar-link--button">Log Out</div>

          <div className="Navbar-lifelo">{this.props.lifelo}</div>
        </div>
      </div>
    );
  }
}

export default Navbar;

