import defaults from 'gql/User/defaults';
import mutations from 'gql/User/mutations';
import queries from 'gql/User/queries';
import resolvers from 'gql/User/resolvers';

export { default as defaults } from 'gql/User/defaults';
export { default as mutations } from 'gql/User/mutations';
export { default as queries } from 'gql/User/queries';
export { default as resolvers } from 'gql/User/resolvers';

export const User = {
  defaults,
  mutations,
  queries,
  resolvers,
};

export default User;
