import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Icon, IconButton} from '@material-ui/core';
import * as Actions from '../store/actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';
import {FuseAnimate} from '@fuse';

const pathToRegexp = require('path-to-regexp');

const styles = theme => ({
    root: {}
});

class MailToolbar extends Component {

    render()
    {
        const {classes, mail, match, history, toggleStar, toggleImportant} = this.props;
        const {params} = match;
        const toPath = pathToRegexp.compile(match.path);
        const matchParams = {...params};
        delete matchParams['mailId'];
        const deselectUrl = toPath(matchParams);

        if ( !mail )
        {
            return '';
        }

        return (
            <div className={classNames(classes.root, "flex flex-1 items-center justify-between overflow-hidden sm:px-16")}>
                <IconButton onClick={() => history.push(deselectUrl)}>
                    <Icon>arrow_back</Icon>
                </IconButton>

                <div className="flex items-center justify-start" aria-label="Toggle star">
                    <FuseAnimate animation="transition.expandIn" delay={100}>
                        <IconButton onClick={() => toggleStar(mail)}>
                            {mail.starred ?
                                (
                                    <Icon>star</Icon>
                                )
                                :
                                (
                                    <Icon>star_border</Icon>
                                )
                            }
                        </IconButton>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.expandIn" delay={100}>
                        <IconButton onClick={() => toggleImportant(mail)}>
                            {mail.important ?
                                (
                                    <Icon>label</Icon>
                                )
                                :
                                (
                                    <Icon>label_outline</Icon>
                                )
                            }
                        </IconButton>
                    </FuseAnimate>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleStar     : Actions.toggleStar,
        toggleImportant: Actions.toggleImportant
    }, dispatch);
}

function mapStateToProps({mailApp})
{
    return {
        mail: mailApp.mail
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MailToolbar)));
