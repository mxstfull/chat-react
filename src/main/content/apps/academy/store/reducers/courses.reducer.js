import * as Actions from '../actions';

const initialState = {
    data          : [],
    categories    : [],
    searchText    : '',
    categoryFilter: 'all'
};

const coursesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_COURSES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_CATEGORIES:
        {
            return {
                ...state,
                categories: action.payload
            };
        }
        case Actions.SET_COURSES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.SET_COURSES_CATEGORY_FILTER:
        {
            return {
                ...state,
                categoryFilter: action.category
            };
        }
        default:
        {
            return state;
        }
    }
};

export default coursesReducer;
