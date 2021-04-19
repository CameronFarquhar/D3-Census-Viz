var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 120,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
.append("svg")
.attr("width",svgWidth)
.attr("height", svgHeight);


// Append an SVG group
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.right})`);

var chosenXAxis = "poverty";

var chosenYAxis = "obesity";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis){
    var xLinearScale = d3.scaleLinear() 
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
        d3.max(data, d =>d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);
        
    return xLinearScale;
    }

    function yScale(data, chosenYAxis){
      var yLinearScale = d3.scaleLinear() 
      .domain([d3.min(data, d => d[chosenYAxis]) * 0.8,
          d3.max(data, d =>d[chosenYAxis]) * 1.2
          ])
          .range([height, 0]);
          
      return yLinearScale;
      }


// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

  function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }


  // function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
  
    return circlesGroup;
  }

function renderText(circlesGroupText, newXScale, chosenXAxis, newYScale, chosenYAxis) {
  circlesGroupText.transition()
  .duration(1000)
  .attr("x", d => newXScale(d[chosenXAxis]))
  .attr("y", d => newYScale(d[chosenYAxis]));
  return circlesGroupText;
}
  
  // function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    var label;
  
    if (chosenXAxis === "poverty") {
      label = "Poverty :";
      var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br>Obesity: ${d.chosenYAxis}% <br>${label} ${d[chosenXAxis]}%`);
      });
    }
    if (chosenXAxis === "income") {
        label = "Income";
        var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
          return (`${d.abbr}<br>Obesity: ${d.chosenYAxis}% <br>${label} $${d[chosenXAxis]}`);
        });
    }
    if (chosenXAxis === "age") {
      label = "Age:";
  
    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>Obesity: ${d.chosenYAxis}% <br>${label} ${d[chosenXAxis]} years old`);
    });
}
  
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    return circlesGroup;
  }
  


d3.csv("assets/data/data.csv").then(function(csvData) {
    console.log(csvData);

    csvData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;

        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });


    var xLinearScale = xScale(csvData, chosenXAxis);
    var yLinearScale = yScale(csvData, chosenYAxis);

    // var yLinearScale = d3.scaleLinear()
    // .domain([d3.min(csvData, d => d.obesity)  * 0.9, d3.max(csvData, d=> d.obesity) * 1.1])
    // .range([height, 0]);


    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    var yAxis = chartGroup.append("g")
    .call(leftAxis)


    // chartGroup.append("g")
    // .call(leftAxis);


    var circles = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.chosenYaxis))
    .attr("r", "8")
    .classed("stateCircle", true);


    var circlesText = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYaxis]))
    .attr("dy", ".25em")
    .text(d => d.abbr)
    .classed("stateText", true);

    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circles, circlesText);

    var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var povertyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("Poverty (%)");

    var incomeLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Income (median)");

  var ageLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (median)");

    // Y labels

  var yLabelsGroup = chartGroup.append("g")
  .attr("transform", "rotate(-90)");

  var obesityLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "obesity")
    .classed("active", true)
    .text("Obesity (%)");

    var smokesLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 20 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "smokes")
    .classed("inactive", true)
    .text("Smokes (%)");


    labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(csvData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "poverty") {
            povertyLabel
            .classed("active", true)
            .classed("inactive", false);
            ageLabel
            .classed("active", false)
            .classed("inactive", true);
            incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "income") {
            povertyLabel
            .classed("active", false)
            .classed("inactive", true);
            ageLabel
            .classed("active", false)
            .classed("inactive", true);
            incomeLabel
            .classed("active", true)
            .classed("inactive", false);
        }
        // else
        else if (chosenXAxis === "age") {
            povertyLabel
            .classed("active", false)
            .classed("inactive", true);
            ageLabel
            .classed("active", true)
            .classed("inactive", false);
            incomeLabel
            .classed("active", false)
            .classed("inactive", true);
        }
      }
    });
}).catch(function(error) {
  console.log(error);
});
