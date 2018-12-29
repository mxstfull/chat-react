import React from 'react';
import {withStyles, Avatar, ListItem, Typography} from '@material-ui/core';
import classNames from 'classnames';
import _ from '@lodash';

const styles = theme => ({
    root         : {},
    commentBubble: {
        borderRadius: '5px 20px 20px 5px',
        border      : '1px solid ' + theme.palette.divider
    }
});

const CardActivity = ({item, members, classes}) => {

    const user = _.find(members, {id: item.idMember});

    switch ( item.type )
    {
        case 'comment':
        {
            return (
                <ListItem dense className="px-0">
                    <Avatar alt={user.name} src={user.avatar} className="w-32 h-32"/>
                    <div className={classNames(classes.commentBubble, "flex flex-col ml-16 p-12")}>
                        <div className="flex items-center">
                            <Typography>{user.name}</Typography>
                            <Typography className="ml-8 text-12" color="textSecondary">{item.time}</Typography>
                        </div>
                        <Typography>{item.message}</Typography>
                    </div>
                </ListItem>
            )
        }
        case 'attachment':
        {
            return (
                <ListItem dense className="px-0">
                    <Avatar alt={user.name} src={user.avatar} className="w-32 h-32"/>
                    <div className="flex items-center ml-16">
                        <Typography>{user.name},</Typography>
                        <Typography className="ml-8">{item.message}</Typography>
                    </div>
                    <Typography className="ml-8 text-12" color="textSecondary">{item.time}</Typography>
                </ListItem>
            )
        }
        default:
        {
            return null;
        }
    }
};

export default withStyles(styles, {withTheme: true})(CardActivity);
