import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  FormGroup,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import withStyle from 'pages/Login/withStyle';
import { formValidations } from 'utils/index';
import { mutations as UserMutations } from 'gql/User/index';

export class Login extends React.Component {
  state = {
    login: '',
    password: '',
    showPassword: false,
    keepSignIn: true,
  };

  handleChange = prop => event => {
    const { error } = this.state;
    const { type, value, checked } = event.target;
    if (type === 'checkbox') {
      this.setState({ [prop]: checked });
    } else if (error && error.field === prop) {
      this.setState({
        [prop]: value,
        error: null,
      });
    } else {
      this.setState({ [prop]: value });
    }
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  signIn = () => {
    const { login } = this.props;
    const { login: name, password } = this.state;

    login({
      variables: { name, password },
      onError: errors => this.signInErrorHandler(errors),
      onComplete: user => this.signInCompleteHandler(user),
    });
  };

  signInErrorHandler = errors => {
    const {
      extensions: {
        argument: { type, field },
      },
      message,
    } = errors[0];
    this.setState({
      error: {
        form: type,
        message,
        field,
      },
    });
  };

  signInCompleteHandler = user => {
    console.log('TEST', user, this.props);
    this.props.history.goBack();
  };

  render = () => {
    const { classes } = this.props;
    const { login, password, showPassword, keepSignIn, error } = this.state;

    const renderErrorLabel = error => (
      <Typography className={classes.formControlError} variant="subtitle2">
        {error}
      </Typography>
    );

    // Login verification
    const isLoginValid =
      error && error.message && error.field === 'login'
        ? error.message
        : formValidations.login(login);
    const isPasswordValid =
      error && error.message && error.field === 'password'
        ? error.message
        : formValidations.password(password);
    const disableSignInButton =
      isLoginValid !== true || isPasswordValid !== true;

    // TODO : Signup verification

    return (
      <div className={classes.pageWrapper}>
        <Paper className={classes.formWrapper} square elevation={1}>
          <Typography className={classes.formTitle} variant="h5">
            Authentification
          </Typography>
          <FormGroup>
            <FormControl className={classes.formControl}>
              <Typography variant="subtitle1">Login</Typography>
              <TextField
                className={classes.formInput}
                placeholder="Enter your login name"
                value={login}
                onChange={this.handleChange('login')}
                error={isLoginValid !== true}
                required
                autoFocus
              />
              {isLoginValid !== true ? renderErrorLabel(isLoginValid) : null}
            </FormControl>
            <FormControl className={classes.formControl}>
              <Typography variant="subtitle1">Password</Typography>
              <TextField
                className={classes.formInput}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={this.handleChange('password')}
                error={isPasswordValid !== true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className={classes.formInputShowPassword}
                    >
                      <IconButton
                        onClick={this.handleClickShowPassword}
                        className={classes.formInputShowPasswordIcon}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
              {isPasswordValid !== true
                ? renderErrorLabel(isPasswordValid)
                : null}
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <Checkbox
                    className={classes.formCheckbox}
                    checked={keepSignIn}
                    onChange={this.handleChange('keepSignIn')}
                    color={'primary'}
                  />
                }
                label="Keep me signed in"
              />
            </FormControl>
            <Button
              variant="contained"
              size="small"
              className={classes.formSubmitButton}
              disabled={disableSignInButton}
              onClick={this.signIn}
            >
              Sign In
            </Button>
          </FormGroup>
        </Paper>
        <Paper className={classes.formWrapper} square elevation={1}>
          <Typography className={classes.formTitle} variant="h5">
            Enregistrement
          </Typography>
          <FormControl className={classes.formControl}>
            <TextField label="Email" variant="filled" />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField label="Login" variant="filled" />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField label="Password" variant="filled" />
          </FormControl>
        </Paper>
      </div>
    );
  };
}

Login.propType = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

export default compose(
  UserMutations.withLoginMutation,
  withStyle,
)(Login);
