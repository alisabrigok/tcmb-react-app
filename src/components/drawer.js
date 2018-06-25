import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Select from "./select";
import DatePicker from "./date-picker";
import FilterList from "@material-ui/icons/FilterList";
import DateRange from "@material-ui/icons/DateRange";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import ListItemText from "@material-ui/core/ListItemText";

const CustomDrawer = props => {
  return (
    <Drawer
      variant="persistent"
      open={props.open}
      classes={{
        paper: props.classes.drawerPaper
      }}
    >
      <div className={props.classes.drawerHeader}>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={props.returnHome}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Return Home" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={props.toggleDate}>
          <ListItemIcon>
            <DateRange />
          </ListItemIcon>
          <ListItemText primary="Select Date" />
        </ListItem>
      </List>
      {props.showDate ? (
      <List>
        <ListItem>
          <DatePicker
            fetchCurrencies={props.fetchCurrencies}
            selectedDate={props.selectedDate}
          />
        </ListItem>
      </List>
      ) : null}
      <Divider />
      <List>
        <ListItem button onClick={props.toggleFilter}>
          <ListItemIcon>
            <FilterList />
          </ListItemIcon>
          <ListItemText primary="Apply Filter" />
        </ListItem>
      </List>
      {props.showFilter ? (
        <Select
          handleCurrencyChange={props.handleCurrencyChange}
          handleDataOptChange={props.handleDataOptChange}
          currencies={props.currencies}
        />
      ) : null}
      <Divider />
    </Drawer>
  );
};

export default CustomDrawer;
