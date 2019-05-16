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
import { find } from 'lodash';
// Custom imports
import withStyle from 'pages/Tournament/withStyle';
import TeamsFormField from 'pages/Tournament/teamsFormField';
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
    error: null,
  };

  coupleNameFirstnameCheck = newState => {
    return newState;
  };

  handleChange = prop => event => {
    const { error, name, firstname, horse, email } = this.state;
    const { playersData } = this.props;
    const {
      tournament: { players },
    } = playersData;
    const { value } = event.target;

    const fieldValidation = formValidations[prop](value);
    const newState = {
      [prop]: value,
      error,
    };

    if (fieldValidation !== true) {
      newState.error = Object.assign({}, newState.error, fieldValidation);
    } else if (newState.error !== null) {
      // Name / Firstname couple check
      const coupleNameFirstnameErrorMessage =
        'Name and firstname already registered';
      if (players) {
        if (prop === 'name' && firstname) {
          const foundNameFirstname =
            undefined !==
            find(players, p => p.name === value && p.firstname === firstname);
          if (foundNameFirstname) {
            newState.error = Object.assign({}, newState.error, {
              name: coupleNameFirstnameErrorMessage,
              firstname: coupleNameFirstnameErrorMessage,
            });
          } else {
            delete newState.error[prop];
            delete newState.error['firstname'];
          }
        } else if (prop === 'firstname' && name) {
          const foundNameFirstname =
            undefined !==
            find(players, p => p.name === name && p.firstname === value);
          if (foundNameFirstname) {
            newState.error = Object.assign({}, newState.error, {
              name: coupleNameFirstnameErrorMessage,
              firstname: coupleNameFirstnameErrorMessage,
            });
          } else {
            delete newState.error[prop];
            delete newState.error['name'];
          }
        } else {
          delete newState.error[prop];
        }
      } else {
        delete newState.error[prop];
      }
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
          {player.name} {player.firstname} {player.horse} {player.email}{' '}
          {player.team.name}
        </li>
      ) : null,
    );

  renderFormField = (title, placeholder, fieldName, required = false) => {
    const { classes } = this.props;
    const { error } = this.state;
    const renderErrorLabel = error => (
      <Typography variant="subtitle2" className={classes.errorLabel}>
        {error}
      </Typography>
    );
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
          ? renderErrorLabel(error[fieldName])
          : null}
      </FormControl>
    );
  };

  renderAddPlayerForm = () => {
    const { name, firstname, horse, email, team } = this.state;
    const disableSaveButton =
      formValidations.name(name) !== true ||
      formValidations.firstname(firstname) !== true ||
      formValidations.horse(horse) !== true ||
      formValidations.email(email) !== true ||
      !team;

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
          {this.renderFormField(
            'Nom de la monture',
            'Insérer le nom de la monture',
            'horse',
            true,
          )}
          {this.renderFormField(
            'Email',
            "Insérer l'email du participant",
            'email',
            true,
          )}
          <TeamsFormField
            placeholder={'Equipe'}
            setTeam={t => this.setState({ team: t })}
            selectedTeam={team}
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
