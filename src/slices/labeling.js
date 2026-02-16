import { baseApi, transformResponseKeys } from 'Services/nordicmicroalgae';

/**
 * ImageLabeling endpoints:
 * - GET  /api/media/image_labeling/         -> list ImageLabeling images (optionally accept params)
 * - GET  /api/media/image_labeling/summary/ -> get aggregated filter data
 * - POST removed/unused (uploads via admin only)
 *
 * Exposes hooks:
 * - useGetImageLabelingImagesQuery()
 * - useGetImageLabelingSummaryQuery()
 */

export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    // Accept an optional params object that will be forwarded as query params
    getImageLabelingImages: builder.query({
      query: (params = {}) => ({ url: 'media/image_labeling', params }),
      transformResponse: responseData =>
        // backend uses plural key "image_labeling_images", fall back to "media"
        transformResponseKeys(responseData).imageLabelingImages || transformResponseKeys(responseData).media || [],
    }),
    
    // Get first images of each taxon
    getImageLabelingFirstPerTaxon: builder.query({
      query: () => 'media/image_labeling/first_per_taxon',
      transformResponse: responseData => responseData.images || [],
    }),

    // Get aggregated summary data for filters
    getImageLabelingSummary: builder.query({
      query: () => 'media/image_labeling/summary',
    }),

    // Get taxa grouped by plankton groups with class names (titles)
    getImageLabelingGroupedByPlankton: builder.query({
      query: () => 'media/image_labeling/grouped_by_plankton',
      transformResponse: responseData => responseData.groups || [],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetImageLabelingImagesQuery,
  useGetImageLabelingSummaryQuery,
  useGetImageLabelingFirstPerTaxonQuery,
  useGetImageLabelingGroupedByPlanktonQuery,
} = extendedApiSlice;