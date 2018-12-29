import React, {Component} from 'react';
import {ClickAwayListener, Icon, IconButton, ListItemIcon, ListItemText, Tooltip, withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import {FuseUtils} from '@fuse';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {withRouter} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import deburr from 'lodash/deburr';
import Popper from '@material-ui/core/Popper/Popper';
import Autosuggest from 'react-autosuggest';

function renderInputComponent(inputProps)
{
    const {
        classes, inputRef = () => {
        }, ref, ...other
    } = inputProps;

    return (
        <TextField
            autoFocus
            fullWidth
            InputProps={{
                disableUnderline: true,
                inputRef        : node => {
                    ref(node);
                    inputRef(node);
                },
                classes         : {
                    input: classNames(classes.input, "py-0 px-16 h-64")
                }
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, {query, isHighlighted})
{
    const matches = match(suggestion.title, query);
    const parts = parse(suggestion.title, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <ListItemIcon>
                {suggestion.icon ?
                    (
                        <Icon>{suggestion.icon}</Icon>
                    ) :
                    (
                        <span className="text-20 w-24 font-bold uppercase text-center">{suggestion.title[0]}</span>
                    )
                }
            </ListItemIcon>
            <ListItemText
                className="pl-0"
                primary={
                    parts.map((part, index) => {
                        return part.highlight ? (
                            <span key={String(index)} style={{fontWeight: 600}}>
                                {part.text}
                            </span>
                        ) : (
                            <strong key={String(index)} style={{fontWeight: 300}}>
                                {part.text}
                            </strong>
                        );
                    })
                }
            />
        </MenuItem>
    );
}

function getSuggestions(value, data)
{
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : data.filter(suggestion => {
            const keep =
                count < 10 &&
                match(suggestion.title, inputValue).length > 0;

            if ( keep )
            {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion)
{
    return suggestion.title;
}

const propTypes = {};

const defaultProps = {
    trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>)
};

const styles = theme => ({
    root                    : {},
    container               : {
        position: 'relative'
    },
    suggestionsContainerOpen: {
        position : 'absolute',
        zIndex   : 1,
        marginTop: theme.spacing.unit,
        left     : 0,
        right    : 0
    },
    suggestion              : {
        display: 'block'
    },
    suggestionsList         : {
        margin       : 0,
        padding      : 0,
        listStyleType: 'none'
    }
});

class FuseSearch extends Component {
    state = {
        search        : false,
        flatNavigation: null,
        popper        : '',
        suggestions   : []
    };

    componentDidMount()
    {
        this.flattenNavigation(this.props.navigation);
    }

    showSearch = () => {
        this.setState({search: true});
        document.addEventListener("keydown", this.escFunction, false);
    };

    hideSearch = () => {
        this.setState({
            search: false,
            popper: ''
        });
        document.removeEventListener("keydown", this.escFunction, false);
    };

    escFunction = (event) => {
        if ( event.keyCode === 27 )
        {
            this.hideSearch();
        }
    };

    flattenNavigation(navigation)
    {
        this.setState({flatNavigation: FuseUtils.getFlatNavigation(navigation)})
    }

    handleSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value, this.state.flatNavigation)
        });
    };

    handleSuggestionSelected = (event, {suggestion}) => {
        event.preventDefault();
        event.stopPropagation();
        if ( !suggestion.url )
        {
            return;
        }
        this.props.history.push(suggestion.url);
        this.hideSearch();
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleChange = name => (event, {newValue}) => {
        this.setState({
            [name]: newValue
        });
    };

    handleClickAway = event => {
        return (
            !this.suggestionsNode ||
            !this.suggestionsNode.contains(event.target)
        ) && this.hideSearch();
    };

    handleRef = domNode => {
        this.popperNode = domNode
    };

    handleSuggestionsRef = domNode => {
        this.suggestionsNode = domNode
    };

    render()
    {
        const {classes} = this.props;
        const autosuggestProps = {
            renderInputComponent,
            highlightFirstSuggestion   : true,
            suggestions                : this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            onSuggestionSelected       : this.handleSuggestionSelected,
            getSuggestionValue,
            renderSuggestion
        };
        return (
            <div className={classNames(classes.root, "flex")}>

                <Tooltip title="Click to search" placement="bottom">
                    <div onClick={this.showSearch}>
                        {this.props.trigger}
                    </div>
                </Tooltip>

                {this.state.search && (
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <Paper
                            ref={(node) => this.paper = node}
                            className="absolute pin-l pin-r h-full z-9999"
                            square={true}
                        >
                            <div className="flex items-center w-full" ref={this.handleRef}>
                                <Autosuggest
                                    {...autosuggestProps}
                                    inputProps={{
                                        classes,
                                        placeholder    : 'Search',
                                        value          : this.state.popper,
                                        onChange       : this.handleChange('popper'),
                                        InputLabelProps: {
                                            shrink: true
                                        }
                                    }}
                                    theme={{
                                        container      : "flex flex-1 w-full",
                                        suggestionsList: classes.suggestionsList,
                                        suggestion     : classes.suggestion
                                    }}
                                    renderSuggestionsContainer={options => (
                                        <Popper
                                            anchorEl={this.popperNode}
                                            open={Boolean(options.children)}
                                            popperOptions={{positionFixed: true}}
                                            className="z-9999"
                                        >
                                            <div ref={this.handleSuggestionsRef}>
                                                <Paper
                                                    elevation={1}
                                                    square
                                                    {...options.containerProps}
                                                    style={{width: this.popperNode ? this.popperNode.clientWidth : null}}
                                                >
                                                    {options.children}
                                                </Paper>
                                            </div>
                                        </Popper>
                                    )}
                                />
                                <IconButton onClick={this.hideSearch} className="mx-8">
                                    <Icon>close</Icon>
                                </IconButton>
                            </div>
                        </Paper>
                    </ClickAwayListener>
                )}
            </div>
        );
    }
}

function mapStateToProps({fuse})
{
    return {
        navigation: fuse.navigation
    }
}

FuseSearch.propTypes = propTypes;
FuseSearch.defaultProps = defaultProps;

export default withStyles(styles)(withRouter(connect(mapStateToProps)(FuseSearch)));
