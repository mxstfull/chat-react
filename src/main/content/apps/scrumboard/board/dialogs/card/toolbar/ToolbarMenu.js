import React from 'react';
import {Popover, ClickAwayListener} from '@material-ui/core';

const ToolbarMenu = ({state, onClose, children}) => (
    <Popover
        hideBackdrop={true}
        open={Boolean(state)}
        anchorEl={state}
        onClose={onClose}
        anchorOrigin={{
            vertical  : 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical  : 'top',
            horizontal: 'center'
        }}
        className="pointer-events-none"
        classes={{
            paper: "pointer-events-auto py-8"
        }}
    >
        <ClickAwayListener onClickAway={onClose}>
            <React.Fragment>
                {children}
            </React.Fragment>
        </ClickAwayListener>
    </Popover>
);

export default ToolbarMenu;
