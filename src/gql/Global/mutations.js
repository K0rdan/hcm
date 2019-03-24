import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const isLoadingGlobalMutation = gql`
  mutation isLoadingGlobal($loading: Boolean) {
    isLoadingGlobal(loading: $loading) @client {
      loading
    }
  }
`;
export const withIsLoadingGlobalMutation = graphql(isLoadingGlobalMutation, {
  props: ({ mutate }) => ({
    isLoadingGlobal: loading => mutate({ variables: { loading: loading } }),
  }),
});

export const mutations = {
  withIsLoadingGlobalMutation,
};

export default mutations;
