import React, {PureComponent} from 'react';
import {AppBar, Card, Icon, Tab, Tabs, withStyles} from '@material-ui/core';
import {FuseHighlight} from '@fuse';
import PropTypes from 'prop-types';
import DemoFrame from './DemoFrame';

const propTypes = {
    component      : PropTypes.func,
    raw            : PropTypes.string,
    currentTabIndex: PropTypes.number
};

const defaultProps = {
    currentTabIndex: 0
};

const styles = theme => ({
    root: {}
});

class FuseExample extends PureComponent {
    state = {
        value: this.props.currentTabIndex
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render()
    {
        const {className, component: Component, raw, iframe} = this.props;
        const {value} = this.state;
        return (
            <Card className={className}>
                <AppBar position="static" color="default" elevation={0}>
                    <Tabs
                        classes={
                            {
                                root         : 'border-b-1',
                                flexContainer: 'justify-end'
                            }}
                        value={value}
                        onChange={this.handleChange}
                    >
                        {Component && (
                            <Tab classes={{root: 'min-w-64'}} icon={<Icon>remove_red_eye</Icon>}/>
                        )}
                        {raw && (
                            <Tab classes={{root: 'min-w-64'}} icon={<Icon>code</Icon>}/>
                        )}
                    </Tabs>
                </AppBar>
                <div className="flex justify-center">
                    <div className={value === 0 ? 'flex flex-1' : 'hidden'}>
                        {Component && (
                            iframe ? (
                                <DemoFrame>
                                    <Component/>
                                </DemoFrame>
                            ) : (
                                <div className="p-24 flex flex-1 justify-center">
                                    <Component/>
                                </div>
                            )
                        )}
                    </div>
                    <div className={value === 1 ? 'flex flex-1' : 'hidden'}>
                        {raw && (
                            <div className="flex flex-1">
                                <FuseHighlight component="pre" className="language-javascript w-full">
                                    {raw}
                                </FuseHighlight>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        )
    }
}

FuseExample.propTypes = propTypes;
FuseExample.defaultProps = defaultProps;

export default withStyles(styles)(FuseExample);
