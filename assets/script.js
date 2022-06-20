var table1 = document.getElementById("table1");
var table2 = document.getElementById("table2");

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
var graph1DataObjectsArray = [];

for(let i = 0; i < table1DatasArray.length; i++){
    let obj = new Object();
    obj.data = table1DatasArray[i];
    obj.label = table1DataLabelsArray[i];
    obj.borderColor = `rgb(${randomNumber0Max(255)}, ${randomNumber0Max(255)}, ${randomNumber0Max(255)})`;
    graph1DataObjectsArray.push(obj);
}

CreateGraph(table1, "graph1", "800px", "600px", graph1LabelsArray, graph1DataObjectsArray, {}, "line");

//////////////////////////////////////////////////////////////////////////// CUSTOM FUNCTIONS ////////////////////////////////////////////////////////////////////////////

/**
 * Function to create a graph
 * @param {Element} referenceTable The table used as a reference. It contains the datas of the graph and will be placed just below the graph
 * @param {String} graphId The id of the graph
 * @param {String} graphWidth The width in pixels of the graph
 * @param {String} graphHeight The height in pixels of the graph
 * @param {Array} graphLabels The Array of Labels for the graph
 * @param {Array} graphDatas The Array of Datas Objects used in the graph to draw lines (each graph object has an array of values, a label and a color)
 * @param {Object} graphOptions The options Objects used to customize the graph
 * @param {String} graphConfigType The type of the graph (cf all graph types of chart.js)
 */
function CreateGraph(referenceTable, graphId, graphWidth, graphHeight, graphLabels, graphDatas, graphOptions, graphConfigType){
    var graphCanvas = document.createElement("canvas");
    graphCanvas.setAttribute("id", graphId);
    graphCanvas.setAttribute("width", graphWidth);
    graphCanvas.setAttribute("height", graphHeight);

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

    new Chart(ctx, config);

    referenceTable.parentNode.insertBefore(graphCanvas, referenceTable);
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