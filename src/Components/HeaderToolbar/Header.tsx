import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import React from "react";
import './Header.css';

export default function HeaderToolbar(props) { 
    return (
        <div className="header-container">
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