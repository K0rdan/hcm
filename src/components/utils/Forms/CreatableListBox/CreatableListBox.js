// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import PropTypes from 'prop-types';
import Creatable from 'react-select/lib/Creatable';
import { find } from 'lodash';
// Custom imports
import withStyle from 'pages/Tournament/withStyle';
////

const CreatableListBox = ({
  placeholder,
  items,
  selectedItem,
  addItem,
  setItem,
  error,
}) => {
  const options = items.map(i => ({
    value: i.name,
    label: i.name,
    data: i,
  }));
  const selectedValue = find(options, o => o.value === selectedItem);

  return (
    <Creatable
      placeholder={placeholder}
      isClearable={true}
      options={options}
      value={selectedValue}
      onChange={e => {
        if (e) {
          if (e.__isNew__ === true) {
            addItem(e.value);
          } else {
            setItem(e.value);
          }
        } else {
          setItem();
        }
      }}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: error ? theme.colors.danger : theme.colors.primary,
        },
      })}
    />
  );
};

CreatableListBox.defaultProps = {
  selectedItem: null,
  error: false,
};

CreatableListBox.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  selectedItem: PropTypes.string,
  items: PropTypes.array.isRequired,
  addItem: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

export default compose(withStyle)(CreatableListBox);
