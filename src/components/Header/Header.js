import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  queries as DrawerQueries,
  mutations as DrawerMutations,
} from 'gql/Drawer/index';
import { queries as UserQueries } from 'gql/User/index';
import withStyle from 'components/Header/withStyle';

import 'components/Header/Header.css';

const Header = ({
  classes,
  toggleDrawer,
  location: { pathname },
  userData: { user },
}) => (
  <div className={'Header'}>
    <AppBar classes={{ positionFixed: classes.positionFixed }}>
      <Toolbar>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography className={'HeaderTitle'} variant="h6">
          Les écuries du Romblay
        </Typography>
        {pathname !== '/login' ? (
          <Link to="/login" className={'HeaderButtonLink'}>
            <Button>
              <div className={'HeaderButtonText'}>
                {user.authenticated ? user.name : 'Login'}
              </div>
              <AccountCircle />
            </Button>
          </Link>
        ) : null}
      </Toolbar>
    </AppBar>
    <div className={classes.toolbar} />
  </div>
);

Header.propTypes = {
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  userData: PropTypes.object,
  toggleDrawer: PropTypes.func,
  drawerData: PropTypes.object,
};

export default compose(
  DrawerQueries.withDrawerQuery,
  DrawerMutations.withToggleDrawerMutation,
  UserQueries.withUserQuery,
  withStyle,
  withRouter,
)(Header);
