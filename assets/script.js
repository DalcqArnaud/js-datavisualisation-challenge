var table1 = document.getElementById("table1");
var table2 = document.getElementById("table2");
var bodyContent = document.getElementById("bodyContent");
var mainColText = "rgba(40, 115, 230, 1)";
var secondColText = "rgba(242, 139, 180, 1)";

//////////////////////////////////////////////////////////////////// GRAPH 1 ////////////////////////////////////////////////////////////////////
//Set up graph 1 Labels
var graph1LabelsArray = [];
var table1RowsArray = Array.from(table1.querySelectorAll("tbody>tr")); 

Array.from(table1RowsArray[0].querySelectorAll("th")).forEach(element => {
    if(hasNumber(element.textContent)){
        graph1LabelsArray.push(element.textContent);
    }
});

//Get table 1 Datas and DataLabels
var table1DatasArray = [];
var table1DataLabelsArray = [];

table1RowsArray.splice(0, 1);

table1RowsArray.forEach(element => {
    let table1AllTableDataArray = [];
    Array.from(element.querySelectorAll("td")).forEach((element, index) => {
        if(index == 0){
            table1DataLabelsArray.push((element.textContent).replace(/[^a-zA-Z ]/g, ""));
        }
        if(hasNumber(element.textContent)){
            table1AllTableDataArray.push(parseFloat((element.textContent).replace(",", ".")));
        }
    });
    table1DatasArray.push(table1AllTableDataArray);
});

//Set up graph 1 Data Objects
var graph1DataObjectsArray = CreateGraphDataObjectsArray(table1DatasArray.length, table1DatasArray, table1DataLabelsArray, mainColText, secondColText);

//Set up graph 1 aria label
var graph1ArialLabel = "Graph about the crimes recorded by the police on 10 years in differents countries";

//create graph 1 
CreateGraph(null, table1, "graph1", "graph1", "800px", "600px", graph1ArialLabel, "img", graph1LabelsArray, graph1DataObjectsArray, {}, "line");

//////////////////////////////////////////////////////////////////// GRAPH 2 ////////////////////////////////////////////////////////////////////

//Set up graph 2 and 2Bis Titles and Subtitles
var graph2Title = table2.querySelector("caption").textContent;
var graph2Subtitle = table2.querySelectorAll("thead>tr>th")[2].textContent;
var graph2BisSubtitle = table2.querySelectorAll("thead>tr>th")[3].textContent;

//Get graph 2 and 2 bis Datas and DataLabels
var graph2DatasArray = [];
var graph2BisDatasArray = [];

var graph2DataLabelsArray = [];

var table2RowsArray = Array.from(table2.querySelectorAll("tbody>tr"));
table2RowsArray.forEach(element => {
    let table2TDsArray = Array.from(element.querySelectorAll("td"));
    graph2DataLabelsArray.push(table2TDsArray[0].textContent);
    graph2DatasArray.push(parseFloat(table2TDsArray[1].textContent));
    graph2BisDatasArray.push(parseFloat(table2TDsArray[2].textContent));
});

//Set up graph 2 and 2 bis Data Objects
var graph2AllDatasArray = [graph2DatasArray, graph2BisDatasArray];
var graph2NamesArray = [graph2Subtitle, graph2BisSubtitle];
var graph2DataObjectsArray = CreateGraphDataObjectsArray(graph2AllDatasArray.length, graph2AllDatasArray, graph2NamesArray, mainColText, secondColText);

//Set up graph 2 and bis aria labels
var graph2ArialLabel = "Graph about the prison population on average during years 2007-09 in different countries";

//Create graph 2 div 
var graph2Div = document.createElement("div");
var graph2MainTitle = document.createElement("p");
graph2MainTitle.textContent = graph2Title;
graph2MainTitle.setAttribute("class", "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center");
graph2Div.appendChild(graph2MainTitle);

//create graph 2 
var graph2 = CreateGraph(graph2Div, null, "graph2", "graph2", "800px", "600px", graph2ArialLabel, "img", graph2DataLabelsArray, graph2DataObjectsArray, {}, "bar");

table2.parentNode.insertBefore(graph2Div, table2);

//////////////////////////////////////////////////////////////////// GRAPH 3 ////////////////////////////////////////////////////////////////////

var graph3 = null;
var iterationCount = 0;

getAPIData();

/**
 * Get data from API each second
 */
function getAPIData()
{
    fetch("https://canvasjs.com/services/data/datapoints.php", {cache: "reload"})
    .then(response => {
        return response.json();
    })
    .then(datapoints => {
        HandleAPIData(datapoints);
    });

    setTimeout(() => {
        getAPIData();
    }, 1000);
}

/**
 * Process the given API datas to we usable for the graph
 * @param {Array} dataArray Array of data
 */
function HandleAPIData(dataArray){
    if(graph3 == null){
        var graph3AriaLabel = "Example live graph";
        var graph3DataName = "Remote Data"
        var tempLabelArray = [];
        dataArray.forEach(element => {
            tempLabelArray.push(element[0]);
        });
        var graphServerDataObjectsArray = CreateGraphDataObjectsArray(1, dataArray, graph3DataName, mainColText, secondColText, 0, 10);
        graph3 = CreateGraph(null, bodyContent, "graphServer", "graphServer", "800px", "400px", graph3AriaLabel, "img", tempLabelArray, graphServerDataObjectsArray, {}, "line");
        iterationCount++;
    }else{
        var tempLabelArray = [];
        var tempDataArray = [];
        dataArray.forEach(element => {
            tempLabelArray.push((iterationCount * dataArray.length) + element[0]);
            var newData = [iterationCount * dataArray.length + element[0], element[1]];
            tempDataArray.push(newData);
        });
        addData(graph3, tempLabelArray, tempDataArray);
        iterationCount++;
    }
}

//////////////////////////////////////////////////////////////////////////// GENERALS FUNCTIONS ////////////////////////////////////////////////////////////////////////////


/**
 * Add datas and update a Chart with them
 * @param {Chart} chart The chart that you want to add datas
 * @param {Array} label labels to add to the chart
 * @param {Array} dataPoints Points to add to the chart
 */
function addData(chart, label, dataPoints) {
    for(let i in label){
        chart.config.data.labels.push(label[i]);
    }
    for(let j in dataPoints){
        chart.config.data.datasets.forEach((dataset) => {
            dataset.data.push(dataPoints[j]);
        });
    }
    chart.update();
}

/**
 * Function to create a graph with the given parameters
 * @param {Element} parentElement The parent element to append the canvas (if no need then give it a null)
 * @param {Element} referenceTable The table used as a reference. It contains the datas of the graph and will be placed just below the graph (if no need then give it a null)
 * @param {String} graphClass The class of the graph canvas
 * @param {String} graphId The id of the graph canvas
 * @param {String} graphWidth The width in pixels of the graph canvas
 * @param {String} graphHeight The height in pixels of the graph canvas
 * @param {String} graphAriaLabel The aria label of the graph
 * @param {String} graphRole the role of the graph
 * @param {Array} graphLabels The Array of Labels for the graph
 * @param {Array} graphDatas The Array of Datas Objects used in the graph to draw datas
 * @param {Object} graphOptions The options Objects used to customize the graph
 * @param {String} graphConfigType The type of the graph (see all graph types of chart.js)
 * @returns the created graph
 */
function CreateGraph(parentElement, referenceTable, graphClass, graphId, graphWidth, graphHeight, graphAriaLabel, graphRole, graphLabels, graphDatas, graphOptions, graphConfigType){
    var graphCanvas = document.createElement("canvas");
    graphCanvas.setAttribute("class", graphClass);
    graphCanvas.setAttribute("id", graphId);
    graphCanvas.setAttribute("width", graphWidth);
    graphCanvas.setAttribute("height", graphHeight);
    graphCanvas.setAttribute("aria-label", graphAriaLabel);
    graphCanvas.setAttribute("role", graphRole);

    var ctx = graphCanvas.getContext("2d");
    var data = {
    labels: graphLabels,
    datasets: graphDatas
    };

    var options = graphOptions;

    var config = {
    type: graphConfigType,
    data: data,
    options: options
    };

    var graphChart = new Chart(ctx, config);

    if(parentElement != null){
        parentElement.appendChild(graphCanvas);
    }

    if(referenceTable != null){
        referenceTable.parentNode.insertBefore(graphCanvas, referenceTable);
    }

    return graphChart;
}

/**
 * Function to create and set up data objects to be usable for the graph
 * @param {Number} objectAmount The amount of data Objects that it create
 * @param {Array} datasArray The data to give for each object
 * @param {Array} dataLabelsArray The labels to give for each object
 * @param {String} color The main color (used for first object)
 * @param {String} secondaryColor The secondary color (used for the second object)
 * @param {Number} pointRadius The radius of points on the graph
 * @param {Number} pointRadiusHover The radius of points on the graph when being hover
 * @returns {Array} Array of created Objects
 */
function CreateGraphDataObjectsArray(objectAmount, datasArray, dataLabelsArray, color, secondaryColor, pointRadius, pointRadiusHover){
    var dataObjectsArray = [];

    for(let i = 0; i < objectAmount; i++){
        let obj = new Object();
        if(objectAmount > 1){
            obj.data = datasArray[i];
            obj.label = dataLabelsArray[i];
        }else{
            obj.data = datasArray;
            obj.label = dataLabelsArray;
        }
        
        let currentColor = "";
        if(i == 0){
            currentColor = color;
        }
        else if(i == 1 && secondaryColor != undefined){
            currentColor = secondaryColor
        }
        else{
            currentColor = `rgba(${randomNumber0Max(255)}, ${randomNumber0Max(255)}, ${randomNumber0Max(255)}, 1)`;
        }
        currentColorTransparent = changeColorOpacity(currentColor, 0.5);
        obj.borderColor = currentColor;
        obj.backgroundColor = currentColorTransparent;
        if(pointRadius != undefined){
            obj.pointRadius = pointRadius;
        }
        if(pointRadiusHover != undefined){
            obj.pointHoverRadius = pointRadiusHover;
        }
        dataObjectsArray.push(obj);
    }

    return dataObjectsArray;
}

/**
 * Generate the same color (than the given color) but with a new opacity value
 * @param {String} colorString The color string to change opacity
 * @param {Number} newOpacity The new opacity value
 * @returns {String} the new color string
 */
function changeColorOpacity(colorString, newOpacity){
    let colorChannels = colorString.split(",");
    colorChannels[colorChannels.length - 1] = (" " + newOpacity + ")");
    
    let newColor = "";
    colorChannels.forEach((element, index) => {
        newColor += index == colorChannels.length-1 ? element : element + ",";
    });
    return newColor;
}

/**
 * Check if the given string is a number
 * @param {String} string The string to check if it is a number
 * @returns A boolean, true if the string is a number and false if not
 */
function hasNumber(string){
    return /\d/.test(string);
}

/**
 * Generate a random number between 0 and the given max range value
 * @param {Number} rangeMax The random Max range (random will be between 0 and this value)
 * @returns a random number between 0 and the given max range value
 */
function randomNumber0Max(rangeMax){
    return (Math.random()* rangeMax);
}