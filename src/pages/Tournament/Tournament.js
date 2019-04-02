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
} from '@material-ui/core';
// Custom imports
import withStyle from 'pages/Tournament/withStyle';
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
    error: null,
  };

  handleChange = prop => event => {
    const { error } = this.state;
    const { value } = event.target;

    // TEST
    const fieldValidation = formValidations[prop](value);
    //

    if (fieldValidation !== true) {
      console.log(error, fieldValidation, error || fieldValidation);
      this.setState({
        [prop]: value,
        error: fieldValidation,
      });
    } else {
      this.setState({ [prop]: value, error: null });
    }
  };

  addPlayer = () => {
    const { addPlayer } = this.props;
    const { name, firstname, horse, email } = this.state;

    addPlayer({
      variables: { name, firstname, horse, email },
    });
  };

  renderPlayers = players =>
    players.map(player =>
      player ? (
        <li key={`tournament-player-${player.id}`}>
          {player.name} {player.firstname} {player.horse} {player.email}
        </li>
      ) : null,
    );

  renderAddPlayerForm = (a, b, c) => {
    const { error, name, firstname, horse, email } = this.state;

    return (
      <Paper square>
        <Typography variant="h5">Ajouter des participants</Typography>
        <FormGroup>
          <FormControl>
            <Typography variant="subtitle1">Nom du participant</Typography>
            <TextField
              placeholder="Insérer le nom du participant"
              value={name}
              onChange={this.handleChange('name')}
              required
              autoFocus
            />
          </FormControl>
          <FormControl>
            <Typography variant="subtitle1">Prénom du participant</Typography>
            <TextField
              placeholder="Insérer le nom du participant"
              value={firstname}
              onChange={this.handleChange('firstname')}
              required
              autoFocus
            />
          </FormControl>
          <FormControl>
            <Typography variant="subtitle1">Nom de la monture</Typography>
            <TextField
              placeholder="Insérer le nom de la monture"
              value={horse}
              onChange={this.handleChange('horse')}
              required
              autoFocus
            />
          </FormControl>
          <FormControl>
            <Typography variant="subtitle1">Email</Typography>
            <TextField
              placeholder="Insérer l'email du participant"
              value={email}
              onChange={this.handleChange('email')}
              required
            />
          </FormControl>
          <Button variant="contained" size="small" onClick={this.addPlayer}>
            Sign In
          </Button>
        </FormGroup>
      </Paper>
    );
  };

  render = () => {
    const { tournamentData } = this.props;
    const {
      tournament: { name, players },
    } = tournamentData;

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
  tournamentData: PropTypes.object.isRequired,
  addPlayer: PropTypes.func,
};

export default compose(
  TournamentMutations.withAddPlayerMutation,
  TournamentQueries.withTournamentQuery,
  withStyle,
)(Tournament);
