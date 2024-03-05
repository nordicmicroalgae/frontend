import { useMemo } from 'react';

import { useGetAllTaxaQuery } from 'Slices/taxa';
import { useGetAllSynonymsQuery } from 'Slices/synonyms';


const emptyNames = [];


function useCombinedNamesQuery() {
  const queries = [
    useGetAllTaxaQuery(),
    useGetAllSynonymsQuery(),
  ];

  const [
    regularNameListQuery,
    synonymNameListQuery,
  ] = queries;

  const queryData = [
    regularNameListQuery.data?.entities,
    synonymNameListQuery.data,
  ];

  const [
    regularNamesData,
    synonymNamesData,
  ] = queryData;

  const isLoading =
    queries.some(q => q.isLoading);

  const isSuccess =
    queries.every(q => q.isSuccess);

  const isFailure =
    queries.some(q => q.isFailure);

  const isNotReadyToCombine =
    queryData.some(d => d == null);

  const data = useMemo(() => {
    if (isNotReadyToCombine) {
      return emptyNames;
    }

    const regularNameList =
      Object.values(regularNamesData).map(taxon => ({
        status: 'accepted',
        slug: taxon.slug,
        authority: taxon.authority,
        scientificName: taxon.scientificName,
      }));

    const synonymNameList =
      synonymNamesData.map(synonym => ({
        status: 'synonym',
        slug: synonym.relatedTaxon.slug,
        authority: synonym.authority,
        scientificName: synonym.synonymName,
        currentName: synonym.relatedTaxon.scientificName,
      }));

    return [...regularNameList, ...synonymNameList].map(
      (nameMatch, index) => ({
        ...nameMatch,
        key: `${nameMatch.slug}-${index}`,
      })
    );
  }, [isSuccess]);

  return { data, isLoading, isSuccess, isFailure };
}


export default useCombinedNamesQuery;
