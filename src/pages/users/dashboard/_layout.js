import React, { Component } from "react";
import { connect } from "dva";
import router from "umi/router";
import { TabBar, NavBar } from "antd-mobile";
import PropTypes from "prop-types";
import styles from "../Users.css";

class DashboardLayout extends Component {
  render() {
    const { children, users, location } = this.props;
    const { pathname } = location;

    console.log(pathname);

    const navList = [
      {
        path: "/users/dashboard/genius",
        title: "Boss List",
        text: "boss",
        icon: "job",
        shouldHide: users.kind === "boss"
      },
      {
        path: "/users/dashboard/boss",
        title: "Genius List",
        text: "genius",
        icon: "boss",
        shouldHide: users.kind === "genius"
      },
      {
        path: "/users/dashboard/msg",
        title: "Message List",
        text: "msg",
        icon: "msg"
      },
      {
        path: "/users/dashboard/me",
        title: "Personal Information",
        text: "me",
        icon: "user"
      }
    ];

    const filteredNavList = navList.filter(item => !item.shouldHide);
    console.log(filteredNavList);

    const currentNav = navList.find(item => item.path === pathname);
    console.log(currentNav);

    return (
      <div className={styles.userDashboard}>
        <NavBar style={{ position: "sticky", width: "100%" }}>
          {currentNav.title}
        </NavBar>
        <div className="mainContent">{children}</div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          {filteredNavList.map((item, index) => {
            return (
              <TabBar.Item
                title={item.text}
                key={item.text}
                icon={{
                  uri: require(`../../../assets/tabBarImages/${item.icon}.png`)
                }}
                selectedIcon={{
                  uri: require(`../../../assets/tabBarImages/${
                    item.icon
                  }-active.png`)
                }}
                selected={pathname === item.path}
                onPress={() => {
                  return router.push(item.path);
                }}
              />
            );
          })}
        </TabBar>
      </div>
    );
  }
}

DashboardLayout.propTypes = {
  children: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(DashboardLayout);
