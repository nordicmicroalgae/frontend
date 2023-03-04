import React, { createContext, useContext } from 'react';

import { useGetFactsQuery } from 'Slices/facts';


const FactsQueryContext = createContext();

function FactsQueryProvider({ children, taxon }) {
  const query = useGetFactsQuery(taxon);

  const value = { taxon, query };

  return (
    <FactsQueryContext.Provider value={value}>
      {children}
    </FactsQueryContext.Provider>
  );
}

function useFactsQuery() {
  const context = useContext(FactsQueryContext);

  if (context === undefined) {
    throw new Error(
      'useFactsQuery must be used within a FactsQueryProvider.'
    );
  }

  return context;
}


export { FactsQueryProvider, useFactsQuery };
