import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const camelCase = input => input
  .split('_')
  .map((word, index) => index > 0
    ? word[0].toUpperCase() + word.slice(1).toLowerCase()
    : word
  )
  .join('');

export const transformResponseKeys = data =>
  Object.keys(data).reduce(
    (obj, key) => {
      let value = data[key];

      if (Array.isArray(value)) {
        value = value.map(
          v => typeof v === 'object' ? transformResponseKeys(v) : v
        );
      } else if (value != null && typeof value === 'object') {
        value = transformResponseKeys(value);
      }

      return { ...obj, [camelCase(key)]: value};
    },
  {});

export const baseApi = createApi({
  reducerPath: 'nua',
  baseQuery: fetchBaseQuery({baseUrl: '/api/'}),
  endpoints: builder => ({}),
  keepUnusedDataFor: 60 * 30,
});
