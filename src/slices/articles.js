import { baseApi, transformResponseKeys } from '../services/nordicmicroalgae';


export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query({
      query: params => ({url: 'articles', params}),
      transformResponse: responseData =>
        transformResponseKeys(responseData).articles,
    }),
    getArticleById: builder.query({
      query: id => `articles/${id}`,
      transformResponse: transformResponseKeys,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleByIdQuery } = extendedApiSlice;
