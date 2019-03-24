import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const toggleDrawerMutation = gql`
  mutation ToggleDrawer {
    toggleDrawer @client {
      isOpen
    }
  }
`;
export const withToggleDrawerMutation = graphql(toggleDrawerMutation, {
  props: ({ mutate }) => ({ toggleDrawer: mutate }),
});

export const mutations = {
  withToggleDrawerMutation,
};

export default mutations;
