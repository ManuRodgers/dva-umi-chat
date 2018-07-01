import React, { Component } from "react";
import { connect } from "dva";
import Redirect from "umi/redirect";
import PropTypes from "prop-types";
import { InputItem, TextareaItem, NavBar, List, Button } from "antd-mobile";
import styles from "./Users.css";
import AvatarSelector from "../users/components/AvatarSelector/AvatarSelector";

class BossInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      title: "",
      description: "",
      company: "",
      money: "",
      msg: ""
    };
  }

  changeKeyValuePair = (keyValue, value) => {
    this.setState({
      [keyValue]: value
    });
  };

  selectAvatar = el => {
    console.log(el.text);
    this.changeKeyValuePair("avatar", el.text);
  };

  render() {
    const { title, description, company, money, avatar, msg } = this.state;
    const { users, dispatch, location } = this.props;
    const { redirectTo } = users;
    console.log(redirectTo);

    const reduxMsg = "" || users.msg;
    console.log(users);
    console.log(this.state);
    return (
      <div className="bossInfo">
        {redirectTo !== "" && redirectTo !== location.pathname.split("/")[2] ? (
          <Redirect to={redirectTo} />
        ) : null}
        <NavBar>Complete Boss Information </NavBar>
        {avatar === "" ? (
          <div style={{ fontSize: "18px" }}>Please select your avatar</div>
        ) : (
          <div>
            <span style={{ fontSize: "18px" }}>the current avatar:</span>{" "}
            <img
              style={{ height: "20px", width: "20px" }}
              src={(() => {
                return require(`../../assets/avatarImages/${avatar}.png`);
              })()}
            />
          </div>
        )}
        <List>
          {msg !== "" ? <span className={styles.errorMsg}>{msg}</span> : null}
          {reduxMsg !== "" ? (
            <span className={styles.errorMsg}>{reduxMsg}</span>
          ) : null}
          <AvatarSelector selectAvatar={this.selectAvatar} />
          <InputItem
            onChange={value => {
              this.changeKeyValuePair("company", value);
            }}
          >
            Company
          </InputItem>
          <InputItem
            onChange={value => {
              this.changeKeyValuePair("money", value);
            }}
          >
            Money
          </InputItem>
          <InputItem
            onChange={value => {
              this.changeKeyValuePair("title", value);
            }}
          >
            Title
          </InputItem>
          <TextareaItem
            onChange={value => {
              this.changeKeyValuePair("description", value);
            }}
            title="Description"
            rows={3}
          />
          <Button
            onClick={() => {
              if (!avatar) {
                return this.changeKeyValuePair("msg", "Please enter avatar");
              }
              if (!company) {
                return this.changeKeyValuePair("msg", "Please enter company");
              }
              if (!money) {
                return this.changeKeyValuePair("msg", "Please enter money");
              }
              if (!title) {
                return this.changeKeyValuePair("msg", "Please enter title");
              }
              if (!description) {
                return this.changeKeyValuePair(
                  "msg",
                  "Please enter description"
                );
              }
              return dispatch({
                type: "users/updateBossAsync",
                avatar,
                company,
                money,
                title,
                description
              });
            }}
            type="primary"
          >
            Save
          </Button>
        </List>
      </div>
    );
  }
}

BossInfo.propTypes = {
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(BossInfo);
