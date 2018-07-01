import React, { Component } from "react";
import { Grid } from "antd-mobile";
import PropTypes from "prop-types";
class AvatarSelector extends Component {
  render(){
    const { selectAvatar } = this.props;
    const avatarList = "boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra"
      .split(",")
      .map(item => item);
    const data = avatarList.map(item => {
      return {
        icon: require(`../../../../assets/avatarImages/${item}.png`),
        text: item
      };
    });
    return (
      <div className="avatarSelector">
        <Grid onClick={selectAvatar} columnNum={5} data={data} />
      </div>
    );
  }
}

AvatarSelector.propTypes = {
  selectAvatar: PropTypes.func.isRequired
};

export default AvatarSelector;
