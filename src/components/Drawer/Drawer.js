import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Drawer as MaterialDrawer,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { PowerSettingsNew, Home } from '@material-ui/icons';
import { queries as DrawerQueries } from 'gql/Drawer/index';
import { queries as UserQueries } from 'gql/User/index';
import withStyle from 'components/Drawer/withStyle';
import { Assets } from 'utils/Assets';

import 'components/Drawer/Drawer.css';

const Drawer = props => {
  const { classes, drawerData, userData, location } = props;
  const { drawer } = drawerData;
  const { user } = userData;
  const { pathname } = location;
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
          <PowerSettingsNew fontSize="inherit" />
        </ListItemIcon>
        <ListItemText
          primary={user.authenticated ? 'Logout' : 'Login'}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          className={'ListItemText'}
        />
      </ListItem>
      <ListItem classes={{ divider: classes.divider }} divider />
      <Typography classes={{ h6: classes.h6 }} variant="h6">
        Pages
      </Typography>
      {pathname !== '/' ? (
        <Link to="/" className={'DrawerButtonLink'}>
          <ListItem button dense classes={{ gutters: classes.gutters }}>
            <ListItemIcon className={'ListItemIcon'}>
              <Home fontSize="inherit" />
            </ListItemIcon>
            <ListItemText
              primary={'Accueil'}
              primaryTypographyProps={{ variant: 'subtitle1' }}
              className={'ListItemText'}
            />
          </ListItem>
        </Link>
      ) : null}
      {pathname !== '/tournament' ? (
        <Link to="/tournament" className={'DrawerButtonLink'}>
          <ListItem button dense classes={{ gutters: classes.gutters }}>
            <ListItemIcon className={'ListItemIcon'}>
              <img
                className={'ListItemIcon'}
                src={Assets.MenuIconTournament}
                alt=""
              />
            </ListItemIcon>
            <ListItemText
              primary={'Tournois'}
              primaryTypographyProps={{ variant: 'subtitle1' }}
              className={'ListItemText'}
            />
          </ListItem>
        </Link>
      ) : null}
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
  withRouter,
)(Drawer);
