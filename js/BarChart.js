// BarChart.js


    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);
            // fulldataset contains labels and data points
            var fulldataset = json.data;
            // dataset contains only data points
            var dataset = [];
            for (var i = 0; i < fulldataset.length; i ++) {
                dataset.push(fulldataset[i][1]);
            }
            
            function buildChart(dataset) {
                var padding = 30;
                var height = 500;
                var width = 500;
                var xScale = d3.scaleLinear()
                               .domain([0, d3.max(dataset, function(d) { return d[1][0] })])
                               .range([padding, width - padding]);
    
    // Add your code below this line
    
                var yScale = d3.scaleLinear()
                                 .domain([0, d3.max(dataset, function(d) { return d[1][1]; })])
                                 .range([height - padding, padding]);

                var svg = d3.select("#chartDiv")
                            .append("svg")
                            .attr("width", "100%")
                            .attr("height", "500");

                svg.selectAll("rect")
                   .data(dataset)
                   .enter()
                   .append("rect")
                   .attr("class", "bar")
                   .attr("x", function(d, i) { return i * 4; })
                   .attr("y", function(d, i) { return height - d[1] })
                   .attr("width", "4")
                   .attr("height", function(d, i) { return d[1]; })
                   .attr("fill", "dodgerblue")
                   .append("title")
                   .text(function(d) { return d })
            }
            buildChart(fulldataset);
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

