import gql from 'graphql-tag';
import apolloProvider from '../../src/js/vue-apollo';

const state = {
    list: null,
};

const getters = {
    getList: state => state.list,
}

// actions
const actions = {
    list: ({commit, dispatch}, data) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            apolloProvider.defaultClient.query({
                query: gql`${data.list}`,
                variables: data.query,
            }).then(function(value) {

                console.log(value.data);

                commit('list', value.data.files);
                resolve(value);
            }).catch(function(error) {
                dispatch('alert/error', 'Error', { root: true });
                reject(error);
            });
        })
    },
}

// mutations
const mutations = {
    list(state, list) {
        state.list = list;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

