import React, {Component} from 'react';
import {Hidden, Icon, IconButton, Input, MuiThemeProvider, Paper} from '@material-ui/core';
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FuseSelectedTheme} from '@fuse';

class TodoHeader extends Component {

    render()
    {
        const {setSearchText, searchText, pageLayout} = this.props;
        return (
            <MuiThemeProvider theme={FuseSelectedTheme}>
                <div className="flex flex-1">
                    <Paper className="flex items-center w-full h-48 sm:h-56 p-16 pl-4 md:pl-16 rounded-8 " elevation={1}>
                        <Hidden lgUp>
                            <IconButton
                                onClick={(ev) => pageLayout().toggleLeftSidebar()}
                                aria-label="open left sidebar"
                            >
                                <Icon>menu</Icon>
                            </IconButton>
                        </Hidden>

                        <Icon color="action">search</Icon>

                        <Input
                            placeholder="Search"
                            className="pl-16"
                            disableUnderline
                            fullWidth
                            value={searchText}
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                            onChange={setSearchText}
                        />
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSearchText: Actions.setSearchText
    }, dispatch);
}

function mapStateToProps({todoApp})
{
    return {
        searchText: todoApp.todos.searchText
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoHeader);
