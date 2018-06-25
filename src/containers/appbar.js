import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import CustomDrawer from "../components/drawer";
import Loader from "../components/loader";
import styles from "../utils/styles";

class CustomAppBar extends Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const cards = this.props.loader ? <Loader /> : (this.props.outputAllCurrencies());

    return (
      <div className={classes.appFrame}>
        <AppBar
          position="static"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes["appBarShift-left"]]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              style={{ color: "#ddd" }}
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" style={{ color: "#ddd" }}>
              Date: {moment(this.props.selectedDate).format("MMM Do, YYYY")}
            </Typography>
          </Toolbar>
        </AppBar>
        <CustomDrawer
          open={open}
          handleDrawerClose={this.handleDrawerClose}
          fetchCurrencies={this.props.fetchCurrencies}
          selectedDate={this.props.selectedDate}
          handleCurrencyChange={this.props.handleCurrencyChange}
          handleDataOptChange={this.props.handleDataOptChange}
          currencies={this.props.currencies}
          toggleFilter={this.props.toggleFilter}
          toggleDate={this.props.toggleDate}
          showFilter={this.props.showFilter}
          showDate={this.props.showDate}
          returnHome={this.props.returnHome}
          classes={classes}
        />
        <main
          className={classNames(classes.content, classes["content-left"], {
            [classes.contentShift]: open,
            [classes["contentShift-left"]]: open
          })}
        >
          <Grid container spacing={16} style={{ marginTop: "50px" }}>
            {!this.props.error ? (
              cards
            ) : (
              <Grid item xs={12}>
                <Grid container justify="center">
                  {this.props.loader ? (
                    <Loader />
                  ) : (
                    "An error occured. This might be due to public holiday date. Please choose another date or try again later."
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </main>
      </div>
    );
  }
}

CustomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CustomAppBar);
