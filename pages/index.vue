<template>
    <v-container class="ma-auto pa-0">
            <h1 class="text-center mt-5">Available Tools</h1>
            <v-divider></v-divider>
        <v-row align="center" no-gutters>
            <v-col class="d-flex">
                <v-hover v-slot="{ hover }" class="ma-4" max-width="300px">
                    <v-img
                        class="mx-auto rounded blue"
                        height="300px"
                        width="300px"
                        fixed
                        contain
                        aspect-ratio="1"
                        :src="require('~/assets/preview-designer.png')"
                    >
                        <v-overlay
                            :value="hover"
                            absolute
                            color="blue"
                            opacity=".1"
                            z-index="0"
                        >
                            <v-btn text outlined to="/designer"> Design </v-btn>
                        </v-overlay>
                        <v-footer justify-self="end" absolute>
                            <v-caption
                                class="caption grey--text font-weight-medium"
                                >Anomaly - a tool for Black Ops 3 HUD prototyping and design</v-caption
                            >
                        </v-footer>
                    </v-img>
                </v-hover>
                <v-spacer></v-spacer>
                <v-hover v-slot="{ hover }" class="ma-4">
                    <v-img
                        class="mx-auto rounded blue fixed"
                        height="300px"
                        width="300px"
                        :src="require('~/assets/coming-soon.png')"
                    >
                        <v-overlay :value="hover" absolute color="blue" z-index="0" opacity=".1">
                            <v-btn text outlined> Lua Explorer </v-btn>
                        </v-overlay>
                        <v-footer justify-self="end" absolute>
                            <v-caption
                                class="caption grey--text font-weight-medium"
                                >Black Ops III LUA Documentation</v-caption
                            >
                        </v-footer>
                    </v-img>
                </v-hover>
            </v-col>
        </v-row>

        <v-row align="center" no-gutters>
            <v-col class="d-flex">
                <v-hover v-slot="{ hover }" class="ma-4" max-width="300px">
                    <v-img
                        class="mx-auto rounded blue"
                        height="300px"
                        width="300px"
                        fixed
                        :aspect-ratio="1"
                        :src="require('~/assets/coming-soon.png')"
                    >
                        <v-overlay :value="hover" absolute color="blue" z-index="0" opacity=".1">
                            <v-btn text outlined> GSC Explorer </v-btn>
                        </v-overlay>
                        <v-footer justify-self="end" absolute>
                            <v-caption
                                class="caption grey--text font-weight-medium"
                                >Black Ops III GSC Documentation</v-caption
                            >
                        </v-footer>
                    </v-img>
                </v-hover>
                <v-spacer></v-spacer>
                <v-hover v-slot="{ hover }" class="ma-4">
                    <v-img
                        class="mx-auto rounded blue fixed"
                        height="300px"
                        width="300px"
                        fixed
                        aspect-ratio="1"
                        :src="require('~/assets/coming-soon.png')"
                    >
                        <v-overlay :value="hover" absolute color="blue" z-index="0" opacity=".1">
                            <v-btn text outlined> Your Account </v-btn>
                        </v-overlay>
                        <v-footer justify-self="end" absolute>
                            <v-caption
                                class="caption grey--text font-weight-medium"
                                >Your Account</v-caption
                            >
                        </v-footer>
                    </v-img>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    components: {},
}
</script>
