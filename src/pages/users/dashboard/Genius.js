import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class Genius extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bossList: [],
      msg: ""
    };
  }

  async componentDidMount() {
    const { status, data } = await axios.get("/api/user/list?kind=boss");
    if (status === 200 && data.code === 0) {
      this.setState({ bossList: data.users });
    } else {
      this.setState({ msg: data.msg });
    }
  }

  render() {
    const { bossList } = this.state;
    console.log(this.state);

    return <div>Genius</div>;
  }
}

Genius.propTypes = {};

export default Genius;
