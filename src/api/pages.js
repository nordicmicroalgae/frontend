
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
  const response = await fetch(`/api/page/${pageSlug}/`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new PageNotFound(`Could not find page: ${pageSlug}`);
    }
    throw new Error(`Could not fetch page: "${pageSlug}"`);
  }

  return response.json();
}
