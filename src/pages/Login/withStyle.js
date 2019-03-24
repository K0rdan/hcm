import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

const calculateStyles = ({ theme }) => ({
  pageWrapper: {
    display: 'flex',
    margin: '0 auto',
    width: '30rem',
  },
  formWrapper: {
    margin: '0 auto',
    width: '14rem',
  },
  formTitle: {
    marginTop: '16px',
    textAlign: 'center',
  },
  formControl: {
    margin: `${theme.spacing.unit}px 16px`,
    display: 'block',
  },
  formControlLabel: {
    width: '100%',
    margin: 0,
  },
  formControlError: {
    marginTop: '0.25rem',
    color: 'red',
    textAlign: 'right',
    fontSize: '0.75rem',
    fontWeight: 400,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: '1.375em',
  },
  formInput: {
    borderTop: '1px solid #f5f5f5',
    padding: '5px',
    boxShadow: '0 2px 2px #cdcdcd',
  },
  formInputShowPassword: {
    marginLeft: '-34px',
  },
  formInputShowPasswordIcon: {
    padding: '5px',
  },
  formCheckbox: {
    padding: 0,
  },
  formSubmitButton: {
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    margin: `8px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`,
  },
});

export default Component => props => {
  const StyledComponent = withWidth()(newProps => {
    const WithStylesComponent = withStyles(theme =>
      calculateStyles({ ...newProps, theme }),
    )(Component);
    return <WithStylesComponent {...props} />;
  });
  return <StyledComponent {...props} />;
};
