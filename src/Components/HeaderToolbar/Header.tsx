import React from "react";
// import SettingsButton from "./SettingsButton";
import './Header.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import { ViewType } from '../../Types/Views';

export default function HeaderToolbar(props) { 
    return (
        <div className="header-container">
          <Paper className="header-tabs">
            <Tabs value={props.currentView} 
                  onChange={props.selectionHandler} 
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  aria-label="simple tabs example">
              <Tab label="Drawing" value={ViewType.Draw} {...a11yProps(0)} />
              <Tab label="Settings" value={ViewType.Settings} {...a11yProps(1)} />
            </Tabs>
          </Paper>
        </div>
      );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}