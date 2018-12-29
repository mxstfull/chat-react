import React, {Component} from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import {withStyles, Paper, Chip, Typography, TextField, MenuItem} from '@material-ui/core';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';

const styles = theme => ({
    root            : {
        '& .fuse-chip-select__input': {
            color: theme.palette.text.primary
        },
        '&.standard'                : {
            '& $placeholder'   : {},
            '& $valueContainer': {
                paddingTop: 4
            }
        },
        '&.filled'                  : {
            '& $placeholder'   : {
                left: 12
            },
            '& $valueContainer': {
                paddingTop : 24,
                paddingLeft: 12
            },
            '& $chip'          : {
                border: "1px solid rgba(0, 0, 0, 0.12)"
            }
        },
        '&.outlined'                : {
            '& $placeholder'   : {
                left: 12
            },
            '& $valueContainer': {
                paddingLeft: 12,
                paddingTop : 12
            }
        }
    },
    input           : {
        display: 'flex',
        padding: 0
    },
    valueContainer  : {
        display      : 'flex',
        flexWrap     : 'wrap',
        flex         : 1,
        alignItems   : 'center',
        paddingBottom: 4,
        paddingTop   : 12,
        minHeight    : 40
    },
    chip            : {
        margin: "4px 4px 4px 0"
    },
    chipFocused     : {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08
        )
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue     : {
        fontSize: 16
    },
    placeholder     : {
        position: 'absolute',
        left    : 0,
        fontSize: 16,
        margin  : 0
    },
    paper           : {
        position : 'absolute',
        zIndex   : 2,
        marginTop: theme.spacing.unit,
        left     : 0,
        right    : 0
    },
    divider         : {
        height: theme.spacing.unit * 2
    }
});

function NoOptionsMessage(props)
{
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({inputRef, ...props})
{
    return <div ref={inputRef} {...props} />;
}

function Control(props)
{
    return (
        <TextField
            fullWidth
            className={classNames(props.selectProps.classes.root, props.selectProps.textFieldProps.variant)}
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef : props.innerRef,
                    children : props.children,
                    ...props.innerProps
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props)
{
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 600 : 400
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props)
{
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props)
{
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props)
{
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props)
{
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused
            }, props.data.class)}
            onDelete={event => {
                props.removeProps.onClick();
                props.removeProps.onMouseDown(event);
            }}
        />
    );
}

function Menu(props)
{
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

class FuseChipSelect extends Component {

    render()
    {
        return (
            this.props.variant === 'fixed' ? (
                <Select
                    classNamePrefix="fuse-chip-select"
                    {...this.props}
                    components={components}
                />
            ) : (
                <CreatableSelect
                    classNamePrefix="fuse-chip-select"
                    {...this.props}
                    components={components}
                />
            )
        );
    }
}

export default withStyles(styles, {withTheme: true})(FuseChipSelect);
