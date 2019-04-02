// Lib imports
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// ADD PLAYER
const addPlayerMutation = gql`
  mutation AddPlayer(
    $name: String!
    $firstname: String!
    $horse: String!
    $email: String!
  ) {
    addPlayer(name: $name, firstname: $firstname, horse: $horse, email: $email)
      @client {
      player {
        id
        name
        email
      }
    }
  }
`;
export const withAddPlayerMutation = graphql(addPlayerMutation, {
  props: ({ mutate }) => ({
    addPlayer: ({ variables }) =>
      mutate({
        variables,
        onCompleted: data => {
          console.log('Tournament, mutations, onCompleted : data', data);
        },
        onError: error => {
          console.log('Tournament, mutations, onError : error', error);
        },
      }),
  }),
});

export const mutations = {
  withAddPlayerMutation,
};

export default mutations;
