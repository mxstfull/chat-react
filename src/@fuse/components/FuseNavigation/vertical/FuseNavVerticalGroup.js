import React from 'react';
import FuseNavVerticalCollapse from './FuseNavVerticalCollapse';
import FuseNavVerticalItem from './FuseNavVerticalItem';
import {ListSubheader, withStyles} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const propTypes = {
    item: PropTypes.shape(
        {
            id      : PropTypes.string.isRequired,
            title   : PropTypes.string,
            children: PropTypes.array
        })
};

const defaultProps = {};

const styles = theme => ({
    item: {
        height      : 40,
        width       : 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingRight: 12
    }
});

function FuseNavVerticalGroup({classes, item, nestedLevel, userRole, active})
{
    if ( item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest'))) )
    {
        return null;
    }

    let paddingValue = 40 + (nestedLevel * 16);
    const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';

    return (
        <React.Fragment>

            <ListSubheader disableSticky={true} className={classNames(classes.item, listItemPadding, "list-subheader flex items-center")}>
                <span className="list-subheader-text uppercase text-12">
                    {item.title}
                </span>
            </ListSubheader>

            {item.children && (
                <React.Fragment>
                    {
                        item.children.map((item) => (

                            <React.Fragment key={item.id}>

                                {item.type === 'group' && (
                                    <NavVerticalGroup item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                                {item.type === 'collapse' && (
                                    <FuseNavVerticalCollapse item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                                {item.type === 'item' && (
                                    <FuseNavVerticalItem item={item} nestedLevel={nestedLevel} active={active}/>
                                )}

                            </React.Fragment>
                        ))
                    }
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

function mapStateToProps({auth})
{
    return {
        userRole: auth.user.role
    }
}

FuseNavVerticalGroup.propTypes = propTypes;
FuseNavVerticalGroup.defaultProps = defaultProps;

const NavVerticalGroup = withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(FuseNavVerticalGroup)));

export default NavVerticalGroup;
