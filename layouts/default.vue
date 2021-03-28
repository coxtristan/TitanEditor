<template>
    <v-app dark>
        <v-app-bar app fluid dense max-height="4em">
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <v-app-bar-title class="pa-1 pt-0 pb-0 rounded blue--text">
                <!-- <h2 style="font-family: jetbrainsmono-regular">anomaly</h2> -->
                <h4>anomaly</h4>
            </v-app-bar-title>
            <v-container text class="ml-auto">
                <v-btn color="blue"  dense text to="/" class="">Home</v-btn>
                <v-btn text dense to="/designer">design</v-btn>
                <v-btn text dense to="/gsc">gsc explorer</v-btn>
                <v-btn text dense to="/lua">lua explorer</v-btn>
                <v-btn text dense to="/signup">signup</v-btn>
                <v-btn color="green" text dense to="/login">login</v-btn>
            </v-container>
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


