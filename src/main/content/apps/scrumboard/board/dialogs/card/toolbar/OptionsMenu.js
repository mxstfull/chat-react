import React, {Component} from 'react';
import {Icon, IconButton, MenuItem} from '@material-ui/core';
import ToolbarMenu from './ToolbarMenu';

class OptionsMenu extends Component {
    state = {
        anchorEl: null
    };

    handleMenuClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    render()
    {
        const {onRemoveCard} = this.props;

        return (
            <div>
                <IconButton color="inherit" onClick={this.handleMenuClick}>
                    <Icon>more_horiz</Icon>
                </IconButton>
                <ToolbarMenu state={this.state.anchorEl} onClose={this.handleMenuClose}>
                    <MenuItem onClick={onRemoveCard}>
                        Remove Card
                    </MenuItem>
                </ToolbarMenu>
            </div>
        );
    };
}

export default OptionsMenu;
