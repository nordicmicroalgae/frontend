import { baseApi } from 'Services/nordicmicroalgae';


export const Queries = {
  species: {
    url: 'taxa',
    params: {
      group: 'all',
    },
  },
  taxa: {
    url: 'taxa',
  },
  images: {
    url: 'media',
    params: {
      type: 'image',
    },
  },
  imageLabelingImages: {
    url: 'media/image_labeling',
  },
  contributors: {
    url: 'contributors',
  },
};

function parseTotalFromResponse(response) {
  return {
    total: parseInt(response.headers.get('x-total'), 10),
  };
}

export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getStatistics: builder.query({
      queryFn(_args, _queryApi, _extraOptions, baseQuery) {
        const queryEntries = Object.entries(Queries);

        return Promise.all(
          queryEntries.map(
            ([_key, opts]) => baseQuery({
              ...opts,
              method: 'head',
              responseHandler: parseTotalFromResponse,
            })
          )
        ).then(results => ({
          data: queryEntries.reduce(
            (acc, [key, _opts], index) => ({
              ...acc,
              [key]: results[index].data.total,
            }), {})
          })
        ).catch(error => ({error}));
      }
    }),
  }),
});

export const { useGetStatisticsQuery } = extendedApiSlice;
