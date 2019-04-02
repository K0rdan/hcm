import defaults from 'gql/Tournament/defaults';
import mutations from 'gql/Tournament/mutations';
import queries from 'gql/Tournament/queries';
import resolvers from 'gql/Tournament/resolvers';

export { default as defaults } from 'gql/Tournament/defaults';
export { default as mutations } from 'gql/Tournament/mutations';
export { default as queries } from 'gql/Tournament/queries';
export { default as resolvers } from 'gql/Tournament/resolvers';

export const Tournament = {
  defaults,
  mutations,
  queries,
  resolvers,
};

export default Tournament;
