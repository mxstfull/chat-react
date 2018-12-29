import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import _ from '@lodash';

const styles = theme => ({
    composeButton     : {
        width: '100%'
    },
    formControl       : {
        marginTop   : 8,
        marginBottom: 16
    },
    attachmentList    : {
        paddingTop: 8
    },
    attachment        : {
        fontSize       : 13,
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        border         : '1px solid rgba(0, 0, 0, 0.16)',
        paddingLeft    : 16,
        marginBottom   : 8,
        borderRadius   : 2,
        display        : 'flex',
        justifyContent : 'space-between',
        alignItems     : 'center'
    },
    attachmentFilename: {
        fontWeight: 600
    },
    attachmentSize    : {
        marginLeft: 8,
        fontWeight: 300
    }
});

class MailCompose extends Component {
    state = {
        composeDialog: false,
        from         : 'johndoe@creapond.com',
        to           : '',
        cc           : '',
        bcc          : '',
        subject      : '',
        message      : ''
    };

    openComposeDialog = () => {
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({composeDialog: false});
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    render()
    {
        const {classes} = this.props;

        function Attachment({fileName, size})
        {
            return (
                <div className={classes.attachment}>
                    <div className="flex">
                        <Typography variant="caption" className={classes.attachmentFilename}>{fileName}</Typography>
                        <Typography variant="caption" className={classes.attachmentSize}>({size})</Typography>
                    </div>
                    <IconButton>
                        <Icon className="text-16">close</Icon>
                    </IconButton>
                </div>
            );
        }

        return (
            <div className="p-24">

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.composeButton}
                    onClick={this.openComposeDialog}
                >
                    COMPOSE
                </Button>

                <Dialog
                    open={this.state.composeDialog}
                    onClose={this.closeComposeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                New Message
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            className={classes.formControl}
                            label="From"
                            id="from"
                            name="from"
                            value={this.state.from}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            disabled
                        />

                        <TextField
                            className={classes.formControl}
                            label="To"
                            autoFocus
                            id="to"
                            name="to"
                            value={this.state.to}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <TextField
                            className={classes.formControl}
                            label="Cc"
                            id="cc"
                            name="cc"
                            value={this.state.cc}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className={classes.formControl}
                            label="Bcc"
                            id="bcc"
                            name="bcc"
                            value={this.state.bcc}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className={classes.formControl}
                            label="Subject"
                            id="subject"
                            name="subject"
                            value={this.state.subject}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className={classes.formControl}
                            id="message"
                            name="message"
                            onChange={this.handleChange}
                            label="Message"
                            type="text"
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />

                        <div className={classes.attachmentList}>
                            <Attachment fileName="attachment-2.doc" size="12 kb"/>
                            <Attachment fileName="attachment-1.jpg" size="350 kb"/>
                        </div>
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button variant="contained" color="primary" onClick={this.closeComposeDialog}>
                                Send
                            </Button>
                            <IconButton>
                                <Icon>attach_file</Icon>
                            </IconButton>
                        </div>
                        <IconButton onClick={this.closeComposeDialog}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles, {withTheme: true})(MailCompose);
