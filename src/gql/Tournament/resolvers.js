// Lib imports
import { find, concat } from 'lodash';
// Custom imports
import { TOURNAMENT_QUERY } from 'gql/Tournament/queries';

export const resolvers = {
  addPlayer: (_, { name, firstname, horse, email, team }, { cache }) => {
    const { tournament } = cache.readQuery({ query: TOURNAMENT_QUERY });
    const { players, horses, teams } = tournament;

    if (players) {
      const isPlayerNameAlreadyRegistered =
        undefined !==
        find(
          tournament.players,
          p => p.name === name && p.firstname === firstname,
        );
      const isPlayerEmailAlreadyRegistered =
        undefined !== find(tournament.players, p => p.email === email);

      if (!isPlayerNameAlreadyRegistered && !isPlayerEmailAlreadyRegistered) {
        const newPlayersList = concat(players, {
          id: players.length + 1,
          name,
          firstname,
          horse: horses.find(h => h.name === horse),
          email,
          team: teams.find(t => t.name === team),
          __typename: 'Player',
        });
        cache.writeData({
          data: {
            tournament: {
              ...tournament,
              players: newPlayersList,
              __typename: 'Tournament',
            },
          },
        });
      }
    }

    return null;
  },
  addHorse: (_, { name }, { cache }) => {
    const { tournament } = cache.readQuery({ query: TOURNAMENT_QUERY });
    const { horses } = tournament;

    if (horses) {
      const isHorseNameAlreadyRegistered = find(horses, h => h.name === name);
      if (!isHorseNameAlreadyRegistered) {
        const newHorsesList = concat(horses, {
          id: horses.length + 1,
          name,
          __typename: 'Horse',
        });
        cache.writeData({
          data: {
            tournament: {
              ...tournament,
              horses: newHorsesList,
              __typename: 'Tournament',
            },
          },
        });
      }
    }

    return null;
  },
  addTeam: (_, { name }, { cache }) => {
    const { tournament } = cache.readQuery({ query: TOURNAMENT_QUERY });
    const { teams } = tournament;

    if (teams) {
      const isTeamNameAlreadyRegistered = find(teams, t => t.name === name);
      if (!isTeamNameAlreadyRegistered) {
        const newTeamsList = concat(teams, {
          id: teams.length + 1,
          name,
          __typename: 'Team',
        });
        cache.writeData({
          data: {
            tournament: {
              ...tournament,
              teams: newTeamsList,
              __typename: 'Tournament',
            },
          },
        });
      }
    }

    return null;
  },
};

export default resolvers;
