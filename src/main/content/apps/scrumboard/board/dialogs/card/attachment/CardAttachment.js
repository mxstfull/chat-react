import React, {Component} from 'react';
import {Icon, Typography, Paper, Button, Menu, MenuItem} from '@material-ui/core';

class CardAttachment extends Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render()
    {
        const {card, item, makeCover, removeCover, removeAttachment} = this.props;
        const {anchorEl} = this.state;

        switch ( item.type )
        {
            case 'image':
            {
                return (
                    <div className="flex w-full sm:w-1/2 mb-16" key={item.id}>
                        <div className="flex items-center justify-center w-128 h-128 mr-16">
                            <Paper className="rounded-4 overflow-hidden" elevation={1}>
                                <img className="block max-h-full max-h-full" src={item.src} alt="attachment"/>
                            </Paper>
                        </div>
                        <div className="flex flex-auto flex-col justify-center items-start min-w-0">
                            <div className="flex items-center w-full">
                                <Typography className="text-16 font-600 truncate flex-shrink">{item.name}</Typography>
                                {card.idAttachmentCover === item.id && (
                                    <Icon className="text-orange-light text-20 ml-4">star</Icon>
                                )}
                            </div>
                            <Typography className="truncate w-full mb-12" color="textSecondary">{item.time}</Typography>
                            <Button
                                aria-owns={anchorEl ? 'actions-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                variant="outlined"
                                size="small"
                            >
                                Actions
                                <Icon className="text-20">arrow_drop_down</Icon>
                            </Button>
                            <Menu
                                id="actions-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                {card.idAttachmentCover !== item.id ? (
                                    <MenuItem
                                        onClick={() => {
                                            this.handleClose();
                                            makeCover(item.id);
                                        }}
                                    >
                                        Make Cover
                                    </MenuItem>
                                ) : (
                                    <MenuItem
                                        onClick={() => {
                                            this.handleClose();
                                            removeCover();
                                        }}
                                    >
                                        Remove Cover
                                    </MenuItem>
                                )}
                                <MenuItem
                                    onClick={() => {
                                        this.handleClose();
                                        removeAttachment(item.id);
                                    }}
                                >
                                    Remove Attachment
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                )
            }
            case 'link':
            {
                return (
                    <div className="flex w-full sm:w-1/2 mb-16" key={item.id}>
                        <Paper className="min-w-128 w-128 h-128 mr-16 flex items-center justify-center rounded-4 overflow-hidden" elevation={1}>
                            <Typography className="font-600">LINK</Typography>
                        </Paper>
                        <div className="flex flex-auto flex-col justify-center items-start min-w-0">
                            <Typography className="text-16 font-600 truncate w-full">{item.url}</Typography>
                            <Typography className="truncate w-full mb-12" color="textSecondary">{item.time}</Typography>
                            <Button
                                aria-owns={anchorEl ? 'actions-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                variant="outlined"
                                size="small"
                            >
                                Actions
                                <Icon className="text-20">arrow_drop_down</Icon>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem
                                    onClick={() => {
                                        this.handleClose();
                                        removeAttachment(item.id);
                                    }}
                                >
                                    Remove Attachment
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                )
            }
            default:
            {
                return null;
            }
        }
    }
}

export default CardAttachment;
