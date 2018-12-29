import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import FileList from 'main/content/apps/file-manager/FileList';
import DetailSidebarHeader from 'main/content/apps/file-manager/DetailSidebarHeader';
import DetailSidebarContent from 'main/content/apps/file-manager/DetailSidebarContent';
import {Fab, Icon, IconButton, Typography} from '@material-ui/core';
import MainSidebarHeader from 'main/content/apps/file-manager/MainSidebarHeader';
import MainSidebarContent from 'main/content/apps/file-manager/MainSidebarContent';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';

const headerHeight = 160;

const styles = theme => ({
    layoutHeader       : {
        height   : headerHeight,
        minHeight: headerHeight
    },
    layoutRightSidebar : {
        width: 320
    },
    layoutSidebarHeader: {
        height   : headerHeight,
        minHeight: headerHeight
    },
    addButton          : {
        position: 'absolute',
        bottom  : -28,
        left    : 16,
        zIndex  : 999
    }
});

class FileManagerApp extends Component {
    toggleLeftSidebar = () => {
    };

    componentDidMount()
    {
        this.props.getFiles();
    }

    render()
    {
        const {classes, selectedItem, files} = this.props;
        const selected = files[selectedItem];

        function Breadcrumb({className})
        {
            const arr = selected.location.split('>');
            return (
                <Typography className={className}>
                    {arr.map((path, i) => (
                        <span key={i} className="flex items-center">
                            <span>{path}</span>
                            {arr.length - 1 !== i && (
                                <Icon>chevron_right</Icon>
                            )}
                        </span>))}
                </Typography>
            )
        }

        return (
            <FusePageSimple
                classes={{
                    header       : "h-96 min-h-96 sm:h-160 sm:min-h-160",
                    sidebarHeader: classes.layoutSidebarHeader,
                    rightSidebar : classes.layoutRightSidebar
                }}
                header={
                    <div className="flex flex-col flex-1 p-8 sm:p-12 relative">
                        <div className="flex items-center justify-between">
                            <IconButton
                                onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                aria-label="open left sidebar"
                            >
                                <Icon>menu</Icon>
                            </IconButton>
                            <FuseAnimate animation="transition.expandIn" delay={200}>
                                <IconButton aria-label="search">
                                    <Icon>search</Icon>
                                </IconButton>
                            </FuseAnimate>
                        </div>
                        <div className="flex flex-1 items-end">
                            <FuseAnimate animation="transition.expandIn" delay={600}>
                                <Fab color="secondary" aria-label="add" className={classes.addButton}>
                                    <Icon>add</Icon>
                                </Fab>
                            </FuseAnimate>
                            <FuseAnimate delay={200}>
                                <div>
                                    {selected && (
                                        <Breadcrumb className="flex flex-1 pl-72 pb-12 text-16 sm:text-24"/>
                                    )}
                                </div>
                            </FuseAnimate>
                        </div>
                    </div>
                }
                content={
                    <FileList pageLayout={() => this.pageLayout}/>
                }
                leftSidebarVariant="temporary"
                leftSidebarHeader={
                    <MainSidebarHeader/>
                }
                leftSidebarContent={
                    <MainSidebarContent/>
                }
                rightSidebarHeader={
                    <DetailSidebarHeader/>
                }
                rightSidebarContent={
                    <DetailSidebarContent/>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getFiles: Actions.getFiles
    }, dispatch);
}

function mapStateToProps({fileManagerApp})
{
    return {
        files       : fileManagerApp.files,
        selectedItem: fileManagerApp.selectedItem
    }
}

export default withReducer('fileManagerApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FileManagerApp))));
