import React, { Fragment } from 'react';
import Select from 'react-select';
import List from '@material-ui/core/List';
import textNormalize from '../utils/helper';

// this function generates an array that consists each currency name
const generateCurOptions = currencies => {
  const options = [];
  for (let key in currencies) {
    options.push({
      value: key,
      label: !currencies[key]['CurrencyName']
        ? currencies[key]['Isim']
        : currencies[key]['CurrencyName']
    });
  }
  return options;
};
// this function generates an array that consists each currency data option
const generateDataOptions = currencies => {
  const options = [];
  for (let data in currencies['USD']) {
    if (
      data !== '$' &&
      data !== 'Unit' &&
      data !== 'Isim' &&
      data !== 'CurrencyName' &&
      data !== 'CrossRateOther'
    ) {
      options.push({
        value: data,
        label: textNormalize(data)
      });
    }
  }
  return options;
};

const CustomSelect = props => {
  const currencyOptions = generateCurOptions(props.currencies);
  const dataOptions = generateDataOptions(props.currencies);

  return (
    <Fragment>
      <List>
        <Select
          className="select"
          onChange={props.handleCurrencyChange}
          options={currencyOptions}
          isMulti
          isClearable
          isSearchable={false}
          placeholder="Currency"
        />
      </List>
      <List>
        <Select
          className="select"
          onChange={props.handleDataOptChange}
          options={dataOptions}
          isMulti
          isClearable
          isSearchable={false}
          placeholder="Data Option"
        />
      </List>
    </Fragment>
  );
};

export default CustomSelect;
