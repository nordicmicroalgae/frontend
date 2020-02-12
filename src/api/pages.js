
export async function getPage(pageSlug) {
  const response = await fetch(`/api/page/${pageSlug}/`);

  if (!response.ok) {
    throw new Error(`Could not fetch page: "${pageSlug}"`);
  }

  return response.json();
}
