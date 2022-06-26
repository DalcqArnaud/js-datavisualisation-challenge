const mainColText = "rgba(40, 115, 230, 1)";
const secondColText = "rgba(242, 139, 180, 1)";
var isDescendingSorting = false;
var isSortingDatasets = true;

//////////////////////////////////////////////////////////////////// GRAPH 1 ////////////////////////////////////////////////////////////////////
//#region Get all datas for graph 1
var table1 = document.getElementById("table1");

//Get graph 1 Labels
var graph1LabelsArray = [];
var table1RowsArray = Array.from(table1.querySelectorAll("tbody>tr")); 

Array.from(table1RowsArray[0].querySelectorAll("th")).forEach(element => {
    if(hasNumber(element.textContent)){
        graph1LabelsArray.push(element.textContent);
    }
});

//Get graph 1 Datas and DataLabels
var graph1DatasArray = [];
var graph1DataLabelsArray = [];

table1RowsArray.splice(0, 1);

table1RowsArray.forEach(element => {
    let table1TdsArray = [];
    Array.from(element.querySelectorAll("td")).forEach((element, index) => {
        if(index == 0){
            graph1DataLabelsArray.push((element.textContent).replace(/[^a-zA-Z ]/g, ""));
        }
        if(hasNumber(element.textContent)){
            table1TdsArray.push(parseFloat((element.textContent).replace(",", ".")));
        }
    });
    graph1DatasArray.push(table1TdsArray);
});
//#endregion Get all datas for graph 1

//#region Set up all graph 1 datas
var graph1DataConfigObject = {
    objectAmount : graph1DatasArray.length,
    datasArray: graph1DatasArray,
    dataLabelsArray: graph1DataLabelsArray,
    color: mainColText,
    secondaryColor: secondColText,
    pointRadius: 5,
    pointRadiusHover: 15,
    borderRadius: 0,
    pointStyle: "rectRounded",
    fillmode: "false"
}

var graph1DataObjectsArray = CreateGraphDataObjectsArray(graph1DataConfigObject);

var graph1ArialLabel = "Graph about the crimes recorded by the police on 10 years in differents countries";

var graph1Options = {
    //#region graph1Options Object
    plugins: {
        legend: {
            labels: {
                usePointStyle: true
            },
        },
        tooltip: {
            usePointStyle: true
        }
    },
    scales: {
        x: {
            title:{
                display: true,
                text: "Years",
                color: mainColText,
                font: {
                    family : "Lucida Sans Unicode",
                    size: 14,
                    weight: "bold",
                    lineHeight: 1.2
                },
                padding: {
                    top: 10,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            }
        },
        y: {
            title:{
                display: true,
                text: "Offences amount",
                color: mainColText,
                font: {
                    family : "Lucida Sans Unicode",
                    size: 14,
                    weight: "bold",
                    lineHeight: 1.2
                },
                padding: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 10
                }
            }
        }
    }
    //#endregion graph1Options Object
}

var graph1ConfigObject = {
    referenceTable: table1,
    graphClass: "graph1",
    graphId: "graph1",
    graphWidth: "800px",
    graphHeight: "600px",
    graphAriaLabel: graph1ArialLabel,
    graphRole: "img",
    graphLabels: graph1LabelsArray,
    graphDatas: graph1DataObjectsArray,
    graphOptions: graph1Options,
    graphConfigType: "line"
}
//#endregion Set up all graph 1 datas

//create graph 1 
var graph1 = CreateGraph(graph1ConfigObject);

//Create graph 1 div, title and dropdown button
var graph1Element = document.getElementById("graph1");
var graph1Title = "Offences recorded by the police, 2002-12"
var graph1Div = document.createElement("div");
var graph1MainTitleText = document.createElement("p");
graph1Div.appendChild(graph1MainTitleText);
var graph1MainTitle = document.createElement("strong");
graph1MainTitle.textContent = graph1Title;
graph1MainTitle.setAttribute("class", "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center");
graph1MainTitleText.appendChild(graph1MainTitle);
graph1Element.parentNode.insertBefore(graph1Div, graph1Element);

var graph1OrderOptions = ["Alphabetical order", "Ascending order", "Descending order"];
var graph1OrderFunctions = [SortByAlphabeticalOrder, SortByAscendingOrder, SortByDescendingOrder];

CreateDropDownSortByButton(graph1, graph1.config.data.datasets, graph1Element, graph1OrderOptions, graph1OrderFunctions);

//////////////////////////////////////////////////////////////////// GRAPH 2 ////////////////////////////////////////////////////////////////////

//#region Get all datas for graph 2
var table2 = document.getElementById("table2");

//Get graph 2 Labels
var graph2DataLabel = table2.querySelectorAll("thead>tr>th")[2].textContent;
var graph2DataLabelBis = table2.querySelectorAll("thead>tr>th")[3].textContent;

//Get graph 2 Datas and DatasLabels
var graph2LabelsArray = [];
var graph2DatasArray = [];
var graph2DatasBisArray = [];

var table2RowsArray = Array.from(table2.querySelectorAll("tbody>tr"));
table2RowsArray.forEach(element => {
    let table2TDsArray = Array.from(element.querySelectorAll("td"));
    graph2LabelsArray.push(RemoveExtraSpaces(RemoveExposantCharacters(table2TDsArray[0].textContent)));
    graph2DatasArray.push(parseFloat(table2TDsArray[1].textContent));
    graph2DatasBisArray.push(parseFloat(table2TDsArray[2].textContent));
});
//#endregion Get all datas for graph 2

//#region Set up all graph 2 datas
var graph2AllDatasArray = [graph2DatasArray, graph2DatasBisArray];
var graph2DataLabelsArray = [graph2DataLabel, graph2DataLabelBis];

var graph2DataConfigObject = {
    objectAmount : graph2AllDatasArray.length,
    datasArray: graph2AllDatasArray,
    dataLabelsArray: graph2DataLabelsArray,
    color: mainColText,
    secondaryColor: secondColText,
    pointRadius: 0,
    pointRadiusHover: 0,
    borderRadius: 4,
    pointStyle: "rectRounded",
    fillmode: "false"
}

var graph2DataObjectsArray = CreateGraphDataObjectsArray(graph2DataConfigObject);

var graph2ArialLabel = "Graph about the prison population on average during years 2007-09 in different countries";

var graph2Options = {
    //#region graph2Options Object
    scales: {
        x: {
            title:{
                display: true,
                text: "Countries",
                color: mainColText,
                font: {
                    family : "Lucida Sans Unicode",
                    size: 14,
                    weight: "bold",
                    lineHeight: 1.2
                },
                padding: {
                    top: -23,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            }
        },
        y: {
            title:{
                display: true,
                text: "Average prison population",
                color: mainColText,
                font: {
                    family : "Lucida Sans Unicode",
                    size: 14,
                    weight: "bold",
                    lineHeight: 1.2
                },
                padding: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 10
                }
            }
        }
    }
    //#endregion graph2Options Object
}

var graph2ConfigObject = {
    referenceTable: table2,
    graphClass: "graph2",
    graphId: "graph2",
    graphWidth: "800px",
    graphHeight: "600px",
    graphAriaLabel: graph2ArialLabel,
    graphRole: "img",
    graphLabels: graph2LabelsArray,
    graphDatas: graph2DataObjectsArray,
    graphOptions: graph2Options,
    graphConfigType: "bar"
}
//#endregion Set up all graph 2 datas

//create graph 2 
var graph2 = CreateGraph(graph2ConfigObject);

//Create graph 2 div, title and dropdown button
var graph2Element = document.getElementById("graph2");
var graph2Title = table2.querySelector("caption").textContent;
var graph2Div = document.createElement("div");
var graph2MainTitleText = document.createElement("p");
graph2Div.appendChild(graph2MainTitleText);
var graph2MainTitle = document.createElement("strong");
graph2MainTitle.textContent = graph2Title;
graph2MainTitle.setAttribute("class", "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center fw-bolder");
graph2MainTitleText.appendChild(graph2MainTitle);
graph2Element.parentNode.insertBefore(graph2Div, graph2Element);

var graph2OrderOptions = ["Alphabetical order", "Ascending order (based on the average of all years)", "Descending order (based on the average of all years)"];
var graph2OrderFunctions = [SortByAlphabeticalOrder, SortByAscendingOrder, SortByDescendingOrder];
var graph2DatasToSortArray = [];

graph2DatasArray.forEach((element, index) => {
    var graph2DatasToSortObject = new Object();
    graph2DatasToSortObject.labels = graph2ConfigObject.graphLabels[index];
    graph2DatasToSortObject.datas = [];
    graph2DatasToSortObject.dataAverage = 0;
    graph2DatasToSortObject.dataLabels = graph2DataLabelsArray;

    graph2DatasToSortObject.datas.push(element);
    graph2DatasToSortObject.datas.push(graph2DatasBisArray[index]);
    
    let tempDatasArray = [];
    tempDatasArray.push(element);
    tempDatasArray.push(graph2DatasBisArray[index]);
    graph2DatasToSortObject.dataAverage = GetAverage(tempDatasArray);

    graph2DatasToSortArray.push(graph2DatasToSortObject);
});

CreateDropDownSortByButton(graph2, graph2DatasToSortArray, graph2Element, graph2OrderOptions, graph2OrderFunctions);

//////////////////////////////////////////////////////////////////// GRAPH 3 ////////////////////////////////////////////////////////////////////

var graph3 = null;
var iterationCount = 0;
var bodyContent = document.getElementById("bodyContent");

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
 * Process the given API datas
 * @param {Array} dataArray Array of data
 */
function HandleAPIData(dataArray){
    if(graph3 == null){
        CreateAPIGraph(dataArray);
    }else{
        UpdateAPIGraph(dataArray);
    }
}

/**
 * Create API Graph with given datas
 * @param {Array} graph3DatasArray Array of data
 */
function CreateAPIGraph(graph3DatasArray){
    //#region Set up all API graph datas
    var graph3AriaLabel = "Example live graph";
    var graph3DataLabel = "Remote Data"
    var graph3LabelsArray = [];
    graph3DatasArray.forEach(element => {
        graph3LabelsArray.push(element[0]);
    });

    var graph3DataConfigObject = {
        objectAmount : 1,
        datasArray: graph3DatasArray,
        dataLabelsArray: graph3DataLabel,
        color: mainColText,
        secondaryColor: secondColText,
        pointRadius: 0,
        pointRadiusHover: 10,
        borderRadius: 0,
        pointStyle: "rectRounded",
        fillmode: "origin"
    }

    var graph3DataObjectsArray = CreateGraphDataObjectsArray(graph3DataConfigObject);

    var graph3Options = {
        //#region graph3Options Object
        scales: {
            x: {
                title:{
                    display: true,
                    text: "Points amount",
                    color: mainColText,
                    font: {
                        family : "Lucida Sans Unicode",
                        size: 14,
                        weight: "bold",
                        lineHeight: 1.2
                    },
                    padding: {
                        top: 10,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }
                }
            },
            y: {
                title:{
                    display: true,
                    text: "Points value",
                    color: mainColText,
                    font: {
                        family : "Lucida Sans Unicode",
                        size: 14,
                        weight: "bold",
                        lineHeight: 1.2
                    },
                    padding: {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 10
                    }
                }
            }
        }
        //#endregion graph3Options Object
    }

    var graph3ConfigObject = {
        referenceTable: bodyContent,
        graphClass: "graphServer",
        graphId: "graphServer",
        graphWidth: "800px",
        graphHeight: "400px",
        graphAriaLabel: graph3AriaLabel,
        graphRole: "img",
        graphLabels: graph3LabelsArray,
        graphDatas: graph3DataObjectsArray,
        graphOptions: graph3Options,
        graphConfigType: "line"
    }
    //#endregion Set up all API graph datas

    graph3 = CreateGraph(graph3ConfigObject);
    iterationCount++;
}

/**
 * Update API graph with given datas
 * @param {Array} newGraph3DatasArray Array of data
 */
function UpdateAPIGraph(newGraph3DatasArray){
    var newLabelsArray = [];
    var newDatasArray = [];
    newGraph3DatasArray.forEach(element => {
        newLabelsArray.push((iterationCount * newGraph3DatasArray.length) + element[0]);
        var newData = [iterationCount * newGraph3DatasArray.length + element[0], element[1]];
        newDatasArray.push(newData);
    });
    addGraphData(graph3, newLabelsArray, newDatasArray);
    iterationCount++;
}

//////////////////////////////////////////////////////////////////////////// GENERAL FUNCTIONS ////////////////////////////////////////////////////////////////////////////

/**
 * Update the given chart by alphabetical order according to the given datas to sort
 * @param {Chart} chart The chart to update
 * @param {Any} dataToSort The datas to sort
 */
function SortByAlphabeticalOrder(chart, dataToSort){
    if(dataToSort == chart.config.data.datasets){
        isSortingDatasets = true;
        dataToSort.sort(compareLabels);
        chart.update();
    }
    else{
        isSortingDatasets = false;
        let sortedData = dataToSort.sort(compareLabels);
        let sortedLabelsArray = [];
        let allSortedDataArray = [];
        let firstSortedDataArray = [];
        let secondSortedDataArray = [];
        sortedData.forEach(element => {
            sortedLabelsArray.push(element.labels)
            firstSortedDataArray.push(element.datas[0]);
            secondSortedDataArray.push(element.datas[1]);
        });
        allSortedDataArray.push(firstSortedDataArray);
        allSortedDataArray.push(secondSortedDataArray);

        let firstDataset = chart.config.data.datasets[0];

        let sortedDataConfigObject = {
            objectAmount : allSortedDataArray.length,
            datasArray: allSortedDataArray,
            dataLabelsArray: sortedData[0].dataLabels,
            color: mainColText,
            secondaryColor: secondColText,
            pointRadius: firstDataset.pointRadius,
            pointRadiusHover: firstDataset.pointHoverRadius,
            borderRadius: firstDataset.borderRadius,
            pointStyle: firstDataset.pointStyle,
            fillmode: firstDataset.fill
        }

        let sortedDataObjectsArray = CreateGraphDataObjectsArray(sortedDataConfigObject);
        
        changeGraphData(chart, sortedLabelsArray, sortedDataObjectsArray);
    }

}

/**
 * Update the given chart by ascending order according to the given datas to sort
 * @param {Chart} chart The chart to update
 * @param {Any} dataToSort The datas to sort
 */
function SortByAscendingOrder(chart, dataToSort){
    isDescendingSorting = false;
    if(dataToSort == chart.config.data.datasets){
        isSortingDatasets = true;
        dataToSort.sort(compareDataAverages);
        chart.update();
    }
    else{
        isSortingDatasets = false;
        
        let sortedData = dataToSort.sort(compareDataAverages);
        let sortedLabelsArray = [];
        let allSortedDataArray = [];
        let firstSortedDataArray = [];
        let secondSortedDataArray = [];
        sortedData.forEach(element => {
            sortedLabelsArray.push(element.labels)
            firstSortedDataArray.push(element.datas[0]);
            secondSortedDataArray.push(element.datas[1]);
        });
        allSortedDataArray.push(firstSortedDataArray);
        allSortedDataArray.push(secondSortedDataArray);

        let firstDataset = chart.config.data.datasets[0];

        let sortedDataConfigObject = {
            objectAmount : allSortedDataArray.length,
            datasArray: allSortedDataArray,
            dataLabelsArray: sortedData[0].dataLabels,
            color: mainColText,
            secondaryColor: secondColText,
            pointRadius: firstDataset.pointRadius,
            pointRadiusHover: firstDataset.pointHoverRadius,
            borderRadius: firstDataset.borderRadius,
            pointStyle: firstDataset.pointStyle,
            fillmode: firstDataset.fill
        }

        let sortedDataObjectsArray = CreateGraphDataObjectsArray(sortedDataConfigObject);
        
        changeGraphData(chart, sortedLabelsArray, sortedDataObjectsArray);
    }
}

/**
 * Update the given chart by descending order according to the given datas to sort
 * @param {Chart} chart The chart to update
 * @param {Any} dataToSort The datas to sort
 */
function SortByDescendingOrder(chart, dataToSort){
    isDescendingSorting = true;
    if(dataToSort == chart.config.data.datasets){
        isSortingDatasets = true;
        dataToSort.sort(compareDataAverages);
        chart.update();
    }
    else{
        isSortingDatasets = false;

        let sortedData = dataToSort.sort(compareDataAverages);
        let sortedLabelsArray = [];
        let allSortedDataArray = [];
        let firstSortedDataArray = [];
        let secondSortedDataArray = [];
        sortedData.forEach(element => {
            sortedLabelsArray.push(element.labels)
            firstSortedDataArray.push(element.datas[0]);
            secondSortedDataArray.push(element.datas[1]);
        });
        allSortedDataArray.push(firstSortedDataArray);
        allSortedDataArray.push(secondSortedDataArray);

        let firstDataset = chart.config.data.datasets[0];

        let sortedDataConfigObject = {
            objectAmount : allSortedDataArray.length,
            datasArray: allSortedDataArray,
            dataLabelsArray: sortedData[0].dataLabels,
            color: mainColText,
            secondaryColor: secondColText,
            pointRadius: firstDataset.pointRadius,
            pointRadiusHover: firstDataset.pointHoverRadius,
            borderRadius: firstDataset.borderRadius,
            pointStyle: firstDataset.pointStyle,
            fillmode: firstDataset.fill
        }

        let sortedDataObjectsArray = CreateGraphDataObjectsArray(sortedDataConfigObject);
        
        changeGraphData(chart, sortedLabelsArray, sortedDataObjectsArray);
    }
}

/**
 * Compare averages of datas
 * @param {Any} a The first value to compare 
 * @param {Any} b The second value to compare
 * @returns sorted averages of datas
 */
function compareDataAverages(a, b){
    if(isSortingDatasets){
        var aAverage = GetAverage(a.data);
        var bAverage = GetAverage(b.data);
        
        if(aAverage < bAverage){
            return (isDescendingSorting ? 1 : -1);
        }
        if(aAverage > bAverage){
            return (isDescendingSorting ? -1 : 1);
        }
        return 0;
    }
    else{
        if(a.dataAverage < b.dataAverage){
            return (isDescendingSorting ? 1 : -1);
        }
        if(a.dataAverage > b.dataAverage){
            return (isDescendingSorting ? -1 : 1);
        }
        return 0;
    }
}

/**
 * Compare labels of datas
 * @param {Any} a The first value to compare
 * @param {Any} b The second value to compare
 * @returns sorted labels of datas
 */
function compareLabels(a, b){
    if(isSortingDatasets){
        if(a.label < b.label){
            return -1;
        }
        if(a.label > b.label){
            return 1;
        }
        return 0;
    }else{
        if(a.labels < b.labels){
            return -1;
        }
        if(a.labels > b.labels){
            return 1;
        }
        return 0;
    }
}

/**
 * Change the datas of a chart
 * @param {Chart} chart The chart that you want to change datas
 * @param {Array} newLabels Array of new labels
 * @param {Array} newDataPoints Array of new points
 */
function changeGraphData(chart, newLabels, newDataPoints) {
    chart.config.data.labels = newLabels;

    chart.config.data.datasets.forEach((dataset, index) => {
        dataset.data = newDataPoints[index].data;
        dataset.label = newDataPoints[index].label;
        dataset.boderColor = newDataPoints[index].boderColor;
        dataset.backgroundColor = newDataPoints[index].backgroundColor;
    });
    chart.update();
}

/**
 * Add datas to a chart
 * @param {Chart} chart The chart that you want to add datas
 * @param {Array} label labels to add to the chart
 * @param {Array} dataPoints Points to add to the chart
 */
function addGraphData(chart, label, dataPoints) {
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
 * Create a drop down button used to sort graph datas
 * @param {Chart} chartGraph The ChartGraph to be sort (by the dropdown sorting options)
 * @param {Any} dataToSort The datas used to sort the chart
 * @param {Element} referenceGraph The Element to insert the drop down button before it
 * @param {Array} orderOptionsArray An array of the sorting options names
 * @param {Array} orderFunctionsArray An array of the sorting options functions
 */
function CreateDropDownSortByButton(chartGraph, dataToSort, referenceGraph, orderOptionsArray, orderFunctionsArray){
    var dropdownDiv = document.createElement("div");
    dropdownDiv.setAttribute("class", "dropdown col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center");

    var dropdownButton = document.createElement("button");
    dropdownButton.setAttribute("class", "btn btn-primary dropdown-toggle");
    dropdownButton.setAttribute("type", "button");
    dropdownButton.setAttribute("data-bs-toggle", "dropdown");
    dropdownButton.setAttribute("aria-expanded", "false");
    dropdownButton.style.margin = "10px";
    dropdownButton.textContent = "Sort by";
    dropdownDiv.appendChild(dropdownButton);

    var dropDownMenu = document.createElement("ul");
    dropDownMenu.setAttribute("class", "dropdown-menu");
    dropDownMenu.setAttribute("aria-labelledby", "dropdownMenuButton1");
    dropdownDiv.appendChild(dropDownMenu);

    for(let i = 0; i < orderOptionsArray.length; i++){
        let dropDownItem = document.createElement("li");
        dropDownMenu.appendChild(dropDownItem);

        let dropDownItemContent = document.createElement("a");
        dropDownItemContent.setAttribute("class", "dropdown-item");
        dropDownItemContent.style.userSelect = "none";
        dropDownItemContent.textContent = orderOptionsArray[i]

        dropDownItemContent.addEventListener("click", () => {
            orderFunctionsArray[i](chartGraph, dataToSort);
        })

        dropDownItem.appendChild(dropDownItemContent);
    }

    referenceGraph.parentNode.insertBefore(dropdownDiv, referenceGraph);
}

/**
 * Create a graph with the given datas
 * @param {Object} graphConfigObject The object that contains all needed datas to create the graph
 * @returns the create Chart
 */
 function CreateGraph(graphConfigObject){
    var graphCanvas = document.createElement("canvas");
    graphCanvas.setAttribute("class", graphConfigObject.graphClass);
    graphCanvas.setAttribute("id", graphConfigObject.graphId);
    graphCanvas.setAttribute("width", graphConfigObject.graphWidth);
    graphCanvas.setAttribute("height", graphConfigObject.graphHeight);
    graphCanvas.setAttribute("aria-label", graphConfigObject.graphAriaLabel);
    graphCanvas.setAttribute("role", graphConfigObject.graphRole);

    var ctx = graphCanvas.getContext("2d");
    var data = {
    labels: graphConfigObject.graphLabels,
    datasets: graphConfigObject.graphDatas
    };

    var config = {
    type: graphConfigObject.graphConfigType,
    data: data,
    options: graphConfigObject.graphOptions
    };

    var graphChart = new Chart(ctx, config);

    if(graphConfigObject.referenceTable != null){
        graphConfigObject.referenceTable.parentNode.insertBefore(graphCanvas, graphConfigObject.referenceTable);
    }

    return graphChart;
}

/**
 * Create a graph data objects array (used to create a graph)
 * @param {Object} graphDataConfigObject The object that contains all needed datas to create the graph data objects array
 * @returns the created graph data objects array
 */
function CreateGraphDataObjectsArray(graphDataConfigObject){
    var dataObjectsArray = [];

    for(let i = 0; i < graphDataConfigObject.objectAmount; i++){
        let obj = new Object();
        if(graphDataConfigObject.objectAmount > 1){
            obj.data = graphDataConfigObject.datasArray[i];
            obj.label = graphDataConfigObject.dataLabelsArray[i];
        }else{
            obj.data = graphDataConfigObject.datasArray;
            obj.label = graphDataConfigObject.dataLabelsArray;
        }
        obj.borderRadius = graphDataConfigObject.borderRadius;
        obj.pointStyle  = graphDataConfigObject.pointStyle;
        obj.fill  = graphDataConfigObject.fillmode;
        
        let currentColor = "";
        if(i == 0){
            currentColor = graphDataConfigObject.color;
        }
        else if(i == 1 && graphDataConfigObject.secondaryColor != undefined){
            currentColor = graphDataConfigObject.secondaryColor
        }
        else{
            currentColor = `rgba(${randomNumber0Max(255)}, ${randomNumber0Max(255)}, ${randomNumber0Max(255)}, 1)`;
        }
        currentColorTransparent = changeColorOpacity(currentColor, 0.5);
        obj.borderColor = currentColor;
        obj.backgroundColor = currentColorTransparent;
        if(graphDataConfigObject.pointRadius != undefined){
            obj.pointRadius = graphDataConfigObject.pointRadius;
        }
        if(graphDataConfigObject.pointRadiusHover != undefined){
            obj.pointHoverRadius = graphDataConfigObject.pointRadiusHover;
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

/**
 * Remove extra spaces from the given string
 * @param {String} string The string to remove extra spaces from
 * @returns the cleaned up string (without extra spaces)
 */
function RemoveExtraSpaces(string){
    return string.replace(/\s+/g, ' ').trim()
}

/**
 * Remove exposant characters from the given string
 * @param {String} string The string to remove exposant characters from
 * @returns the cleaned up string (without exposant characters)
 */
function RemoveExposantCharacters(string){
    string = string.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, "");
    return string.replace(/\(\s*\)/g, "");
}

/**
 * Get an average of datas numbers
 * @param {Array} datasArray Array of numbers to get average from
 * @returns average of all the given datas
 */
function GetAverage(datasArray){
    let sum = 0;
    let dataCount = 0;

    datasArray.forEach(element => {
        sum += element;
        dataCount++;
    });

    var average = sum / dataCount;

    return average;
}
