import React from 'react';
import { func, object } from 'prop-types';

import 'components/Button/Button.css';

export const Button = props => {
  const { value, onClick, styles } = props;
  if (value) {
    return (
      <div
        className="button"
        onClick={() => {
          if (typeof onClick === 'function') {
            props.onClick();
          }
        }}
        style={styles}
      >
        {value}
      </div>
    );
  }

  return null;
};

Button.defaultProps = {
  onClick: () => {},
  styles: {},
};

Button.propTypes = {
  onClick: func,
  styles: object,
};

export default Button;
