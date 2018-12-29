import axios from 'axios/index';

export const GET_COURSES = '[ACADEMY APP] GET COURSES';
export const GET_CATEGORIES = '[ACADEMY APP] GET CATEGORIES';
export const SET_COURSES_SEARCH_TEXT = '[ACADEMY APP] SET COURSES SEARCH TEXT';
export const SET_COURSES_CATEGORY_FILTER = '[ACADEMY APP] SET COURSES CATEGORY FILTER';

export function getCourses()
{
    const request = axios.get('/api/academy-app/courses');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_COURSES,
                payload: response.data
            })
        );
}

export function getCategories()
{
    const request = axios.get('/api/academy-app/categories');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATEGORIES,
                payload: response.data
            })
        );
}

export function setCoursesSearchText(event)
{
    return {
        type      : SET_COURSES_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function setCategoryFilter(event)
{
    return {
        type      : SET_COURSES_CATEGORY_FILTER,
        category: event.target.value
    }
}

