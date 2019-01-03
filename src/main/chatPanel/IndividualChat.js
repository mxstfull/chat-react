import React, {Component} from 'react';
import withReducer from 'store/withReducer';
import {AppBar, Toolbar, Icon, IconButton, ClickAwayListener, Paper, Avatar, Typography, withStyles} from '@material-ui/core';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Input from '@material-ui/core/Input';
import axios from 'axios/index';
import Pusher from 'pusher-js';

import "./IndividualChat.css";
const styles = theme => ({
    
});

class IndividualChat extends Component {
    constructor() {
        super();
        
        this.state = {
            sendMSG: "",
            messages: []
        }
    }

    componentDidMount() {
        Pusher.logToConsole = true;

         const pusher = new Pusher('64a9f0ddad38c595ba94', {
             cluster: 'us2',
             forceTLS: true
         });

         const channel = pusher.subscribe('my-channel');
         var me = this;
         channel.bind('my-event', function (data) {
             me.state.messages.push(data);
             me.setState({
                 messages: me.state.messages
             });
         });
    }

    handleChange = (e) => {
        this.setState({
            sendMSG: e.target.value
        });
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.sendMSG();
        }
    }

    sendMSG = (e) => {
        if (this.state.sendMSG == "") {
            return;
        }
    
        const sendmessage = {
            sender: "",
            receiver: "",
            message: this.state.sendMSG
        }
        this.state.sendMSG = "";
        this.setState({
            sendMSG: this.state.sendMSG,
        });

        axios({
            method: 'post',
            url: 'http://localhost/index.php', 
            data: sendmessage
        }).then(function (res) {
            console.log(res);
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <div className="individual-chat-item">
                <div className="header">
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
                <div className="chat-content">
                    {
                        this.state.messages.map(messageItem => 
                            <div className="chat-item chat-item-other">
                                <div className="chat-avatar">
                                    <img src="assets/images/avatars/Barrera.jpg" />
                                </div>
                                <div className="chat-message">
                                    {messageItem.message}
                                </div>
                            </div> 
                        )
                    }
                </div>

                <div className="chat-message-input">
                    <Input
                        placeholder="Send Message"
                        inputProps={{
                            'aria-label': 'Description'
                        }}
                        value={this.state.sendMSG}
                        onChange={this.handleChange}
                        onKeyPress={this._handleKeyPress} 
                    />
                    <IconButton color="inherit" onClick={this.sendMSG}>
                        <Icon>send</Icon>
                    </IconButton>
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(IndividualChat);
