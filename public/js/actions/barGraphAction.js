import * as d3 from "d3";
import {BAR_GRAPH} from "./actionsType";

export const bar = (data) =>({
    type: BAR_GRAPH,
    d3_data:data
});

export function getBarGraph(){
    return dispatch=>{
        d3.tsv("../../json/income.json", function(d) {
            //d.frequency = +d.frequency;
            return d;
        }, function(error, data) {
            if (error) throw error;
            dispatch(bar(data));
        });
    }
}