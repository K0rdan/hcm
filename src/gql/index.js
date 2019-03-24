import { merge } from 'lodash';
import Global from 'gql/Global';
import Drawer from 'gql/Drawer';
import User from 'gql/User';

export const defaults = merge(Global.defaults, Drawer.defaults, User.defaults);
export const resolvers = {
  Mutation: merge(Global.resolvers, Drawer.resolvers, User.resolvers),
};

export const gql = {
  resolvers,
  defaults,
};

export default gql;
