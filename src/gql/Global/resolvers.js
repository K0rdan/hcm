import { GLOBAL_QUERY } from 'gql/Global/queries';

export const resolvers = {
  isLoadingGlobal: (_, { loading }, { cache }) => {
    const { global } = cache.readQuery({ query: GLOBAL_QUERY });
    if (global) {
      cache.writeData({
        data: {
          global: {
            ...global,
            loading,
            __typename: 'Global',
          },
        },
      });
    }

    return null;
  },
};

export default resolvers;
