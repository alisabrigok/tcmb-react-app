import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import textNormalize from "../utils/helper";
import getSymbolFromCurrency from "currency-symbol-map";

const generateTypography = (data, key) => {
  if (key !== "$" && key !== "Isim" && key !== "CurrencyName" && key !== "CrossRateOther") {
    if (data["$"]["CurrencyCode"] === "USD" && key === "CrossRateUSD") return;
    if (!data[key]) return;
    return (
      <Typography className="u-align-left" key={key} component="p">
        <span className="u-bold">{textNormalize(key) + ": "}</span>
        {data[key] && (key === "ForexBuying" || key === "ForexSelling" || key === "BanknoteBuying" || key === "BanknoteSelling") ? getSymbolFromCurrency("TRY") : null}
        {data[key]}
      </Typography>
    );
  }
};

const outputDatas = (data, selectedData) => {
  const typography = [];
  if (selectedData.length !== 0) {
    for (let key in data) {
      if (selectedData.includes(key)) {
        typography.push(generateTypography(data, key));
      }
    }
  } else {
    for (let key in data) {
      typography.push(generateTypography(data, key));
    }
  }
  return typography;
};

const CustomCard = props => {
  const flagClass = `currency-flag currency-flag-${props.currency["$"]["CurrencyCode"].toLowerCase()}`;
  return (
    <Card className="primary-bg">
      <CardContent>
        <Typography className="u-align-center" variant="headline" component="h2">
          <span className={flagClass} />
          {!props.currency["CurrencyName"] ? " " + props.currency["Isim"] + " " : " " + props.currency["CurrencyName"] + " "}
          {!getSymbolFromCurrency(props.currency["$"]["CurrencyCode"]) ? null : `(${getSymbolFromCurrency(props.currency["$"]["CurrencyCode"])})`}
        </Typography>
        {outputDatas(props.currency, props.selectedDataOpt)}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
