import React from 'react';
import { CircularProgress } from '@material-ui/core';
import 'components/Loader/Loader.css';

export const Loader = props => {
  return (
    <div className="LoaderWrapper">
      <CircularProgress />
      {props.children ? (
        <div className="LoaderContent">{props.children}</div>
      ) : null}
    </div>
  );
};

export default Loader;
