import * as d3 from "d3";
import {BAR_GRAPH} from "./actionsType";

export const bar = (data) =>({
    type: BAR_GRAPH,
    d3_data:data
});

/**
 * 获取数据
 * @returns {function(*)}
 */
export function getBarGraph(){
    return dispatch=>{
       d3.json("../../json/income.json",function(data){
           dispatch(bar(data));
       });
    }
}