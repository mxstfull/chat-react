import axios from 'axios/index';
import {showMessage} from 'store/actions/fuse';

export const OPEN_CARD_DIALOG = '[SCRUMBOARD APP] OPEN CARD DIALOG';
export const CLOSE_CARD_DIALOG = '[SCRUMBOARD APP] CLOSE CARD DIALOG';
export const UPDATE_CARD = '[SCRUMBOARD APP] UPDATE CARD';
export const CHANGE_CARD = '[SCRUMBOARD APP] CHANGE CARD';
export const REMOVE_CARD = '[SCRUMBOARD APP] REMOVE CARD';
export const CHIP_CHANGE_CARD = '[SCRUMBOARD APP] CHIP CHANGED CARD';
export const NEW_CHIP_CARD = '[SCRUMBOARD APP] NEW CHIP CARD';
export const MAKE_COVER_CARD = '[SCRUMBOARD APP] MAKE COVER CARD';
export const REMOVE_COVER_CARD = '[SCRUMBOARD APP] REMOVE COVER CARD';
export const REMOVE_ATTACHMENT_CARD = '[SCRUMBOARD APP] REMOVE ATTACHMENT CARD';
export const REMOVE_DUE_CARD = '[SCRUMBOARD APP] REMOVE DUE CARD';
export const TOGGLE_LABEL_CARD = '[SCRUMBOARD APP] TOGGLE LABEL CARD';
export const TOGGLE_MEMBER_CARD = '[SCRUMBOARD APP] TOGGLE MEMBER CARD';
export const ADD_CHECKLIST_CARD = '[SCRUMBOARD APP] ADD CHECKLIST CARD';
export const CHECKLIST_CHANGE_CARD = '[SCRUMBOARD APP] CHECKLIST CHANGE CARD';
export const CHECKLIST_REMOVE_CARD = '[SCRUMBOARD APP] CHECKLIST REMOVE CARD';
export const COMMENT_ADD_CARD = '[SCRUMBOARD APP] COMMENT ADD CARD';

export function openCardDialog(data)
{
    return {
        type   : OPEN_CARD_DIALOG,
        payload: data
    }
}

export function closeCardDialog()
{
    return {
        type: CLOSE_CARD_DIALOG
    }
}

export function updateCard(boardId, card)
{
    return (dispatch) => {
        const request = axios.post('/api/scrumboard-app/card/update', {
            boardId,
            card
        });

        return request.then((response) => {
            dispatch(showMessage({
                message         : 'Card Saved',
                autoHideDuration: 2000,
                anchorOrigin    : {
                    vertical  : 'top',
                    horizontal: 'right'
                }
            }));

            return dispatch({
                type   : UPDATE_CARD,
                payload: card
            })
        });
    }
}

export function removeCard(boardId, cardId)
{
    return (dispatch) => {
        const request = axios.post('/api/scrumboard-app/card/remove', {
            boardId,
            cardId
        });

        return request.then((response) =>
            dispatch({
                type: REMOVE_CARD,
                boardId,
                cardId
            })
        );
    };
}

export function handleChange(event)
{
    return {
        type  : CHANGE_CARD,
        target: event.target
    };
}

export function chipChange(name, value)
{
    return {
        type: CHIP_CHANGE_CARD,
        name,
        value
    };
}

export function addNewChip(name, value)
{
    return {
        type: NEW_CHIP_CARD,
        name,
        value
    };
}

export function makeCover(attachmentId)
{
    return {
        type: MAKE_COVER_CARD,
        attachmentId
    };
}

export function removeCover()
{
    return {
        type: REMOVE_COVER_CARD
    };
}

export function removeAttachment(attachmentId)
{
    return {
        type: REMOVE_ATTACHMENT_CARD,
        attachmentId
    };
}

export function removeDue()
{
    return {
        type: REMOVE_DUE_CARD
    };
}

export function toggleLabel(labelId)
{
    return {
        type: TOGGLE_LABEL_CARD,
        labelId
    };
}

export function toggleMember(memberId)
{
    return {
        type: TOGGLE_MEMBER_CARD,
        memberId
    };
}

export function addCheckList(newList)
{
    return {
        type: ADD_CHECKLIST_CARD,
        newList
    };
}

export function checkListChange(item)
{
    return {
        type: CHECKLIST_CHANGE_CARD,
        item
    };
}

export function removeCheckList(id)
{
    return {
        type: CHECKLIST_REMOVE_CARD,
        id
    };
}


export function commentAdd(comment)
{
    return {
        type: COMMENT_ADD_CARD,
        comment
    };
}
