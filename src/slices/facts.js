import { baseApi, transformResponseKeys } from 'Services/nordicmicroalgae';


export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFacts: builder.query({
      query: taxon => `facts/${taxon}/`,
      transformResponse: responseData =>
        transformResponseKeys(responseData).facts
    }),
  }),
});

export const { useGetFactsQuery } = extendedApiSlice;
