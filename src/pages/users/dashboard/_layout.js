import React, { Component } from "react";
import { NavBar, TabBar } from "antd-mobile";
import PropTypes from "prop-types";

class DashboardLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <div>Header</div>
        {children}
        <div>Footer</div>
      </div>
    );
  }
}

DashboardLayout.propTypes = {};

export default DashboardLayout;
