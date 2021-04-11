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

        // BAR CHART
        // Sample counts are sorted in descending order, so pick the first 10 to plot 
        var tenSampleValues = sampleToPlot.sample_values.slice(0,10);
        console.log(tenSampleValues);
        var tenOTUs = sampleToPlot.otu_ids.slice(0,10).map(otu => "OTU Id " + String(otu));
        console.log(tenOTUs);
        var tenLabels = sampleToPlot.otu_labels.slice(0,10).map(label => String(label.split(';').slice(-1)));
        console.log(tenLabels);
        
        // Create a trace
        var trace = {
            x: tenSampleValues.reverse(),
            y: tenOTUs.reverse(),
            type: "bar",
            orientation: "h",
            text: tenLabels
        };
        
        // Create the data array for our plot
        var data1 = [trace];
        
        // Define our plot layout
        var layout = {
            title: "Top Ten OTU Ids",
            xaxis: { title: "Counts" },
            yaxis: { title: " "}
        };
        
        // 8. Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data1, layout);

        // BUBBLE CHART
        var allSampleValues = sampleToPlot.sample_values;
        console.log(allSampleValues);
        var allOTUs = sampleToPlot.otu_ids;
        console.log(allOTUs);
        var allLabels = sampleToPlot.otu_labels.map(label => String(label.split(';').slice(-1)));
        console.log(allLabels);

        var traceBub = {
            x: allOTUs,
            y: allSampleValues,
            mode: 'markers',
            marker: {
                size: allSampleValues.map(value => Math.sqrt(value)*5)
            }
        };

        var dataBub = [traceBub];

        var layoutBub = {
            title: "Bubbles",
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot('bubble', dataBub, layoutBub)
    };
    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("body").on("change", updatePlotly);

});
//   // Call updatePlotly() when a change takes place to the DOM
//   d3.selectAll("#selDataset").on("change", updatePlotly);
  
