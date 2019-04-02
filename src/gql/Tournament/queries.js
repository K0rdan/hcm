import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const TOURNAMENT_QUERY = gql`
  query Tournament {
    tournament @client {
      name
      players {
        id
        name
        firstname
        horse
        email
      }
      __typename
    }
  }
`;
export const withTournamentQuery = graphql(TOURNAMENT_QUERY, {
  name: 'tournamentData',
});

export const queries = {
  TOURNAMENT_QUERY,
  withTournamentQuery,
};

export default queries;
