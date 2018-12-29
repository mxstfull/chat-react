import React, {Component} from 'react';
import {withStyles, TextField, Dialog, DialogContent, DialogTitle, Icon, IconButton, Typography, Toolbar, AppBar, Avatar, InputAdornment, Tooltip, List} from '@material-ui/core';
import * as Actions from 'main/content/apps/scrumboard/store/actions/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FuseChipSelect} from '@fuse/index';
import LabelModel from 'main/content/apps/scrumboard/model/LabelModel';
import CardAttachment from './attachment/CardAttachment';
import DueMenu from './toolbar/DueMenu';
import LabelsMenu from './toolbar/LabelsMenu';
import MembersMenu from './toolbar/MembersMenu';
import CheckListMenu from './toolbar/CheckListMenu';
import OptionsMenu from './toolbar/OptionsMenu';
import CardChecklist from './checklist/CardChecklist';
import CardActivity from './activity/CardActivity';
import CardComment from './comment/CardComment';
import classNames from 'classnames';
import _ from '@lodash';
import moment from 'moment';

const styles = theme => ({
    root       : {},
    paper      : {
        color: theme.palette.text.primary
    },
    formControl: {
        marginBottom: 24
    }
});

class BoardCardDialog extends Component {

    state = {
        dueMenu: null
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( prevProps.card &&
            this.props.card &&
            !_.isEqual(prevProps.card, this.props.card)
        )
        {
            this.updateCard(this.props.board.id, this.props.card);
        }
    }

    updateCard = _.debounce((boardId, card) => {
        this.props.updateCard(boardId, card);
    }, 600);

    render()
    {
        const {card, classes, removeCard, closeCardDialog, board, addLabel, handleChange, chipChange, removeAttachment, removeDue, toggleLabel, toggleMember, addCheckList, checkListChange, removeCheckList, commentAdd, makeCover, removeCover, addNewChip} = this.props;
        const list = card ? _.find(board.lists, (_list) => _list.idCards.includes(card.id)) : null;
        const dueDate = card && card.due ? moment(card.due).format(moment.HTML5_FMT.DATE) : "";

        return (
            <Dialog
                classes={{
                    root : classes.root,
                    paper: classNames(classes.paper, "max-w-lg w-full m-24")
                }}
                onClose={closeCardDialog}
                open={Boolean(card)}
            >

                {card && (
                    <DialogTitle component="div" className="p-0">
                        <AppBar position="static" elevation={1}>
                            <Toolbar className="flex w-full overflow-x-auto px-8 sm:px-16">
                                <div className="flex flex-1">

                                    <DueMenu
                                        onDueChange={handleChange}
                                        onRemoveDue={removeDue}
                                        due={card.due}
                                    />

                                    <LabelsMenu
                                        onToggleLabel={toggleLabel}
                                        labels={board.labels}
                                        idLabels={card.idLabels}
                                    />

                                    <MembersMenu
                                        onToggleMember={toggleMember}
                                        members={board.members}
                                        idMembers={card.idMembers}
                                    />

                                    <IconButton color="inherit">
                                        <Icon>attachment</Icon>
                                    </IconButton>

                                    <CheckListMenu
                                        onAddCheckList={addCheckList}
                                    />

                                    <OptionsMenu
                                        onRemoveCard={() => removeCard(board.id, card.id)}
                                    />

                                </div>
                                <IconButton color="inherit" onClick={closeCardDialog}>
                                    <Icon>close</Icon>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </DialogTitle>
                )}

                {card && (
                    <DialogContent className="p-16 sm:p-24">

                        <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center mb-24">
                            <div className="mb-16 sm:mb-0 flex items-center">
                                <Typography>{board.name}</Typography>
                                <Icon className="text-20" color="inherit">chevron_right</Icon>
                                <Typography>{list && list.name}</Typography>
                            </div>

                            {card.due && (
                                <TextField
                                    label="Due date"
                                    type="date"
                                    name="due"
                                    value={dueDate}
                                    onChange={handleChange}
                                    placeholder=" Choose a due date"
                                    className="w-full sm:w-auto"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Icon color="action">today</Icon>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            )}
                        </div>

                        <div className="flex items-center mb-24">
                            <TextField
                                label="Title"
                                type="text"
                                name="name"
                                value={card.name}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {card.subscribed && (
                                                <Icon className="text-20" color="action">remove_red_eye</Icon>
                                            )}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>

                        <div className="w-full mb-24">
                            <TextField
                                label="Description"
                                name="description"
                                multiline
                                rows="4"
                                value={card.description}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row">
                            {card.idLabels.length > 0 && (
                                <div className="flex-1 mb-24">
                                    <div className="flex items-center mt-16 mb-12">
                                        <Icon className="text-20 mr-8" color="inherit">label</Icon>
                                        <Typography className="font-600 text-16">Labels</Typography>
                                    </div>
                                    <FuseChipSelect
                                        className={card.idMembers.length > 0 && 'sm:mr-8'}
                                        value={
                                            card.idLabels.map(labelId => ({
                                                value: labelId,
                                                label: _.find(board.labels, {id: labelId}).name,
                                                class: _.find(board.labels, {id: labelId}).class
                                            }))
                                        }
                                        onChange={(value) => chipChange('idLabels', value)}
                                        placeholder="Select multiple Labels"
                                        isMulti
                                        textFieldProps={{
                                            variant: "outlined"
                                        }}
                                        options={board.labels.map((label) => (
                                            {
                                                value: label.id,
                                                label: label.name,
                                                class: label.class
                                            }
                                        ))}
                                        onCreateOption={(name) => {
                                            // Create New Label
                                            const newLabel = new LabelModel({name});

                                            // Ad new Label to board(redux store and server)
                                            addLabel(newLabel);

                                            // Trigger handle chip change
                                            addNewChip('idLabels', newLabel.id);

                                            return newLabel.id;
                                        }}
                                    />
                                </div>
                            )}

                            {card.idMembers.length > 0 && (
                                <div className="flex-1 mb-24">
                                    <div className="flex items-center mt-16 mb-12">
                                        <Icon className="text-20 mr-8" color="inherit">supervisor_account</Icon>
                                        <Typography className="font-600 text-16">Members</Typography>
                                    </div>
                                    <FuseChipSelect
                                        className={card.idLabels.length > 0 && 'sm:ml-8'}
                                        value={
                                            card.idMembers.map(memberId => {
                                                const member = _.find(board.members, {id: memberId});
                                                return {
                                                    value: member.id,
                                                    label: (<Tooltip title={member.name}><Avatar className="-ml-12 w-32 h-32" src={member.avatar}/></Tooltip>)
                                                }
                                            })
                                        }
                                        onChange={(value) => chipChange('idMembers', value)}
                                        placeholder="Select multiple Members"
                                        isMulti
                                        textFieldProps={{
                                            variant: "outlined"
                                        }}
                                        options={board.members.map((member) => (
                                            {
                                                value: member.id,
                                                label: (<span className="flex items-center"><Avatar className="w-32 h-32 mr-8" src={member.avatar}/>{member.name}</span>)
                                            }
                                        ))}
                                        variant="fixed"
                                    />
                                </div>
                            )}
                        </div>

                        {card.attachments.length > 0 && (
                            <div className="mb-24">
                                <div className="flex items-center mt-16 mb-12">
                                    <Icon className="text-20 mr-8" color="inherit">attachment</Icon>
                                    <Typography className="font-600 text-16">Attachments</Typography>
                                </div>
                                <div className="flex flex-col sm:flex-row flex-wrap">
                                    {card.attachments.map(item => (
                                            <CardAttachment
                                                item={item}
                                                card={card}
                                                makeCover={makeCover}
                                                removeCover={removeCover}
                                                removeAttachment={removeAttachment}
                                                key={item.id}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {card.checklists.map(checklist => (
                            <CardChecklist
                                key={checklist.id}
                                checklist={checklist}
                                onCheckListChange={checkListChange}
                                onRemoveCheckList={() => removeCheckList(checklist.id)}
                            />
                        ))}

                        <div className="mb-24">
                            <div className="flex items-center mt-16 mb-12">
                                <Icon className="text-20 mr-8" color="inherit">comment</Icon>
                                <Typography className="font-600 text-16">Comment</Typography>
                            </div>
                            <div>
                                <CardComment
                                    members={board.members}
                                    onCommentAdd={commentAdd}
                                />
                            </div>
                        </div>

                        {card.activities.length > 0 && (
                            <div className="mb-24">
                                <div className="flex items-center mt-16">
                                    <Icon className="text-20 mr-8" color="inherit">list</Icon>
                                    <Typography className="font-600 text-16">Activity</Typography>
                                </div>
                                <List className="">
                                    {card.activities.map(item => (
                                            <CardActivity
                                                item={item}
                                                key={item.id}
                                                members={board.members}
                                            />
                                        )
                                    )}
                                </List>
                            </div>
                        )}
                    </DialogContent>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeCardDialog : Actions.closeCardDialog,
        updateCard      : Actions.updateCard,
        removeCard      : Actions.removeCard,
        handleChange    : Actions.handleChange,
        addLabel        : Actions.addLabel,
        chipChange      : Actions.chipChange,
        makeCover       : Actions.makeCover,
        removeCover     : Actions.removeCover,
        removeAttachment: Actions.removeAttachment,
        removeDue       : Actions.removeDue,
        toggleLabel     : Actions.toggleLabel,
        toggleMember    : Actions.toggleMember,
        addCheckList    : Actions.addCheckList,
        checkListChange : Actions.checkListChange,
        removeCheckList : Actions.removeCheckList,
        addNewChip      : Actions.addNewChip,
        commentAdd      : Actions.commentAdd
    }, dispatch);
}

function mapStateToProps({scrumboardApp})
{
    return {
        card : scrumboardApp.card,
        board: scrumboardApp.board
    }
}


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(BoardCardDialog));
