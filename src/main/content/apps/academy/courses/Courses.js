import React, {Component} from 'react';
import {
    withStyles,
    Button,
    Card,
    CardContent,
    OutlinedInput,
    Icon,
    TextField,
    Typography,
    CardActions,
    Divider,
    Select,
    InputLabel,
    FormControl,
    MenuItem,
    LinearProgress
} from '@material-ui/core';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';
import withReducer from 'store/withReducer';
import reducer from '../store/reducers';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import {Link} from 'react-router-dom';

const styles = theme => ({
    root      : {
        width: '100%'
    },
    header    : {
        background: "linear-gradient(to right, " + theme.palette.primary.dark + " 0%, " + theme.palette.primary.main + " 100%)",
        color     : theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
        position     : "absolute",
        top          : -64,
        left         : 0,
        opacity      : .04,
        fontSize     : 512,
        width        : 512,
        height       : 512,
        pointerEvents: "none"
    },
    content   : {}
});

class Courses extends Component {
    state = {
        data: this.props.courses
    };

    componentDidMount()
    {
        this.props.getCategories();
        this.props.getCourses();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.courses, prevProps.courses) ||
            !_.isEqual(this.props.searchText, prevProps.searchText) ||
            !_.isEqual(this.props.categoryFilter, prevProps.categoryFilter)
        )
        {
            const data = this.getFilteredArray(this.props.courses, this.props.searchText, this.props.categoryFilter);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText, categoryFilter) => {
        if ( searchText.length === 0 && categoryFilter === "all" )
        {
            return data;
        }

        return _.filter(data, item => {
            if ( categoryFilter !== "all" && item.category !== categoryFilter )
            {
                return false;
            }
            return item.title.toLowerCase().includes(searchText.toLowerCase())
        });
    };

    buttonStatus = (course) => {
        switch ( course.activeStep )
        {
            case course.totalSteps:
                return "COMPLETED";
            case 0:
                return "START";
            default:
                return "CONTINUE";
        }
    };

    render()
    {
        const {classes, setSearchText, searchText, categories, categoryFilter, setCategoryFilter, theme} = this.props;

        const {data} = this.state;

        return (
            <div className={classNames(classes.root)}>

                <div className={classNames(classes.header, "relative overflow-hidden flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288")}>

                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <Typography color="inherit" className="text-24 sm:text-40 font-light">
                            WELCOME TO ACADEMY
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate duration={400} delay={600}>
                        <Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
                            <span className="opacity-75">
                                Our courses will step you through the process of building a small application, or adding a new feature to an existing
                                application.
                            </span>
                        </Typography>
                    </FuseAnimate>

                    <Icon className={classes.headerIcon}>school</Icon>
                </div>

                <div className={classNames(classes.content, "max-w-2xl w-full mx-auto px-16 sm:px-24 py-24")}>
                    <div className="flex flex-col sm:flex-row items-center justify-between py-24">
                        <TextField
                            label="Search for a course"
                            placeholder="Enter a keyword..."
                            className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                            value={searchText}
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                            onChange={setSearchText}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                            <InputLabel htmlFor="category-label-placeholder">
                                Category
                            </InputLabel>
                            <Select
                                value={categoryFilter}
                                onChange={setCategoryFilter}
                                input={
                                    <OutlinedInput
                                        labelWidth={("category".length * 9)}
                                        name="category"
                                        id="category-label-placeholder"
                                    />
                                }
                            >
                                <MenuItem value="all">
                                    <em>All</em>
                                </MenuItem>

                                {categories.map(category => (
                                    <MenuItem value={category.value} key={category.id}>{category.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                        className="flex flex-wrap py-24"
                    >
                        {data.map((course) => {
                            const category = categories.find(_cat => _cat.value === course.category);
                            return (
                                <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={course.id}>
                                    <Card elevation={1} className="flex flex-col min-h-256">
                                        <div
                                            className="flex items-center justify-between px-24 h-64"
                                            style={{
                                                background: category.color,
                                                color     : theme.palette.getContrastText(category.color)
                                            }}
                                        >
                                            <Typography className="font-medium truncate" color="inherit">{category.label}</Typography>
                                            <div className="flex items-center justify-center opacity-75">
                                                <Icon className="text-20 mr-8" color="inherit">access_time</Icon>
                                                <div className="text-16 whitespace-no-wrap">{course.length} min</div>
                                            </div>
                                        </div>
                                        <CardContent className="flex flex-col flex-1 items-center justify-center">
                                            <Typography className="text-center text-16 font-400">{course.title}</Typography>
                                            <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">{course.updated}</Typography>
                                        </CardContent>
                                        <Divider/>
                                        <CardActions className="justify-center">
                                            <Button
                                                to={`/apps/academy/courses/${course.id}/${course.slug}`}
                                                component={Link}
                                                className="justify-start px-32"
                                                color="secondary"
                                            >
                                                {this.buttonStatus(course)}
                                            </Button>
                                        </CardActions>
                                        <LinearProgress
                                            className="w-full"
                                            variant="determinate"
                                            value={course.activeStep * 100 / course.totalSteps}
                                            color="secondary"
                                        />
                                    </Card>
                                </div>
                            )
                        })}
                    </FuseAnimateGroup>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCategories    : Actions.getCategories,
        getCourses       : Actions.getCourses,
        setCategoryFilter: Actions.setCategoryFilter,
        setSearchText    : Actions.setCoursesSearchText
    }, dispatch);
}

function mapStateToProps({academyApp})
{
    return {
        courses       : academyApp.courses.data,
        searchText    : academyApp.courses.searchText,
        categories    : academyApp.courses.categories,
        categoryFilter: academyApp.courses.categoryFilter
    }
}

export default withReducer('academyApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Courses)));
