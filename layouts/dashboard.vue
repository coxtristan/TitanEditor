<template>
    <VApp>
        <VAppBar app class="ma-auto pa-auto" dense flex fluid v-if="!isScrollingPortfolio">
            <VContainer fluid text>
                <VBtn class="ma-2" color="blue" dense text to="/">Portfolio</VBtn>
                <VBtn class="ma-2" dense text to="/designer">anomaly</VBtn>
                <VBtn class="ma-2" dense text to="/login">login</VBtn>
                <VBtn class="ma-2" dense text to="/signup">sign up</VBtn>
            </VContainer>
        </VAppBar>

        <VMain>
            <VContainer class="ma-0 pa-0" fluid>
                <Nuxt/>
            </VContainer>
        </VMain>
    </VApp>
</template>

<script>
export default {
    data () {
        return {}
    },
    computed: {
        isScrollingPortfolio() {
            return this.$store.state.scrollingPortfolio
        }
    }
}
</script>

<style lang="scss">
::-webkit-scrollbar {
    max-width: 0px;
}

body {
    height: 100%;
}

</style>


