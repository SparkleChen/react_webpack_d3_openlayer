import {WINDOWS_UPDATE,TOGGLE_HEATMAP_LAYER} from '../actions/actionsType';


export default (state ={heatMapState:false,height:window.innerHeight,width:window.innerWidth},action) =>{
    switch (action.type) {
        case WINDOWS_UPDATE:
            return Object.assign({}, state, {
                height: window.innerHeight,
                width:window.innerWidth
                });
        case TOGGLE_HEATMAP_LAYER:
            return Object.assign({}, state, {
                heatMapState: !action.heatMapState //按钮点击取反值
            });
        default:
            return state
    }
}