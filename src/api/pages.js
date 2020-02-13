import axios from 'axios';

export class PageNotFound extends Error {

  constructor(...args) {
    super(...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PageNotFound);
    }

    this.name = this.constructor.name;
  }

}

export async function getPage(pageSlug) {
  let response;

  try {
    response = await axios.get(`/api/page/${pageSlug}/`);
  } catch(error) {
    if (error.response && error.response.status === 404) {
      throw new PageNotFound(`Could not find page: ${pageSlug}`);
    }
    throw error;
  }

  return response.data;
}
