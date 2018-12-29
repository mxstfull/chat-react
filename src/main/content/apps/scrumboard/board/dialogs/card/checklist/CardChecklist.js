import React, {Component} from 'react';
import {Icon, Typography, Menu, MenuItem, LinearProgress, List, ListItemText, ListItemIcon, IconButton, TextField, InputAdornment, ClickAwayListener} from '@material-ui/core';
import CardChecklistItem from './CardChecklistItem';
import CardAddChecklistItem from './CardAddChecklistItem';
import _ from '@lodash';

class CardChecklist extends Component {
    state = {
        anchorEl   : null,
        renameForm : false,
        renameTitle: this.props.checklist.name,
        checklist  : this.props.checklist
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( this.state.checklist &&
            prevState.checklist &&
            !_.isEqual(this.state.checklist, prevState.checklist) )
        {
            console.info('onCheckListChanged');
            this.props.onCheckListChange(this.state.checklist);
        }
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleListItemChange = (item) => {
        const index = this.state.checklist.checkItems.findIndex((x) => x.id === item.id);
        this.setState(_.setIn(this.state, `checklist.checkItems[${index}]`, item));
    };

    handleListItemRemove = (id) => {
        this.setState(_.setIn(this.state, 'checklist.checkItems', _.reject(this.state.checklist.checkItems, {id})));
    };

    checkItemsChecked = () => {
        return _.sum(this.state.checklist.checkItems.map(x => (x.checked ? 1 : 0)));
    };

    handleListItemAdd = (item) => {
        this.setState(_.setIn(this.state, 'checklist.checkItems', [...this.state.checklist.checkItems, item]));
    };

    renameFormToggle = (state) => {
        this.setState({
            renameForm : state,
            renameTitle: this.state.checklist.name
        })
    };

    onRenameTitleChange = (ev) => {
        this.setState({renameTitle: ev.target.value})
    };

    renameTitleSubmit = (ev) => {
        ev.preventDefault();
        if ( this.state.renameTitle === '' )
        {
            this.renameFormToggle(false);
            return;
        }
        this.setState(_.setIn(this.state, 'checklist.name', this.state.renameTitle));
        this.renameFormToggle(false);
    };

    render()
    {
        const {onRemoveCheckList} = this.props;
        const {anchorEl, checklist, renameTitle, renameForm} = this.state;

        if ( !checklist )
        {
            return null;
        }
        return (
            <div className="mb-24">

                <div className="flex items-center justify-between mt-16 mb-12">
                    <div className="flex items-center">
                        <Icon className="text-20 mr-8">check_box</Icon>
                        {renameForm ? (
                            <ClickAwayListener onClickAway={() => this.renameFormToggle(false)}>
                                <form onSubmit={this.renameTitleSubmit}>
                                    <TextField
                                        value={renameTitle}
                                        onChange={this.onRenameTitleChange}
                                        variant="outlined"
                                        margin="dense"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton type="submit">
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
                                className="text-16 font-600"
                                onClick={() => this.renameFormToggle(true)}
                            >
                                {checklist.name}
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
                            <MenuItem onClick={onRemoveCheckList}>
                                <ListItemIcon>
                                    <Icon>delete</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Remove Checklist"/>
                            </MenuItem>
                            <MenuItem onClick={() => this.renameFormToggle(true)}>
                                <ListItemIcon>
                                    <Icon>edit</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Rename Checklist"/>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>

                <div className="">
                    <div className="flex items-center pl-16">
                        <Typography className="flex font-600 mr-12">
                            {this.checkItemsChecked() + ' / ' + checklist.checkItems.length}
                        </Typography>
                        <LinearProgress
                            className="flex flex-1"
                            variant="determinate"
                            color="secondary"
                            value={100 * this.checkItemsChecked() / checklist.checkItems.length}
                        />
                    </div>
                    <List className="">
                        {checklist.checkItems.map(checkItem => (
                            <CardChecklistItem
                                item={checkItem}
                                key={checkItem.id}
                                onListItemChange={this.handleListItemChange}
                                onListItemRemove={() => this.handleListItemRemove(checkItem.id)}
                            />
                        ))}
                        <CardAddChecklistItem
                            onListItemAdd={(item) => this.handleListItemAdd(item)}
                        />
                    </List>
                </div>
            </div>
        )
    }
}

export default CardChecklist;
