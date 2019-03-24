import { DRAWER_QUERY } from 'gql/Drawer/queries';

export const resolvers = {
  toggleDrawer: (_, variables, { cache }) => {
    const { drawer } = cache.readQuery({ query: DRAWER_QUERY });

    if (drawer) {
      const { isOpen } = drawer;
      cache.writeData({
        data: {
          drawer: {
            ...drawer,
            isOpen: !isOpen,
            __typename: 'Drawer',
          },
        },
      });
    }

    return null;
  },
};

export default resolvers;
