import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import { queries as DrawerQueries } from 'gql/Drawer/index';
import withStyle from 'components/Content/withStyle';

const Content = ({ classes, children, style = {} }) => (
  <Scrollbars
    hideTracksWhenNotNeeded
    autoHide
    className={classNames(classes.contentWrapper)}
  >
    <div className={classNames(classes.content)} style={style}>
      {children}
    </div>
  </Scrollbars>
);

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default compose(
  DrawerQueries.withDrawerQuery,
  withStyle,
)(Content);
