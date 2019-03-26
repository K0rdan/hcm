import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

const calculateStyles = ({ theme }) => ({});

export default Component => props => {
  const StyledComponent = withWidth()(newProps => {
    const WithStylesComponent = withStyles(theme =>
      calculateStyles({ ...newProps, theme }),
    )(Component);
    return <WithStylesComponent {...props} />;
  });
  return <StyledComponent {...props} />;
};
