// Lib imports
import { find, concat } from 'lodash';
// Custom imports
import { TOURNAMENT_QUERY } from 'gql/Tournament/queries';

export const resolvers = {
  addPlayer: (_, { name, firstname, horse, email }, { cache }) => {
    const { tournament } = cache.readQuery({ query: TOURNAMENT_QUERY });
    const { players } = tournament;

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
        const newPlayerList = concat(players, {
          id: players.length + 1,
          name,
          firstname,
          horse,
          email,
          __typename: 'Player',
        });
        cache.writeData({
          data: {
            tournament: {
              ...tournament,
              players: newPlayerList,
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
