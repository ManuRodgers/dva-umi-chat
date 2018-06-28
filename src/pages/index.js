import React, { Component } from "react";

class App extends Component {
  render() {
    const { location } = this.props;
    console.log(location);

    return <div>App</div>;
  }
}

App.propTypes = {};

export default App;
