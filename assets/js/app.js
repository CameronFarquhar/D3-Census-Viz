// @TODO: YOUR CODE HERE!
// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//     top: 20,
//     right: 40,
//     bottom: 80,
//     left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3.select("#scatter")
// .append("svg")
// .attr("width",svgWidth)
// .attr("height", svgHeight);

// console.log(svg);

// // Append an SVG group
// var chartGroup = svg.append("g")
// .attr("transform", `translate(${margin.left}, ${margin.right})`);



// d3.csv("assets/data/data.csv").then(function(csvData) {
//     console.log(csvData);

//     csvData.forEach(function(data) {
//         data.poverty = +data.poverty;
//         data.obesity = +data.obesity;
//     });

//     var xLinearScale = d3.scaleLinear()
//     .domain(d3.extent(csvData, d => d.poverty))
//     .range([0, width]);

//     var yLinearScale = d3.scaleLinear()
//     .domain(d3.extent(csvData, d => d.obesity))
//     .range([height, 0]);

    
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);


//     chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);


//     chartGroup.append("g")
//     .call(leftAxis);

//     var circlesGroup = chartGroup.selectAll("circle")
//     .data(csvData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.poverty))
//     .attr("cy", d => yLinearScale(d.obesity))
//     .attr("r", "8")
//     .attr("class", "stateCircle")

//     // .append("text")
//     // .attr("class", "stateText")

//     // .text(function(d){
//     //     return (`${d.abbr}`);
//     // })

//     // .text(d.abbr)

//     // .html(function(d) {
//     //     return(`${d.abbr}`)
//     // });

//     ;


//     // // trying to get the text to appear on the circle
//     // var circleText = circlesGroup.selectAll("text")
//     // .data(csvData)
//     // .enter()
//     // .append("text")
//     // .attr("class", "stateText")
//     // .text(function(d){
//     //     return (`${d.abbr}`);
//     // });

//     chartGroup.selectAll("text")
//     .data(csvData)
//     .enter()
//     .append("text")
//     .text(d => d.abbr)
//  // .text(function(d){
//  //         return (`${d.abbr}`);
//  //     })
//     .attr("cx", d => xLinearScale(d.poverty))
//     .attr("cy", d => yLinearScale(d.obesity))
//     .attr("class", "stateText")
// ;


//     var toolTip = d3.tip()
//     .attr("class", "d3-tip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.abbr}<br> Poverty Level ${d.poverty}% <br> Obesity Level: ${d.obesity}%`);
//     });


//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);

//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     circlesGroup.on("mouseover", function(data) {
//       toolTip.show(data, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });

//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "aText")
//       .text("poverty");

//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "aText")
//       .text("obesity");
// });
















// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//     top: 20,
//     right: 40,
//     bottom: 80,
//     left: 100
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3.select("#scatter")
// .append("svg")
// .attr("width",svgWidth)
// .attr("height", svgHeight);

// console.log(svg);

// // Append an SVG group
// var chartGroup = svg.append("g")
// .attr("transform", `translate(${margin.left}, ${margin.right})`);

// var chosenXAxis = "obesity";

// // function used for updating x-scale var upon click on axis label
// function xScale(data, chosenXAxis){
//     var xLinearScale = d3.scaleLinear() 
//     .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
//         d3.max(data, d =>d[chosenXAxis]) * 1.2
//         ])
//         .range([0, width]);
        
//     return xLinearScale;
//     }

// // function used for updating xAxis var upon click on axis label
// function renderAxes(newXScale, xAxis) {
//     var bottomAxis = d3.axisBottom(newXScale);
  
//     xAxis.transition()
//       .duration(1000)
//       .call(bottomAxis);
  
//     return xAxis;
//   }

//   // function used for updating circles group with a transition to
// // new circles
// function renderCircles(circlesGroup, newXScale, chosenXAxis) {

//     circlesGroup.transition()
//       .duration(1000)
//       .attr("cx", d => newXScale(d[chosenXAxis]));
  
//     return circlesGroup;
//   }

//   // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, circlesGroup) {

//     var label;
  
//     if (chosenXAxis === "obesity") {
//       label = "Obesity :";
//     }
//     else {
//       label = "healthcare:";
//     }
  
//     var toolTip = d3.tip()
//       .attr("class", "d3-tip")
//       .offset([80, -60])
//       .html(function(d) {
//         return (`${d.abbr}<br>Poverty: ${d.poverty}% <br>${label} ${d[chosenXAxis]}%`);
//       });
  
//     circlesGroup.call(toolTip);
  
//     circlesGroup.on("mouseover", function(data) {
//       toolTip.show(data, this);
//     })
//       // onmouseout event
//       .on("mouseout", function(data, index) {
//         toolTip.hide(data);
//       });

//     return circlesGroup;
//   }
  


// d3.csv("assets/data/data.csv").then(function(csvData) {
//     console.log(csvData);

//     csvData.forEach(function(data) {
//         data.poverty = +data.poverty;
//         data.obesity = +data.obesity;
//         data.healthcare = +data.healthcare;
//     });


//     var xLinearScale = xScale(csvData, chosenXAxis);

//     var yLinearScale = d3.scaleLinear()
//     .domain(d3.extent(csvData, d => d.poverty))
//     .range([height, 0]);

    
//     var bottomAxis = d3.axisBottom(xLinearScale);
//     var leftAxis = d3.axisLeft(yLinearScale);

    
//     var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//     chartGroup.append("g")
//     .call(leftAxis);


//     var circlesGroup = chartGroup.selectAll("circle")
//     .data(csvData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d.poverty))
//     .attr("r", "8")
//     .attr("class", "stateCircle");

//     var labelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

//     var obesityLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "obesity") // value to grab for event listener
//     .classed("active", true)
//     .text("Obesity");

//   var healthcareLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "healthcare") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Healthcare");

//     chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Poverty");


//     var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//     labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(csvData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "healthcare") {
//           obesityLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           healthcareLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           obesityLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           healthcareLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// }).catch(function(error) {
//   console.log(error);
// });






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

console.log(svg);

// Append an SVG group
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.right})`);

var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis){
    var xLinearScale = d3.scaleLinear() 
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
        d3.max(data, d =>d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);
        
    return xLinearScale;
    }

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

  // function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
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
        return (`${d.abbr}<br>Obesity: ${d.obesity}% <br>${label} ${d[chosenXAxis]}%`);
      });
    }
    if (chosenXAxis === "income") {
        label = "Income";
        var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
          return (`${d.abbr}<br>Obesity: ${d.obesity}% <br>${label} $${d[chosenXAxis]}`);
        });
    }
    if (chosenXAxis === "age") {
      label = "Age:";
  
    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>Obesity: ${d.obesity}% <br>${label} ${d[chosenXAxis]} years old`);
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
    });


    var xLinearScale = xScale(csvData, chosenXAxis);

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(csvData, d => d.obesity)  * 0.9, d3.max(csvData, d=> d.obesity) * 1.1])
    .range([height, 0]);


    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);


    var circlesGroup = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "8")
    .attr("class", "stateCircle");

    var labelsGroup = chartGroup.append("g")
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
    .classed("active", true)
    .text("Income (median)");

  var ageLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (median)");

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Obesity (%)");


    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

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
        if (chosenAxis === "income") {
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
        // else {
        if (chosenAxis === "age") {
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

