// BarChart.js


    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);
            // fulldataset contains labels and data points
            var fulldataset = json.data;
            
            function buildChart(dataset) {
                var padding = 40;
                var height = 500;
                var width = 884;
                // Scales are causing the problems
                // Keep working through alignedleft tutorial
                var xScale = d3.scaleLinear()
                               .domain([0, d3.max(dataset, function(d) {return d[1] })])
                               .range([padding, width - padding]);
                               
                var yScale = d3.scaleLinear()
                                 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                                 .range([height - padding, padding]);

                var svg = d3.select("#chartDiv")
                            .append("svg")
                            .attr("width", "100%")
                            .attr("height", height);

                svg.selectAll("rect")
                   .data(dataset)
                   .enter()
                   .append("rect")
                   .attr("class", "bar")
                   .attr("x", function(d, i) { return xScale(i * 50); })
                   .attr("y", function(d, i) { return yScale(d[1]) })
                   .attr("width", 4)
                   .attr("height", function(d, i) { return d[1]; })
                   .attr("fill", "dodgerblue")
                   .attr("stroke", "darkblue")
                   .append("title")
                   .text(function(d) { return d });
                
                var xAxis = d3.axisBottom(xScale);
                svg.append("g")
                   .attr("transform", "translate(0," + (height - 10) + ")")
                   .call(xAxis);

                var yAxis = d3.axisLeft(yScale);
                svg.append("g")
                    .attr("transform", "translate(" + 40 + ",35)")
                    .call(yAxis);
            }
            buildChart(fulldataset);
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

