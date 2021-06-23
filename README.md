# Novel Visualisation

The objective of this assignment was to choose an interesting data set and design and implement a novel visualisation for it.

My Novel Visualisation shows data surrounding the current Covid-19 pandemic, focusing primarily on representing the number of cases in the world (for all available country data) in five different ways across two main visualisations.

The project was completed using p5.js and GeoChart.

### World Map

The first graph in the visualisation shows a map of the world. Initially, the map will show the cumulative Covid-19 Case Data for each country in the year 2020. 

<p align="center">
  <img src="https://github.com/SineadGalbraith/Novel-Visualisation/blob/main/images/CountryAndYear.png" width="1000" height="450">
</p>

Using the options show at the bottom of the map, a total of four subviews are available in this visualisation. One option from each row is available at any time. The four possible combinations are:
 1. Country And Year
 2. Continent And Year
 3. Country And Month
 4. Continent And Month

When the month option is selected, a slider appears underneath displaying all of the months. The user can then slide this bar along to see the graph change for each month. For example, the image below shows the options bar selected as the month May for all countries. The map view has updated accordingly. 

<p align="center">
  <img src="https://github.com/SineadGalbraith/Novel-Visualisation/blob/main/images/OptionsBar.png" width="1000" height="450">
</p>

Due to a restriction in GeoChart, North and South America are represented as one continent in the visualisation when the continent option is selected.

### Bar Chart

As well as displaying the number of cases per country/continent, the indivudal countries and continents are clickable on the world map above. 

When a particular country is clicked, this will trigger the second graph: the Bar Chart. 

The Bar Chart shows colour coded lines that represent the amount of daily Covid-19 cases for the selected country from the beginning of 2020 until 10th December 2020 (when this data was retrieved). 

The Bar Chart when USA is clicked:

<p align="center">
  <img src="https://github.com/SineadGalbraith/Novel-Visualisation/blob/main/images/BarGraphUSA.png" width="1000" height="300">
</p>

The Bar Chart when South Africa is clicked:

<p align="center">
  <img src="https://github.com/SineadGalbraith/Novel-Visualisation/blob/main/images/BarGraphSA.PNG" width="1000" height="300">
</p>
