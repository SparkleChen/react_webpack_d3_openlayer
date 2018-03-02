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

    /**
     * 渲染
     * @returns {*}
     */
    render() {
             if(this.props.bar) {
                 //将数据重组为数组形似
                 let data = [];
                 let features = this.props.bar.features;
                 for(let i =0,length = features.length;i<length;i++){
                     let name = features[i].properties.name;
                     let income = features[i].properties.income;
                     data.push({name,income});
                 }
                 const margin = {top: 20, right: 20, bottom: 30, left: 40},
                     width = 960 - margin.left - margin.right,
                     height = 480 - margin.top - margin.bottom;
                 //格式化数值
                 const format = d3.format(".");
                 //x输出域
                 const x = d3.scale.ordinal()
                     .rangeRoundBands([0, width], .1, 1);
                 //y输出域
                 const y = d3.scale.linear()
                     .range([height, 0]);
                 //x轴
                 const xAxis = d3.svg.axis()
                     .scale(x)
                     .orient("bottom");
                 //y轴
                 const yAxis = d3.svg.axis()
                     .scale(y)
                     .orient("left")
                     .tickFormat(format);
                 //获取svg并设置属性
                 const svg = d3.select("#d3").append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.top + margin.bottom)
                     .append("g")
                     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                 //x输入域
                 x.domain(data.map(function (d) {
                     return d.name;
                 }));
                 //y输入域
                 y.domain([0, d3.max(data, function (d) {
                     return d.income;
                 })]);
                 //绘制x
                 svg.append("g")
                     .attr("class", "x axis")
                     .attr("transform", "translate(0," + height + ")")
                     .call(xAxis);
                 //绘制y
                 svg.append("g")
                     .attr("class", "y axis")
                     .call(yAxis)
                     .append("text")
                     .attr("transform", "rotate(-90)")
                     .attr("y", 6)
                     .attr("dy", ".71em")
                     .style("text-anchor", "end")
                     .text("人均收入");
                 //绘制柱状图
                 svg.selectAll(".bar")
                     .data(data)
                     .enter()
                     .append("rect")
                     .attr("class", "bar")
                     .attr("x", function (d) {
                         return x(d.name);
                     })
                     .attr("width", x.rangeBand())
                     .attr("y", function (d) {
                         return y(d.income);
                     })
                     .attr("height", function (d) {
                         return height - y(d.income);
                     });
                 }
        return (
            <div id="d3"></div>
        );
    }
}