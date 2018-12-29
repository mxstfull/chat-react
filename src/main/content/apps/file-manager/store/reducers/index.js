import {combineReducers} from 'redux';
import files from './files.reducer';
import selectedItem from './selectedItem.reducer';

const reducer = combineReducers({
    files,
    selectedItem
});

export default reducer;
