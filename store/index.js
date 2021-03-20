export const state = () =>
({
    konva_images: [],
    konva_text: [],
    stage: function () { } // global konva object
});

// sync
export const mutations =
{
    // addImage: function(state, image)
    // {
    //     state.konva_images.push(image);
    // },

    // setKonvaStage(state, konva_stage)
    // {
    //     // Object.assign(state.konva_root, konvaNode);
    //     state.stage = konva_stage;
    // }
}
export const getters = 
{
    // getKonvaStage: state => state.stage,
    // getBaseLayer: state =>
    // {
    //     if (state.stage())
    //     {
    //         return state.stage().getChildren().toArray().find(elem => elem.name() == ".BaseLayer");
            
    //     }
    //     else return null;
    // }
}

