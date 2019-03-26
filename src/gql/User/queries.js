import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const USER_QUERY = gql`
  query User {
    user @client {
      name
      authenticated
      __typename
    }
  }
`;
export const withUserQuery = graphql(USER_QUERY, { name: 'userData' });

export const queries = {
  USER_QUERY,
  withUserQuery,
};

export default queries;
