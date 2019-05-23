// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  FormGroup,
  FormControl,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { Error, CheckCircle } from '@material-ui/icons';
import { find, filter, isEqual } from 'lodash';
// Custom imports
import withStyle from 'pages/Tournament/withStyle';
import TeamsFormField from 'pages/Tournament/teamsFormField';
import HorsesFormField from 'pages/Tournament/horsesFormField';
import {
  queries as TournamentQueries,
  mutations as TournamentMutations,
} from 'gql/Tournament/index';
import { formValidations } from 'utils/index';
////

export class Tournament extends React.Component {
  state = {
    name: '',
    firstname: '',
    horse: '',
    email: '',
    team: '',
    error: {},
  };

  checkCoupleNameFirstname = (prop, value) => {
    const { name, firstname } = this.state;
    const { playersData } = this.props;
    const {
      tournament: { players },
    } = playersData;
    const coupleNameFirstnameErrorMessage =
      'Name and firstname already registered';

    if (prop === 'name' && firstname) {
      const foundNameFirstname =
        undefined !==
        find(players, p => p.name === value && p.firstname === firstname);
      if (foundNameFirstname) {
        return {
          name: coupleNameFirstnameErrorMessage,
          firstname: coupleNameFirstnameErrorMessage,
        };
      }
    } else if (prop === 'firstname' && name) {
      const foundNameFirstname =
        undefined !==
        find(players, p => p.name === name && p.firstname === value);
      if (foundNameFirstname) {
        return {
          name: coupleNameFirstnameErrorMessage,
          firstname: coupleNameFirstnameErrorMessage,
        };
      }
    }

    return true;
  };

  checkHorseParticipation = horseName => {
    const { playersData } = this.props;
    const {
      tournament: { players },
    } = playersData;

    const horseParticipation = filter(players, p => p.horse.name === horseName)
      .length;
    if (horseParticipation >= 3) {
      return {
        horse: "The horse can't participate more than 3 times",
      };
    }
    return true;
  };

  checkTeamParticipation = teamName => {
    const { playersData } = this.props;
    const {
      tournament: { players },
    } = playersData;
    const teamParticipation = filter(players, p => p.team.name === teamName)
      .length;

    if (teamParticipation >= 4) {
      return {
        team: "The team can't have more than 4 plyers",
      };
    }
    return true;
  };

  handleChange = prop => event => {
    const { error, name, firstname } = this.state;
    const { value } = event.target;

    const fieldValidation = formValidations[prop](value);
    const newState = {
      [prop]: value,
      error,
    };

    if (fieldValidation !== true) {
      newState.error = {
        ...error,
        ...fieldValidation,
      };
    }
    // Name / Firstname couple check
    else if ((prop === 'name' && firstname) || (prop === 'firstname' && name)) {
      const isValidOrError = this.checkCoupleNameFirstname(prop, value);
      if (isValidOrError === true) {
        delete newState.error.name;
        delete newState.error.firstname;
      } else {
        newState.error = {
          ...error,
          ...isValidOrError,
        };
      }
    }
    // Horse count participation
    else if (prop === 'horse') {
      const isValidOrError = this.checkHorseParticipation(value);
      if (isValidOrError === true) {
        delete newState.error.horse;
      } else {
        newState.error = {
          ...error,
          ...isValidOrError,
        };
      }
    }
    // Team count members
    else if (prop === 'team') {
      const isValidOrError = this.checkTeamParticipation(value);
      if (isValidOrError === true) {
        delete newState.error.team;
      } else {
        newState.error = {
          ...error,
          ...isValidOrError,
        };
      }
    } else if (newState.error && newState.error[prop]) {
      delete newState.error[prop];
    }

    this.setState(newState);
  };

  addPlayer = () => {
    const { addPlayer } = this.props;
    const { name, firstname, horse, email, team } = this.state;

    addPlayer({
      variables: { name, firstname, horse, email, team },
    });
  };

  renderPlayers = players =>
    players.map(player =>
      player ? (
        <li key={`tournament-player-${player.id}`}>
          {player.name} {player.firstname} {player.horse.name} {player.email}{' '}
          {player.team.name}
        </li>
      ) : null,
    );

  renderErrorLabel = error => {
    const { classes } = this.props;
    return (
      <Typography variant="subtitle2" className={classes.errorLabel}>
        {error}
      </Typography>
    );
  };

  renderFormField = (title, placeholder, fieldName, required = false) => {
    const { classes } = this.props;
    const { error } = this.state;
    const errorAdornment =
      error && !!error[fieldName] ? (
        <InputAdornment position="end">
          <Error className={classes.errorAdornment} />
        </InputAdornment>
      ) : null;
    const validAdornment =
      (!error || !error[fieldName]) && this.state[fieldName] ? (
        <InputAdornment position="end">
          <CheckCircle color="primary" />
        </InputAdornment>
      ) : null;

    return (
      <FormControl>
        <TextField
          label={title}
          placeholder={placeholder}
          value={this.state[fieldName]}
          onChange={this.handleChange(fieldName)}
          error={error && !!error[fieldName]}
          required={!!required}
          autoFocus
          InputProps={{ endAdornment: errorAdornment || validAdornment }}
        />
        {error && !!error[fieldName]
          ? this.renderErrorLabel(error[fieldName])
          : null}
      </FormControl>
    );
  };

  renderAddPlayerForm = () => {
    const { error, name, firstname, horse, email, team } = this.state;
    const disableSaveButton =
      !name || !firstname || !horse || !email || !team || !isEqual(error, {});

    return (
      <Paper square>
        <Typography variant="h5">Ajouter des participants</Typography>
        <FormGroup>
          {this.renderFormField(
            'Nom du participant',
            'Insérer le nom du participant',
            'name',
            true,
          )}
          {this.renderFormField(
            'Prénom du participant',
            'Insérer le prénom du participant',
            'firstname',
            true,
          )}
          <HorsesFormField
            placeholder={'Monture'}
            setHorse={h => this.handleChange('horse')({ target: { value: h } })}
            selectedHorse={horse}
            error={error && error.horse ? error.horse : null}
          />
          {this.renderFormField(
            'Email',
            "Insérer l'email du participant",
            'email',
            true,
          )}
          <TeamsFormField
            placeholder={'Equipe'}
            setTeam={t => this.handleChange('team')({ target: { value: t } })}
            selectedTeam={team}
            error={error && error.team ? error.team : null}
          />
          <Button
            variant="text"
            size="small"
            color="primary"
            disabled={disableSaveButton}
            onClick={this.addPlayer}
          >
            Enregistrer
          </Button>
        </FormGroup>
      </Paper>
    );
  };

  render = () => {
    const { playersData } = this.props;
    const {
      tournament: { name, players },
    } = playersData;

    return (
      <div className={'Tournament'}>
        <Typography className={'HeaderTitle'} variant="h6">
          {name}
        </Typography>
        <ul>{this.renderPlayers(players)}</ul>
        {this.renderAddPlayerForm()}
      </div>
    );
  };
}

Tournament.propType = {
  classes: PropTypes.object.isRequired,
  playersData: PropTypes.object.isRequired,
  addTeam: PropTypes.func.isRequired,
  addPlayer: PropTypes.func,
};

export default compose(
  TournamentMutations.withAddPlayerMutation,
  TournamentMutations.withAddTeamMutation,
  TournamentQueries.withPlayersQuery,
  withStyle,
)(Tournament);
