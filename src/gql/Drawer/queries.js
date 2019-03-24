import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const DRAWER_QUERY = gql`
  query Drawer {
    drawer @client {
      isOpen
      __typename
    }
  }
`;
export const withDrawerQuery = graphql(DRAWER_QUERY, { name: 'drawerData' });

export const queries = {
  DRAWER_QUERY,
  withDrawerQuery,
};

export default queries;
