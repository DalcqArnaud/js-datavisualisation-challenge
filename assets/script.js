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
var graph1DataObjectsArray = CreateLineGraphDataObjectsArray(table1DatasArray, table1DataLabelsArray);

//Set up graph 1 aria label
var graph1ArialLabel = "Graph about the crimes recorded by the police on 10 years in differents countries";

//create graph 1 
CreateGraph(table1, "graph1", "800px", "600px", graph1ArialLabel, "img", graph1LabelsArray, graph1DataObjectsArray, {}, "line");

//Set up graph 2 and 2Bis Titles and Subtitles
var graph2Title = table2.querySelector("caption").textContent;
var graph2Subtitle = table2.querySelectorAll("thead>tr>th")[2].textContent;
var graph2BisSubtitle = table2.querySelectorAll("thead>tr>th")[3].textContent;

var graph2Options = CreateGraphOptions(false, graph2Subtitle);
var graph2BisOptions = CreateGraphOptions(false, graph2BisSubtitle);

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
var graph2ColorsArray = GenerateColorsArray(graph2DatasArray.length);
var graph2DataObjectsArray = CreatePieGraphDataObjectsArray(graph2DatasArray, graph2ColorsArray);
var graph2BisDataObjectsArray = CreatePieGraphDataObjectsArray(graph2BisDatasArray, graph2ColorsArray);

//Set up graph 2 and bis aria labels
var graph2ArialLabel = "Graph about the prison population on average during years 2007-09 in different countries";
var graph2BisArialLabel = "Graph about the prison population on average during years 2010-12 in different countries";

//create graph 2 
var graph2 = CreateGraph(null, "graph2", "400px", "400px", graph2ArialLabel, "img", graph2DataLabelsArray, graph2DataObjectsArray, graph2Options, "pie");

//create graph 2 bis
var graph2Bis = CreateGraph(null, "graph2Bis", "400px", "400px", graph2BisArialLabel, "img", graph2DataLabelsArray, graph2BisDataObjectsArray, graph2BisOptions, "pie");

//Create graph 2 div 
var graph2Div = document.createElement("div");
var graph2MainTitle = document.createElement("p");
graph2MainTitle.textContent = graph2Title;
graph2MainTitle.setAttribute("class", "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center");

graph2.setAttribute("class", "col-lg-6 col-md-6 col-sm-6 col-xs-6");
graph2Bis.setAttribute("class", "col-lg-6 col-md-6 col-sm-6 col-xs-6");

graph2Div.appendChild(graph2MainTitle);
graph2Div.appendChild(graph2);
graph2Div.appendChild(graph2Bis);

table2.parentNode.insertBefore(graph2Div, table2);


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
 * @returns the created graph
 */
function CreateGraph(referenceTable, graphId, graphWidth, graphHeight, graphAriaLabel, graphRole, graphLabels, graphDatas, graphOptions, graphConfigType){
    var graphCanvas = document.createElement("canvas");
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

    new Chart(ctx, config);

    if(referenceTable != null){
        referenceTable.parentNode.insertBefore(graphCanvas, referenceTable);
    }

    return graphCanvas;
}

/**
 * Create an options object
 * @param {Boolean} responsive Is the graph responsive or not
 * @param {String} title (Optionnal Parameter) Title of the graph
 * @param {String} subtitle (Optionnal Parameter) Subtitle of the graph
 * @returns the options object of the graph
 */
function CreateGraphOptions(responsive, title, subtitle){
    var options = new Object();
    options.responsive = responsive;
    var pluginObject = new Object();
    if(typeof title !== "undefined"){
        var pluginTitleObject = new Object();
        pluginTitleObject.display = true;
        pluginTitleObject.text = title;

        pluginObject.title = pluginTitleObject;
    }
    if(typeof subtitle !== "undefined"){
        var pluginSubtitleObject = new Object();
        pluginSubtitleObject.display = true;
        pluginSubtitleObject.text = subtitle;
        
        pluginObject.subtitle = pluginSubtitleObject;
    }

    options.plugins = pluginObject;

    return options;
}

/**
 * Create an array of data objects with the given array of datas and data labels
 * @param {Array} datasArray Array of datas
 * @param {Array} dataLabelsArray Array of data labels
 * @returns An array of data Objects
 */
function CreateLineGraphDataObjectsArray(datasArray, dataLabelsArray){
    var dataObjectsArray = [];

    for(let i = 0; i < datasArray.length; i++){
        let obj = new Object();
        obj.data = datasArray[i];
        obj.label = dataLabelsArray[i];
        obj.borderColor = `rgb(${randomNumber0Max(255)}, ${randomNumber0Max(255)}, ${randomNumber0Max(255)})`;
        dataObjectsArray.push(obj);
    }

    return dataObjectsArray;
}

/**
 * Create an array of one data object with the given array of datas
 * @param {Array} datasArray Array of datas
 * @param {Array} colorArray Array of colors
 * @returns An array of one data object
 */
function CreatePieGraphDataObjectsArray(datasArray, colorArray){
    var dataObjectsArray = [];

    let obj = new Object();
    obj.data = datasArray;
    obj.backgroundColor = colorArray;

    dataObjectsArray.push(obj);
    
    return dataObjectsArray;
}

/**
 * Create an Array with random colors
 * @param {Number} colorAmount Amount of random colors to Generate
 * @returns An array of random Colors text
 */
function GenerateColorsArray(colorAmount){
    var colorsArray = [];
    for(let i = 0; i < colorAmount; i++){
        let randomColorText = `rgb(${randomNumber0Max(255)}, ${randomNumber0Max(255)}, ${randomNumber0Max(255)})`;
        colorsArray.push(randomColorText);
    }
    return colorsArray;
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