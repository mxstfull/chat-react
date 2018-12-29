import React from 'react';
import {Typography, LinearProgress, Icon, Button} from '@material-ui/core';

const Loading = (props) => {
    if ( props.error )
    {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                <Icon className="text-40 mb-16" color="action">error_outline</Icon>
                <Typography className="text-20 mb-16" color="textSecondary">
                    Something went wrong
                </Typography>
                <Button onClick={props.retry} variant="contained" color="secondary">Retry</Button>
            </div>
        )
    }
    else if ( props.timedOut )
    {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                <Icon className="text-40 mb-16" color="action">sentiment_dissatisfied</Icon>
                <Typography className="text-20 mb-16" color="textSecondary">
                    Taking a long time...
                </Typography>
                <Button onClick={props.retry} variant="contained" color="secondary">Retry</Button>
            </div>
        )
    }
    else if ( props.pastDelay )
    {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                <Typography className="text-20 mb-16" color="textSecondary">Loading...</Typography>
                <LinearProgress className="w-xs" color="secondary"/>
            </div>
        );
    }
    else
    {
        return null;
    }
};

export default Loading;
