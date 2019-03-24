import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { get } from 'lodash';
import { getWidth } from 'utils/Drawer';

const calculateStyles = ({ theme, width, drawerData }) => {
  const isSmall = width === 'xs';
  const isOpen = get(drawerData, 'drawer.isOpen', false);
  return {
    toolbar: theme.mixins.toolbar,
    positionFixed: {
      width: `calc(100% - ${getWidth(isOpen, isSmall)}px)`,
      transitionProperty: 'width',
      transitionDuration: `${isOpen ? 225 : 195}ms`,
      transitionTimingFunction: 'ease-out',
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
