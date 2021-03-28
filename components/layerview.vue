<template>
    <v-container fluid class="ma-0 pa-0" style="max-height: 50vh">
        <p class="text-center blue--text ma-0 mt-1">Layers</p>
        <v-divider></v-divider>
        <v-container style="overflow: auto; max-height: 50vh">
            <v-treeview dense :items="layerTree">
                <template #prepend="{ item, open: isOpen }">
                    <v-container
                        fluid
                        class="ma-0 pa-0 d-flex align-center align-content-center justify-center"
                    >
                        <v-checkbox
                            :value="true"
                            fluid
                            small
                            dense
                            hide-details="true"
                            off-icon="mdi-eye-off-outline"
                            on-icon="mdi-eye-outline"
                            class="ma-0 pa-0"
                        ></v-checkbox>
                        <v-icon v-if="item.children" small color="blue lighten-3" class="">{{
                            isOpen ? 'mdi-folder-open' : 'mdi-folder'
                        }}</v-icon>
                    </v-container>
                </template>
            </v-treeview>
        </v-container>
    </v-container>
</template>

<script>

export default {
    name: 'layerview',
    data() {
        return {
            layerTree: [],
        }
    },

    methods: {
        // parses the Konva layer object
        update(layer) {
            this.layerTree = layer.getChildren().map(child => { return {name: child.getClassName(), children: []} });
        }   
    }

    
}
</script>

<style>
</style>