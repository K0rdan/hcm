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
    $team: Team!
  ) {
    addPlayer(
      name: $name
      firstname: $firstname
      horse: $horse
      email: $email
      team: $team
    ) @client {
      player {
        id
        name
        email
        team
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

const addTeamMutation = gql`
  mutation AddTeam($name: String!) {
    addTeam(name: $name) @client {
      team {
        id
        name
      }
    }
  }
`;
export const withAddTeamMutation = graphql(addTeamMutation, {
  props: ({ mutate }) => ({
    addTeam: name => mutate({ variables: { name } }),
  }),
});

export const mutations = {
  withAddPlayerMutation,
  withAddTeamMutation,
};

export default mutations;
