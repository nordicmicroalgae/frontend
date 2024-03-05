import { createSelector } from '@reduxjs/toolkit';

import { baseApi, transformResponseKeys } from 'Services/nordicmicroalgae';


export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllSynonyms: builder.query({
      query: () => 'synonyms',
      transformResponse: responseData =>
        transformResponseKeys(responseData).synonyms
      ,
    }),
  }),
});

const selectSynonymsResult =
  extendedApiSlice.endpoints.getAllSynonyms.select();

const emptySynonyms = [];

export const selectAllSynonyms = createSelector(
  selectSynonymsResult,
  synonymsResult => synonymsResult.data ?? emptySynonyms
);

export const selectByTaxon = createSelector(
  selectAllSynonyms,
  (_state, taxon) => taxon,
  (synonyms, taxon) => synonyms.filter(
    synonym => synonym.relatedTaxon.slug == taxon
  ),
);

export const { useGetAllSynonymsQuery } = extendedApiSlice;

