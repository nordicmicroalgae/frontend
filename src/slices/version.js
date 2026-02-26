import { baseApi } from 'Services/nordicmicroalgae';


export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getVersion: builder.query({
      query: () => 'version/',
    }),
  }),
});

export const { useGetVersionQuery } = extendedApiSlice;
