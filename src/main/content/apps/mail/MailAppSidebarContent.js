import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Icon, List, ListItem, ListItemText, ListSubheader} from '@material-ui/core';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import MailCompose from './MailCompose';
import {FuseAnimate} from '@fuse';

const styles = theme => ({
    listWrapper  : {},
    listItem     : {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            fontSize: 16,
            width   : 16,
            height  : 16
        }
    },
    listSubheader: {
        paddingRight: 24,
        paddingLeft : 24
    }
});

function MailAppSidebarContent({classes, folders, filters, labels})
{
    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>
            <div>
                <MailCompose/>

                <div className={classes.listWrapper}>

                    <List>

                        <ListSubheader className={classes.listSubheader} disableSticky>FOLDERS</ListSubheader>

                        {folders.length > 0 && folders.map((folder) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/mail/' + folder.handle} key={folder.id}
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" color="action">{folder.icon}</Icon>
                                <ListItemText primary={folder.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>

                    <List>

                        <ListSubheader className={classes.listSubheader} disableSticky>FILTERS</ListSubheader>

                        {filters.length > 0 && filters.map((filter) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/mail/filter/' + filter.handle}
                                activeClassName="active"
                                className={classes.listItem}
                                key={filter.id}
                            >
                                <Icon className="list-item-icon" color="action">{filter.icon}</Icon>
                                <ListItemText primary={filter.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>

                    <List>

                        <ListSubheader className={classes.listSubheader} disableSticky>LABELS</ListSubheader>

                        {labels && labels.map((label) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/mail/label/' + label.handle}
                                key={label.id}
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" style={{color: label.color}} color="action">label</Icon>
                                <ListItemText primary={label.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </FuseAnimate>
    );
}

function mapStateToProps({mailApp})
{
    return {
        folders: mailApp.folders,
        labels : mailApp.labels,
        filters: mailApp.filters
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(MailAppSidebarContent)));
