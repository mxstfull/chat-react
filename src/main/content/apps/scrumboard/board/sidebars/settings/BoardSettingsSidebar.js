import React, {Component} from 'react';
import {AppBar, Toolbar, List, ListItem, ListItemIcon, Icon, ListItemText, ListItemSecondaryAction, Switch} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from 'main/content/apps/scrumboard/store/actions';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';

class BoardSettingsSidebar extends Component {
    render()
    {
        const {board, changeBoardSettings, deleteBoard, copyBoard} = this.props;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar className="flex w-full justify-center">
                        Settings
                    </Toolbar>
                </AppBar>

                <List className="py-16" dense>

                    <ListItem
                        button
                        onClick={() => changeBoardSettings({cardCoverImages: !board.settings.cardCoverImages})}
                    >
                        <ListItemIcon>
                            <Icon>photo</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Card Cover Images"/>
                        <ListItemSecondaryAction>
                            <Switch
                                onChange={() => changeBoardSettings({cardCoverImages: !board.settings.cardCoverImages})}
                                checked={board.settings.cardCoverImages}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => changeBoardSettings({subscribed: !board.settings.subscribed})}
                    >
                        <ListItemIcon>
                            <Icon>remove_red_eye</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Subscribe"/>
                        <ListItemSecondaryAction>
                            <Switch
                                onChange={() => changeBoardSettings({subscribed: !board.settings.subscribed})}
                                checked={board.settings.subscribed}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem button onClick={() => copyBoard(board)}>
                        <ListItemIcon>
                            <Icon>file_copy</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Copy Board"/>
                    </ListItem>

                    <ListItem button onClick={() => deleteBoard(board.id)}>
                        <ListItemIcon>
                            <Icon>delete</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Delete Board"/>
                    </ListItem>
                </List>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        changeBoardSettings: Actions.changeBoardSettings,
        deleteBoard        : Actions.deleteBoard,
        copyBoard          : Actions.copyBoard
    }, dispatch);
}

function mapStateToProps({scrumboardApp})
{
    return {
        board: scrumboardApp.board
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardSettingsSidebar));
