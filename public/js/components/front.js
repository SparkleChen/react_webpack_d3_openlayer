import React from 'react'
import * as d3 from 'd3'

export default class Front extends React.Component {
    constructor(props) {
        /**
         * super继承父类构造函数
         */
        super(props);
    }

    componentDidMount() {
      this.props.dispatch.getBarGraph();
    }

    render() {
             if(this.props.bar) {
   //console.log(this.props.bar[9])
                 for(var key in this.props.bar[9]){
       console.log(this.props.bar[9][key])
                 }

                 const margin = {top: 20, right: 20, bottom: 30, left: 40},
                     width = 920 - margin.left - margin.right,
                     height = 480 - margin.top - margin.bottom;

                 const formatPercent = d3.format(".");

                 const x = d3.scale.ordinal()
                     .rangeRoundBands([0, width], .1, 1);

                 const y = d3.scale.linear()
                     .range([height, 0]);

                 const xAxis = d3.svg.axis()
                     .scale(x)
                     .orient("bottom");

                 const yAxis = d3.svg.axis()
                     .scale(y)
                     .orient("left")
                     .tickFormat(formatPercent);

                 const svg = d3.select("#d3").append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.top + margin.bottom)
                     .append("g")
                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                 x.domain(this.props.bar.map(function (d) {
                     return d.letter;
                 }));
                 y.domain([0, d3.max(this.props.bar, function (d) {
                     return d.frequency;
                 })]);

                 svg.append("g")
                     .attr("class", "x axis")
                     .attr("transform", "translate(0," + height + ")")
                     .call(xAxis);

                 svg.append("g")
                     .attr("class", "y axis")
                     .call(yAxis)
                     .append("text")
                     .attr("transform", "rotate(-90)")
                     .attr("y", 6)
                     .attr("dy", ".71em")
                     .style("text-anchor", "end")
                     .text("Frequency");

                 svg.selectAll(".bar")
                     .data(this.props.bar)
                     .enter().append("rect")
                     .attr("class", "bar")
                     .attr("x", function (d) {
                         return x(d.letter);
                     })
                     .attr("width", x.rangeBand())
                     .attr("y", function (d) {
                         return y(d.frequency);
                     })
                     .attr("height", function (d) {
                         return height - y(d.frequency);
                     });
                 }
        return (
            <div id="d3"></div>
        );
    }
}