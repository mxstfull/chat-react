import React, {Component} from 'react';
import {Checkbox, Icon, IconButton, ListItemIcon, ListItemText, MenuItem} from '@material-ui/core';
import ToolbarMenu from './ToolbarMenu';

class LabelsMenu extends Component {
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
        const {labels, idLabels, onToggleLabel} = this.props;

        return (
            <div>
                <IconButton color="inherit" onClick={this.handleMenuClick}>
                    <Icon>label</Icon>
                </IconButton>
                <ToolbarMenu state={this.state.anchorEl} onClose={this.handleMenuClose}>
                    <div className="">
                        {labels.map(label => {
                            return (
                                <MenuItem
                                    className="px-8"
                                    key={label.id}
                                    onClick={(ev) => {
                                        onToggleLabel(label.id)
                                    }}
                                >
                                    <Checkbox checked={idLabels.includes(label.id)}/>
                                    <ListItemText>
                                        {label.name}
                                    </ListItemText>
                                    <ListItemIcon>
                                        <Icon>label</Icon>
                                    </ListItemIcon>
                                </MenuItem>
                            );
                        })}
                    </div>
                </ToolbarMenu>
            </div>
        );
    };
}

export default LabelsMenu;
