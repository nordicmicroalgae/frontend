import { baseApi, transformResponseKeys } from '../services/nordicmicroalgae';


export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMedia: builder.query({
      query: params => ({url: 'media', params}),
      transformResponse: responseData =>
        transformResponseKeys(responseData).media
    }),
  }),
});

export const { useGetMediaQuery } = extendedApiSlice;
