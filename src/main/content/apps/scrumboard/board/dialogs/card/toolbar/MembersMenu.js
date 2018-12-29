import React, {Component} from 'react';
import {Avatar, Checkbox, Icon, IconButton, ListItemText, MenuItem} from '@material-ui/core';
import ToolbarMenu from './ToolbarMenu';

class MembersMenu extends Component {
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
        const {members, idMembers, onToggleMember} = this.props;

        return (
            <div>
                <IconButton color="inherit" onClick={this.handleMenuClick}>
                    <Icon>account_circle</Icon>
                </IconButton>
                <ToolbarMenu state={this.state.anchorEl} onClose={this.handleMenuClose}>
                    <div className="">
                        {members.map(member => {
                            return (
                                <MenuItem
                                    className="px-8"
                                    key={member.id}
                                    onClick={(ev) => {
                                        onToggleMember(member.id)
                                    }}
                                >
                                    <Checkbox checked={idMembers.includes(member.id)}/>
                                    <Avatar className="w-32 h-32" src={member.avatar}/>
                                    <ListItemText>
                                        {member.name}
                                    </ListItemText>
                                </MenuItem>
                            );
                        })}
                    </div>
                </ToolbarMenu>
            </div>
        );
    };
}

export default MembersMenu;
