<template>
    <v-app dark>
        <v-app-bar app class="ma-auto pa-auto" dense flex fluid v-if="!isScrollingPortfolio">
            <v-container fluid text>
                <v-btn class="ma-2" color="blue" dense text to="/">Portfolio</v-btn>
                <v-btn class="ma-2" dense text to="/designer">anomaly</v-btn>
            </v-container>
        </v-app-bar>

        <v-main>
            <v-container class="ma-0 pa-0" fluid >
                <nuxt/>
            </v-container>
        </v-main>
    </v-app>
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


