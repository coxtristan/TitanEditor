<template>
    <v-container>
        <p class="text-center blue--text ma-0 mt-1">Toolbar</p>
        <v-divider class="mb-2"></v-divider>
        <v-row v-for="row in tools" :key="row.length">
            <v-col v-for="tool in row" :key="tool.name">
                <v-btn small tile :title="tool.name">
                    <!-- {{ tool.name }} -->
                    <v-icon color="blue">{{ tool.icon }}</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'toolkit',
    data() {
        return {
            tools: [
                [
                    { name: 'Add Text', icon: 'mdi-format-text' },
                    { name: 'Add Image', icon: 'mdi-image' },
                    { name: 'Link to Model', icon: 'mdi-transit-connection' },
                ],
                // [{ name: '' }, { name: '' }, { name: '' }],
                // [{ name: '' }, { name: '' }, { name: '' }],
                // [{ name: '' }, { name: '' }, { name: '' }],
            ],
        }
    },
}
</script>

<style>
</style>