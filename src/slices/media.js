import { baseApi, transformResponseKeys } from 'Services/nordicmicroalgae';


export const extendedApiSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMedia: builder.query({
      query: params => ({url: 'media', params}),
      transformResponse: responseData =>
        transformResponseKeys(responseData).media
    }),
    getArtists: builder.query({
      query: () => 'media/artists',
      transformResponse: responseData =>
        transformResponseKeys(responseData).artists
    }),
    getGalleries: builder.query({
      queryFn(_args, _queryApi, _extraOptions, baseQuery) {
        const galleryListQuery = () =>
          baseQuery({url: 'media/tags/galleries'});

        const galleryInfoQuery = gallery =>
          baseQuery({
            url: 'media',
            params: {
              gallery,
              limit: 4,
              fields: ['slug', 'renditions'],
              exclude_galleries: gallery === undefined ? 'Citizen science' : undefined,
            },
          }).then(({ data: { media } }) => (
            { gallery, media }
          ));

        return galleryListQuery().then(
          ({ data: { tags } }) => Promise.all(
            [{name: undefined}, ...tags].map(
              tag => galleryInfoQuery(tag.name)
            )
          ).then(
            data => ({ data })
          )
        );
      },
    }),
  }),
});

export const { useGetArtistsQuery, useGetMediaQuery, useGetGalleriesQuery } = extendedApiSlice;
