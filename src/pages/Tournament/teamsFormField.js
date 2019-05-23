// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Typography, FormControl } from '@material-ui/core';
// Custom imports
import withStyle from 'pages/Tournament/withStyle';
import { CreatableListBox } from 'components/utils/Forms/index';
import {
  queries as TournamentQueries,
  mutations as TournamentMutations,
} from 'gql/Tournament/index';
////

const renderErrorLabel = (error, errorLabel) => (
  <Typography variant="subtitle2" className={errorLabel}>
    {error}
  </Typography>
);

export const TeamsFormField = ({
  classes,
  placeholder,
  teamsData: {
    tournament: { teams },
  },
  selectedTeam,
  addTeam,
  setTeam,
  error,
}) => (
  <FormControl>
    <CreatableListBox
      placeholder={placeholder}
      items={teams}
      selectedItem={selectedTeam}
      addItem={teamName => {
        setTeam(teamName);
        return addTeam(teamName);
      }}
      setItem={setTeam}
      error={!!error}
    />
    {error ? renderErrorLabel(error, classes.errorLabel) : null}
  </FormControl>
);

TeamsFormField.defaultProps = {
  error: null,
};

TeamsFormField.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  setTeam: PropTypes.func.isRequired,
  addTeam: PropTypes.func.isRequired,
  teamsData: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default compose(
  TournamentMutations.withAddTeamMutation,
  TournamentQueries.withTeamsQuery,
  withStyle,
)(TeamsFormField);
