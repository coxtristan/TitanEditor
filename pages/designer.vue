<template>
    <v-container fluid class="ma-0 pa-0 d-flex">
        <v-container
            class="float-left grey darken-4 vertical-toolbar d-flex flex-column flex-center ma-0 pa-0"
        >
            <v-container>
                <p class="text-center blue--text ma-0 mt-1 px-1">Images</p>
                <v-divider class="mb-4"></v-divider>
            </v-container>

            <v-expansion-panels dark :accordion="true" :multiple="true">
                <v-expansion-panel
                    dark
                    flat
                    dense
                    fluid
                    class="ma-auto rounded-0"
                >
                    <v-expansion-panel-header
                        class="pt-0 pb-0 short-panel-header"
                    >
                        World At War
                    </v-expansion-panel-header>
                    <v-expansion-panel-content> </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel flat dense fluid class="ma-auto rounded-0">
                    <v-expansion-panel-header
                        class="pt-0 pb-0 short-panel-header"
                    >
                        Black Ops
                    </v-expansion-panel-header>
                    <v-expansion-panel-content> </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel
                    flat
                    dense
                    fluid
                    accordion="false"
                    class="ma-auto rounded-0"
                >
                    <v-expansion-panel-header
                        class="pt-0 pb-0 short-panel-header"
                    >
                        Black Ops II</v-expansion-panel-header
                    >
                    <v-expansion-panel-content> </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel
                    flat
                    dense
                    fluid
                    accordion="false"
                    class="ma-auto rounded-0"
                >
                    <v-expansion-panel-header
                        class="pt-0 pb-0 short-panel-header"
                    >
                        Black Ops II</v-expansion-panel-header
                    >
                    <v-expansion-panel-content> </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel
                    flat
                    dense
                    fluid
                    accordion="false"
                    class="ma-auto rounded-0"
                >
                    <v-expansion-panel-header
                        class="pt-0 pb-0 short-panel-header"
                    >
                        Black Ops III</v-expansion-panel-header
                    >
                    <v-expansion-panel-content> </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel
                    flat
                    dense
                    fluid
                    accordion="false"
                    class="ma-auto rounded-0"
                >
                    <v-expansion-panel-header
                        class="pt-0 pb-0 short-panel-header"
                    >
                        Black Ops IV</v-expansion-panel-header
                    >
                    <v-expansion-panel-content> </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel
                    flat
                    dense
                    fluid
                    accordion="false"
                    class="ma-auto rounded-0"
                >
                    <v-expansion-panel-header
                        class="pt-0 pb-0 short-panel-header"
                    >
                        Black Ops Cold War</v-expansion-panel-header
                    >
                    <v-expansion-panel-content> </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

            <v-btn
                dense
                outlined
                color="blue"
                class="mx-4 my-4"
                v-model="image_overlay"
                @click="image_overlay = !image_overlay"
                >Image browser</v-btn
            >
            <v-btn
                dense
                outlined
                color="blue"
                class="mx-4 my-4"
                v-model="backgroundimage_overlay"
                @click="backgroundimage_overlay = !backgroundimage_overlay"
                >Change Background</v-btn
            >
            <!-- <v-btn
                dense
                outlined
                color="blue"
                class="mx-4 my-4"
                href="http://localhost:3001/download"
                >Download HUD Pack</v-btn
            > -->
            <v-btn
                dense
                outlined
                color="blue"
                class="mx-4 my-4"
                @click="InitializeLUAGenerator"
                >Download HUD Pack</v-btn
            >
            <v-overlay
                :value="backgroundimage_overlay"
                opacity=".55"
                color="blue"
            >
                <h1 class="text-center">Background Browser</h1>
                <v-container
                    class="grey darken-4 rounded image-overlay-browser-body d-flex flex-column"
                >
                    <v-container>
                        <v-btn
                            outlined
                            color="red"
                            class="mx-4 my-4 float-right"
                            v-model="backgroundimage_overlay"
                            @click="
                                backgroundimage_overlay = !backgroundimage_overlay
                            "
                            >X</v-btn
                        >

                        <v-text-field
                            placeholder="Search for image by name"
                            append-icon="mdi-magnify"
                            clearable
                            v-model="search_str"
                        >
                        </v-text-field>
                    </v-container>

                    <v-container
                        style="height: 80%; overflow: auto"
                        class="ma-auto pa-auto"
                    >
                        <v-row rows="8">
                            <v-col
                                v-for="image in BackgroundImageSearch(
                                    search_str
                                )"
                                :key="image.name"
                                cols="4"
                                class="pa-2"
                            >
                                <v-img
                                    contain
                                    :src="image.render"
                                    width="500px"
                                    class="ma-auto cursor-grab"
                                    gradient=""
                                    :aspect-ratio="16 / 9"
                                    
                                ></v-img>
                                <p
                                    fluid
                                    class="text-center ma-0 pa-0 grey--text underlined caption"
                                >
                                    {{ image.name }}
                                </p>

                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-container>
            </v-overlay>

            <v-overlay :value="image_overlay" opacity=".55" color="blue">
                <h1 class="text-center">Image Browser</h1>
                <v-container
                    class="grey darken-4 rounded image-overlay-browser-body d-flex flex-column"
                >
                    <v-container>
                        <v-btn
                            outlined
                            color="red"
                            class="mx-4 my-4 float-right"
                            v-model="image_overlay"
                            @click="image_overlay = !image_overlay"
                            >X</v-btn
                        >

                        <v-text-field
                            placeholder="Search for image by name"
                            append-icon="mdi-magnify"
                            clearable
                            v-model="search_str"
                        >
                        </v-text-field>
                    </v-container>

                    <v-container
                        style="height: 80%; overflow: auto"
                        class="ma-auto pa-auto"
                    >
                        <v-row rows="8">
                            <v-col
                                v-for="image in ImageSearch(search_str)"
                                :key="image.name"
                                cols="4"
                                class="pa-2"
                            >
                                <v-img
                                    contain
                                    :src="image.render"
                                    width="75px"
                                    height="75px"
                                    class="ma-auto cursor-grab"
                                    gradient=""
                                    @click="AddImage(image)"
                                ></v-img>
                                <p
                                    fluid
                                    class="text-center ma-0 pa-0 grey--text underlined caption"
                                >
                                    {{ image.name }}
                                </p>

                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-container>
            </v-overlay>
        </v-container>

        <editor :backgroundImage="background_image"/>

        <v-container style="width: 25em" class="ma-0 pa-0 grey darken-4">
            <!-- <properties :element="test_element" @change="UserSetProperty" /> -->
            <v-container fluid class="ma-0 pa-0">
                <p class="text-center blue--text ma-0 mt-1">Layers</p>
                <v-divider></v-divider>
                <v-container
                    v-if="typeof layer != 'undefined'"
                    style="overflow: auto; max-height: 25em"
                >
                    <v-row
                        v-for="item in layer
                            .getChildren((c) => c.getClassName() == 'Image')
                            .toArray()"
                        :key="item.name()"
                        class="d-flex ma-0 pa-0"
                    >
                        <v-col cols="2">
                            <v-btn
                                icon
                                @click="LayerVisibilityUpdate"
                                width="20px"
                            >
                                <v-icon width="20px"> mdi-eye </v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-img
                                contain
                                :src="item.attrs.image.currentSrc"
                                width="50px"
                            >
                            </v-img>
                        </v-col>
                        <v-col>
                            <p>{{ 'asdjhagjdhsg' + item.name() }}</p>
                        </v-col>
                    </v-row>
                </v-container>
            </v-container>
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

// config aws
import '../plugins/aws-sdk-2.831.0.min.js'
AWS.config.region = 'us-east-2' // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-2:648c55da-43b4-4aea-8bd0-9425c3061c3f',
})

const AWSS3_ACCESS_POINT =
    'arn:aws:s3:us-east-2:266624589417:accesspoint/titanfrontend'
const AWS_CLOUDFRONT_BASEURL =
    'http://titanuiassets.s3.us-east-2.amazonaws.com/'
let s3 = new AWS.S3(AWS.config)

export default {
    components: {
        ContextMenu,
        Properties,
        TitanEditor,
    },

    data() {
        return {
            image_cache: {},
            image_overlay: false,
            background_image_cache: {},
            backgroundimage_overlay: false,
            background_image: new window.Image(),
            search_str: '',
            
            canvas_images: [],
            
            
            layer: undefined,
            codePreviewEnabled: false,
            generatedCode: '',
            
        }
    },

    mounted() {
        // this.stage = this.$refs.stage._konvaNode
        // this.SetCanvasBackground(Object.values(this.background_image_cache)[0])
        this.SetCanvasBackground();
    },

    created() {},

    async asyncData() {
        var params = {
            Bucket: AWSS3_ACCESS_POINT,
            Prefix: 'images/',
        }

        let image_cache = {}
        let background_image_cache = {}
        await s3.listObjectsV2(params, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                data.Contents.forEach((obj, idx) => {
                    // console.log(obj.Key)
                    let name = obj.Key.substr(obj.Key.lastIndexOf('/') + 1)
                    if (name.length > 1)
                        if (obj.Key.startsWith('images/backgrounds')) {
                            // if the image is a background image dont put it in the regular image cache
                            background_image_cache[obj.Key] = {
                                name: name,
                                render: AWS_CLOUDFRONT_BASEURL + obj.Key,
                            }
                        } else {
                            image_cache[obj.Key] = {
                                name: name,
                                render: AWS_CLOUDFRONT_BASEURL + obj.Key,
                            }
                        }
                })
            }
        })

        return { image_cache, background_image_cache }
    },

    methods: {
        ImageSearch(search_str) {
            if (search_str == null || search_str.size == 0 || search_str == ' ')
                return this.image_cache
            let result = {}
            Object.keys(this.image_cache).forEach((key) => {
                if (this.image_cache[key].name.includes(search_str)) {
                    result[key] = this.image_cache[key]
                }
            })

            return result
        },

        BackgroundImageSearch(search_str) {
            if (search_str == null || search_str.size == 0 || search_str == ' ')
                return this.background_image_cache
            let result = {}
            Object.keys(this.background_image_cache).forEach((key) => {
                if (
                    this.background_image_cache[key].name.includes(search_str)
                ) {
                    result[key] = this.background_image_cache[key]
                }
            })

            return result
        },

        SetCanvasBackground(image) {
            console.log(image)
            if (image?.render) {
                let img = document.createElement('img')
                img.src = image.render
                img.onload = () => (this.background_image = img)
            } else {
                let img = document.createElement('img')
                img.src =
                    'https://titanuiassets.s3.us-east-2.amazonaws.com/images/backgrounds/bo3_thegiant+(1).png' // the default background image
                img.onload = () => (this.background_image = img)
            }
        },

        AddImage(image) {
            let img = document.createElement('img')
            img.src = image.render
            img.onload = () => {
                this.canvas_images[this.canvas_images.length] = img
                console.log('img loaded', this.canvas_images)
            }
        },

        UserSetProperty(evt) {
            console.log(Object.keys(evt))
            Object.keys(evt).forEach((key) => {
                console.log(this.test_element)
                this.test_element[key] = evt[key]
                console.log(Object.getOwnPropertyNames(this.selected_element))
                if (
                    Object.getOwnPropertyNames(this.selected_element).length > 1
                )
                    this.selected_element.setAttr(key, evt[key])
            })
            // this.selected_element.name(evt.name)
            // console.log('user changed', evt)
        },

        LayerVisibilityUpdate(evt) {
            console.log(evt)
        },

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
    width: 15em;
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
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #ff0000;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>