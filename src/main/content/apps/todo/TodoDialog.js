import React, {Component} from 'react';
import {
    withStyles,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Chip,
    Icon,
    IconButton,
    Typography,
    Toolbar,
    AppBar,
    Avatar,
    Checkbox,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import moment from 'moment/moment';
import classNames from 'classnames';
import {FuseUtils} from '@fuse';
import _ from '@lodash';

const styles = theme => ({
    root       : {},
    formControl: {
        marginTop   : 8,
        marginBottom: 16
    }
});

const newTodoState = {
    'id'       : '',
    'title'    : '',
    'notes'    : '',
    'startDate': new Date(),
    'dueDate'  : new Date(),
    'completed': false,
    'starred'  : false,
    'important': false,
    'deleted'  : false,
    'labels'   : []
};

class TodoDialog extends Component {
    state = {
        form       : {...newTodoState},
        labelMenuEl: null
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.todoDialog.props.open && this.props.todoDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.todoDialog.type === 'edit' &&
                this.props.todoDialog.data &&
                !_.isEqual(this.props.todoDialog.data, prevState) )
            {
                this.setState({form: {...this.props.todoDialog.data}});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.todoDialog.type === 'new' &&
                !_.isEqual(newTodoState, prevState) )
            {
                this.setState({
                    form: {
                        ...newTodoState,
                        id: FuseUtils.generateGUID()
                    }
                });
            }
        }
    }

    handleChange = (event) => {
        const form = _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        this.setState({form});
    };

    closeTodoDialog = () => {
        this.props.todoDialog.type === 'edit' ? this.props.closeEditTodoDialog() : this.props.closeNewTodoDialog();
    };

    handleLabelMenuOpen = (event) => {
        this.setState({labelMenuEl: event.currentTarget});
    };

    handleLabelMenuClose = (event) => {
        this.setState({labelMenuEl: null});
    };

    handleToggleImportant = () => {
        this.setState({
            form: {
                ...this.state.form,
                important: !this.state.form.important
            }
        });
    };

    handleToggleStarred = () => {
        this.setState({
            form: {
                ...this.state.form,
                starred: !this.state.form.starred
            }
        });
    };

    handleToggleLabel = (event, id) => {
        event.stopPropagation();
        this.setState({
            form: _.set({
                ...this.state.form,
                labels: this.state.form.labels.includes(id) ? this.state.form.labels.filter(labelId => labelId !== id) : [...this.state.form.labels, id]
            })
        });
    };

    toggleCompleted = () => {
        this.setState({
            form: {
                ...this.state.form,
                completed: !this.state.form.completed
            }
        })
    };

    canBeSubmitted()
    {
        const {title} = this.state.form;
        return (
            title.length > 0
        );
    }

    render()
    {
        const {classes, todoDialog, addTodo, updateTodo, removeTodo, labels} = this.props;
        const {form, labelMenuEl} = this.state;
        let startDate, dueDate;

        if ( form )
        {
            startDate = moment(form.startDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
            dueDate = moment(form.dueDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
        }

        return (
            <Dialog className={classes.root} {...todoDialog.props} onClose={this.closeTodoDialog} fullWidth maxWidth="sm">

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {todoDialog.type === 'new' ? 'New Todo' : 'Edit Todo'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-0"}}>

                    <div className="mb-16">
                        <div className="flex items-center justify-between p-12">

                            <div className="flex">
                                <Checkbox
                                    tabIndex={-1}
                                    checked={form.completed}
                                    onChange={this.toggleCompleted}
                                    onClick={(ev) => ev.stopPropagation()}
                                />
                            </div>

                            <div className="flex items-center justify-start" aria-label="Toggle star">
                                <IconButton onClick={this.handleToggleImportant}>
                                    {form.important ? (
                                        <Icon style={{color: red[500]}}>error</Icon>
                                    ) : (
                                        <Icon>error_outline</Icon>
                                    )}
                                </IconButton>

                                <IconButton onClick={this.handleToggleStarred}>
                                    {form.starred ? (
                                        <Icon style={{color: amber[500]}}>star</Icon>
                                    ) : (
                                        <Icon>star_outline</Icon>
                                    )}
                                </IconButton>
                                <div>
                                    <IconButton
                                        aria-owns={labelMenuEl ? 'label-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleLabelMenuOpen}
                                    >
                                        <Icon>label</Icon>
                                    </IconButton>
                                    <Menu
                                        id="label-menu"
                                        anchorEl={labelMenuEl}
                                        open={Boolean(labelMenuEl)}
                                        onClose={this.handleLabelMenuClose}
                                    >
                                        {labels.length > 0 && labels.map((label) => (
                                            <MenuItem onClick={(ev) => this.handleToggleLabel(ev, label.id)} key={label.id}>
                                                <ListItemIcon>
                                                    <Icon className="mr-0" color="action">
                                                        {form.labels.includes(label.id) ? 'check_box' : 'check_box_outline_blank'}
                                                    </Icon>
                                                </ListItemIcon>
                                                <ListItemText primary={label.title} disableTypography={true}/>
                                                <ListItemIcon>
                                                    <Icon className="mr-0" style={{color: label.color}} color="action">
                                                        label
                                                    </Icon>
                                                </ListItemIcon>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <Divider className="mx-24"/>
                    </div>

                    {form.labels.length > 0 && (
                        <div className="flex flex-wrap  px-16 sm:px-24 mb-16">
                            {form.labels.map(label => (
                                <Chip
                                    avatar={(
                                        <Avatar
                                            classes={{colorDefault: "bg-transparent"}}>
                                            <Icon
                                                className="text-20"
                                                style={{color: _.find(labels, {id: label}).color}}
                                            >
                                                label
                                            </Icon>
                                        </Avatar>
                                    )}
                                    label={_.find(labels, {id: label}).title}
                                    onDelete={(ev) => this.handleToggleLabel(ev, label)}
                                    className="mr-8 my-8"
                                    classes={{label: "pl-4"}}
                                    key={label}
                                />
                            ))}
                        </div>
                    )}

                    <div className="px-16 sm:px-24">
                        <FormControl className={classes.formControl} required fullWidth>
                            <TextField
                                label="Title"
                                autoFocus
                                name="title"
                                value={form.title}
                                onChange={this.handleChange}
                                required
                                variant="outlined"
                            />
                        </FormControl>

                        <FormControl className={classes.formControl} required fullWidth>
                            <TextField
                                label="Notes"
                                name="notes"
                                multiline
                                rows="6"
                                value={form.notes}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </FormControl>
                        <div className="flex">
                            <TextField
                                name="startDate"
                                label="Start Date"
                                type="datetime-local"
                                className={classNames(classes.formControl, "mr-8")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{
                                    max: dueDate
                                }}
                                value={startDate}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                            <TextField
                                name="dueDate"
                                label="Due Date"
                                type="datetime-local"
                                className={classNames(classes.formControl, "ml-8")}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{
                                    min: startDate
                                }}
                                value={dueDate}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </div>
                    </div>

                </DialogContent>

                {todoDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addTodo(this.state.form);
                                this.closeTodoDialog();
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
                                updateTodo(this.state.form);
                                this.closeTodoDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            className="min-w-auto"
                            onClick={() => {
                                removeTodo(this.state.form.id);
                                this.closeTodoDialog();
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
        closeEditTodoDialog: Actions.closeEditTodoDialog,
        closeNewTodoDialog : Actions.closeNewTodoDialog,
        addTodo            : Actions.addTodo,
        updateTodo         : Actions.updateTodo,
        removeTodo         : Actions.removeTodo
    }, dispatch);
}

function mapStateToProps({todoApp})
{
    return {
        todoDialog: todoApp.todos.todoDialog,
        labels    : todoApp.labels
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(TodoDialog));
