<template>
    <v-app dark>
        <v-app-bar app fluid dense flex class="ma-auto pa-auto">
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            
            <v-container fluid text>
                <v-row justify="end">
                    
                <v-btn class="ma-2" color="blue" dense text to="/">home</v-btn>
                <v-btn class="ma-2" text dense to="/designer">anomaly</v-btn>
                <v-btn class="ma-2" text dense to="/about">about</v-btn>

                </v-row>
                <!-- <v-btn text dense to="/gsc">gsc explorer</v-btn> -->
                <!-- <v-btn text dense to="/lua">lua explorer</v-btn> -->
                <!-- <v-btn text dense to="/signup">signup</v-btn> -->
                <!-- <v-btn color="green" text dense to="/login">login</v-btn> -->
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

<style lang="sass" scoped>

</style>


