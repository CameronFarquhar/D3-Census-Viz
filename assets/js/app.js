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
  .attr("width", svgWidth)
  .attr("height", svgHeight);


// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// var chosenXAxis = "poverty";

// var chosenYAxis = "obesity";

var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
    d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;
}

function yScale(data, chosenYAxis) {
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenYAxis]) * 0.8,
    d3.max(data, d => d[chosenYAxis]) * 1.2
    ])
    .range([height, 0]);

  return yLinearScale;
}


// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
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
// function updateToolTip(chosenXAxis, chosenYAxis, textGroup, circlesGroup) {

//     var label;

//     if (chosenXAxis === "poverty") {
//       var xlabel = "Poverty :";
//       // var toolTip = d3.tip()
//       // .attr("class", "d3-tip")
//       // .offset([80, -60])
//       // .html(function(d) {
//       //   return (`${d.abbr}<br>Obesity: ${d.obesity}% <br>${label} ${d[chosenXAxis]}%`);
//       // });
//     }
//     else if (chosenXAxis === "income") {
//         var xlabel = "Income";
//         // var toolTip = d3.tip()
//         // .attr("class", "d3-tip")
//         // .offset([80, -60])
//         // .html(function(d) {
//         //   return (`${d.abbr}<br>Obesity: ${d.obesity}% <br>${label} $${d[chosenXAxis]}`);
//         // });
//     }
//     else {
//       var xlabel = "Age:";

//     // var toolTip = d3.tip()
//     // .attr("class", "d3-tip")
//     // .offset([80, -60])
//     // .html(function(d) {
//     //   return (`${d.abbr}<br>Obesity: ${d.obesity}% <br>${label} ${d[chosenXAxis]} years old`);
//     // });
// }
//   if (chosenYAxis === "obesity") {
//     ylabel = "Obesity"
//   }
//     else {
//       var ylabel = "Smokes"
//     }

//     var toolTip = d3.tip()
//     .attr("class", "d3-tip")
//     .offset([80, -60])
//     .html(function(d) {
//       if (chosenXAxis === "age") {
//       return (`${d.abbr}<br>${ylabel}: ${d[chosenYAxis]}% <br>${xlabel} ${d[chosenXAxis]}%`);
//     } else if (chosenXAxis !== "poverty" && chosenXAxis !== "age") {
//       return (`${d.abbr}<br>${ylabel}: ${d[chosenYAxis]}% <br>${xlabel} ${d[chosenXAxis]}%`);
//     }});

//     circlesGroup.call(toolTip);

//     circlesGroup.on("mouseover", function(data) {
//       toolTip.show(data, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });
//       textGroup
//       .on("mouseover", function(data) {
//           toolTip.show(data, this);
//       })
//       .on("mouseout", function(data) {
//           toolTip.hide(data);
//       });
//     return circlesGroup;
//   }




function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {
  // Conditional for X Axis.
  if (chosenXAxis === "poverty") {
    var xlabel = "Poverty: ";
  } else if (chosenXAxis === "income") {
    var xlabel = "Median Income: "
  } else {
    var xlabel = "Age: "
  }
  // Conditional for Y Axis.
  if (chosenYAxis === "healthcare") {
    var ylabel = "Lacks Healthcare: ";
  } else {
    var ylabel = "Smokers: "
  }
  // Define tooltip.
  var toolTip = d3.tip()
    .offset([120, -60])
    .attr("class", "d3-tip")
    .html(function (d) {
      if (chosenXAxis === "age") {
        // All yAxis tooltip labels presented and formated as %.
        // Display Age without format for xAxis.
        return (`${d.state}<hr>${xlabel} ${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%`);
      } else if (chosenXAxis !== "poverty" && chosenXAxis !== "age") {
        // Display Income in dollars for xAxis.
        return (`${d.state}<hr>${xlabel}$${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}%`);
      } else {
        // Display Poverty as percentage for xAxis.
        return (`${d.state}<hr>${xlabel}${d[chosenXAxis]}%<br>${ylabel}${d[chosenYAxis]}%`);
      }
    });
  circlesGroup.call(toolTip);
  // Create "mouseover" event listener to display tool tip.
  circlesGroup
    .on("mouseover", function (data) {
      toolTip.show(data, this);
    })
    .on("mouseout", function (data) {
      toolTip.hide(data);
    });
  textGroup
    .on("mouseover", function (data) {
      toolTip.show(data, this);
    })
    .on("mouseout", function (data) {
      toolTip.hide(data);
    });
  return circlesGroup;
}



d3.csv("assets/data/data.csv").then(function (csvData) {
  console.log(csvData);

  csvData.forEach(function (data) {
    data.poverty = +data.poverty;
    data.age = +data.age;
    data.income = +data.income;

    data.obesity = +data.obesity;
    data.smokes = +data.smokes;
  });

  var xLinearScale = xScale(csvData, chosenXAxis);
  var yLinearScale = yScale(csvData, chosenYAxis);


  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  var yAxis = chartGroup.append("g")
    .call(leftAxis);


  // chartGroup.append("g")
  // .call(leftAxis);

  var circlesGroup = chartGroup.selectAll("circle")
    .data(csvData)
  // Bind data.

  var elementEnter = circlesGroup.enter();
  // Create circles.

  var circles = elementEnter.append("circle")
    // .data(csvData)
    // .enter()
    // .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", "8")
    .classed("stateCircle", true);


  var circlesText = elementEnter.append("circle")
    // .data(csvData)
    // .enter()
    // .append("text")
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .attr("dy", ".25em")
    .text(d => d.abbr)
    .classed("stateText", true);

  // var circles = chartGroup.selectAll("circle")
  // .data(csvData)
  // .enter()
  // .append("circle")
  // .attr("cx", d => xLinearScale(d[chosenXAxis]))
  // .attr("cy", d => yLinearScale(d[chosenYAxis]))
  // .attr("r", "8")
  // .classed("stateCircle", true);


  // var circlesText = chartGroup.selectAll("circle")
  // .data(csvData)
  // .enter()
  // .append("text")
  // .attr("x", d => xLinearScale(d[chosenXAxis]))
  // .attr("y", d => yLinearScale(d[chosenYAxis]))
  // .attr("dy", ".25em")
  // .text(d => d.abbr)
  // .classed("stateText", true);



  var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circles, circlesText);

  var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var povertyLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("Poverty (%)");

  var incomeLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Income (median)");

  var ageLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (median)");

  // Y labels

  var yLabelsGroup = chartGroup.append("g")
    .attr("transform", "rotate(-90)");

  var healthcareLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-0)")
    .attr("y", 20 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "obesity")
    .classed("active", true)
    .text("HealthCare (%)");

  var smokesLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(0)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("value", "smokes")
    .classed("inactive", true)
    .text("Smokes (%)");


  xLabelsGroup.selectAll("text")
    .on("click", function () {
      // get value of selection
      // var value = d3.select(this).attr("value");
      // if (value !== chosenXAxis) {

      //   // replaces chosenXAxis with value
      //   chosenXAxis = value;
      // console.log(chosenXAxis)

      // functions here found above csv import
      // // updates x scale for new data
      // xLinearScale = xScale(csvData, chosenXAxis);

      // // updates x axis with transition
      // xAxis = renderXAxes(xLinearScale, xAxis);



      // Grab selected label.
      chosenXAxis = d3.select(this).attr("value");
      // Update xLinearScale.
      xLinearScale = xScale(csvData, chosenXAxis);
      // Render xAxis.
      xAxis = renderXAxes(xLinearScale, xAxis);
      // Switch active/inactive labels.





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
      else {
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
      // updates circles with new x values
      circles = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circles, circlesText);

      circlesText = renderText(circlesText, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
    });

  yLabelsGroup.selectAll("text")
    .on("click", function () {
      // get value of selection
      // var value = d3.select(this).attr("value");
      // if (value !== chosenYAxis) {

      //   // replaces chosenXAxis with value
      //   chosenYAxis = value;

      //   // console.log(chosenXAxis)

      //   // functions here found above csv import
      //   // updates x scale for new data
      //   yLinearScale = yScale(csvData, chosenXAxis);

      //   // updates x axis with transition
      //   yAxis = renderYAxes(yLinearScale, yAxis);


      // Grab selected label.
      chosenYAxis = d3.select(this).attr("value");
      // Update yLinearScale.
      yLinearScale = yScale(csvData, chosenYAxis);
      // Update yAxis.
      yAxis = renderYAxes(yLinearScale, yAxis);

      // changes classes to change bold text
      if (chosenYAxis === "healthcare") {
        healthcareLabel
          .classed("active", true)
          .classed("inactive", false);
        smokesLabel
          .classed("active", false)
          .classed("inactive", true);
      }
      else if ((chosenYAxis === "smokes")) {
        healthcareLabel
          .classed("active", false)
          .classed("inactive", true);
        smokesLabel
          .classed("active", true)
          .classed("inactive", false);

      }
      // updates circles with new x values
      circles = renderCircles(circlesGroup, xLinearScale,chosenXAxis, yLinearScale, chosenYAxis);

      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circles, circlesText);

      circlesText = renderText(circlesText, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
    });

}).catch(function (error) {
  console.log(error);
});
