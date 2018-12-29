import React, {Component} from 'react';
import {Button, IconButton, Icon, withStyles, TextField, ClickAwayListener, InputAdornment} from '@material-ui/core';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import * as Actions from 'main/content/apps/scrumboard/store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

const styles = theme => ({
    root: {
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: theme.palette.divider
    }
});

const initialState = {
    formOpen : false,
    cardTitle: ""
};

class BoardAddCard extends Component {
    state = initialState;

    handleOpenForm = () => {
        this.setState({formOpen: true})
    };

    handleCloseForm = () => {
        this.setState({...initialState})
    };

    handleChange = (event) => {
        this.setState({cardTitle: event.target.value});
    };

    onSubmit = (ev) => {
        ev.preventDefault();
        this.props.newCard(this.props.board.id, this.props.listId, this.state.cardTitle).then(() => {
            this.props.onCardAdded();
        });
        this.handleCloseForm();
    };

    canBeSubmitted()
    {
        const {cardTitle} = this.state;
        return (
            cardTitle.length > 0
        );
    }

    render()
    {
        const {classes} = this.props;
        const {formOpen} = this.state;

        return (
            <div className={classNames(classes.root, "w-full")}>
                {formOpen ? (
                    <ClickAwayListener onClickAway={this.handleCloseForm}>
                        <form className="p-16" onSubmit={this.onSubmit}>

                            <TextField
                                className="mb-16"
                                required
                                fullWidth
                                variant="outlined"
                                label="Card title"
                                autoFocus
                                name="title"
                                value={this.state.cardTitle}
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
                            root : "normal-case font-600 w-full rounded-none h-48",
                            label: "justify-start"
                        }}
                    >
                        <Icon className="text-20 mr-8">add</Icon>
                        Add a card
                    </Button>
                )}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        newCard: Actions.newCard
    }, dispatch);
}

function mapStateToProps({scrumboardApp})
{
    return {
        board: scrumboardApp.board
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardAddCard)));
