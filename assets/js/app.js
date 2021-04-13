// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
.append("svg")
.attr("width",svgWidth)
.attr("height", svgHeight);

console.log(svg);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.right})`);

// var chosenXAxis = "poverty";

// function xScale(data, d){
//     var xLinearScale = d3.scaleLinear() 
//     .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
//         d3.max(data, d =>d[chosenXAxis]) * 1.2
//         ])
//         .range([0, width]);
        
//     return xLinearScale;
//     }

d3.csv("assets/data/data.csv").then(function(csvData) {
    console.log(csvData);

    csvData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });
    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.poverty)])
    .range([width, 0]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(csvData, d => d.obesity)])
    .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("fill", "blue")
    .attr("opacity", ".3");

    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`Poverty Level ${d.poverty}<br>Hair length: ${d.obesity}`);
    });
    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "aText")
      .text("poverty");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "aText")
      .text("obesity");
});
