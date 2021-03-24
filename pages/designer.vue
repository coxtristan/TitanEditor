<template>
    <v-container fluid class="ma-0 pa-0 d-flex">
        <!-- LEFT PANEL -->
        <v-container
            class="float-left grey darken-4 vertical-toolbar d-flex flex-column flex-center ma-0 pa-0"
        >
            <toolkit @add_text="editor.addText"></toolkit>

            <imagebrowser @image_clicked="imageClicked"></imagebrowser>

            <v-btn
                dense
                outlined
                color="blue"
                class="mx-4 my-4"
                @click="InitializeLUAGenerator"
                >Download HUD Pack</v-btn
            >
        </v-container>

        <!-- MIDDLE CANVAS VIEW -->
        <editor
            ref="editor"
            @transformupdated="propertyview.updateElementState"
        />
        <!-- RIGHT PANEL -->
        <v-container style="width: 25em" class="ma-0 pa-0 grey darken-4">
            <!-- <properties :element="test_element" @change="UserSetProperty" /> -->
            <properties ref="propertyview" />
            <layerview ref="layerview"></layerview>
        </v-container>

        <v-overlay :value="codePreviewEnabled">
            <v-btn @click="codePreviewEnabled = !codePreviewEnabled">
                <v-icon>mdi-alpha-x</v-icon>
            </v-btn>
            <v-row
                rows="12"
                style="background-color: black; overflow: auto"
                class="image-overlay-browser-body"
            >
                <v-cols cols="12">
                    <pre lang="language-lua">
                        <code>
                            {{generatedCode}}

                        </code>
                    </pre>
                </v-cols>
            </v-row>
        </v-overlay>
    </v-container>
</template>

<script>
import Properties from '../components/properties.vue'
import ContextMenu from '../components/contextmenu.vue'
import TitanEditor from '../components/editor.vue'
import KonvaAPI from 'konva'

// config aws
import '../plugins/aws-sdk-2.831.0.min.js'
import Layerview from '../components/layerview.vue'
import Toolkit from '../components/toolkit.vue'
import Imagebrowser from '../components/imagebrowser.vue'

export default {
    components: {
        ContextMenu,
        Properties,
        TitanEditor,
        Layerview, // TODO implement layer view and controls
        Toolkit,
        Imagebrowser,
    },

    data() {
        return {
            // component refs
            editor: Object,
            layerview: Object,
            propertyview: Object,
            elemAttrs: null,
            // overlay state
            codePreviewEnabled: false,
            generatedCode: '',
        }
    },

    computed: {},

    mounted() {
        this.editor = this.$refs.editor
        this.layerview = this.$refs.layerview
        this.propertyview = this.$refs.propertyview
        this.editor.setBackgroundImage("https://d1i6h0k565wt9n.cloudfront.net/images/backgrounds/bo3_thegiant_3.png");
    },

    created() {},

    methods: {
        async InitializeLUAGenerator(evt) {
            evt.preventDefault()
            let stage = {}
            this.layer
                .getChildren()
                .toArray()
                .forEach((child, idx) => {
                    if (child.getClassName() == 'Image') {
                        // console.log(child.getAttr('image').src)

                        stage[idx] = {
                            imagesrc: child.getAttr('image').src,
                            name: child.name(),
                            clientRect: child.getClientRect(),
                            classname: child.getClassName(),
                            zindex: child.zIndex(),
                            type: child.getClassName(),
                        }
                    }
                })
            console.log(stage)
            this.$axios
                .$post('http://localhost:3001/download/', { stage })
                .then((response) => {
                    console.log(response.generatedCode)
                    this.generatedCode = response.generatedCode
                    this.codePreviewEnabled = true
                })
        },

        imageClicked(evt) {
            if (evt.includes('background')) this.editor.setBackgroundImage(evt)
            else this.editor.addImage(evt)
        },

        updatePropertiesPanel(elementState) {},
    },
}
</script>

<style lang="scss" scoped>
#ctxmenu {
    display: none;
    position: absolute;
    margin: 0;
    padding: 0;
    background: #555;
}
.vertical-toolbar {
    height: 100vh !important;
    width: 30em;
}

.v-toolbar__content {
    flex-direction: column !important;
}

.short-panel-header {
    min-height: 28px;
}

.image-overlay-browser-body {
    width: 75vw;
    height: 75vh;
    // overflow: auto;
}

.cursor-grab:hover {
    cursor: pointer;
}

/* width */
::-webkit-scrollbar {
    width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #000000;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(0, 162, 255);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>