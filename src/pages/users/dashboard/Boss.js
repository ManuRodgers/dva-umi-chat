import React, { Component } from "react";
import axios from "axios";
import { Card, Flex, WhiteSpace } from "antd-mobile";
import PropTypes from "prop-types";
import styles from "../Users.css";

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geniusList: [],
      msg: ""
    };
  }

  async componentDidMount() {
    const { status, data } = await axios.get("/api/user/list?kind=genius");
    if (status === 200 && data.code === 0) {
      this.setState({ geniusList: data.users });
    } else {
      this.setState({ msg: data.msg });
    }
  }

  render() {
    const { geniusList, msg } = this.state;
    return (
      <div>
        {msg !== "" ? <span className={styles.errorMsg}>{msg}</span> : null}
        {geniusList.length === 0 ? (
          <span>this is no genius looking for job</span>
        ) : (
          <div>
            {geniusList.map((genius, index) => {
              <Flex key={index}>
                <Flex.Item>
                  <Card>
                    <Card.Header
                      extra={genius.job}
                      thumb={require(`../../../assets/avatarImages/${
                        genius.avatar
                      }.png`)}
                      title={genius.username}
                    />
                    <Card.Body>{genius.profile}</Card.Body>
                    <Card.Footer content={genius.salary} />
                  </Card>
                </Flex.Item>
              </Flex>;
            })}
          </div>
        )}
      </div>
    );
  }
}

Boss.propTypes = {};

export default Boss;
