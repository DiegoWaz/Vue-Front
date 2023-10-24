import gql from 'graphql-tag';
import apolloProvider from '../../src/js/vue-apollo';

const state = {
    list: null,
    one: null
};

const getters = {
    getList: state => state.list,
    getOne: state => state.one
}

// actions
const actions = {
    one: ({commit, dispatch}, data) => {
        return new Promise((resolve, reject) => {
            apolloProvider.defaultClient
            .query({
                query: gql`${data.one}`,
                variables: data.query,
            }).then(function(value) {
                commit('one', value.data);
                resolve(value);
            }).catch(function(error) {
                dispatch('alert/error', 'Error', { root: true });
                reject(error);
            });
        })
    },
    list: ({commit, dispatch}, data) => {
        return new Promise((resolve, reject) => {
            apolloProvider.defaultClient
            .query({
                query: gql`${data.list}`,
                variables: data.query,
            }).then(function(value) {
                commit('list', value.data);
                resolve(value);
            }).catch(function(error) {
                console.log(error);
                dispatch('alert/error', 'Error', { root: true });
                reject(error);
            });
        })
    },
    create: ({commit, dispatch}, data) => {
        return new Promise((resolve, reject) => {
            apolloProvider.defaultClient
            .mutate({
                mutation: gql`${ data.create }`,
                variables: { input: { "data" : data.value } }
            }).then(function(value) {
                console.log(value);
                commit('createSuccess', value.data);
                dispatch('alert/success', { root: true });
                resolve(value);
            }).catch(function(error) {
                console.log(error);
                commit('failure', error);
                dispatch('alert/error', 'Les identifiants sont erronés. Veuillez recommencer', { root: true });
                reject(error);
            });
        })
    },
    update: ({commit, dispatch}, data) => {
        return new Promise((resolve, reject) => {
            apolloProvider.defaultClient
            .mutate({
                mutation: gql`${ data.update }`,
                variables: { input: { "id": data.id, "data" : data.value } }
            }).then(function(value) {
                console.log(value);
                commit('updateSuccess', value.data);
                dispatch('alert/success', { root: true });
                resolve(value);
            }).catch(function(error) {
                console.log(error);
                commit('failure', error);
                dispatch('alert/error', 'Les identifiants sont erronés. Veuillez recommencer', { root: true });
                reject(error);
            });
        })
    },
    delete: ({commit, dispatch}, data) => {
        return new Promise((resolve, reject) => {
            apolloProvider.defaultClient
            .mutate({
                mutation: gql`${ data.update }`,
                variables: { input: { "id": data.id, "data" : data.value } }
            }).then(function(value) {
                console.log(value);
                commit('updateSuccess', value.data);
                dispatch('alert/success', { root: true });
                resolve(value);
            }).catch(function(error) {
                console.log(error);
                commit('failure', error);
                dispatch('alert/error', 'Les identifiants sont erronés. Veuillez recommencer', { root: true });
                reject(error);
            });
        })
    },
}

// mutations
const mutations = {
    one(state, one) {
        state.one = one;
    },
    list(state, list) {
        let name = Object.keys(list)[0];
        if(!state.list) state.list = {};
        state.list[name] = list[name];
    },
    createSuccess(state, value){
    },
    updateSuccess(state, value){
    },
    failure(state, value ){

    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
