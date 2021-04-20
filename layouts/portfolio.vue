<template>
    <VApp class="main">
        <VMain>
            <VContainer class="ma-0 pa-0 main" fluid>
                <Navbar/>
                <Nuxt/>
                <footer class="blue black--text text-center">Copyright 2020 Tristan Cox
                </footer>
            </VContainer>
        </VMain>
    </VApp>
</template>

<script>
import Navbar from "~/components/navbar";
export default {
    components: {Navbar},
    data() {
        return {}
    },
    computed: {
        isScrollingPortfolio() {
            return this.$store.state.scrollingPortfolio
        }
    }
}
</script>

<style lang="scss" scoped>



.main {
    background-color: $background
}

::-webkit-scrollbar {
    max-width: 0px;
}

body {
    height: 100vh;
}
//
//body {
//    max-height: 100vh;
//}

</style>


