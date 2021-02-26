import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import React from "react";
import './Header.css';

export default function HeaderToolbar(props) { 
    return (
        <div className="header-container">
            <span id="title">drawgazer</span>
            <IconButton aria-label="delete"
                        className="header-item"
                        onClick={() => props.resetCanvas()}
                        onTouchEnd={() => props.resetCanvas()}>
            <DeleteIcon />
            </IconButton>
        </div>
      );
}