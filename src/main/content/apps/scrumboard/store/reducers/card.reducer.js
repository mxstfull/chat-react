import * as Actions from '../actions';
import _ from '@lodash';

const initialState = null;

const cardReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.OPEN_CARD_DIALOG:
        {
            return {
                ...action.payload
            };
        }
        case Actions.REMOVE_CARD:
        {
            return null;
        }
        case Actions.CLOSE_CARD_DIALOG:
        {
            return null;
        }
        case Actions.CHANGE_CARD:
        {
            return _.setIn(state, action.target.name, action.target.type === 'checkbox' ? action.target.checked : action.target.value);
        }
        case Actions.CHIP_CHANGE_CARD:
        {
            return _.setIn(state, action.name, action.value.map(item => item.value));
        }
        case Actions.NEW_CHIP_CARD:
        {
            return _.setIn(state, action.name, [...state[action.name], action.value]);
        }
        case Actions.MAKE_COVER_CARD:
        {
            return _.setIn(state, 'idAttachmentCover', action.attachmentId);
        }
        case Actions.REMOVE_COVER_CARD:
        {
            return _.setIn(state, 'idAttachmentCover', '');
        }
        case Actions.REMOVE_ATTACHMENT_CARD:
        {
            return {
                ...state,
                attachments      : _.reject(state.attachments, {id: action.attachmentId}),
                idAttachmentCover: state.idAttachmentCover === action.attachmentId ? '' : state.idAttachmentCover
            }
        }
        case Actions.REMOVE_DUE_CARD:
        {
            return _.setIn(state, 'due', null);
        }
        case Actions.TOGGLE_LABEL_CARD:
        {
            return _.setIn(state, 'idLabels', _.xor(state.idLabels, [action.labelId]));
        }
        case Actions.TOGGLE_MEMBER_CARD:
        {
            return _.setIn(state, 'idMembers', _.xor(state.idMembers, [action.memberId]));
        }
        case Actions.ADD_CHECKLIST_CARD:
        {
            return _.setIn(state, 'checklists', [...state.checklists, action.newList]);
        }
        case Actions.CHECKLIST_CHANGE_CARD:
        {
            const index = state.checklists.findIndex((x) => x.id === action.item.id);
            return _.setIn(state, `checklists[${index}]`, action.item);
        }
        case Actions.CHECKLIST_REMOVE_CARD:
        {
            return _.setIn(state, 'checklists', _.reject(state.checklists, {id: action.id}));
        }
        case Actions.COMMENT_ADD_CARD:
        {
            return _.setIn(state, 'activities', [action.comment, ...state.activities]);
        }
        default:
            return state;
    }
};

export default cardReducer;
