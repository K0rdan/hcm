import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import withStyle from 'pages/Tournament/withStyle';

export class Tournament extends React.Component {
  state = {};

  render = () => <div>TEST</div>;
}

Tournament.propType = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyle)(Tournament);
