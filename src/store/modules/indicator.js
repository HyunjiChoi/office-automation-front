const state = () => ({
    showLoader: false,
});

const getters = {
    showLoader: ({ showLoader }) => showLoader,
};

const mutations = {
    setShowLoader(_state, showLoader) {
        _state.showLoader = showLoader;
    },
}

export default {
    namespace: true,
    state,
    mutations,
    getters,
};
