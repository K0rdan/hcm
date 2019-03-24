import { find, without, concat } from 'lodash';
import { USER_QUERY } from 'gql/User/queries';

export const resolvers = {
  login: (_, variables, { cache }) => {
    const { user } = cache.readQuery({ query: USER_QUERY });
    console.log('TEST', user);
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
  toggleFav: (_, variables, { cache }) => {
    const { user } = cache.readQuery({ query: USER_QUERY });

    if (user) {
      const { favThemes } = user;
      const isInFav = undefined !== find(favThemes, id => variables.id === id);
      const newFavThemes = isInFav
        ? without(favThemes, variables.id)
        : concat(favThemes, variables.id);
      cache.writeData({
        data: {
          user: {
            ...user,
            favThemes: newFavThemes,
            __typename: 'User',
          },
        },
      });
    }

    return null;
  },
};

export default resolvers;
