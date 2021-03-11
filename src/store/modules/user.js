const state = () => ({
    accessToken: localStorage.getItem('accessToken') || null,
});

const getters = {
    accessToken: ({ accessToken }) => accessToken,
};

const mutations = {
    setAccessToken(_state, accessToken) {
        _state.accessToken = accessToken;
    },
}

const actions = {
    async deleteToken({ commit }) {
        commit('setAccessToken', null);
        const date = new Date();
        date.setDate(date.getDate() - 1);
        document.cookie = `refreshToken=0;expires=${date.toUTCString()};path=/;`;
        document.cookie = `keepLogin=0;expires=${date.toUTCString()}`;
        localStorage.removeItem('accessToken');
    },
}

export default {
    namespace: true,
    state,
    mutations,
    actions,
    getters,
};
