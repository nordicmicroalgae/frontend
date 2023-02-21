import { baseApi, transformResponseKeys } from 'Services/nordicmicroalgae';


export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMedia: builder.query({
      query: params => ({url: 'media', params}),
      transformResponse: responseData =>
        transformResponseKeys(responseData).media
    }),
    getArtists: builder.query({
      query: () => 'media/artists',
      transformResponse: responseData =>
        transformResponseKeys(responseData).artists
    }),
  }),
});

export const { useGetArtistsQuery, useGetMediaQuery } = extendedApiSlice;
