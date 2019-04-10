// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
// Custom imports
import { CreatableListBox } from 'components/utils/Forms/index';
import {
  queries as TournamentQueries,
  mutations as TournamentMutations,
} from 'gql/Tournament/index';
////

export const TeamsFormField = ({
  teamsData: {
    tournament: { teams },
  },
  selectedTeam,
  addTeam,
  setTeam,
}) => (
  <CreatableListBox
    placeholder={'Equipe'}
    items={teams}
    selectedItem={selectedTeam}
    addItem={teamName => {
      setTeam(teamName);
      return addTeam(teamName);
    }}
    setItem={setTeam}
  />
);

TeamsFormField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  setTeam: PropTypes.func.isRequired,
  addTeam: PropTypes.func.isRequired,
  teamsData: PropTypes.object.isRequired,
};

export default compose(
  TournamentMutations.withAddTeamMutation,
  TournamentQueries.withTeamsQuery,
)(TeamsFormField);
