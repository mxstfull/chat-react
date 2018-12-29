export const SET_SELECTED_ITEM = '[FILE MANAGER APP] SET SELECTED ITEM';

export function setSelectedItem(id)
{
    return {
        type   : SET_SELECTED_ITEM,
        payload: id
    }
}
