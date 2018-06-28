import { Component } from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import {
  Button,
  InputItem,
  List,
  Radio,
  WhiteSpace,
  WingBlank
} from "antd-mobile";
import Logo from "./components/Logo/Logo";
import styles from "./Users.css";
import router from "umi/router";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm: "",
      kind: "",
      msg: ""
    };
  }
  changeKeyValuePair = (keyValue, value) => {
    this.setState({
      [keyValue]: value
    });
  };

  render() {
    const RadioItem = Radio.RadioItem;
    const { username, password, confirm, kind, msg } = this.state;

    const { dispatch, users } = this.props;
    const reduxMsg = "" || users.msg;
    console.log(this.state);
    return (
      <div className={styles.userLogin}>
        <Logo />
        {msg !== "" ? <span className={styles.errorMsg}>{msg}</span> : null}
        {reduxMsg !== "" ? (
          <span className={styles.errorMsg}>{reduxMsg}</span>
        ) : null}
        <WingBlank>
          <List>
            <InputItem
              onChange={value => {
                return this.changeKeyValuePair("username", value);
              }}
            >
              username:
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={value => {
                return this.changeKeyValuePair("password", value);
              }}
            >
              password:
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={value => {
                return this.changeKeyValuePair("confirm", value);
              }}
            >
              confirm:
            </InputItem>
            <WhiteSpace />
            <RadioItem
              checked={kind === "genius"}
              onChange={() => {
                return this.changeKeyValuePair("kind", "genius");
              }}
            >
              Genius
            </RadioItem>
            <WhiteSpace />
            <RadioItem
              checked={kind === "boss"}
              onChange={() => {
                return this.changeKeyValuePair("kind", "boss");
              }}
            >
              Boss
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button
            onClick={() => {
              if (!username || !password) {
                return this.changeKeyValuePair(
                  "msg",
                  "Please enter username or password"
                );
              }
              if (password !== confirm) {
                return this.changeKeyValuePair(
                  "msg",
                  "Please enter same password"
                );
              }
              dispatch({
                type: "users/registerUserAsync",
                username,
                password,
                kind
              });
              return router.push("/users/login");
            }}
            type="primary"
          >
            Register
          </Button>
          <WhiteSpace />
          <Button
            type="primary"
            onClick={() => {
              return router.push("/users/login");
            }}
          >
            Return back to Login page
          </Button>
        </WingBlank>
      </div>
    );
  }
}

Register.propTypes = {
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(Register);
