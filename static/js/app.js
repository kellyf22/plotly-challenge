d3.json("../data/samples.json").then((importedData) => {
    console.log(importedData);
    var names = importedData.names;
    var samples = importedData.samples;
    console.log(samples);

    var dropdownMenu = d3.select("#selDataset");

    // For each name (test subject ID) in the list, append it to the dropdown
    names.forEach(function(name) {
      var dd_option = dropdownMenu.append("option");
      dd_option.text(name);
    });

    // I guess first I'll initialize the page with a default plot having nothing to do with anything
    function init() {
        data = [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }];
    
        Plotly.newPlot("bar", data);
    };
    init();

     // now I need a function that returns a sample corresponding to the name. So need to look at the value
    // in the dropdown and find its index in your array names.
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.node().value;
        console.log(dataset);
        myIndex = names.indexOf(dataset);
        var sampleToPlot = samples[myIndex];
        console.log(sampleToPlot);

        // 5. Create your trace.
        var trace = {
            x: sampleToPlot.sample_values,
            y: sampleToPlot.otu_ids,
            type: "bar",
            orientation: 'h'
        };
        
        // 6. Create the data array for our plot
        var data1 = [trace];
        
        // 7. Define our plot layout
        var layout = {
            title: "Top Ten (fingers crossed) OTU Ids",
            xaxis: { title: "Counts" },
            yaxis: { title: "OTU Id"}
        };
        
        // 8. Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data1, layout);
    };
    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("body").on("change", updatePlotly);

});
//   // Call updatePlotly() when a change takes place to the DOM
//   d3.selectAll("#selDataset").on("change", updatePlotly);
  
//   // This function is called when a dropdown menu item is selected
//   function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
  
//     // Initialize x and y arrays
//     var x = [];
//     var y = [];
  
//     if (dataset === 'dataset1') {
//       x = [1, 2, 3, 4, 5];
//       y = [1, 2, 4, 8, 16];
//     }
  
//     else if (dataset === 'dataset2') {
//       x = [10, 20, 30, 40, 50];
//       y = [1, 10, 100, 1000, 10000];
//     }
  
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("plot", "x", [x]);
//     Plotly.restyle("plot", "y", [y]);
//   }
  
//   init();