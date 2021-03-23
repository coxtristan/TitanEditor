<template>
    <v-container class="ma-auto pa-auto d-flex" style="justify-content: center">
        <konva-stage
            ref="stage"
            :config="{ width: 1280, height: 720 }"
            style="border: 1px solid white"
            @click="canvasClicked"
            @contextmenu="contextmenu.show"
            @mousedown="selectionStartEvt"
            @mousemove="selectionUpdateEvt"
            @mouseup="selectionFinishedEvt"
            @dragmove="draghandler"
        >
            <!-- this is the root layer for what goes in the actual hud -->
            <konva-layer
                ref="workerLayer"
                :config="{
                    name: '.BaseLayer',
                    x: 0,
                    y: 0,
                    width: 1280,
                    height: 720,
                }"
            >
                <konva-image
                    ref="backgroundImage"
                    :config="{
                        image: backgroundImage,
                        width: 1280,
                        height: 720,
                        draggable: false,
                        listening: false,
                        name: 'background',
                    }"
                />
                <konva-rect ref="selectionRect" :config="selection_rect" />
                <konva-image
                    :config="image"
                    v-for="image in canvas_images"
                    :key="image.id"
                />
                <konva-transformer ref="transformer" />
            </konva-layer>
        </konva-stage>

        <context-menu
        ref="contextmenu"
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

    data() {
        return {
            canvas_images: [],
            backgroundImage: new Image(),
            contextmenu: {},
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
            testImage: {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                draggable: true,
            },
        }
    },

    mounted() {
        this.transformer = this.$refs.transformer.getNode()
        this.layer = this.$refs.workerLayer.getNode()
        this.selectionRect = this.$refs.selectionRect.getNode()
        this.contextmenu = this.$refs.contextmenu;
        console.log(this.selectionRect)
    },

    methods: {
        createGroup() {
            // var newGroup = new KonvaAPI.Group({ name: 'New Group' })
        },

        
        canvasClicked(evt) {
            // this.transformer.nodes([])
            // this.$refs.selectionRect.getNode().moveToTop()

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

        isRectInsideSelection(selectionRect, elementClientRect) {
            var inside =
                selectionRect.x <= elementClientRect.x &&
                selectionRect.y <= elementClientRect.y &&
                selectionRect.x + selectionRect.width >=
                    elementClientRect.width + elementClientRect.x &&
                selectionRect.height + selectionRect.y >=
                    elementClientRect.height + elementClientRect.y
        },

        selectionFinishedEvt(evt) {
            let children = this.layer.getChildren()
            let selectionRect = this.selectionRect.getClientRect()
            let selected = children.toArray().filter((child) => {
                if (child.getAttr('name') == 'background') return false
                var inside = this.isRectInsideSelection(
                    selectionRect,
                    child.getClientRect()
                )
                var intersects = KonvaAPI.Util.haveIntersection(
                    child.getClientRect(),
                    selectionRect
                )
                var isSelectionRect =
                    child == this.$refs.selectionRect.getNode()
                var isTransformer = child == this.transformer

                return (
                    (inside || intersects) &&
                    !(isSelectionRect || isTransformer)
                )
            })

            console.log('selected', selected)
            this.selected_elements = selected
            this.transformer.nodes(selected)

            this.selection_rect.visible = false
        },
        // TODO add text element support
        addImage(imgSrc) {
            var img = new Image()
            console.log(imgSrc)
            img.onload = () =>
                this.canvas_images.push({
                    image: img,
                    draggable: true,
                    x: 0,
                    y: 0,
                })
            img.src = imgSrc
        },

        
        setBackgroundImage(imgSrc) {
            let img = new Image()
            img.onload = () => (this.backgroundImage = img)
            img.src = imgSrc
        },

        async draghandler(evt)
        {
            if (evt.target != this.transformer)
            this.$emit('selectionUpdated', evt.target.getAttrs());
        }
    },
}
</script>

<style>
</style>