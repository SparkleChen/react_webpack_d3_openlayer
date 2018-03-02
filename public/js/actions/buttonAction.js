import {TOGGLE_HEATMAP_LAYER,WINDOWS_UPDATE} from './actionsType';

export const heatMap = heatMapState => ({
    type: TOGGLE_HEATMAP_LAYER,
    heatMapState: heatMapState
});
export const windowsResizeStyle = () => ({
    type: WINDOWS_UPDATE
});
