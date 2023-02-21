import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

import { baseApi, transformResponseKeys } from 'Services/nordicmicroalgae';


export const taxaAdapter = createEntityAdapter({
  selectId: taxon => taxon.slug,
});

const initialState = taxaAdapter.getInitialState();

export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllTaxa: builder.query({
      query: () => 'taxa',
      transformResponse: responseData =>
        taxaAdapter.setAll(
          initialState,
          transformResponseKeys(responseData).taxa
        )
    }),
    getFilteredTaxa: builder.query({
      query: params => ({
        url: 'taxa',
        params: {fields: 'slug', ...params}
      }),
      transformResponse: responseData => responseData.taxa.map(taxon => taxon.slug),
    }),
  }),
});

export const { useGetAllTaxaQuery, useGetFilteredTaxaQuery } = extendedApiSlice;

export const selectTaxaResult = 
  extendedApiSlice.endpoints.getAllTaxa.select();

export const selectFilteredTaxaResult =
  extendedApiSlice.endpoints.getFilteredTaxa.select();

export const selectTaxaData = createSelector(
  selectTaxaResult,
  taxaResult => taxaResult.data
);

export const { selectAll, selectById } = taxaAdapter.getSelectors(
  state => selectTaxaData(state) ?? initialState
);
