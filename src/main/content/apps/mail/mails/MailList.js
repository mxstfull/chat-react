import React, {Component} from 'react';
import {FuseUtils, FuseAnimate, FuseAnimateGroup} from '@fuse';
import {withStyles} from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {List, Typography} from '@material-ui/core';
import MailListItem from './MailListItem';
import _ from '@lodash';

const styles = theme => ({
    mailList: {
        padding: 0
    },
    mailItem: {},
    avatar  : {
        backgroundColor: theme.palette.primary[500]
    },
    labels  : {}
});

class MailList extends Component {

    componentDidMount()
    {
        this.props.getMails(this.props.match.params);
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getMails(this.props.match.params);
        }
    }

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render()
    {
        const {mails, classes, searchText} = this.props;

        const arr = this.getFilteredArray(mails, searchText);

        if ( arr.length === 0 )
        {
            return (
                <FuseAnimate delay={100}>
                    <div className="flex flex-1 items-center justify-center h-full">
                        <Typography color="textSecondary" variant="h5">
                            There are no messages!
                        </Typography>
                    </div>
                </FuseAnimate>
            );
        }

        return (
            <List className={classes.mailList}>
                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    {
                        arr.map((mail) => (
                                <MailListItem mail={mail} key={mail.id}/>
                            )
                        )
                    }
                </FuseAnimateGroup>
            </List>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getMails: Actions.getMails
    }, dispatch);
}

function mapStateToProps({mailApp})
{
    return {
        mails     : mailApp.mails.entities,
        searchText: mailApp.mails.searchText
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MailList)));
