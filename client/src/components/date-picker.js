import React, { Fragment } from "react";
import { DatePicker } from "material-ui-pickers";

const CustomDatePicker = props => {
  return (
    <Fragment>
      <DatePicker
        placeholder="Select A Date"
        value={props.selectedDate}
        onChange={!props.isHome ? props.fetchCurrencies : props.updateDate}
        minDate={"1996/04/16"}
        disableFuture
        showTodayButton
        openToYearSelection
        format="DD/MM/YYYY"
        keyboard
      />
    </Fragment>
  );
};

export default CustomDatePicker;
