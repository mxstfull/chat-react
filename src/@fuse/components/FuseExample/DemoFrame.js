import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'jss';
import {
    withStyles,
    createGenerateClassName,
    jssPreset,
    MuiThemeProvider
} from '@material-ui/core/styles';
import Frame from 'react-frame-component';
import JssProvider from 'react-jss/lib/JssProvider';
import jssExtend from 'jss-extend';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        flexGrow       : 1,
        height         : 400,
        border         : 'none',
        boxShadow      : theme.shadows[1]
    }
});

const generateClassName = createGenerateClassName({
    productionPrefix: 'iframe-',
});

class DemoFrame extends React.Component {
    state = {
        ready: false
    };

    handleRef = ref => {
        this.contentDocument = ref ? ref.node.contentDocument : null;
    };

    onContentDidMount = () => {
        this.setState({
            ready        : true,
            jss          : create({
                ...jssPreset(),
                plugins       : [...jssPreset().plugins, jssExtend()],
                insertionPoint: this.contentDocument.querySelector('#jss-demo-insertion-point')
            }),
            sheetsManager: new Map(),
            container    : this.contentDocument.body
        });
    };

    onContentDidUpdate = () => {
        this.contentDocument.body.dir = this.props.theme.direction;
    };

    renderHead = () => {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    html {
                    font-size: 62.5%;
                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;
                    }
                `
                }}
                />
                <noscript id="jss-demo-insertion-point"></noscript>
            </React.Fragment>
        )
    };

    render()
    {
        const {children, classes, theme} = this.props;


        const inIframe = this.state.ready ? (
            <JssProvider
                jss={this.state.jss}
                generateClassName={generateClassName}
                classNamePrefix="iframe-jss-"
            >
                <MuiThemeProvider theme={theme} sheetsManager={this.state.sheetsManager}>
                    {React.cloneElement(children, {
                        container: this.state.container
                    })}
                </MuiThemeProvider>
            </JssProvider>
        ) : null;

        return (
            <Frame
                head={this.renderHead()}
                ref={this.handleRef}
                className={classes.root}
                contentDidMount={this.onContentDidMount}
                contentDidUpdate={this.onContentDidUpdate}
            >
                {inIframe}
            </Frame>
        );
    }
}

DemoFrame.propTypes = {
    children: PropTypes.node.isRequired,
    classes : PropTypes.object.isRequired,
    theme   : PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(DemoFrame);
