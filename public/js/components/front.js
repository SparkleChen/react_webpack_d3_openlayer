import React from 'react'
import * as d3 from 'd3'
import {getBarGraph} from '../actions/barGraphAction'

export default class Front extends React.Component {
    constructor(props) {
        /**
         * super继承父类构造函数
         */
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getBarGraph());
    }

    render() {
        if(this.props.bar){
            const svg = d3.select("svg"),
                margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
                y = d3.scaleLinear().rangeRound([height, 0]);

            let g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            x.domain(this.props.bar.map(function(d) { return d.letter; }));
            y.domain([0, d3.max(this.props.bar, function(d) { return d.frequency; })]);
            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10, "%"))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");
            g.selectAll(".bar")
                .data(this.props.bar)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.letter); })
                .attr("y", function(d) { return y(d.frequency); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d.frequency); });
        }
        return (
            <svg id="d3"></svg>
        );
    }
}