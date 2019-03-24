import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const GLOBAL_QUERY = gql`
  query Global {
    global @client {
      loading
      loadingText
      __typename
    }
  }
`;
export const withGlobalQuery = graphql(GLOBAL_QUERY, { name: 'globalData' });

export const queries = {
  GLOBAL_QUERY,
  withGlobalQuery,
};

export default queries;
