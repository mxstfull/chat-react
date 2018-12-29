import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {withStyles, Typography, Icon} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimateGroup, FuseAnimate} from '@fuse';
import withReducer from 'store/withReducer';
import reducer from './../store/reducers';

const styles = theme => ({
    root    : {
        background: theme.palette.primary.main,
        color     : theme.palette.getContrastText(theme.palette.primary.main)
    },
    board   : {
        cursor                  : 'pointer',
        boxShadow               : theme.shadows[0],
        transitionProperty      : 'box-shadow border-color',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        background              : theme.palette.primary.dark,
        color                   : theme.palette.getContrastText(theme.palette.primary.dark),
        '&:hover'               : {
            boxShadow: theme.shadows[6]
        }
    },
    newBoard: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.6),
        '&:hover'  : {
            borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
        }
    }
});


class Boards extends Component {

    componentDidMount()
    {
        this.props.getBoards();
    }

    componentWillUnmount()
    {
        this.props.resetBoards();
    }

    render()
    {
        const {classes, boards, newBoard} = this.props;

        return (
            <div className={classNames(classes.root, "flex flex-grow flex-no-shrink flex-col items-center")}>

                <FuseAnimate>
                    <Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300" color="inherit">Scrumboard App</Typography>
                </FuseAnimate>

                <div>
                    <FuseAnimateGroup
                        className="flex flex-wrap w-full justify-center py-32 px-16"
                        enter={{
                            animation: "transition.slideUpBigIn",
                            duration : 300
                        }}
                    >
                        {boards.map(board => (
                            <div className="w-224 h-224 p-16" key={board.id}>
                                <Link
                                    to={'/apps/scrumboard/boards/' + board.id + '/' + board.uri}
                                    className={classNames(classes.board, "flex flex-col items-center justify-center w-full h-full rounded py-24")}
                                    role="button"
                                >
                                    <Icon className="text-56">assessment</Icon>
                                    <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">{board.name}</Typography>
                                </Link>
                            </div>
                        ))}
                        <div className="w-224 h-224 p-16">
                            <div
                                className={classNames(classes.board, classes.newBoard, "flex flex-col items-center justify-center w-full h-full rounded py-24")}
                                onClick={() => newBoard()}
                            >
                                <Icon className="text-56">add_circle</Icon>
                                <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">Add new board</Typography>
                            </div>
                        </div>
                    </FuseAnimateGroup>

                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getBoards  : Actions.getBoards,
        resetBoards: Actions.resetBoards,
        newBoard   : Actions.newBoard
    }, dispatch);
}

function mapStateToProps({scrumboardApp})
{
    return {
        boards: scrumboardApp.boards
    }
}

export default withReducer('scrumboardApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Boards))));
