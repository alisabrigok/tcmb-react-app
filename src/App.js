import React, { Component } from "react";
import Main from "./containers/main";
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from "material-ui-pickers/utils/moment-utils";

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Main />
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
