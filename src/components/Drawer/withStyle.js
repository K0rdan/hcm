import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { get } from 'lodash';
import { getWidth } from 'utils/Drawer';

const calculateStyles = ({ width, drawerData }) => {
  const isSmall = width === 'xs';
  const isOpen = get(drawerData, 'drawer.isOpen', false);
  return {
    paperAnchorDockedLeft: {
      width: `${getWidth(isOpen, isSmall)}px`,
      borderRight: 0,
    },
    gutters: {
      padding: `8px 8px 8px 16px`,
    },
    h6: {
      margin: '8px 16px',
    },
    divider: {
      padding: 0,
    },
  };
};

export default Component => props => {
  const StyledComponent = withWidth()(newProps => {
    const WithStylesComponent = withStyles(theme =>
      calculateStyles({ ...newProps, theme }),
    )(Component);
    return <WithStylesComponent {...props} />;
  });
  return <StyledComponent {...props} />;
};
