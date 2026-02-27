/**
 * Utilities for building a hierarchical gallery tree from a flat list
 * of slash-delimited gallery names.
 *
 * e.g. ["Baltic Proper", "Baltic Proper/Cyanobacteria", "NOMP"]
 *   => top-level: "Baltic Proper" (has children), "NOMP" (leaf)
 */


/**
 * Given the flat gallery data from useGetGalleriesQuery,
 * return only top-level entries suitable for the gallery index page.
 *
 * Galleries with a "/" are grouped under their parent.
 * Parents that only exist as prefixes (no direct images) get
 * preview images from their first child.
 */
export function getTopLevelGalleries(galleries) {
  const allImages = galleries.find(g => g.gallery == null);
  const tree = new Map();

  for (const entry of galleries) {
    if (entry.gallery == null) continue;

    const slashIndex = entry.gallery.indexOf('/');

    if (slashIndex === -1) {
      // Top-level gallery
      if (!tree.has(entry.gallery)) {
        tree.set(entry.gallery, { media: [], children: [] });
      }
      tree.get(entry.gallery).media = entry.media;
    } else {
      // Subgallery: "Parent/Child"
      const parent = entry.gallery.substring(0, slashIndex);
      const child = entry.gallery.substring(slashIndex + 1);

      if (!tree.has(parent)) {
        tree.set(parent, { media: [], children: [] });
      }
      tree.get(parent).children.push({ name: child, media: entry.media });
    }
  }

  const result = [];

  if (allImages) {
    result.push({
      gallery: null,
      media: allImages.media,
      hasChildren: false,
    });
  }

  for (const [name, { media, children }] of tree) {
    const hasChildren = children.length > 0;

    // If parent has no direct images, borrow from the first child
    const previewMedia = media.length > 0
      ? media
      : hasChildren
        ? children[0].media
        : [];

    result.push({
      gallery: name,
      media: previewMedia,
      hasChildren,
    });
  }

  return result;
}


/**
 * Return the direct subgalleries of a given parent gallery.
 *
 * @param {Array} galleries - Flat gallery list from useGetGalleriesQuery
 * @param {string} parentName - The parent gallery name (e.g. "Baltic Proper")
 * @returns {Array} subgalleries with displayName, full gallery path, and media
 */
export function getSubgalleries(galleries, parentName) {
  const prefix = parentName + '/';

  return galleries
    .filter(entry =>
      entry.gallery != null &&
      entry.gallery.startsWith(prefix) &&
      !entry.gallery.substring(prefix.length).includes('/')
    )
    .map(entry => ({
      gallery: entry.gallery,
      displayName: entry.gallery.substring(prefix.length),
      media: entry.media,
    }));
}


/**
 * Check whether a gallery name has subgalleries in the flat list.
 */
export function hasSubgalleries(galleries, galleryName) {
  const prefix = galleryName + '/';
  return galleries.some(
    entry => entry.gallery != null && entry.gallery.startsWith(prefix)
  );
}
