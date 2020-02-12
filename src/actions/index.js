import { getPage } from '../api/pages';

export const FETCH_PAGE_REQUEST = 'FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_FAILURE = 'FETCH_PAGE_FAILURE';

export const fetchPageRequest = slug => ({
  type: FETCH_PAGE_REQUEST, slug
});

export const fetchPageSuccess = (slug, page) => ({
  type: FETCH_PAGE_SUCCESS, slug, ...page
});

export const fetchPageFailure = slug => ({
  type: FETCH_PAGE_FAILURE, slug
});

export const fetchPage = slug => dispatch =>  {
  dispatch(fetchPageRequest(slug));

  return getPage(slug)
    .then(
      page => {
        dispatch(fetchPageSuccess(slug, page));
      },
      _error => {
        dispatch(fetchPageFailure(slug));
      }
  );
}

export const loadPage = slug => (dispatch, getState) => {
  if (getState().pages[slug] == null) {
    return dispatch(fetchPage(slug));
  }
};
