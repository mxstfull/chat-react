import {Component} from 'react';
import {Icon, IconButton, TextField, Checkbox, ListItem} from '@material-ui/core';
import React from 'react';
import _ from '@lodash';

class CardChecklistItem extends Component {
    state = this.props.item;

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( this.state && prevState && !_.isEqual(this.state, prevState) )
        {
            console.info('onListItemChange');
            this.props.onListItemChange(this.state);
        }
    }

    handleChange = (event) => {
        this.setState(_.setIn(this.state, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    render()
    {
        const {onListItemRemove} = this.props;
        if ( !this.state )
        {
            return null;
        }

        return (
            <ListItem
                className="px-0"
                key={this.state.id}
                dense
            >
                <Checkbox
                    checked={this.state.checked}
                    tabIndex={-1}
                    disableRipple
                    name="checked"
                    onChange={this.handleChange}
                />
                <TextField
                    className="flex flex-1 mx-8"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    variant="outlined"
                />
                <IconButton aria-label="Delete" onClick={onListItemRemove}>
                    <Icon>delete</Icon>
                </IconButton>
            </ListItem>
        );
    }
}

export default CardChecklistItem;
