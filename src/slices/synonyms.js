import { baseApi, transformResponseKeys } from 'Services/nordicmicroalgae';


export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSynonyms: builder.query({
      query: params => ({url: 'synonyms', params}),
      transformResponse: responseData =>
        transformResponseKeys(responseData).synonyms
    }),
  }),
});


export const { useGetSynonymsQuery } = extendedApiSlice;
