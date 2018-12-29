import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Icon, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

const styles = theme => ({
    root: {}
});

class MainSidebarContent extends Component {

    render()
    {
        const {classes} = this.props;

        return (
            <List component="nav" className={classes.root}>
                <ListItem button dense>
                    <ListItemIcon>
                        <Icon className="text-20 mr-0">folder</Icon>
                    </ListItemIcon>
                    <ListItemText primary="My Files"/>
                </ListItem>
                <ListItem button dense>
                    <ListItemIcon>
                        <Icon className="text-20 mr-0">star</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Starred"/>
                </ListItem>
                <ListItem button dense>
                    <ListItemIcon>
                        <Icon className="text-20 mr-0">folder_shared</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Sharred with me"/>
                </ListItem>
                <ListItem button dense>
                    <ListItemIcon>
                        <Icon className="text-20 mr-0">access_time</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Recent"/>
                </ListItem>
                <ListItem button dense>
                    <ListItemIcon>
                        <Icon className="text-20 mr-0">not_interested</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Offline"/>
                </ListItem>
            </List>
        )
    };
}

export default withStyles(styles, {withTheme: true})(MainSidebarContent);

