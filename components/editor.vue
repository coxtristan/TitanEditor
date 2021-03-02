<template>
    <v-container class="ma-auto pa-auto d-flex" style="justify-content: center">
        <konva-stage
            ref="stage"
            :config="{ width: 1280, height: 720 }"
            style="border: 1px solid white"
            @click="canvasClicked"
            @contextmenu="showContextMenu"
            @mousedown="selectionStartEvt"
            @mousemove="selectionUpdateEvt"
            @mouseup="selectionFinishedEvt"
        >
            <!-- background layer is only for showing an idea of what it looks like in game -->
            <konva-layer ref="background">
                <konva-image
                    :config="{
                        image: backgroundImage,
                        width: 1280,
                        height: 720,
                    }"
                ></konva-image>
            </konva-layer>
            <!-- this is the root layer for what goes in the actual hud -->
            <konva-layer>
                <span v-for="image in canvas_images" :key="image.name">
                    <konva-image
                        :config="{ image: image, draggable: true }"
                        @click="clickHandler"
                        @mouseenter="mouseEnterHandler"
                        @mouseleave="mouseLeaveHandler"
                        @dragstart="dragStartHandler"
                        @dragend="dragEndHandler"
                        @dragmove="dragMoveHandler"
                        @transform="transformHandler"
                        @load="canvasImageLoadedHandler"
                    ></konva-image>
                </span>
                <konva-rect
                    ref="selectionRect"
                    :config="selection_rect"
                ></konva-rect>
            </konva-layer>
        </konva-stage>
        <context-menu
            v-model="showContext"
            :x="contextX"
            :y="contextY"
            :actions="[
                {
                    title: 'Link element to model',
                    actionFunc: (selected_elements) => {},
                },
                {
                    title: 'Remove model link',
                    actionFunc: (selected_elements) => {},
                },
                {
                    title: 'Delete element',
                    actionFunc: (selected_elements) => {},
                },
                {
                    title: 'Create group',
                    actionFunc: (selected_elements) => {},
                },
                { title: 'Ungroup', actionFunc: (selected_elements) => {} },
                { title: 'Insert...', actionFunc: (selected_elements) => {} },
            ]"
            :selectedObject="selected_elements"
        ></context-menu>
    </v-container>
</template>

<script>
import Konva from 'vue-konva'
import KonvaAPI from 'konva'
import Vue from 'vue'
import ContextMenu from '../components/contextmenu.vue'
import {mapActions, mapMutations, mapGetters} from 'vuex';
Vue.use(Konva, { prefix: 'konva' })

export default {
    name: 'TitanEditor',
    components: {
        ContextMenu,
        Konva,
    },

    props: ['backgroundImage'],

    data() {
        return {
            canvas_images: {},
            showContext: false,
            contextX: 0,
            contextY: 0,
            selected_elements: [],
            transformer: {},
            selection_rect: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                visible: false,
                fill: 'rgba(0, 119, 255, 0.5)',
                // stroke: 'rgba(0, 119, 255, 1.0)',
            },
            mouse: { x1: 0, x2: 0, y1: 0, y2: 0 },
        }
    },

    mounted() {

        
        let transformer = new KonvaAPI.Transformer({
            anchorFill: '#00beff',
            anchorCornerRadius: 0,
            anchorSize: 9,
            rotateAnchorOffset: 20,
            borderStrokeWidth: 2,
            borderStroke: '#00aaff',
        })

        this.layer = this.$refs.background._konvaNode;
        
        // console.log(this.$refs.stage._konvaNode);
        this.setKonvaStage(this.$refs.stage._konvaNode);
        // this.layer.add(transformer)
        // console.log(this.layer.getChildren().toArray())
        this.transformer = transformer
        this.transformer.children[9].off('mouseenter')

        this.transformer.children[9].on('mouseenter', (evt) => {
            console.log('mouse entered rotater', this.stage.container().style)
            this.stage.container().style.cursor =
                'url("/rotate.svg") 16 16, auto'
        })

        this.transformer.children[9].on('mouseleave', (evt) => {
            console.log('mouse entered rotater', this.stage.container().style)
            this.stage.container().style.cursor = 'auto'
        })
    },
    computed: {
        ...mapGetters(['getKonvaRoot']),

    },

    methods: {
        ...mapMutations(['addImage', 'setKonvaStage']),

        clickHandler(evt) {
            console.log(evt.target.getType())
            this.selected_element = evt.target

            this.transformer.nodes([evt.target])

            this.test_element.x = evt.target.x()
            this.test_element.y = evt.target.y()
            this.test_element.width = evt.target.width()
            this.test_element.height = evt.target.height()
            this.test_element.name = evt.target.name()
            this.test_element.scaleX = evt.target.scaleX()
            this.test_element.scaleY = evt.target.scaleY()
            this.test_element.imgsrc = evt.target.attrs.image.currentSrc
            this.test_element.type = evt.target.getType()

            evt.cancelBubble = true
        },

        mouseEnterHandler(evt) {
            this.stage.container().style.cursor = 'move'
        },

        mouseLeaveHandler(evt) {
            this.stage.container().style.cursor = 'default'
        },

        dragStartHandler(evt) {},

        dragMoveHandler(evt) {
            this.selected_element = evt.target
            this.test_element.x = evt.target.x()
            this.test_element.y = evt.target.y()
            this.test_element.width = evt.target.width()
            this.test_element.height = evt.target.height()
            this.test_element.name = evt.target.name()
            this.test_element.scaleX = evt.target.scaleX()
            this.test_element.scaleY = evt.target.scaleY()
        },

        transformHandler(evt) {
            console.log(evt)
            this.test_element.x = evt.target.x()
            this.test_element.y = evt.target.y()
            this.test_element.width = evt.target.width()
            this.test_element.height = evt.target.height()
            this.test_element.name = evt.target.name()
            this.test_element.scaleX = evt.target.scaleX()
            this.test_element.scaleY = evt.target.scaleY()
            this.test_element.rotation = evt.target.getAttr('rotation')
        },

        dragEndHandler(evt) {},

        canvasClicked(evt) {
            this.transformer.nodes([])
            console.log('canvas clicked', evt)
        },

        canvasImageLoadedHandler(evt) {
            console.log(evt)
        },

        showContextMenu(evt) {
            evt.evt.preventDefault()
            console.log('context event:', evt)

            this.showContext = true
            this.contextX = evt.evt.x
            this.contextY = evt.evt.y
        },

        selectionStartEvt(evt) {
            // store the initial click position for the selection rectangle
            // if (evt.target !== this.$refs.stage._konvaNode)
            // {
            //     return;
            // }
            this.selection_rect.visible = true;
            this.mouse.x1 = evt.evt.layerX;
            this.mouse.y1 = evt.evt.layerY;

            this.selection_rect.x = this.mouse.x1;
            this.selection_rect.y = this.mouse.y1;
            this.selection_rect.width = 0;
            this.selection_rect.height = 0;
        },
        selectionUpdateEvt(evt) {
            // second mouse position
            this.mouse.x2 = evt.evt.layerX;
            this.mouse.y2 = evt.evt.layerY;

            this.selection_rect.width = this.mouse.x2 - this.mouse.x1;
            this.selection_rect.height = this.mouse.y2 - this.mouse.y1;

        },
        selectionFinishedEvt(evt) {
            // console.log()
            let children = this.$refs.stage._konvaNode.getChildren();
            let selected = children.toArray().filter(child => KonvaAPI.Util.haveIntersection(child.getClientRect(), new KonvaAPI.Rect(this.selection_rect)))
            console.log("selected", selected);
            this.transformer.nodes(selected);
            this.selection_rect.visible = false;
        },
    },
}
</script>

<style>
</style>