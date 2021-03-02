<template>
    <v-app dark>
        <v-app-bar app fluid dense max-height="4em">
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <v-app-bar-title class="pa-1 pt-0 pb-0 rounded blue--text">
                <h2>Titan</h2>
            </v-app-bar-title>
            <v-app-bar-items flat class="ml-auto">
                <v-btn color="blue" flat dense text to="/" class="">Home</v-btn>
                <v-btn flat text dense to="/designer">design</v-btn>
                <v-btn flat text dense to="/gsc">gsc explorer</v-btn>
                <v-btn flat text dense to="/lua">lua explorer</v-btn>
                <v-btn flat text dense to="/signup">signup</v-btn>
                <v-btn color="green" flat text dense to="/login">login</v-btn>
            </v-app-bar-items>
        </v-app-bar>

        <v-main>
            <v-container fluid class="ma-0 pa-0" style="height: 100vh - 4em">
                <nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {}
    },
}
</script>


