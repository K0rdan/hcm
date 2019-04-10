import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

const calculateStyles = ({ theme }) => ({
  errorLabel: {
    color: theme.palette.error.main,
  },
  errorAdornment: {
    color: theme.palette.error.main,
  },
  validAdornment: {
    color: theme.palette.primary.main,
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
