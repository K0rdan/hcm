import { reduce } from 'lodash';

export const getEnv = () =>
  reduce(
    process.env,
    (acc, val, key) => {
      const reactAppVarFound = key.indexOf('REACT_APP_');
      const cleanedKey =
        reactAppVarFound !== -1 ? key.substring('REACT_APP_'.length) : key;
      return Object.assign(
        {},
        acc,
        cleanedKey !== '' ? { [cleanedKey]: val } : {},
      );
    },
    {},
  );

export const Env = {
  getEnv,
};

export default Env;
