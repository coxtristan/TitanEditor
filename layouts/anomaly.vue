<template>
    <VApp>
        <VAppBar app class="ma-auto pa-auto" dense flex fluid v-if="!isScrollingPortfolio">
            <VContainer fluid text>
                <VBtn class="ma-2" color="blue" dense text to="/">Portfolio</VBtn>
                <VBtn class="ma-2" dense text to="/dashboard">Dashboard</VBtn>
                <VBtn class="ma-2" dense text to="/login">login</VBtn>
                <VBtn class="ma-2" dense text to="/signup">sign up</VBtn>
            </VContainer>
        </VAppBar>

        <VMain class="">
            <VContainer class="ma-0 pa-0" fluid >
                <Nuxt/>
            </VContainer>
        </VMain>
    </VApp>
</template>

<script>
export default {
    name: "anomaly"
}
</script>

<style scoped lang="scss">
body, html {
    height: calc(100vh - 48px);
    max-height: calc(100vh - 48px);
    overflow-y: hidden;
}

::-webkit-scrollbar {
    max-width: 0;
}
</style>
