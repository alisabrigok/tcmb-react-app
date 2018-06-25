import React, { Component, Fragment } from "react";
import Card from "../components/card";
import Grid from "@material-ui/core/Grid";
import AppBar from "./appbar";
import Home from "../components/home";
import tcmb from "../utils/tcmb-exchange-rates";
import moment from "moment";

class Main extends Component {
  state = {
    showFilter: false,
    showDate: false,
    selectedDate: moment(),
    selectedDataOpt: [],
    selectedCurrency: [],
    currencies: {},
    isHome: true,
    error: false,
    loader: false
  };

  dateParser = date => {
    date = moment(date).format("DD/MM/YYYY");
    if (date === moment().format("DD/MM/YYYY")) return "today";
    return date;
  };

  updateDate = date => {
    this.setState({ selectedDate: date });
  };

  fetchCurrencies = date => {
    if (date === this.state.selectedDate) {
      this.setState({ isHome: false });
      return;
    }
    if (!this.state.isHome) this.setState({ selectedDate: date, loader: true });
    this.setState({ loader: true });
    date = this.dateParser(date);
    tcmb(null, date)
      .then(currencies => {
        if (currencies.errorCode) throw currencies;
        this.setState({
          currencies,
          isHome: false,
          error: false,
          loader: false
        });
      })
      .catch(err => {
        this.setState({
          error: true,
          isHome: false,
          loader: false,
          currencies: {},
          selectedDataOpt: [],
          selectedCurrency: []
        });
      });
  };

  generateCard = key => {
    return (
      <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
        <Card
          currency={this.state.currencies[key]}
          selectedDataOpt={this.state.selectedDataOpt}
        />
      </Grid>
    );
  };

  outputAllCurrencies = () => {
    const cards = [];
    if (this.state.selectedCurrency.length !== 0) {
      for (let key in this.state.currencies) {
        if (this.state.selectedCurrency.includes(key)) {
          cards.push(this.generateCard(key));
        }
      }
    } else {
      for (let key in this.state.currencies) {
        cards.push(this.generateCard(key));
      }
    }
    return cards;
  };

  handleDataOptChange = selectedDataOpt => {
    const chosenValues = selectedDataOpt.map(element => element.value);
    this.setState({ selectedDataOpt: chosenValues });
  };

  handleCurrencyChange = selectedCurrency => {
    const chosenValues = selectedCurrency.map(element => element.value);
    this.setState({ selectedCurrency: chosenValues });
  };

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  toggleDate = () => {
    this.setState({ showDate: !this.state.showDate });
  };

  returnHome = () => {
    this.setState({
      isHome: true,
      showDate: false,
      showFilter: false,
      selectedDataOpt: [],
      selectedCurrency: []
    });
  };

  render() {
    const { currencies, isHome } = this.state;

    return (
      <Fragment>
        {isHome ? (
          <Home
            selectedDate={this.state.selectedDate}
            fetchCurrencies={this.fetchCurrencies}
            loader={this.state.loader}
            isHome={isHome}
            updateDate={this.updateDate}
          />
        ) : (
          <AppBar
            returnHome={this.returnHome}
            fetchCurrencies={this.fetchCurrencies}
            selectedDate={this.state.selectedDate}
            showFilter={this.state.showFilter}
            showDate={this.state.showDate}
            toggleDate={this.toggleDate}
            toggleFilter={this.toggleFilter}
            handleCurrencyChange={this.handleCurrencyChange}
            handleDataOptChange={this.handleDataOptChange}
            currencies={currencies}
            outputAllCurrencies={this.outputAllCurrencies}
            error={this.state.error}
            loader={this.state.loader}
          />
        )}
      </Fragment>
    );
  }
}

export default Main;
