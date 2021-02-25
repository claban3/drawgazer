import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import React from "react";
import './Header.css';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DeleteForever from '@material-ui/core/Icon/';

import { ViewType } from '../../Types/Views';
import Icon from "@material-ui/core/Icon/";
import { SvgIcon } from "@material-ui/core";

export default function HeaderToolbar(props) { 
    return (
        <div className="header-container">
          {/* <Paper className="header-tabs">
            <Tabs value={props.currentView} 
                  onChange={props.selectionHandler} 
                  indicatorColor="primary"
                  textColor="primary"
                  // centered
                  aria-label="simple tabs example">
              <Tab label="Drawing" value={ViewType.Draw} {...a11yProps(0)} />
              <Tab label="Settings" value={ViewType.Settings} {...a11yProps(1)} />
            </Tabs>
          </Paper> */}
        <h1>drawgazer</h1>
        <IconButton aria-label="delete"
                    className="header-item"
                    onClick={() => props.resetCanvas()}
                    onTouchEnd={() => props.resetCanvas()}>
          <DeleteIcon />
        </IconButton>
        </div>
      );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}