import React, {Component} from "react";
import {connect} from "dva";
import PropTypes from "prop-types";
import {Button, InputItem, List, WhiteSpace, WingBlank} from "antd-mobile";
import router from "umi/router";
import Redirect from "umi/redirect";
import Logo from "./components/Logo/Logo";
import styles from "./Users.css";


class Login extends Component {
  changeKeyValuePair = (keyValue, value) => {
    this.setState({
      [keyValue]: value
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      msg: ""
    };
  }

  UNSAFE_componentWillMount() {
    const {dispatch} = this.props;
    dispatch({type: "users/initUserAsync"}).then(data => {
      if (data.currentUser) {
        const currentUser = data.currentUser;
        console.log(currentUser);

        dispatch({type: "users/initUserSync", currentUser});
      } else {
        return null;
      }
    });
  }

  render() {
    const {username, password, msg} = this.state;
    const {dispatch, users} = this.props;
    const {redirectTo, isAuth} = users;
    const reduxMsg = "" || users.msg;
    console.log(this.state);
    return (
      <div className={styles.userLogin}>
        {redirectTo !== "" ? <Redirect to={redirectTo}></Redirect> : null}
        <Logo/>
        {msg !== "" ? <span className={styles.errorMsg}>{msg}</span> : null}
        {reduxMsg !== "" ? (
          <span className={styles.errorMsg}>{reduxMsg}</span>
        ) : null}
        <WingBlank>
          <List>
            <InputItem
              onChange={value => {
                this.changeKeyValuePair("username", value);
              }}
            >
              username:
            </InputItem>
            <WhiteSpace/>
            <InputItem
              type="password"
              onChange={value => {
                this.changeKeyValuePair("password", value);
              }}
            >
              password:
            </InputItem>
          </List>
          <WhiteSpace/>
          <Button
            onClick={() => {
              if (!username || !password) {
                return this.changeKeyValuePair(
                  "msg",
                  "Please enter username or password"
                );
              }
              return dispatch({
                type: "users/loginUserAsync",
                username,
                password
              });
            }}
            type="primary"
          >
            Local Login
          </Button>
          {/* <Button
            onClick={async () => {
              const { status, data } = await axios.get("/api/auth/google");
            }}
            type="primary"
          >
            Login with Google+
          </Button>*/}
          <WhiteSpace/>
          <Button
            onClick={() => {
              return router.push("/users/register");
            }}
            type="primary"
          >
            Register
          </Button>
        </WingBlank>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = ({users}) => ({
  users
});

export default connect(mapStateToProps)(Login);
