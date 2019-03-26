import { USER_QUERY } from 'gql/User/queries';

export const resolvers = {
  login: (_, variables, { cache }) => {
    const { user } = cache.readQuery({ query: USER_QUERY });
    if (user) {
      const { authenticated } = user;
      cache.writeData({
        data: {
          user: {
            ...user,
            authenticated: !authenticated,
            __typename: 'User',
          },
        },
      });
    }

    return null;
  },
};

export default resolvers;
