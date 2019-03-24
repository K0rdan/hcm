import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const calculateStyles = ({ theme }) => ({
  toolbar: theme.mixins.toolbar,
});

export default Component => props => {
  const WithStylesComponent = withStyles(theme =>
    calculateStyles({ ...props, theme }),
  )(Component);
  return <WithStylesComponent {...props} />;
};
