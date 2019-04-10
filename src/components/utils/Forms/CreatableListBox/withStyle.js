import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const calculateStyles = () => ({});

export default Component => props => {
  const WithStylesComponent = withStyles(theme =>
    calculateStyles({ ...props, theme }),
  )(Component);
  return <WithStylesComponent {...props} />;
};
