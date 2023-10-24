import signup from '../../apollo/queries/user/register.gql'
import signin from '../../apollo/queries/user/login.gql'
import gql from 'graphql-tag';
import apolloProvider from '../../src/js/vue-apollo';

const user = JSON.parse(localStorage.getItem('user'));
const admin = ["Admin75", "Moderator", "Web Editor"];
const isAdmin = user ? (admin.includes(user.user.role.name)) ? true : false : false;

const state = user ? { status: { loggedIn: true }, isAdmin: isAdmin, username: user.user.username } : { status: { loggedIn: false }, user: null };

const getters = {
    isAuthenticated: state => state.status.loggedIn,
    isAdmin: state => state.isAdmin
}

// actions
const actions = {
    login: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            apolloProvider.defaultClient.mutate({
            mutation: gql`${signin}`,
            variables: {
                input: user
            }
            }).then(function(value) {
                localStorage.setItem('user', JSON.stringify(value.data.login));
                let isAdmin = (admin.includes(value.data.login.user.role.name)) ? true : false;
                commit('loginSuccess', value.data.login, isAdmin);
                dispatch('alert/success', "Hello " + value.data.login.user.username, { root: true });
                resolve(value);
            }).catch(function(error) {
                commit('loginFailure', error);
                dispatch('alert/error', 'Les identifiants sont erronés. Veuillez recommencer', { root: true });
                reject(error);
            });
        })
    },
    logout({ commit }) {
        localStorage.removeItem('user');
        commit('logout');
    },
    async register({ dispatch, commit }, user) {
        await apolloProvider.defaultClient.mutate({
            mutation: gql`${signup}`,
            variables: {
                input: user
            }
        }).then(function(value) {
            commit('registerSuccess', value);
            setTimeout(() => {
                // display success message after route change completes
                dispatch('alert/success', 'Registration successful', { root: true });
            })
        }).catch(function(error) {
            commit('registerFailure', error);
            dispatch('alert/error', error, { root: true });
        });
    },
}

// mutations
const mutations = {
    loginSuccess(state, user, admin) {        
        state.status = { loggedIn: true };
        state.isAdmin = admin;
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = { loggedIn: false };
        state.isAdmin = false;
        state.user = null;
    },
    registerSuccess(state, user) {
        state.status = { registering: true };
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

