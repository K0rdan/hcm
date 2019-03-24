import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { get } from 'lodash';
import { Drawer, AppBar } from 'utils/index';

const calculateStyles = props => {
  const { width, drawerData } = props;
  const isSmall = width === 'xs';
  const isOpen = get(drawerData, 'drawer.isOpen', false);

  return {
    contentWrapper: {
      minWidth: '500px',
      height: `calc(100% - ${AppBar.getHeight(isSmall)}px) !important`,
      transitionProperty: 'margin-left',
      transitionDuration: `${isOpen ? 225 : 195}ms`,
      transitionTimingFunction: 'ease-out',
      backgroundColor: `#666666`,
    },
    content: {
      height: '100%',
      marginLeft: `${Drawer.getWidth(isOpen, isSmall)}px`,
      padding: 10,
      boxSizing: 'border-box',
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
