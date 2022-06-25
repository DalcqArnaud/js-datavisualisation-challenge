var table1 = document.getElementById("table1");
var table2 = document.getElementById("table2");
var bodyContent = document.getElementById("bodyContent");
var mainColText = "rgba(40, 115, 230, 1)";
var secondColText = "rgba(242, 139, 180, 1)";
var isDescendingSorting = false;
var isSortingDatasets = true;

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

//Create graph 2 div 
var graph1Title = "Offences recorded by the police, 2002-12"
var graph1Div = document.createElement("div");
var graph1MainTitleText = document.createElement("p");
graph1Div.appendChild(graph1MainTitleText);
var graph1MainTitle = document.createElement("strong");
graph1MainTitle.textContent = graph1Title;
graph1MainTitle.setAttribute("class", "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center");
graph1MainTitleText.appendChild(graph1MainTitle);

var graph1ConfigObject = {
    parentElement : graph1Div,
    referenceTable: null,
    graphClass: "graph1",
    graphId: "graph1",
    graphWidth: "800px",
    graphHeight: "600px",
    graphAriaLabel: graph1ArialLabel,
    graphRole: "img",
    graphLabels: graph1LabelsArray,
    graphDatas: graph1DataObjectsArray,
    graphOptions: {},
    graphConfigType: "line"
}

//create graph 1 
var graph1 = CreateGraph(graph1ConfigObject);

table1.parentNode.insertBefore(graph1Div, table1);

var graph1OrderOptions = ["Alphabetical order", "Ascending order", "Descending order"];
var graph1OrderFunctions = [SortByAlphabeticalOrder, SortByAscendingOrder, SortByDescendingOrder];
var graph1Element = document.getElementById("graph1");

CreateDropDownSortByButton(graph1, graph1.config.data.datasets, graph1Element, graph1OrderOptions, graph1OrderFunctions);

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
    graph2DataLabelsArray.push(RemoveExtraSpaces(RemoveExposantCharacters(table2TDsArray[0].textContent)));
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
var graph2MainTitleText = document.createElement("p");
graph2Div.appendChild(graph2MainTitleText);
var graph2MainTitle = document.createElement("strong");
graph2MainTitle.textContent = graph2Title;
graph2MainTitle.setAttribute("class", "col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center fw-bolder");
graph2MainTitleText.appendChild(graph2MainTitle);

var graph2ConfigObject = {
    parentElement : graph2Div,
    referenceTable: null,
    graphClass: "graph2",
    graphId: "graph2",
    graphWidth: "800px",
    graphHeight: "600px",
    graphAriaLabel: graph2ArialLabel,
    graphRole: "img",
    graphLabels: graph2DataLabelsArray,
    graphDatas: graph2DataObjectsArray,
    graphOptions: {},
    graphConfigType: "bar"
}

//create graph 2 
var graph2 = CreateGraph(graph2ConfigObject);

table2.parentNode.insertBefore(graph2Div, table2);

var graph2OrderOptions = ["Alphabetical order", "Ascending order", "Descending order"];
var graph2OrderFunctions = [SortByAlphabeticalOrder, SortByAscendingOrder, SortByDescendingOrder];
var graph2Element = document.getElementById("graph2");

var graph2DatasToSortArray = [];

//Get all datas needed to sort the graph datas and store them in objects (each properties is a set of nedded datas)
graph2DatasArray.forEach((element, index) => {
    var graph2DatasToSortObject = new Object();
    graph2DatasToSortObject.labels = graph2ConfigObject.graphLabels[index];
    graph2DatasToSortObject.dataValues = [];
    graph2DatasToSortObject.datasetsNames = graph2NamesArray;

    graph2DatasToSortObject.dataValues.push(element);
    graph2DatasToSortObject.dataValues.push(graph2BisDatasArray[index]);
    
    // let tempDatasArray = [];
    // tempDatasArray.push(element);
    // tempDatasArray.push(graph2BisDatasArray[index]);
    // let tempAverage = GetAverage(tempDatasArray);
    // graph2DatasToSortObject.dataValues.push(tempAverage)

    graph2DatasToSortArray.push(graph2DatasToSortObject);
});

CreateDropDownSortByButton(graph2, graph2DatasToSortArray, graph2Element, graph2OrderOptions, graph2OrderFunctions);

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

        var graph3ConfigObject = {
            parentElement : null,
            referenceTable: bodyContent,
            graphClass: "graphServer",
            graphId: "graphServer",
            graphWidth: "800px",
            graphHeight: "400px",
            graphAriaLabel: graph3AriaLabel,
            graphRole: "img",
            graphLabels: tempLabelArray,
            graphDatas: graphServerDataObjectsArray,
            graphOptions: {},
            graphConfigType: "line"
        }

        graph3 = CreateGraph(graph3ConfigObject);
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

function SortByAlphabeticalOrder(chart, dataToSort){
    if(dataToSort == chart.config.data.datasets){
        isSortingDatasets = true;
        dataToSort.sort(compareLabels);
        chart.update();
    }
    else{
        isSortingDatasets = false;
        let sortedData = dataToSort.sort(compareLabels);
        let tempSortedAllLabelsArray = [];
        let tempSortedAllDataArray = [];
        let tempSortedFirstDataArray = [];
        let tempSortedSecondDataArray = [];
        sortedData.forEach(element => {
            tempSortedAllLabelsArray.push(element.labels)
            tempSortedFirstDataArray.push(element.dataValues[0]);
            tempSortedSecondDataArray.push(element.dataValues[1]);
        });
        tempSortedAllDataArray.push(tempSortedFirstDataArray);
        tempSortedAllDataArray.push(tempSortedSecondDataArray);

        var tempDataObjectsArray = CreateGraphDataObjectsArray(tempSortedAllDataArray.length, tempSortedAllDataArray, sortedData[0].datasetsNames, mainColText, secondColText);
        
        changeData(chart, tempSortedAllLabelsArray, tempDataObjectsArray);
    }

}

function SortByAscendingOrder(chart, dataToSort){
    isDescendingSorting = false;
    if(dataToSort == chart.config.data.datasets){
        isSortingDatasets = true;
        dataToSort.sort(compareDataAverages);
        chart.update();
    }
    else{
        isSortingDatasets = false;
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        // let sortedData = dataToSort.sort(compareLabels);
        // let tempSortedAllLabelsArray = [];
        // let tempSortedAllDataArray = [];
        // let tempSortedFirstDataArray = [];
        // let tempSortedSecondDataArray = [];
        // sortedData.forEach(element => {
        //     tempSortedAllLabelsArray.push(element.labels)
        //     tempSortedFirstDataArray.push(element.dataValues[0]);
        //     tempSortedSecondDataArray.push(element.dataValues[1]);
        // });
        // tempSortedAllDataArray.push(tempSortedFirstDataArray);
        // tempSortedAllDataArray.push(tempSortedSecondDataArray);

        // var tempDataObjectsArray = CreateGraphDataObjectsArray(tempSortedAllDataArray.length, tempSortedAllDataArray, sortedData[0].datasetsNames, mainColText, secondColText);
        
        // changeData(chart, tempSortedAllLabelsArray, tempDataObjectsArray);
    }
}

function SortByDescendingOrder(chart, dataToSort){
    isDescendingSorting = true;
    if(dataToSort == chart.config.data.datasets){
        isSortingDatasets = true;
        dataToSort.sort(compareDataAverages);
        chart.update();
    }
    else{
        isSortingDatasets = false;

        // let sortedData = dataToSort.sort(compareLabels);
        // let tempSortedAllLabelsArray = [];
        // let tempSortedAllDataArray = [];
        // let tempSortedFirstDataArray = [];
        // let tempSortedSecondDataArray = [];
        // sortedData.forEach(element => {
        //     tempSortedAllLabelsArray.push(element.labels)
        //     tempSortedFirstDataArray.push(element.dataValues[0]);
        //     tempSortedSecondDataArray.push(element.dataValues[1]);
        // });
        // tempSortedAllDataArray.push(tempSortedFirstDataArray);
        // tempSortedAllDataArray.push(tempSortedSecondDataArray);

        // var tempDataObjectsArray = CreateGraphDataObjectsArray(tempSortedAllDataArray.length, tempSortedAllDataArray, sortedData[0].datasetsNames, mainColText, secondColText);
        
        // changeData(chart, tempSortedAllLabelsArray, tempDataObjectsArray);
    }
}

function compareDataAverages(a, b){
    var aSum = 0;
    var aDataCount = 0;
    var bSum = 0;
    var bDataCount = 0;

    if(isSortingDatasets){
        a.data.forEach(element => {
                aSum += element;
                aDataCount++;
        });
        b.data.forEach(element => {
                bSum += element;
                bDataCount++;
        });
    
        var aAverage = aSum / aDataCount;
        var bAverage = bSum / bDataCount;
        
        if(aAverage < bAverage){
            return (isDescendingSorting ? 1 : -1);
        }
        if(aAverage > bAverage){
            return (isDescendingSorting ? -1 : 1);
        }
        return 0;
    }
    else{

    }
}

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

function changeData(chart, newLabels, newDataPoints) {
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
 * Create a drop down button used to sort a given graph datas
 * @param {Chart} chartGraph The ChartGraph to be sort (by the dropdown sorting options)
 * @param {Element} referenceGraph The Element to insert the drop down button before it
 * @param {Array} orderOptionsArray an array of the sorting options names
 * @param {*} orderFunctionsArray an array of the sorting options functions
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

    if(graphConfigObject.parentElement != null){
        graphConfigObject.parentElement.appendChild(graphCanvas);
    }

    if(graphConfigObject.referenceTable != null){
        graphConfigObject.referenceTable.parentNode.insertBefore(graphCanvas, graphConfigObject.referenceTable);
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
