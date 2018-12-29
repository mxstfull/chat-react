import React, {Component} from 'react';
import {
    TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, FormControlLabel, Switch
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import moment from 'moment';
import FuseUtils from '@fuse/FuseUtils';

const styles = theme => ({
    root       : {},
    formControl: {
        marginTop   : 8,
        marginBottom: 16
    }
});

const defaultEventState = {
    id    : FuseUtils.generateGUID(),
    title : '',
    allDay: true,
    start : new Date(),
    end   : new Date(),
    desc  : ''
};

class EventDialog extends Component {
    state = {...defaultEventState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.eventDialog.props.open && this.props.eventDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.eventDialog.type === 'edit' &&
                this.props.eventDialog.data &&
                !_.isEqual(this.props.eventDialog.data, prevState) )
            {
                this.setState({...this.props.eventDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.eventDialog.type === 'new' )
            {
                this.setState({...defaultEventState, ...this.props.eventDialog.data});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.eventDialog.type === 'edit' ? this.props.closeEditEventDialog() : this.props.closeNewEventDialog();
    };

    canBeSubmitted()
    {
        const {title} = this.state;
        return (
            title.length > 0
        );
    }

    render()
    {
        const {classes, eventDialog, addEvent, updateEvent, removeEvent} = this.props;
        const start = moment(this.state.start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
        const end = moment(this.state.end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);

        return (
            <Dialog className={classes.root} {...eventDialog.props} onClose={this.closeComposeDialog} fullWidth maxWidth="xs">

                <AppBar position="static">
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {eventDialog.type === 'new' ? 'New Event' : 'Edit Event'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                    <TextField
                        id="title"
                        label="Title"
                        className={classes.formControl}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            max: end
                        }}
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        variant="outlined"
                        autoFocus
                        required
                        fullWidth
                    />

                    <FormControlLabel
                        className={classes.formControl}
                        label="All Day"
                        control={
                            <Switch
                                checked={this.state.allDay}
                                id="allDay" name="allDay" onChange={this.handleChange}
                            />
                        }/>

                    <TextField
                        id="start"
                        name="start"
                        label="Start"
                        type="datetime-local"
                        className={classes.formControl}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            max: end
                        }}
                        value={start}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        id="end"
                        name="end"
                        label="End"
                        type="datetime-local"
                        className={classes.formControl}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            min: start
                        }}
                        value={end}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        className={classes.formControl}
                        id="desc" label="Description"
                        type="text"
                        name="desc"
                        value={this.state.desc}
                        onChange={this.handleChange}
                        multiline rows={5}
                        variant="outlined"
                        fullWidth
                    />
                </DialogContent>

                {eventDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addEvent(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateEvent(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        > Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeEvent(this.state.id);
                                this.closeComposeDialog();
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditEventDialog: Actions.closeEditEventDialog,
        closeNewEventDialog : Actions.closeNewEventDialog,
        addEvent            : Actions.addEvent,
        updateEvent         : Actions.updateEvent,
        removeEvent         : Actions.removeEvent
    }, dispatch);
}

function mapStateToProps({calendarApp})
{
    return {
        eventDialog: calendarApp.events.eventDialog
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(EventDialog));
