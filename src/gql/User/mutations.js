import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { USER_QUERY } from 'gql/User/queries';

// LOGIN
const loginMutation = gql`
  mutation loginMutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;
export const withLoginMutation = graphql(loginMutation, {
  props: ({ mutate }) => ({
    login: ({ variables, onError, onComplete }) =>
      mutate({
        variables,
        update: (cache, { data }) => {
          if (data.errors && typeof onError === 'function') {
            onError(data.errors);
          }

          // TODO : Update cache
          if (data.login) {
            const { user, token } = data.login;
            const { user: currentUser } = cache.readQuery({
              query: USER_QUERY,
            });

            const updatedUser = {
              ...currentUser,
              ...user,
              authenticated: !user.authenticated,
              token,
              __typename: 'User',
            };

            if (user) {
              cache.writeData({
                data: {
                  user: updatedUser,
                },
              });

              if (typeof onComplete === 'function') {
                onComplete(updatedUser);
              }
            }
          }
        },
      }),
  }),
});

// TOGGLE FAVORITE THEME
const toggleFavMutation = gql`
  mutation toggleFavMutation {
    toggleFav(id: $id) @client {
      id
    }
  }
`;
export const withToggleFavMutation = graphql(toggleFavMutation, {
  props: ({ mutate }) => ({
    toggleFav: id => mutate({ variables: { id } }),
  }),
});

export const mutations = {
  withLoginMutation,
  withToggleFavMutation,
};

export default mutations;
