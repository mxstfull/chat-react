import React, {Component} from 'react';
import {AppBar, Toolbar, Icon, IconButton, ClickAwayListener, Paper, Avatar, Typography, withStyles} from '@material-ui/core';
import keycode from 'keycode';
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ContactList from './ContactList';
import Chat from './Chat';
import classNames from 'classnames';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import IndividualChat from './IndividualChat';
import "./IndividualChat.css";


const styles = theme => ({
    root : {
        width                         : 70,
        maxWidth                      : 70,
        minWidth                      : 70,
        [theme.breakpoints.down('md')]: {
            width   : 0,
            maxWidth: 0,
            minWidth: 0
        }
    },
    panel: {
        position                      : 'absolute',
        width                         : 360,
        backgroundColor               : theme.palette.background.paper,
        boxShadow                     : theme.shadows[3],
        top                           : 0,
        height                        : '100%',
        minHeight                     : '100%',
        bottom                        : 0,
        right                         : 0,
        margin                        : 0,
        zIndex                        : 1000,
        transform                     : 'translate3d(290px,0,0)',
        overflow                      : 'hidden',
        [theme.breakpoints.down('md')]: {
            transform : 'translate3d(360px,0,0)',
            boxShadow : 'none',
            '&.opened': {
                boxShadow: theme.shadows[5]
            }
        },
        transition                    : theme.transitions.create(['transform'], {
            easing  : theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard
        }),
        '&.opened'                    : {
            transform: 'translateX(0)'
        }
    },

    chartAddButton: {
        display: 'flex',
        width: 50,
        height: 50,
        background: '#F44336',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    individualChat: {
        position: 'fixed',
        bottom: 0,
        right: 360,
        zIndex: 10,
        display: 'flex'
    }
});

class ChatPanel extends Component {

    state = {
        individualchats: []
    };

    componentDidMount()
    {
        this.props.getUserData();
        this.props.getContacts();
    }

    componentDidUpdate(prevProps)
    {
        if ( this.props.state !== prevProps.state )
        {
            if ( this.props.state )
            {
                document.addEventListener("keydown", this.handleDocumentKeyDown);
            }
            else
            {
                document.removeEventListener('keydown', this.handleDocumentKeyDown);
            }
        }
    }

    componentWillUnmount()
    {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    }

    handleDocumentKeyDown = event => {
        if ( keycode(event) === 'esc' )
        {
            this.props.closeChatPanel();
        }
    }

    addIndividualChat = () => {
        this.state.individualchats.push('aaa');
       this.setState({individualchats: this.state.individualchats});
    }

    render()
    {
        const {classes, openChatPanel, closeChatPanel, contacts, selectedContactId, state} = this.props;

        const selectedContact = contacts.find(_contact => _contact.id === selectedContactId);
        const {individualchats} = this.state;
        return (
            <div className={classes.root}>
                <ClickAwayListener onClickAway={() => state && closeChatPanel()}>
                    <div className={classNames(classes.panel, {'opened': state}, "flex flex-col")}>
                        <AppBar position="static" elevation={1}>
                            <Toolbar className="pl-12 pr-8">
                                <div className="flex flex-1 items-center">
                                    {(!state || !selectedContactId) && (
                                        <React.Fragment>
                                            <IconButton color="inherit" onClick={openChatPanel}>
                                                <Icon className="text-32">chat</Icon>
                                            </IconButton>
                                            {!selectedContactId && (
                                                <Typography className="ml-16 text-16" color="inherit">Team Chat</Typography>
                                            )}
                                        </React.Fragment>
                                    )}
                                    {state && selectedContact && (
                                        <React.Fragment>
                                            <Avatar className="ml-4" src={selectedContact.avatar}/>
                                            <Typography className="ml-16 text-16" color="inherit">{selectedContact.name}</Typography>
                                        </React.Fragment>
                                    )}
                                </div>
                                <span className={classes.chartAddButton} onClick={this.addIndividualChat}>D</span>
                                <IconButton onClick={closeChatPanel} color="inherit">
                                    <Icon>close</Icon>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Paper className="flex flex-1 flex-row min-h-px">
                            <ContactList className="flex flex-no-shrink"/>
                            <Chat className="flex flex-1 z-10"/>
                        </Paper>
                        
                    </div>
                    
                </ClickAwayListener>
                <div className={classNames(classes.individualChat, {'closeIndvidualchat': !state})}>
                    {
                        this.state.individualchats.map(chatItem => 
                            <IndividualChat/>
                        )
                    }
                    
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getUserData   : Actions.getUserData,
        getContacts   : Actions.getContacts,
        openChatPanel : Actions.openChatPanel,
        closeChatPanel: Actions.closeChatPanel
    }, dispatch);
}

function mapStateToProps({chatPanel})
{
    return {
        contacts         : chatPanel.contacts.entities,
        selectedContactId: chatPanel.contacts.selectedContactId,
        state            : chatPanel.state
    }
}

export default withReducer('chatPanel', reducer)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ChatPanel)));
