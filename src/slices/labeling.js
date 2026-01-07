import { baseApi, transformResponseKeys } from 'Services/nordicmicroalgae';

/**
 * ImageLabeling endpoints:
 * - GET  /api/media/image_labeling/         -> list ImageLabeling images (optionally accept params)
 * - POST removed/unused (uploads via admin only)
 *
 * Exposes hooks:
 * - useGetImageLabelingImagesQuery()
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
  }),
  overrideExisting: false,
});

export const { useGetImageLabelingImagesQuery } = extendedApiSlice;
