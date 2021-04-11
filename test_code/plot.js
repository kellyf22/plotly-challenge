// @TODO: Complete the Following Steps

// Filter the top 15 cities with a population increase greater than 15,000
//  and then graph each city on the x-axis and the respective population on the y-axis.

// 1. Use the filter method to create a custom filtering function
//  that returns the cities with a population increase greater than 15,000.
console.log(data.sample_values);

function filterOTUs(otu) {
  return parseInt(otu.sample_values) > 20;
}

// 2. Use filter() to pass the function as its argument
var filteredOTUs = data.filter(filterOTUs);

//  Check to make sure your filtered your cities.
console.log(filteredOTUs);

// 3. Use the map method with the arrow function to return all the filtered cities.
var sample_values = filteredOTUs.map(x => x.sample_values);

//  Check your filtered cities
console.log(sample_values);

// 4. Use the map method with the arrow function to return all the filtered cities population.
var otu_ids = filteredOTUs.map(x => x.otu_id);

//  Check the populations of your filtered cities
console.log(otu_ids);


// 5. Create your trace.
var trace = {
  x: sample_values,
  y: otu_ids,
  type: "bar",
  orientation: 'h'
};

// 6. Create the data array for our plot
var data1 = [trace];

// 7. Define our plot layout
var layout = {
  title: "AAAHHHH",
  xaxis: { title: "Counts" },
  yaxis: { title: "OTU Id"}
};

// 8. Plot the chart to a div tag with id "bar-plot"
Plotly.newPlot("bar", data1, layout);
