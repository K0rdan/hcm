import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const TEAMS_QUERY = gql`
  query Teams {
    tournament @client {
      teams {
        id
        name
      }
      __typename
    }
  }
`;
export const withTeamsQuery = graphql(TEAMS_QUERY, { name: 'teamsData' });

export const PLAYERS_QUERY = gql`
  query Players {
    tournament @client {
      players {
        id
        name
        firstname
        horse
        email
        team {
          id
          name
        }
      }
      __typename
    }
  }
`;
export const withPlayersQuery = graphql(PLAYERS_QUERY, { name: 'playersData' });

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
        team {
          id
          name
        }
      }
      teams {
        id
        name
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
  withTeamsQuery,
  withPlayersQuery,
};

export default queries;
