import defaults from 'gql/Drawer/defaults';
import mutations from 'gql/Drawer/mutations';
import queries from 'gql/Drawer/queries';
import resolvers from 'gql/Drawer/resolvers';

export { default as defaults } from 'gql/Drawer/defaults';
export { default as mutations } from 'gql/Drawer/mutations';
export { default as queries } from 'gql/Drawer/queries';
export { default as resolvers } from 'gql/Drawer/resolvers';

export const Drawer = {
  defaults,
  mutations,
  queries,
  resolvers,
};

export default Drawer;
