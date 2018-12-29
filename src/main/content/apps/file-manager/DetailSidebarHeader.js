import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Icon, IconButton, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {FuseAnimate} from '@fuse';

const styles = theme => ({
    root: {}
});

class DetailSidebarHeader extends Component {

    render()
    {
        const {classes, files, selectedItem} = this.props;
        const selected = files[selectedItem];

        if ( !selected )
        {
            return "";
        }

        return (
            <div className={classNames(classes.root, "flex flex-col justify-between h-full p-4 sm:p-12")}>

                <div className="toolbar flex align-center justify-end">
                    <FuseAnimate animation="transition.expandIn" delay={200}>
                        <IconButton>
                            <Icon>delete</Icon>
                        </IconButton>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.expandIn" delay={200}>
                        <IconButton>
                            <Icon>cloud_download</Icon>
                        </IconButton>
                    </FuseAnimate>
                    <IconButton>
                        <Icon>more_vert</Icon>
                    </IconButton>
                </div>

                <div className="p-12">
                    <FuseAnimate delay={200}>
                        <Typography variant="subtitle1" className="mb-8">{selected.name}</Typography>
                    </FuseAnimate>
                    <FuseAnimate delay={300}>
                        <Typography variant="caption" className="">
                            <span>Edited</span>
                            <span>: {selected.modified}</span>
                        </Typography>
                    </FuseAnimate>
                </div>
            </div>
        )
    };
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({fileManagerApp})
{
    return {
        files       : fileManagerApp.files,
        selectedItem: fileManagerApp.selectedItem
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSidebarHeader)));
