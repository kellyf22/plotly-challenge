# Plot.ly Homework - Belly Button Biodiversity

In this assignment, I build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly

I used the D3 library to read in the json dataset `samples.json`.  Then I created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

Next, I created a bubble chart that displays each sample.

The bellybutton owners's demographic information is displayed as well.

All of these elements update any time a new Id is selected from the dropdown!

While the washing frequency gauge does not function as directed, it does display some equally important information.

## Deployment

This dashboard is [deployed](https://kellyf22.github.io/plotly-challenge/) on github pages!

### About the Data

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

