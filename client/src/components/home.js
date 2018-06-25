import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import DatePicker from "../components/date-picker";
import Loader from "./loader";

const HeroScene = props => {
  const HeroScene = (
    <Fragment>
      <div className="u-align-center u-margin-top primary-header">
        <h1>Get Exchange Rates Announced By CBRT</h1>
      </div>
      <div className="u-align-center u-margin-top secondary-header">
        <DatePicker
          isHome={props.isHome}
          selectedDate={props.selectedDate}
          fetchCurrencies={props.fetchCurrencies}
          updateDate={props.updateDate}
        />
      </div>
      <div className="u-align-center u-margin-top">
        <Button variant="contained" color="default" size="large" onClick={props.fetchCurrencies}>
          RESULTS
        </Button>
      </div>
    </Fragment>
  );
  return (
    <div className="u-vertical-center">
      {props.loader ? <Loader /> : HeroScene}
    </div>
  );
};

export default HeroScene;
