import { combineReducers } from 'redux';
import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE
} from '../actions';


const pages = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PAGE_REQUEST:
      return {
        ...state,
        [action.slug]: {
          isFetching: true
        }
      };
    case FETCH_PAGE_SUCCESS:
      return {
        ...state,
        [action.slug]: {
          isFetching: false,
          title: action.page.title,
          body: action.page.body
        }
      };
    case FETCH_PAGE_FAILURE:
      return {
        ...state,
        [action.slug]: {
          isFetching: false,
          isNotFound: true
        }
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  pages
});

export default rootReducer;
