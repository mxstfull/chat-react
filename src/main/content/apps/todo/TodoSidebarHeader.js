import React, {Component} from 'react';
import {withStyles, Icon, MenuItem, TextField} from '@material-ui/core';
import classNames from 'classnames';
import {FuseAnimate} from '@fuse';

const styles = theme => ({
    root             : {},
    logo             : {},
    logoIcon         : {
        fontSize: '32px!important'
    },
    logoText         : {
        fontSize: 24
    },
    accountSelect    : {},
    accountSelectMenu: {}
});

class TodoSidebarHeader extends Component {

    state = {
        selectedAccount: 'creapond'
    };

    onAccountChange = (ev) => {
        this.setState({selectedAccount: ev.target.value});
    };

    accounts = {
        'creapond'    : 'johndoe@creapond.com',
        'withinpixels': 'johndoe@withinpixels.com'
    };

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classNames(classes.root, "flex flex-col justify-center h-full p-24")}>

                <div className={classNames(classes.logo, "flex items-center flex-1")}>
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className={classNames(classes.logoIcon, "mr-16")}>check_box</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <span className={classes.logoText}>To-Do</span>
                    </FuseAnimate>
                </div>

                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <TextField
                        id="account-selection"
                        select
                        label={this.state.selectedAccount}
                        className={classes.accountSelect}
                        value={this.state.selectedAccount}
                        onChange={this.onAccountChange}
                        SelectProps={{
                            MenuProps: {
                                className: classes.accountSelectMenu
                            }
                        }}
                        placeholder="Select Account"
                        margin="normal"
                    >
                        {Object.keys(this.accounts).map((key, value) => (
                            <MenuItem key={key} value={key}>
                                {this.accounts[key]}
                            </MenuItem>
                        ))}
                    </TextField>
                </FuseAnimate>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(TodoSidebarHeader);
