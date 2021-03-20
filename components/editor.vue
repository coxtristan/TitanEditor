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
            <konva-layer ref="background" :config="{ name: 'Background' }">
                <konva-image
                    :config="{
                        image: backgroundImage,
                        width: 1280,
                        height: 720,
                    }"
                ></konva-image>
            </konva-layer>

            <!-- this is the root layer for what goes in the actual hud -->
            <konva-layer
                :config="{
                    name: '.BaseLayer',
                    x: 0,
                    y: 0,
                    width: 1280,
                    height: 720,
                }"
            >
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
                    actionFunc: () => {
                        transformer.nodes([]) // remove the nodes we selected
                        selected_elements.forEach((elem) => elem.remove())
                        // todo: if we deleted all of a groups children, then delete the group as well
                    },
                },
                {
                    title: 'Create group',
                    actionFunc: createGroup,
                },
                { title: 'Ungroup', actionFunc: (selected_elements) => {} },
                { title: 'Insert...', actionFunc: (selected_elements) => {} },
            ]"
            :selectedObjects="selected_elements"
        ></context-menu>
    </v-container>
</template>

<script>
import Konva from 'vue-konva'
import KonvaAPI from 'konva'
import Vue from 'vue'
import ContextMenu from '../components/contextmenu.vue'
import { mapActions, mapMutations, mapGetters } from 'vuex'
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

        this.layer = this.$refs.background._konvaNode

        this.layer.add(transformer)
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

    methods: {

        createGroup() {
            var newGroup = new KonvaAPI.Group({ name: 'New Group' })
            this.getBaseLayer.add(newGroup)
            this.selected_elements.forEach((elem) => elem.moveTo(newGroup))
        },

        canvasClicked(evt) {
            // this.transformer.nodes([])
            this.$refs.selectionRect.getNode().moveToTop()

            console.log('canvas clicked', evt)
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
            console.log(evt)
            if (evt.currentTarget != this.$refs.stage.getNode()) {
                return
            }
            this.$refs.selectionRect.getNode().moveToTop()
            // this.transformer.nodes([]);
            this.selection_rect.visible = true
            this.mouse.x1 = evt.evt.layerX
            this.mouse.y1 = evt.evt.layerY

            this.selection_rect.x = this.mouse.x1
            this.selection_rect.y = this.mouse.y1
            this.selection_rect.width = 0
            this.selection_rect.height = 0
        },

        selectionUpdateEvt(evt) {
            // second mouse position
            this.$refs.selectionRect.getNode().moveToTop()

            this.mouse.x2 = evt.evt.layerX
            this.mouse.y2 = evt.evt.layerY

            this.selection_rect.x = Math.min(this.mouse.x1, this.mouse.x2)
            this.selection_rect.y = Math.min(this.mouse.y1, this.mouse.y2)
            this.selection_rect.width = Math.abs(this.mouse.x2 - this.mouse.x1)
            this.selection_rect.height = Math.abs(this.mouse.y2 - this.mouse.y1)
        },
        
        selectionFinishedEvt(evt) {
            let children = this.layer.getChildren()
            let selectionRect = this.$refs.selectionRect
                .getNode()
                .getClientRect()
            let selected = children.toArray().filter((child) => {
                let childRect = child.getClientRect()
                var inside =
                    selectionRect.x <= childRect.x &&
                    selectionRect.y <= childRect.y &&
                    selectionRect.x + selectionRect.width >=
                        childRect.width + childRect.x &&
                    selectionRect.height + selectionRect.y >=
                        childRect.height + childRect.y
                var intersects = KonvaAPI.Util.haveIntersection(
                    child.getClientRect(),
                    selectionRect
                )
                var isSelectionRect =
                    child == this.$refs.selectionRect.getNode()
                var isTransformer = child == this.transformer

                // return inside;
                return (
                    (inside || intersects) &&
                    !(isSelectionRect || isTransformer)
                )
            })
            // selected.pop();
            console.log('selected', selected)
            this.selected_elements = selected
            this.transformer.nodes(selected);
            
            // this.stage.draw()
            // console.log(this.transformer.nodes());
            this.selection_rect.visible = false
        },

        addImage(imgSrc) {
            var img = new Image()
            img.onload = () => {
                var kImg = new KonvaAPI.Image({
                    x: 0,
                    y: 0,
                    image: img,
                    draggable: true,
                });

                
                this.layer.add(kImg)
                this.layer.draw()
            }

            img.src = imgSrc;
        },
    },
}
</script>

<style>
</style>