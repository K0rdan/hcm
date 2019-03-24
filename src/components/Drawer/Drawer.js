import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import {
  Drawer as MaterialDrawer,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { PowerSettingsNew } from '@material-ui/icons';
import { queries as DrawerQueries } from 'gql/Drawer/index';
import { queries as UserQueries } from 'gql/User/index';
import withStyle from 'components/Drawer/withStyle';

import 'components/Drawer/Drawer.css';

const Drawer = props => {
  const { classes, drawerData, userData } = props;
  const { drawer } = drawerData;
  const { user } = userData;
  return (
    <MaterialDrawer
      classes={{ paperAnchorDockedLeft: classes.paperAnchorDockedLeft }}
      variant={'persistent'}
      open={drawer.isOpen}
    >
      <Typography classes={{ h6: classes.h6 }} variant="h6">
        Profile
      </Typography>
      <ListItem button dense classes={{ gutters: classes.gutters }}>
        <ListItemIcon className={'ListItemIcon'}>
          <PowerSettingsNew />
        </ListItemIcon>
        <ListItemText
          primary={user.authenticated ? 'Logout' : 'Login'}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          className={'ListItemText'}
        />
      </ListItem>
      <ListItem classes={{ divider: classes.divider }} divider />
      <Typography classes={{ h6: classes.h6 }} variant="h6">
        Themes
      </Typography>
    </MaterialDrawer>
  );
};

Drawer.propTypes = {
  classes: PropTypes.object,
  userData: PropTypes.object,
  drawerData: PropTypes.object,
};

export default compose(
  DrawerQueries.withDrawerQuery,
  UserQueries.withUserQuery,
  withStyle,
)(Drawer);
