import React, {Component} from 'react';
import {Paper, ClickAwayListener, Icon, IconButton, InputAdornment, TextField, Typography} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from 'main/content/apps/scrumboard/store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

class BoardListHeader extends Component {
    state = {
        renameForm : false,
        renameTitle: this.props.board.name
    };
    renameFormToggle = (state) => {
        this.setState({
            renameForm : state,
            renameTitle: this.props.board.name
        })
    };

    onRenameTitleChange = (ev) => {
        this.setState({renameTitle: ev.target.value})
    };

    renameTitleSubmit = (ev) => {
        ev.preventDefault();
        if ( !this.canSubmit() )
        {
            this.renameFormToggle(false);
            return;
        }
        this.setState({
            renameForm : false,
            renameTitle: this.state.renameTitle
        });
        this.props.renameBoard(this.props.board.id, this.state.renameTitle);
    };

    canSubmit = () => {
        return this.state.renameTitle !== '';
    };

    render()
    {
        const {board} = this.props;
        const {renameTitle, renameForm} = this.state;

        return (
            <div className="flex items-center min-w-0">
                {renameForm ? (
                    <ClickAwayListener onClickAway={() => this.renameFormToggle(false)}>
                        <Paper className="p-4">
                            <form className="flex w-full" onSubmit={this.renameTitleSubmit}>
                                <TextField
                                    value={renameTitle}
                                    onChange={this.onRenameTitleChange}
                                    variant="outlined"
                                    margin="none"
                                    autoFocus
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    type="submit"
                                                    disabled={!this.canSubmit()}
                                                >
                                                    <Icon>check</Icon>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </form>
                        </Paper>
                    </ClickAwayListener>
                ) : (
                    <div className="flex items-center justify-center">
                        {board.settings.subscribed && (
                            <Icon className="text-16 mr-8">remove_red_eye</Icon>
                        )}
                        <Typography
                            className="text-16 font-600 cursor-pointer"
                            onClick={() => this.renameFormToggle(true)}
                            color="inherit"
                        >
                            {board.name}
                        </Typography>
                    </div>
                )}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        renameBoard: Actions.renameBoard
    }, dispatch);
}

function mapStateToProps({scrumboardApp})
{
    return {
        board: scrumboardApp.board
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardListHeader));
