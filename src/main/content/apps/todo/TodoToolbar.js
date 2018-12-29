import React, {Component} from 'react';
import {withStyles, Icon, IconButton, MenuItem, FormControl, Select} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        display: 'flex'
    }
});

class TodoToolbar extends Component {

    handleOrderChange = (ev) => {
        this.props.changeOrder(ev.target.value);
    };

    render()
    {
        const {classes, orderBy, orderDescending, toggleOrderDescending} = this.props;

        return (
            <div className={classNames(classes.root, "flex justify-between w-full")}>
                <div className="flex"/>
                <div className="flex items-center">
                    <FormControl className="">
                        <Select
                            value={orderBy}
                            onChange={this.handleOrderChange}
                            displayEmpty
                            name="filter"
                            className=""
                        >
                            <MenuItem value="">
                                <em>Order by</em>
                            </MenuItem>
                            <MenuItem value="startDate">Start Date</MenuItem>
                            <MenuItem value="dueDate">Due Date</MenuItem>
                            <MenuItem value="title">Title</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton onClick={toggleOrderDescending}>
                        <Icon style={{transform: orderDescending ? 'scaleY(-1)' : 'scaleY(1)'}}>
                            sort
                        </Icon>
                    </IconButton>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        changeOrder          : Actions.changeOrder,
        toggleOrderDescending: Actions.toggleOrderDescending
    }, dispatch);
}

function mapStateToProps({todoApp})
{
    return {
        orderBy        : todoApp.todos.orderBy,
        orderDescending: todoApp.todos.orderDescending
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoToolbar)));
