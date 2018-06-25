import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import textNormalize from '../utils/helper';
import getSymbolFromCurrency from 'currency-symbol-map';

// Skip data option values of the below conditions and render the rest
const generateTypography = (data, key) => {
  if (
    key !== '$' &&
    key !== 'Isim' &&
    key !== 'CurrencyName' &&
    key !== 'CrossRateOther'
  ) {
    if (data['$']['CurrencyCode'] === 'USD' && key === 'CrossRateUSD') return;
    if (!data[key]) return;
    return (
      <Typography className="u-align-left" key={key} component="p">
        <span className="u-bold">{textNormalize(key) + ': '}</span>
        {/* Below these conditional data options values are only belong to Turkish Lira equivalance */}
        {data[key] &&
        (key === 'ForexBuying' ||
          key === 'ForexSelling' ||
          key === 'BanknoteBuying' ||
          key === 'BanknoteSelling')
          ? getSymbolFromCurrency('TRY')
          : null}
        {data[key]}
      </Typography>
    );
  }
};

const outputDatas = (data, selectedData) => {
  const typography = [];
  // if a filter for data option is provided
  if (selectedData.length !== 0) {
    // loop through each currency array of objects and if filter and the key matches, generate the JSX
    for (let key in data) {
      if (selectedData.includes(key)) {
        typography.push(generateTypography(data, key));
      }
    }
  } else {
    // if no filter, generate them all
    for (let key in data) {
      typography.push(generateTypography(data, key));
    }
  }
  return typography;
};

const CustomCard = props => {
  const flagClass = `currency-flag currency-flag-${props.currency['$'][
    'CurrencyCode'
  ].toLowerCase()}`;
  return (
    <Card className="primary-bg">
      <CardContent>
        <Typography
          className="u-align-center"
          variant="headline"
          component="h2"
        >
          <span className={flagClass} />
          {/* The api doesn't include English names of the currencies time to time, if so get Turkish ones */}
          {!props.currency['CurrencyName']
            ? ' ' + props.currency['Isim'] + ' '
            : ' ' + props.currency['CurrencyName'] + ' '}
          {!getSymbolFromCurrency(props.currency['$']['CurrencyCode'])
            ? null
            : `(${getSymbolFromCurrency(props.currency['$']['CurrencyCode'])})`}
        </Typography>
        {outputDatas(props.currency, props.selectedDataOpt)}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
