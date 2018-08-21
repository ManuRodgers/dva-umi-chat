import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Flex, WhiteSpace } from "antd-mobile";
import axios from "axios";
import styles from "../Users.css";

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
    const { bossList, msg } = this.state;
    console.log(this.state);

    return (
      <div>
        {msg !== "" ? <span className={styles.errorMsg}>{msg}</span> : null}
        {bossList.length === 0 ? (
          <span>There is not boss on the market looking for some geniuses</span>
        ) : (
          <div>
            {bossList.map((boss, index) => {
              return (
                <Flex key={boss.company}>
                  <Flex.Item>
                    <Card>
                      <Card.Header
                        thumb={require(`../../../assets/avatarImages/${
                          boss.avatar
                        }.png`)}
                        title={boss.username}
                        extra={boss.title}
                      />
                      <Card.Body style={{}}>
                        the job description: {boss.description}
                      </Card.Body>
                      <Card.Footer content={boss.company} extra={boss.money} />
                    </Card>
                  </Flex.Item>
                </Flex>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

Genius.propTypes = {};

export default Genius;
