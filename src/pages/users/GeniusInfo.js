import React, { Component } from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import Redirect from "umi/redirect";
import { Button, InputItem, List, NavBar, TextareaItem } from "antd-mobile";
import AvatarSelector from "../users/components/AvatarSelector/AvatarSelector";

class GeniusInfo extends Component {
  selectAvatar = el => {
    console.log(el.text);
    this.setState({
      avatar: el.text
    });
  };
  changeKeyValuePair = (keyValue, value) => {
    return this.setState({
      [keyValue]: value
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      avatar: "",
      job: "",
      salary: "",
      profile: ""
    };
  }

  render() {
    const { users, dispatch, location } = this.props;
    const { msg, avatar, job, salary, profile } = this.state;
    const { redirectTo } = users;
    console.log(users);
    console.log(redirectTo);

    console.log(this.state);

    return (
      <div>
        {redirectTo !== "" && redirectTo !== location.pathname.split("/")[2] ? (
          <Redirect to={redirectTo} />
        ) : null}
        <NavBar>Complete Genius information</NavBar>
        <List>
          {avatar !== "" ? (
            <div>
              <span style={{ fontSize: "18px" }}>the current avatar:</span>{" "}
              <img
                style={{ width: "20px", height: "20px" }}
                src={(() => {
                  return require(`../../assets/avatarImages/${avatar}.png`);
                })()}
              />
            </div>
          ) : (
            <div style={{ fontSize: "18px" }}>Please select your avatar:</div>
          )}

          <AvatarSelector selectAvatar={this.selectAvatar} />
          <InputItem
            onChange={value => {
              this.changeKeyValuePair("job", value);
            }}
          >
            Job
          </InputItem>
          <InputItem
            onChange={value => {
              this.changeKeyValuePair("salary", value);
            }}
          >
            Salary
          </InputItem>
          <TextareaItem
            rows={3}
            title={`Profile`}
            onChange={value => {
              this.changeKeyValuePair("profile", value);
            }}
          />
          <Button
            onClick={() => {
              return dispatch({
                type: "users/updateGeniusAsync",
                avatar,
                job,
                salary,
                profile
              });
            }}
            type="primary"
          >
            save
          </Button>
        </List>
      </div>
    );
  }
}

GeniusInfo.propTypes = {
  users: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(GeniusInfo);
