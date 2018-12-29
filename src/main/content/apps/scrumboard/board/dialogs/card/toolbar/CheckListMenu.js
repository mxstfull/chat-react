import React, {Component} from 'react';
import {Icon, IconButton, Button, TextField} from '@material-ui/core';
import ToolbarMenu from './ToolbarMenu';
import ChecklistModel from 'main/content/apps/scrumboard/model/ChecklistModel';

class CheckListMenu extends Component {
    state = {
        anchorEl : null,
        name     : '',
        canSubmit: false
    };

    handleMenuClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: null,
            name    : ''
        });
    };

    onSubmit = (ev) => {
        ev.preventDefault();
        console.info(this.canSubmit());
        if ( !this.canSubmit() )
        {
            return;
        }
        this.props.onAddCheckList(new ChecklistModel({name: this.state.name}));
        this.handleMenuClose();
    };

    handleTitleChange = (ev) => {
        this.setState({name: ev.target.value})
    };

    canSubmit = () => {
        return this.state.name !== '';
    };

    render()
    {
        const {name} = this.state;

        return (
            <div>
                <IconButton color="inherit" onClick={this.handleMenuClick}>
                    <Icon>check_box</Icon>
                </IconButton>
                <ToolbarMenu state={this.state.anchorEl} onClose={this.handleMenuClose}>
                    <form onSubmit={this.onSubmit} className="p-16 flex flex-col items-end">
                        <TextField
                            label="Checklist title"
                            name="name"
                            value={name}
                            onChange={this.handleTitleChange}
                            fullWidth
                            className="mb-12"
                            variant="outlined"
                            required
                        />
                        <Button
                            color="secondary"
                            type="submit"
                            disabled={!this.canSubmit()}
                            variant="contained"
                        >
                            Add
                        </Button>
                    </form>
                </ToolbarMenu>
            </div>
        );
    };
}

export default CheckListMenu;
