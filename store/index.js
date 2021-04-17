export const state = () => ({
    currentPage: '/',
    scrollingPortfolio: false
})

export const mutations = {
    currentPage(state, page) {
        state.currentPage = page;
    },
    scrolling(state, isScrollingPortfolio)
    {
        state.scrollingPortfolio = isScrollingPortfolio
    }
}