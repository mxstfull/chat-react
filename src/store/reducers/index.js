import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'auth/store/reducers';
import quickPanel from 'main/quickPanel/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        quickPanel,
        ...asyncReducers
    });

export default createReducer;
