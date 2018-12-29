import React, {Component} from 'react';
import {Button, IconButton, Icon, withStyles, ClickAwayListener, Card, TextField, InputAdornment} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/apps/scrumboard/store/actions';
import {darken} from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';

const styles = theme => ({
    root: {},
    card: {
        backgroundColor: darken(theme.palette.background.default, theme.palette.type === 'light' ? 0.02 : .4)
    }
});

const initialState = {
    formOpen : false,
    listTitle: ""
};

class BoardAddList extends Component {
    state = initialState;

    handleOpenForm = () => {
        this.setState({formOpen: true})
    };

    handleCloseForm = () => {
        this.setState({...initialState})
    };

    handleChange = (event) => {
        this.setState({listTitle: event.target.value});
    };

    onSubmit = (ev) => {
        ev.preventDefault();
        this.props.newList(this.props.board.id, this.state.listTitle);
        this.handleCloseForm();
    };

    canBeSubmitted()
    {
        const {listTitle} = this.state;
        return (
            listTitle.length > 0
        );
    }

    render()
    {
        const {classes} = this.props;
        const {formOpen} = this.state;

        return (
            <div className={classes.root}>
                <Card
                    className={classNames(classes.card, "w-320 mr-24")}
                    square={true}
                >
                    {formOpen ? (
                        <ClickAwayListener onClickAway={this.handleCloseForm}>

                            <form className="p-16" onSubmit={this.onSubmit}>

                                <TextField
                                    className="mb-16"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    label="List title"
                                    autoFocus
                                    name="title"
                                    value={this.state.listTitle}
                                    onChange={this.handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={this.handleCloseForm}>
                                                    <Icon className="text-18">close</Icon>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <div className="flex justify-between items-center">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        disabled={!this.canBeSubmitted()}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </form>
                        </ClickAwayListener>
                    ) : (
                        <Button
                            onClick={this.handleOpenForm}
                            classes={{
                                root : "normal-case font-600 w-full rounded-none h-64",
                                label: "justify-start"
                            }}
                        >
                            <Icon className="text-32 text-red mr-8">add_circle</Icon>
                            Add a list
                        </Button>
                    )}
                </Card>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        newList: Actions.newList
    }, dispatch);
}

function mapStateToProps({scrumboardApp})
{
    return {
        board: scrumboardApp.board
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardAddList)));
