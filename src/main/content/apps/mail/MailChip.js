import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import classNames from 'classnames';

const styles = theme => ({
    root : {
        display        : 'flex',
        alignItems     : 'center',
        height         : 21,
        borderRadius   : 2,
        padding        : '0 6px',
        fontSize       : 11,
        backgroundColor: 'rgba(0,0,0,.08);'
    },
    color: {
        width       : 8,
        height      : 8,
        marginRight : 4,
        borderRadius: '50%'
    }
});

function MailChip({classes, title, color, className})
{
    return (
        <div className={classNames(classes.root, className)}>
            <div className={classes.color} style={{backgroundColor: color}}/>
            <div>{title}</div>
        </div>
    );
}

export default withStyles(styles, {withTheme: true})(MailChip);
