import React, {Component} from 'react';
import {TextField, Button, Avatar} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import CommentModel from 'main/content/apps/scrumboard/model/CommentModel';
import _ from '@lodash';

class CardComment extends Component {
    state = {
        idMember: '36027j1930450d8bf7b10158',
        message : ''
    };

    handleChange = (event) => {
        this.setState(_.setIn(this.state, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    submit = (ev) => {
        ev.preventDefault();
        if ( !this.canSubmit() )
        {
            return;
        }
        this.props.onCommentAdd(new CommentModel(this.state));
        this.setState({message: ''})
    };

    canSubmit = () => {
        return this.state.message !== '';
    };

    render()
    {
        const {members} = this.props;
        const user = _.find(members, {id: this.state.idMember});

        return (
            <form onSubmit={this.submit} className="flex">
                <Avatar className="w-32 h-32" alt={user.name} src={user.avatar}/>
                <div className="flex flex-col items-start flex-1 pr-0 pl-16">
                    <TextField
                        className="flex flex-1"
                        fullWidth
                        name="message"
                        row={3}
                        value={this.state.message}
                        onChange={this.handleChange}
                        variant="outlined"
                        label="Add comment"
                        placeholder="Write a comment..."
                    />
                    <Button
                        className="mt-16"
                        aria-label="save"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        size="small"
                        disabled={!this.canSubmit()}
                    >
                        Save
                    </Button>
                </div>
            </form>
        );
    }
}

function mapStateToProps({auth})
{
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps)(CardComment);
