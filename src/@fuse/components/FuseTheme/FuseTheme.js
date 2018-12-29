import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fuseThemesConfig} from 'fuse-configs/fuseThemesConfig';
import _ from '@lodash';
import {fuseDark} from '@fuse/fuse-colors';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

const defaultOptions = {
    typography: {
        fontFamily                 : [
            'Muli',
            'Roboto',
            '"Helvetica"',
            'Arial',
            'sans-serif'
        ].join(','),
        fontWeightLight            : 300,
        fontWeightRegular          : 400,
        fontWeightMedium           : 600,
        useNextVariants            : true,
        suppressDeprecationWarnings: true
    }
};

const mustHaveOptions = {
    typography: {
        htmlFontSize: 10
    }
};

export const defaults = {
    default    : {
        palette: {
            type     : 'light',
            primary  : fuseDark,
            secondary: {
                light: lightBlue[400],
                main : lightBlue[600],
                dark : lightBlue[700]
            },
            error    : red
        },
        status : {
            danger: 'orange'
        }
    },
    defaultDark: {
        palette: {
            type     : 'dark',
            primary  : fuseDark,
            secondary: {
                light: lightBlue[400],
                main : lightBlue[600],
                dark : lightBlue[700]
            },
            error    : red
        },
        status : {
            danger: 'orange'
        }
    }
};

export let FuseSelectedTheme;

const themesObj = Object.keys(fuseThemesConfig).length !== 0 ? fuseThemesConfig : defaults;

export let themes = Object.assign({}, ...Object.entries(themesObj).map(([key, value]) => {
        const muiTheme = _.merge({}, defaultOptions, value, mustHaveOptions);
        return {
            [key]: createMuiTheme(_.merge({}, muiTheme, {mixins: customMixins(muiTheme)}))
        }
    }
));

function customMixins(obj)
{
    const theme = createMuiTheme(obj);
    return {
        border      : (width = 1) => ({
            borderWidth: width,
            borderStyle: 'solid',
            borderColor: theme.palette.divider
        }),
        borderLeft  : (width = 1) => ({
            borderLeftWidth: width,
            borderStyle    : 'solid',
            borderColor    : theme.palette.divider
        }),
        borderRight : (width = 1) => ({
            borderRightWidth: width,
            borderStyle     : 'solid',
            borderColor     : theme.palette.divider
        }),
        borderTop   : (width = 1) => ({
            borderTopWidth: width,
            borderStyle   : 'solid',
            borderColor   : theme.palette.divider
        }),
        borderBottom: (width = 1) => ({
            borderBottomWidth: width,
            borderStyle      : 'solid',
            borderColor      : theme.palette.divider
        })
    }
}


function updateLightDarkThemes(val)
{
    const theme = themesObj[val];
    themes = {
        ...themes,
        mainThemeDark : createMuiTheme(_.merge({}, defaultOptions, theme, {palette: {type: 'dark'}, ...mustHaveOptions})),
        mainThemeLight: createMuiTheme(_.merge({}, defaultOptions, theme, {palette: {type: 'light'}, ...mustHaveOptions}))
    }
}

class FuseTheme extends Component {
    state = {
        theme: null
    };

    static getDerivedStateFromProps(nextProps, prevState)
    {
        FuseSelectedTheme = themes[nextProps.selectedTheme];
        updateLightDarkThemes(nextProps.selectedTheme);
        const selected = themes[nextProps.selectedTheme];
        return !_.isEqual(prevState.theme, selected) ? {theme: themes[nextProps.selectedTheme]} : null;
    }

    render()
    {
        const {children} = this.props;
        const {theme} = this.state;
        // console.warn('FuseTheme:: rendered', theme);

        return (
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps({fuse})
{
    return {
        selectedTheme: fuse.settings.current.theme.main
    }
}

export default withRouter(connect(mapStateToProps, null)(FuseTheme));
