import React, { Component } from "react";
import LogoImg from "./job.png";
import styles from "../../Users.css";

class Logo extends Component {
  render() {
    return (
      <div className={styles.logo}>
        <img src={LogoImg} alt="LOGO" />
      </div>
    );
  }
}

export default Logo;
