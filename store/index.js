export const state = () => ({
    currentPage: '/',
    scrollingPortfolio: false,
    user: {
        username: '',
        userId: '',
        signedIn: false,
        access_token: '',

    },
    currentProjectId: ''
})

export const mutations = {
    currentPage(state, page) {
        state.currentPage = page;
    },

    scrolling(state, isScrollingPortfolio) {
        state.scrollingPortfolio = isScrollingPortfolio;
    },

    setAccessToken(state, newToken) {
        state.user.access_token = newToken;
    },

    setUser(state, userPayload) {
        state.user = userPayload;
    },

    currentProjectId(state, payload) {
        state.currentProjectId = payload;
    }
}
