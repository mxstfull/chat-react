import React, {Component} from 'react';
import {Dialog, withStyles} from '@material-ui/core';
import * as Actions from 'store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = theme => ({
    root: {}
});

class FuseDialog extends Component {
    render()
    {
        const {classes} = this.props;
        return (
            <Dialog
                open={this.props.state}
                onClose={this.props.closeDialog}
                aria-labelledby="fuse-dialog-title"
                classes={{
                    root: classes.root
                }}
                {...this.props.options}
            />
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeDialog: Actions.closeDialog
    }, dispatch);
}

function mapStateToProps({fuse})
{
    return {
        state  : fuse.dialog.state,
        options: fuse.dialog.options
    }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FuseDialog));
