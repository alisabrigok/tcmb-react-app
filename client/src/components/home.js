import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DatePicker from '../components/date-picker';
import Loader from './loader';

const HeroScene = props => {
  const HeroScene = (
    <Fragment>
      <div className="u-align-center u-margin-top primary-header">
        <h1>Get Exchange Rates Announced By CBRT</h1>
      </div>
      <div className="u-align-center u-margin-top secondary-header datepicker-container">
        <DatePicker
          isHome={props.isHome}
          selectedDate={props.selectedDate}
          fetchCurrencies={props.fetchCurrencies}
          updateDate={props.updateDate}
        />
      </div>
      <div className="u-align-center u-margin-top button-container">
        <Button
          variant="outlined"
          color="default"
          size="large"
          onClick={props.fetchCurrencies}
        >
          RESULTS
        </Button>
      </div>
    </Fragment>
  );
  // if data is being fetched, show loader else show home page hero scene.
  return (
    <div className="u-vertical-center">
      {props.loader ? <Loader /> : HeroScene}
    </div>
  );
};

export default HeroScene;
