<template>
    <v-container class="ma-auto pa-auto d-flex" style="justify-content: center">
        <konva-stage
            ref="stage"
            :config="{ width: 1280, height: 720 }"
            class="elevation-10"
            @contextmenu="contextmenu.show"
            @mousedown="mousedown"
            @mousemove="mousemove"
            @mouseup="mouseup"
            @click="click"
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
                <konva-image
                    :config="image"
                    v-for="image in canvasImages"
                    :key="image.id"
                />

                <konva-text
                    :config="text"
                    v-for="text in canvasTexts"
                    :key="text.id"
                />
                <konva-rect ref="selectionRect" :config="selection_rect" />

                <konva-transformer ref="transformer" @dragmove="dragmove" />
                <konva-rect :config="fpsBackgroundConfig" />
                <konva-text ref="fpsCounter" :config="fpsConfig" />
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
            canvasImages: [],
            canvasTexts: [],
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

            fpsConfig: {
                x: 0,
                y: 0,

                fill: 'red',
                listening: false,
                draggable: false,

                strokeWidth: 1,
            },
            fpsBackgroundConfig: {
                x: 0,
                y: 0,
                width: 60,
                height: 12,
                fill: 'black',
                listening: false,
                draggable: false,
                strokeWidth: 1,
                selectable: false,
            },
        }
    },

    mounted() {
        this.transformer = this.$refs.transformer.getNode()
        this.layer = this.$refs.workerLayer.getNode()
        this.selectionRect = this.$refs.selectionRect.getNode()
        this.contextmenu = this.$refs.contextmenu

        // setup FPS counter
        let fpsCounter = this.$refs.fpsCounter.getNode()
        const anim = new KonvaAPI.Animation(function (frame) {
            fpsCounter.text(`fps - ${frame.frameRate.toFixed(1)}`)
        }, fpsCounter.getLayer())
        anim.start()

        console.log(this.selectionRect)
    },

    methods: {
        // #region events
        mousedown(evt) {
            // store the initial click position for the selection rectangle
            console.log(evt)
            if (evt.target != this.$refs.stage.getNode()) return
            // this.transformer.nodes([]);

            this.selection_rect.visible = true

            this.mouse.x1 = evt.evt.layerX
            this.mouse.y1 = evt.evt.layerY
            this.mouse.x2 = evt.evt.layerX
            this.mouse.y2 = evt.evt.layerY

            this.selection_rect.x = this.mouse.x1
            this.selection_rect.y = this.mouse.y1
            this.selection_rect.width = 0
            this.selection_rect.height = 0
        },

        mousemove(evt) {
            // second mouse position
            if (!this.selection_rect.visible) return
            this.mouse.x2 = evt.evt.layerX
            this.mouse.y2 = evt.evt.layerY

            this.selection_rect.x = Math.min(this.mouse.x1, this.mouse.x2)
            this.selection_rect.y = Math.min(this.mouse.y1, this.mouse.y2)
            this.selection_rect.width = Math.abs(this.mouse.x2 - this.mouse.x1)
            this.selection_rect.height = Math.abs(this.mouse.y2 - this.mouse.y1)
        },

        mouseup(evt) {
            console.log('mouseup', evt)
            if (!this.selection_rect.visible) return

            setTimeout(() => {
                this.selection_rect.visible = false
            })

            let children = this.layer.getChildren()
            let selectionRect = this.selectionRect.getClientRect()

            let selected = children.toArray().filter((child) => {
                var intersects = KonvaAPI.Util.haveIntersection(
                    child.getClientRect(),
                    selectionRect
                )

                return this.shouldSelect(child) && intersects
            })

            // this.selected_elements = selected
            this.transformer.nodes(selected)

            // this.selection_rect.visible = false
        },

        click(e) {
            if (this.selection_rect.visible) return
            console.log('click', e)
            if (e.target == this.$refs.stage.getNode()) {
                this.transformer.nodes([])
                return
            }
            const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
            console.log(metaPressed)
            const isSelected = this.transformer.nodes().indexOf(e.target) >= 0
            if (!(metaPressed || isSelected)) {
                this.transformer.nodes([e.target])
            } else if (metaPressed && isSelected) {
                const nodes = this.transformer.nodes().slice()
                nodes.splice(nodes.indexOf(e.target), 1)
                this.transformer.nodes(nodes)
            } else if (metaPressed && !isSelected) {
                // add the node into selection
                const nodes = this.transformer.nodes().concat([e.target])
                this.transformer.nodes(nodes)
            }
        },

        async dragmove(evt) {
            // console.log(evt)
            
            this.$emit('transformupdated', evt.target) // send ref to the transformer to the parent. The parent should be able to figure out everything it wants from the transformer alone
        },

        // #endregion

        // #region helpers
        isRectInsideSelection(selectionRect, elementClientRect) {
            var inside =
                selectionRect.x <= elementClientRect.x &&
                selectionRect.y <= elementClientRect.y &&
                selectionRect.x + selectionRect.width >=
                    elementClientRect.width + elementClientRect.x &&
                selectionRect.height + selectionRect.y >=
                    elementClientRect.height + elementClientRect.y
        },

        shouldSelect(node) {
            const isTransformer = node == this.transformer
            const isSelectionRect = node == this.selectionRect
            const isFpsCounter = node == this.$refs.fpsCounter.getNode()
            const isBackground = node.getAttr('name') == 'background'
            const isSelectable = node.getAttr('selectable')
            return (
                isSelectable ||
                !(
                    isTransformer ||
                    isSelectionRect ||
                    isFpsCounter ||
                    isBackground
                )
            )
        },

        // #endregion

        // #region exposed methods
        // TODO add text element support
        addImage(imgSrc) {
            var img = new Image()
            console.log(imgSrc)
            img.onload = () =>
                this.canvasImages.push({
                    image: img,
                    draggable: true,
                    x: 0,
                    y: 0,
                })
            img.src = imgSrc
        },

        addText(text) {
            this.canvasTexts.push({
                text: 'tects!',
                x: 1280 / 2,
                y: 720 / 2,
                fill: 'white',
                fontSize: 22,
                draggable: true,
            })
        },

        setBackgroundImage(imgSrc) {
            let img = new Image()
            img.onload = () => (this.backgroundImage = img)
            img.src = imgSrc
        },

        createGroup() {
            // var newGroup = new KonvaAPI.Group({ name: 'New Group' })
        },

        // #endregion
    },
}
</script>

<style>
</style>