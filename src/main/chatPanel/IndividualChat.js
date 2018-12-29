import React, {Component} from 'react';
import withReducer from 'store/withReducer';
import {AppBar, Toolbar, Icon, IconButton, ClickAwayListener, Paper, Avatar, Typography, withStyles} from '@material-ui/core';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import "./IndividualChat.css";
const styles = theme => ({
    
});

class IndividualChat extends Component {
    constructor() {
        super();
    }
    render() {
        const {classes} = this.props;
        return (
            <div class="individual-chat-item">
                <div class="header">
                    <div>
                        <IconButton color="inherit">
                            <Icon>arrow_back</Icon>
                        </IconButton>
                        <span>Ted</span>
                    </div>
                    <div>
                        <IconButton color="inherit">
                            <Icon>more_vert</Icon>
                        </IconButton>
                    </div>
                </div>
                <div class="chat-content">
                    <div class="chat-item chat-item-other">
                        <div class="chat-avatar">
                            <img src="assets/images/avatars/Barrera.jpg"/>
                        </div>
                        <div class="chat-message">
                            Hello, How are you doing today? Hello, How are you doing today?
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(IndividualChat);
