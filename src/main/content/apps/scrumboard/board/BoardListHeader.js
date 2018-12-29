import React, {Component} from 'react';
import {ClickAwayListener, Icon, IconButton, InputAdornment, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Typography} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from 'main/content/apps/scrumboard/store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

class BoardListHeader extends Component {
    state = {
        anchorEl   : null,
        renameForm : false,
        renameTitle: this.props.list.name
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    renameFormToggle = (state) => {
        this.setState({
            renameForm : state,
            renameTitle: this.props.list.name,
            anchorEl   : null
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
            renameTitle: this.state.renameTitle,
            anchorEl   : null
        });
        this.props.renameList(this.props.board.id, this.props.list.id, this.state.renameTitle);
    };

    canSubmit = () => {
        return this.state.renameTitle !== '';
    };

    render()
    {
        const {board, list, handleProps, removeList} = this.props;
        const {anchorEl, renameTitle, renameForm} = this.state;

        return (
            <div {...handleProps}>
                <div className="flex items-center justify-between h-64 pl-16 pr-8">
                    <div className="flex items-center min-w-0">
                        {renameForm ? (
                            <ClickAwayListener onClickAway={() => this.renameFormToggle(false)}>
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
                            </ClickAwayListener>
                        ) : (
                            <Typography
                                className="text-16 font-600 cursor-pointer"
                                onClick={() => this.renameFormToggle(true)}
                            >
                                {list.name}
                            </Typography>
                        )}

                    </div>
                    <div className="">
                        <IconButton
                            aria-owns={anchorEl ? 'actions-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            variant="outlined"
                            size="small"
                        >
                            <Icon className="text-20">more_vert</Icon>
                        </IconButton>
                        <Menu
                            id="actions-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={() => {
                                removeList(board.id, list.id);
                            }}>
                                <ListItemIcon>
                                    <Icon>delete</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Remove List"/>
                            </MenuItem>
                            <MenuItem onClick={() => this.renameFormToggle(true)}>
                                <ListItemIcon>
                                    <Icon>edit</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Rename List"/>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        renameList: Actions.renameList,
        removeList: Actions.removeList
    }, dispatch);
}

function mapStateToProps({scrumboardApp})
{
    return {
        board: scrumboardApp.board
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardListHeader));
