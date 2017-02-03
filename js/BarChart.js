// BarChart.js


    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);
            // fulldataset contains labels and data points
            var fulldataset = json.data;
            
            function buildChart(dataset) {
                
                // Variable instantiations 
                var padding = 40;
                var height = 500;
                var width = 884;
                var barPadding = 1;

                // Set up xScale
                var xScale = d3.scaleLinear()
                               .domain([1947, 2016])
                               .range([padding, width - padding]);
                
                // Set up yScale              
                var yScale = d3.scaleLinear()
                                 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                                 .range([height - padding, padding]);

                // Append svg to #chartDiv div
                var svg = d3.select("#chartDiv")
                            .append("svg")
                            .attr("width", width)
                            .attr("height", height);

                // Append all bars to svg
                svg.selectAll("rect")
                   .data(dataset)
                   .enter()
                   .append("rect")
                   .attr("class", "bar")
                   .attr("x", function(d, i) { return xScale(d[0].slice(0,4)) + (i % 4) * width / dataset.length})
                   .attr("y", function(d, i) { return yScale(d[1]) })
                   .attr("width", width / dataset.length - barPadding)
                   .attr("height", function(d, i) { return height - padding - yScale(d[1]); })
                   .attr("fill", "dodgerblue")
                   .attr("stroke", "darkblue")
                   .append("title")
                   .text(function(d) { return d });
                
                // Append x axis label
                svg.append("text")
                   .attr("class", "label")
                   .attr("text-anchor", "end")
                   .attr("x", width - padding)
                   .attr("y", height - 6)
                   .text("Years");

                // Append y axis label
                svg.append("text")
                   .attr("class", "label")
                   .attr("text-anchor", "end")
                   .attr("y", padding + 5)
                   .attr("x", -40)
                   .attr("dy", ".75em")
                   .attr("transform", "rotate(-90)")
                   .text("Gross Domestic Product (billions of USD)");
                
                // Append x axis
                var xAxis = d3.axisBottom(xScale);
                svg.append("g")
                   .attr("transform", "translate(0," + (height - padding) + ")")
                   .call(xAxis);
                
                // Append y axis
                var yAxis = d3.axisLeft(yScale);
                svg.append("g")
                    .attr("transform", "translate(" + padding + ",0)")
                    .call(yAxis);
            }
            buildChart(fulldataset);
        }
        else {
            // Handle error if xhr request fails
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();

