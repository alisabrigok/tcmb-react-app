import React, { Component, Fragment } from 'react';
import Card from '../components/card';
import Grid from '@material-ui/core/Grid';
import AppBar from './appbar';
import Home from '../components/home';
import moment from 'moment';

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

  // this method parses date so it can be appropriate for api call
  dateParser = date => {
    date = moment(date).format('DD/MM/YYYY');
    // if selected date is the current day, return string today
    if (date === moment().format('DD/MM/YYYY')) return 'today';
    return date;
  };
  // this method is run only on home page on any date change.
  updateDate = date => {
    this.setState({ selectedDate: date });
  };
  // this method is run on date changes, except for while being on the home page.
  // On the home page, the button triggers this.
  fetchCurrencies = date => {
    // if the call wasn't made on home, change the date state and run the loader
    // otherwise this means the button has triggered this function and date isn't a date object
    // but state has the correct date, so assign it
    !this.state.isHome
      ? this.setState({ selectedDate: date, loader: true })
      : (date = this.state.selectedDate);
    this.setState({ loader: true });
    // convert the date to api end point version
    date = this.dateParser(date);
    // api call
    fetch(`/api/${date}`)
      .then(data => {
        // read the stream, parse the json, then return it as promise
        return data.json();
      })
      .then(currencies => {
        // no errorCode means no error, and it means we are in the result page
        if (currencies.errorCode) throw currencies;
        this.setState({
          currencies,
          isHome: false,
          error: false,
          loader: false
        });
      })
      .catch(err => {
        // in case of error, empty data related values and set error boolean to true
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
  // generate a grid of 4 on big, 3 on medium, 2 on small and 1 on mobile screens
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
  // this method generates grid cards by mapping each currency object's key to an array based on filter selection
  outputAllCurrencies = () => {
    const cards = [];
    // if a filter is applied
    if (this.state.selectedCurrency.length !== 0) {
      for (let key in this.state.currencies) {
        // and that chosen currency in that filter is matched, only generate that card data
        if (this.state.selectedCurrency.includes(key)) {
          cards.push(this.generateCard(key));
        }
      }
    } else {
      // no filter, generate all cards
      for (let key in this.state.currencies) {
        cards.push(this.generateCard(key));
      }
    }
    return cards;
  };
  // generate only selected data options array by extracting those values from
  // selected data options array of objects
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
    // if home, render home if not render appbar which our contents body is also connected to
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
