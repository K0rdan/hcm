import { merge } from 'lodash';
import Global from 'gql/Global';
import Drawer from 'gql/Drawer';
import User from 'gql/User';
import Tournament from 'gql/Tournament';

export const defaults = merge(
  Global.defaults,
  Drawer.defaults,
  User.defaults,
  Tournament.defaults,
);

export const resolvers = {
  Mutation: merge(
    Global.resolvers,
    Drawer.resolvers,
    User.resolvers,
    Tournament.resolvers,
  ),
};

export const gql = {
  resolvers,
  defaults,
};

export default gql;
