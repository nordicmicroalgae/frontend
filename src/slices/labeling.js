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
    
    // Get aggregated summary data for filters
    getImageLabelingSummary: builder.query({
      query: () => 'media/image_labeling/summary',
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetImageLabelingImagesQuery,
  useGetImageLabelingSummaryQuery,
} = extendedApiSlice;