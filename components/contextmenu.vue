<template>
    <v-menu
        outlined
        v-model="showMenu"
        absolute
        :position-x="x"
        :position-y="y"
    >
        <v-list outlined dense flat class="my-0 py-0">
            <v-subheader class="mx-1 mt-1 pl-0" style="max-height: 11pt" dense
                ><p
                    class="pa-0 ma-0 grey--text"
                    style="width: 100%; text-align: left; font-size: 8pt"
                >
                    Element Actions ({{classname}})
                </p></v-subheader
            >
            <v-divider></v-divider>

            <v-list-item-group>
                <v-list-item
                    class="ml-0 pl-1"
                    style="max-height: 10pt !important"
                    
                    v-for="action in actions"
                    :key="action.title"
                    dense
                    tile
                >
                    <v-list-item-title
                        dense
                        flat
                        class="grey--text text--lighten-1 ma-0 pa-0"
                        style="font-weight: 400"
                        @click="action.actionFunc"
                        ><p>
                            {{ action.title }}
                        </p></v-list-item-title
                    >
                </v-list-item>
            </v-list-item-group>
            <v-divider></v-divider>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'ContextMenu',
    model: {
        prop: 'showMenu',
        event: 'change',
    },
    props: ['showMenu', 'x', 'y', 'menuItems', 'selectedObjects', 'actions'],
    computed: {
        classname: function() {
            console.log("classname?", this.selectedObjects)
            if(this.selectedObjects.length === 0) 
            {
                return '';
            }
            
            if(this.selectedObjects.length === 1) 
            {
                
                return this.selectedObjects[0].getAttr('name');

            }
            return 'Group';
        },
        
    }
}
</script>

<style>
.list-item {
    font-weight: 200;
    font-size: 11pt;
    color: yellow !important;
}
</style>