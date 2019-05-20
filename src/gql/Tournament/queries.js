import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const HORSES_QUERY = gql`
  query Horses {
    tournament @client {
      horses {
        id
        name
      }
      __typename
    }
  }
`;
export const withHorsesQuery = graphql(HORSES_QUERY, { name: 'horsesData' });

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
        horse {
          id
          name
        }
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
        horse {
          id
          name
        }
        email
        team {
          id
          name
        }
      }
      horses {
        id
        name
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
  withHorsesQuery,
  withTeamsQuery,
  withPlayersQuery,
};

export default queries;
