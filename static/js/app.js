d3.json("../data/samples.json").then((importedData) => {
    console.log(importedData);
    var names = importedData.names;
    console.log(names);

    var dropdownMenu = d3.select("#selDataset");

    // For each name (test subject ID) in the list, append it to the dropdown
    names.forEach(function(name) {
      var dd_option = dropdownMenu.append("option");
      dd_option.text(name);
    });

    // now I need a function that returns a sample corresponding to the name. So need to look at the value
    // in the dropdown and find its index in your array names.

    // I guess first I'll initialize the page with a default plot having nothing to do with anything
    function init() {
        data = [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }];
    
        Plotly.newPlot("bar", data);
    }
    init();
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