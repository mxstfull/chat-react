import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {withStyles, List, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import TodoListItem from './TodoListItem';
import _ from '@lodash';

const styles = theme => ({
    todoList: {
        padding: 0
    },
    todoItem: {},
    labels  : {}
});

class TodoList extends Component {

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render()
    {
        const {todos, classes, searchText, orderBy, orderDescending} = this.props;

        const arr = _.orderBy(this.getFilteredArray(todos, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);

        if ( arr.length === 0 )
        {
            return (
                <FuseAnimate delay={100}>
                    <div className="flex flex-1 items-center justify-center h-full">
                        <Typography color="textSecondary" variant="h5">
                            There are no todos!
                        </Typography>
                    </div>
                </FuseAnimate>
            );
        }

        return (
            <List className={classes.todoList}>
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    {
                        arr.map((todo) => (
                                <TodoListItem todo={todo} key={todo.id}/>
                            )
                        )
                    }
                </FuseAnimateGroup>
            </List>
        );
    }
}

function mapStateToProps({todoApp})
{
    return {
        todos          : todoApp.todos.entities,
        searchText     : todoApp.todos.searchText,
        orderBy        : todoApp.todos.orderBy,
        orderDescending: todoApp.todos.orderDescending
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(TodoList)));
