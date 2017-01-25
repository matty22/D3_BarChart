// BarChart.js

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json');
xhr.onload = function() {
    if (xhr.status === 200) {
        var json = JSON.parse(xhr.response);
        var dataset = json.data;
        console.log(dataset);
    }
    else {
        console.log('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();


d3.select("body").append("p").text("New paragraph!");