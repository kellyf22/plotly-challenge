d3.json("../../data/samples.json").then((importedData) => {
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

     // now I need a function that returns a sample corresponding to the name. So need to look at the value
    // in the dropdown and find its index in your array names.
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");

        // Assign the value of the dropdown menu options to OTU id names
        var dataset = dropdownMenu.node().value;
        console.log(dataset);

        //Get the index of the name in the dropdown in order to reference the sample to plot
        myIndex = names.indexOf(dataset);
        var sampleToPlot = samples[myIndex];
        console.log(sampleToPlot);

        // BAR CHART---------------------------------------------------------------------------
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
        
        var data1 = [trace];
       
        var layout = {
            title: "Top Ten OTU Ids",
            xaxis: { title: "Counts" },
            yaxis: { title: " "}
        };
        
        // 8. Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data1, layout);

        // BUBBLE CHART--------------------------------------------------------------------------------
        var allSampleValues = sampleToPlot.sample_values;
        console.log(allSampleValues);
        var allOTUs = sampleToPlot.otu_ids;
        console.log(allOTUs);
        var allLabels = sampleToPlot.otu_labels.map(label => String(label.split(';').slice(-1)));
        console.log(allLabels);
        // var getColor = Plotly.d3.scale.category20(3);
        // console.log(getColor);
        var colors = ["f72585","b5179e","7209b7","560bad","480ca8","3a0ca3","3f37c9","4361ee","4895ef","4cc9f0","2b59c3","253c78","d36582","ffeecf","c9a690","c1a5a9","d999ac","f08cae","c56ca2","9a4c95","743d74","4d2d52","352442","1d1a31","7cea9c"]

        var traceBub = {
            x: allOTUs,
            y: allSampleValues,
            text: allLabels,
            mode: 'markers',
            marker: {
                color: colors,
                size: allSampleValues.map(value => Math.sqrt(value)*5)
            }
        };

        var dataBub = [traceBub];

        var layoutBub = {
            title: "Bubbles",
            showlegend: false,
            height: 600,
            width: 900
        };

        Plotly.newPlot('bubble', dataBub, layoutBub);

        // DEMOGRAPHICS DATA---------------------------------------------------------------------------
        var demoData = importedData.metadata[myIndex];
        console.log(demoData);
        // YOUR CODE HERE!
        var panel = d3.select("#sample-metadata");
        panel.html("");

        console.log(panel);
        var tbody = panel.append("tbody");
            
        Object.entries(demoData).forEach(([key, value]) => {
            var row = tbody.append("tr");
            var cell1 = row.append("td");
            cell1.text(key+":");
            var cell2 = row.append("td");
            cell2.text(value);
        });
        
    };
    
    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("body").on("change", updatePlotly);

    // Call updatePlotly() to initialize the webpage
    updatePlotly();

});

  
