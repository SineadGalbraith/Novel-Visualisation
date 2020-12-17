// CSV File Information
table = [];

// Countries
countriesColumn = [];
countries = [];
countryDisplayNames = {};

// Cases
casesColumn = [];

// Country Cases
janCases = [];
febCases = [];
marCases = [];
aprCases = [];
mayCases = [];
junCases = [];
julCases = [];
augCases = [];
sepCases = [];
octCases = [];
novCases = [];
decCases = [];

// Year Data
var yearCases = [];
var yearColor = '#B55F4D';
var yearTitle = 'Cumulative Corona Virus Cases in Each Country in the Year 2020';

// Table Data
months = 2;
cases = 4;
countryName = 6;

function preload() {
  tableData = loadTable('ecdc_covid19_cases.csv', 'csv', 'header');
}

function setup() {
  // createCanvas(2100, 1000);
  // Load Table Rows into array
  tableRows = tableData.getRows();
  rowCount = tableData.getRowCount();
  for (var t = 0; t < rowCount; t++) {
    table.push(tableRows[t].arr);
  }

  // Extract countries from data and put them into an array
  countriesColumn = tableData.getColumn('countriesAndTerritories');
  countries = getCountryList(countriesColumn);


  // Find Yearly Cases
  findYearlyCases(countries, table);
  // print(testData);
  
  // print(yearCases);
  // casesColumn = table.getColumn('cases');
}

// This function takes the countries column from the csv file and finds the name 
// that will match that of the GeoChart. This name is then added to the list.
function getCountryList(column) {
  var countryList = [];
  var countryName;
  for (var c = 0; c < column.length; c++) {
    countryName = getCountryName(column[c]);

    if (!countryList.includes(countryName)) {
      countryList.push(countryName);
    }
  }
  return countryList;
}

// This function removes underscores if appropriate and renames certain countries 
// so that they can be displayed on Geo Tracker.
function getCountryName(country) {
  var countryName;
  var displayName;

  // Check if the country name contains an underscore
  if (country.includes("_")) {
    countryName = country.split('_').join(' ');
    displayName = countryName;
  }
  else {
    countryName = country;
    displayName = countryName;
  }

  // There are certain countries that are named different in the data set than in geocharts, need to manually 
  // substiture the names
  switch(countryName) {
    case 'Bonaire, Saint Eustatius and Saba':
      countryName = "Bonaire, Sint Eustatius and Saba";
      displayName = countryName;   
      break;
    case 'British Virgin Islands' :
      countryName = "Virgin Islands (British)";
      displayName = "British Virgin Islands";
      break;
    case 'Cape Verde':
      countryName = "Cabo Verde";
      displayName = "Cape Verde";
      break;
    case 'Cote dIvoire' :
      countryName = "Ivory Coast";
      displayName = countryName;
      break;
    case 'Czechia' :
      countryName = "Czech Republic";
      displayName = countryName;
      break;
    case 'Democratic Republic of the Congo':
      countryName = "CD";
      displayName = "Democratic Republic of the Congo";
      break;
    case 'Eswatini':
      countryName = "Swaziland";
      displayName = "Eswatini";
      break;
    case 'Falkland Islands (Malvinas)':
      countryName = "Falkland Islands";
      displayName = countryName;
      break;
    case 'North Macedonia' :
      countryName = "Macedonia";
      displayName = "North Macedonia";
      break;
    case 'South Sudan' :
      countryName = "SS";
      displayName = "South Sudan";
      break;
    case 'United Republic of Tanzania' :
      countryName = "Tanzania";
      displayName = countryName;
      break;
    case 'United States of America' :
      countryName = "United States";
      displayName = "United States of America";
      break;
    default:
      countryName = countryName;
      displayName = countryName;
  }

  if (!countryDisplayNames.hasOwnProperty(countryName)) {
    countryDisplayNames[countryName] = displayName;
  }
  // if(!countryDisplayNames.includes(displayName)) {
  //   countryDisplayNames.push(displayName);
  // }
  return countryName;
}

// This function finds the total corona virus cases in each country for 2020.
function findYearlyCases(countries, table) {
  // print(countryDisplayNames)
  yearCases.push(['Country', 'Cases']);
  var name;
  for(var country = 0; country < countries.length; country++) {
    var countryTotal = 0;
    for (var row = 0; row < table.length; row++) {
      name = getCountryName(table[row][countryName])
      if (name == countries[country]) {
        countryTotal += int(table[row][cases])
      }
      }

      yearCases.push([countries[country], countryTotal]);
      // yearCases.push([countryDisplayNames[countries[country]], countryTotal]);
    }

}

function draw() {
  // background(220);
}

// When the window has loaded, the map will be displayed.
window.onload = function() {
  google.charts.load('current', {
    'packages':['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    // 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });
  google.charts.setOnLoadCallback(drawRegionsMap);
}

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable(yearCases);

  var options = {
    colors: yearColor //eg. red
  };
  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}