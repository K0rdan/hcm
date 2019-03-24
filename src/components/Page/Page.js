import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Header, Drawer, Content } from 'components/index';

import 'components/Page/Page.css';

const Page = ({
  children,
  header = false,
  drawer = false,
  style = {},
  contentStyle = {},
}) => (
  <div className="Page" style={style}>
    {header ? <Header /> : null}
    {drawer ? <Drawer /> : null}
    <Content style={contentStyle}>{children}</Content>
  </div>
);

Page.propTypes = {
  children: PropTypes.object.isRequired,
  header: PropTypes.bool,
  drawer: PropTypes.bool,
  style: PropTypes.object,
  contentStyle: PropTypes.object,
};

export default Page;
