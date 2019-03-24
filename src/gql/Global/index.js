import defaults from 'gql/Global/defaults';
import mutations from 'gql/Global/mutations';
import queries from 'gql/Global/queries';
import resolvers from 'gql/Global/resolvers';

export { default as defaults } from 'gql/Global/defaults';
export { default as mutations } from 'gql/Global/mutations';
export { default as queries } from 'gql/Global/queries';
export { default as resolvers } from 'gql/Global/resolvers';

export const Global = {
  defaults,
  mutations,
  queries,
  resolvers,
};

export default Global;
