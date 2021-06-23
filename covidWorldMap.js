// CSV File Information
table = [];

// Page Details
pageTitle = "Covid-19 Cases Throughout 2020";
var chartTitle;
var currentMonth;
var graphTitle = "Number of Covid-19 Cases (in Thousands) Per Day in ";

// Map Options
byCountries = true;
byContinents = false;
byYear = true;
byMonths = false;
madeChoice = false;
sliderMonth = document.getElementById('months').value;

// Year Data
var yearColor = '#B55F4D';

// Countries (Year)
countriesAndCodes = {};
countriesYear = [['Country', 'Cases']];

// Continents (Year)
continentsYear = [['Region code', 'Continent', 'Cases']];

// Graph 2 Variables
var lineHeight = 0;
var choice = '';
var yAxisLeft = 150;
var yAxisRight = yAxisLeft + 1705;
var xAxisBottom = 500;
var lineLength = 112.5;
months = [['Jan', 30], ['Feb', 29], ['Mar', 31], ['Apr', 30], ['May', 31], ['Jun', 30], 
['Jul', 31], ['Aug', 31], ['Sep', 30], ['Oct', 31], ['Nov', 30], ['Dec', 10]];

// Colours 
var orangeColour = '#E38617'; // orange
var blueColour = '#4DB5B5'; // blue
var pinkColour = '#B54D7F'; // pink
var greenColour = '#7EB54D'; // green
var yellowColour = '#DDE011'; // yellow


// Load in the csv file
function preload() {
  tableData = loadTable('ecdc_covid19_cases.csv', 'csv', 'header');
}

function setup() {
  // -------------------------------------------- WORLD MAP --------------------------------------------
 // ---------- Radio buttons ----------
  radioCountry = select("#countryBox").elt;
  radioContinent = select("#continentBox").elt;
  radioYear = select("#yearBox").elt;
  radioMonth = select("#monthsBox").elt;
  
  if(byCountries) radioCountry.checked = true;
  else if(byContinents) radioContinent.checked = true;
  
  if(byYear) radioYear.checked = true;
  else if(byMonths) radioMonth.checked = true;

  // ---------- Table ----------
  tableRows = tableData.getRows();
  rowCount = tableData.getRowCount();
  for (var t = 0; t < rowCount; t++) {
    table.push(tableRows[t].arr);
  }

  // ---------- Countries and Codes ----------
  countriesAndCodes = getCountriesAndCodes(table);
  
  // ---------- Get Countries (Year) ----------
  countryCodesColumn = tableData.getColumn('geoId');
  codes = shortenList(countryCodesColumn);
  findYearlyCountryCases(codes, table);

  // ---------- Get Continents (Year) ----------
  continentsColumn = tableData.getColumn('continentExp');
  cons = shortenList(continentsColumn);
  findYearlyContinentCases(cons, table);

  // ---------- Get Countries (Month) ----------
  findMonthlyCountryCases(table, codes, sliderMonth);

  // ---------- Get Continents (Month) ----------
  findMonthlyContinentCases(table, cons, sliderMonth);
  getMonth(sliderMonth);

  // -------------------------------------------- GRAPH 2--------------------------------------------
  createCanvas(2100, 1000);
}

// -------------------------------------------- COUNTRIES (Year) --------------------------------------------
function getCountriesAndCodes(table) {
  var array = [];
  var object = {};
  var countryName;
  var code;
  for (var i = 0; i < table.length; i++){
    if (!(key in object)) {
      countryName = table[i][6];
      code = table[i][7];
      if (countryName.includes("_")) {
        countryName = countryName.split('_').join(' ');
      }
      object[code] = countryName;
    }
  }
  array.push(object);
  return array;
}

function shortenList(list) {
  var shortList = [];
  for (var i = 0; i < list.length; i++) {
    if(list[i] !== 'Other') {
      if (!shortList.includes(list[i])) {
        shortList.push(list[i]);
      }
    }
  }
  return shortList;
}

function findYearlyCountryCases(countryCodes, table) {
  for (var cc = 0; cc < countryCodes.length; cc++) {
    var countryTotal = 0;
    for (var row = 0; row < table.length; row++) {
      var code = table[row][7];
      var cases = int(table[row][4]);
      if (code == countryCodes[cc]) {
        countryTotal += cases;
      }
    }

    if (countryCodes[cc] == "UK") {
      countriesYear.push([{v: "GB", f: countriesAndCodes[0][countryCodes[cc]]}, countryTotal]);

    } else if (countryCodes[cc] == "EL"){
      countriesYear.push([{v: "GR", f: countriesAndCodes[0][countryCodes[cc]]}, countryTotal]);
    } else {
      countriesYear.push([{v: countryCodes[cc], f: countriesAndCodes[0][countryCodes[cc]]}, countryTotal]);
    }
  }
}

// -------------------------------------------- CONTINENTS (Year) --------------------------------------------

function getRegionCode(continent) {
  var region;
  switch(continent) {
    case 'Africa':
      region = "002";
      break;
    case 'America':
      region = "019";
      break;
    case 'Asia':
      region = "142";
      break;
    case 'Europe':
      region = "150";
      break;
    case 'Oceania':
      region = "009";
      break;
  }
  return region;
}

function findYearlyContinentCases(cons, table) {

  for (var c = 0; c < cons.length; c++) {
    var continentTotal = 0;
    var regionCode = getRegionCode(cons[c]);
    for (var row = 0; row < table.length; row++) {
      var name = table[row][10];
      var cases = int(table[row][4]);
      if (name == cons[c]) {
        continentTotal += cases;
      }
    }
    continentsYear.push([regionCode, cons[c], continentTotal])
  }
}

// -------------------------------------------- COUNTRIES (Month) --------------------------------------------

function findMonthlyCountryCases(table, countryCodes, month) {
  countriesMonth = [['Country', 'Cases']];
  var countryMonthTotal = 0;
  for (var cc = 0; cc < countryCodes.length; cc++) {
    countryMonthTotal = 0;
    if(countryCodes[cc] !== 'JPG11668') {
      for (var row = 0; row < table.length; row++) {
        var rowMonth = int(table[row][2]); // month
        var code = table[row][7]; // code
        var cases = int(table[row][4]); // cases
        if (code == countryCodes[cc] && rowMonth == month) {
          countryMonthTotal += cases;
        }
      }
  
      if (countryCodes[cc] == "UK") {
        countriesMonth.push([{v: "GB", f: countriesAndCodes[0][countryCodes[cc]]}, countryMonthTotal]);
  
      } else if (countryCodes[cc] == "EL"){
        countriesMonth.push([{v: "GR", f: countriesAndCodes[0][countryCodes[cc]]}, countryMonthTotal]);
      } else {
        countriesMonth.push([{v: countryCodes[cc], f: countriesAndCodes[0][countryCodes[cc]]}, countryMonthTotal]);
      }
    }
  }
}

// -------------------------------------------- CONTINENTS (Month) --------------------------------------------

function findMonthlyContinentCases(table, continents, month) {
  continentsMonth = [['Region code', 'Continent', 'Cases']];
  var continentMonthTotal = 0;
  for (var cc = 0; cc < continents.length; cc++) {
    continentMonthTotal = 0;
    var regionCode = getRegionCode(continents[cc]);
      for (var row = 0; row < table.length; row++) {

        
        var rowMonth = int(table[row][2]); // month
        var rowContinent = table[row][10]; // continent
        var cases = int(table[row][4]); // cases

        if (rowContinent == continents[cc] && rowMonth == month) {
          continentMonthTotal += cases;
        }
      }
      continentsMonth.push([regionCode, continents[cc], continentMonthTotal])
    }
}

// -------------------------------------------- MONTHS --------------------------------------------

function getMonth(month) {
  if (month === 1) currentMonth = 'January';
  else if (month === 2) currentMonth = 'February';
  else if (month === 3) currentMonth = 'March';
  else if (month === 4) currentMonth = 'April';
  else if (month === 5) currentMonth = 'May';
  else if (month === 6) currentMonth = 'June';
  else if (month === 7) currentMonth = 'July';
  else if (month === 8) currentMonth = 'August';
  else if (month === 9) currentMonth = 'September';
  else if (month === 10) currentMonth = 'October';
  else if (month === 11) currentMonth = 'November';
  else if (month === 12) currentMonth = 'December';
}

// -------------------------------------------- GRAPH 2--------------------------------------------
function getCountryData(country) {
  var code;
  var day;
  var month;
  var cases;
  var array = [];
  if (country == "GB") {
    code = "UK";
  } else if (country == "GR"){
    code = "EL";
  } else {
    code = country;
  }

  for (var i = 0; i < table.length; i++) {
    if (table[i][7] === code) {
      day = table[i][1];
      month = table[i][2];
      cases = table[i][4];
      array.push([{"day": int(day), "month": int(month), "cases": int(cases)}]);
    }
  }
  return array;
}

function getMax(data) {
  var max = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i][0]["cases"] > max) max = data[i][0]["cases"];
  }
  return max;
}

function findLineColour(cases) {
  if (cases <= 5000) return orangeColour; 
  else if (cases > 5000 && cases <= 25000) return blueColour; 
  else if (cases > 25000 && cases <= 50000) return pinkColour; 
  else if (cases > 50000 && cases <= 100000) return greenColour; 
  else return yellowColour; 
}

// -------------------------------------------- DRAW --------------------------------------------

function draw() {
  background(255);

  // -------------------------------------------- GRAPH 2--------------------------------------------
  fill(255);
  rect(1875, 80, 200, 150);
  fill(0);
  textSize(15);
  textAlign(LEFT);
  text('Key (Number of Cases)', 1900, 100);
  fill(orangeColour);
  rect(1890, 120, 30, 10);
  fill(blueColour);
  rect(1890, 140, 30, 10);
  fill(pinkColour);
  rect(1890, 160, 30, 10);
  fill(greenColour);
  rect(1890, 180, 30, 10);
  fill(yellowColour);
  rect(1890, 200, 30, 10);

  fill(0);
  text('=   <= 5,000', 1930, 130);
  text('=   5,000 - 25,000 ', 1930, 150);
  text('=   25,000 - 50,000', 1930, 170);
  text('=   50,000 - 100,000', 1930, 190);
  text('=   > 100,000', 1930, 210);
  
  if (!madeChoice) {
    document.getElementById('graph_title').style.visibility="hidden";  
  }
  else if (madeChoice) {
    document.getElementById('graph_title').style.visibility="visible";  
  }

  var countryData = getCountryData(choice);
  var max = getMax(countryData)

  // ---------- Axes Labels ----------
  textAlign(CENTER);
  // X-Axis
  textSize(20)
  text('Months', 1050, 575)

  // Y-Axis 
  push();
  translate(90, 290);
  rotate(radians(-90));
  text('Cases Per Day (Thousands)', 0, 0);
  pop();
  
  // ---------- Draw Axes ----------
  // Assign variable based on the maximum number of cases for the selected country.
  var maximumCases; 
  var iterator; 
  var multiplier; 
  var divider;
  if(!madeChoice) {
    maximumCases = 250 
    iterator = 50 
    multiplier = 1.5 
  } else if (max <= 5000) {
    maximumCases = 5;
    iterator = 1;
    multiplier = 75;
    divider = 5000;
  } else if (max > 5000 && max <= 25000) {
    maximumCases = 25;
    iterator = 5;
    multiplier = 15;
    divider = 25000;
  } else if (max > 25000 && max <= 50000) {
    maximumCases = 50;
    iterator = 10;
    multiplier = 7.5;
    divider = 50000;
  } else if (max > 50000 && max <= 100000) {
    maximumCases = 100;
    iterator = 10;
    multiplier = 3.75;
    divider = 100000;
  } else { 
    maximumCases = 250;
    iterator = 50;
    multiplier = 1.5;
    divider = 250000;
  }

  // Draw y-axis
  textSize(15);
  line(yAxisLeft, lineLength, yAxisLeft, xAxisBottom);
  line(yAxisRight, lineLength, yAxisRight, xAxisBottom);
  for (var y = 0; y <= maximumCases; y = y + iterator) {
    push();
    translate(yAxisLeft, xAxisBottom);
    text(y, -25, -(y * multiplier) - 10 );
    if (y!== 0) {
      stroke(0);
      line(-7, -(y * multiplier) - 12.5, 0, -(y * multiplier) - 12.5);
      stroke(190);
      line(0, -(y * multiplier) - 12.5, 1705, -(y * multiplier) - 12.5);
    }
    pop();
  }

  // Draw x-axis and respective bars/lines
  line(yAxisLeft, xAxisBottom, yAxisRight, xAxisBottom);
  textAlign(CENTER);
  fill(0);
  textSize(15);
  var linePos = 10;
  for (var m = 0; m < months.length; m++) {
    push();
    translate(yAxisLeft, xAxisBottom);
    if (m !== 11) text(months[m][0], m * 150 + 65, 25);
    else text(months[11][0], m * 150 + 30, 25);
    for (var days = 0; days < months[m][1]; days++) {
      stroke(0);
      line(linePos + (days * 4), 0, linePos + (days * 4), 5);
      for (var r = 0; r < countryData.length; r++) {
        if (int(countryData[r][0]["month"]) - 1 === m) {
          if (int(countryData[r][0]["day"]) - 1 == days) {
            var casesPerDay = countryData[r][0]["cases"]; 
            var colour = findLineColour(casesPerDay);
            stroke(colour);
            lineHeight = (casesPerDay / divider) * maximumCases;
            line(linePos + ((int(countryData[r][0]["day"]) - 1) * 4), -(lineHeight * multiplier), linePos + ((int(countryData[r][0]["day"]) - 1) * 4), 0);
          }
        }
      }
    }
    linePos = linePos + 150;
    pop();
  }

  // -------------------------------------------- WORLD MAP --------------------------------------------
  if (!byMonths) {
    document.getElementById('monthsSlider').style.visibility="hidden";  
    document.getElementById('months').value = 1;  
  } else if(byMonths) {
    document.getElementById('monthsSlider').style.visibility="visible";  
  }

  // Radio Button Toggles
  radioCountry.onchange = function() {
    if(radioCountry.checked) {
      radioContinent.checked = false;
      byContinents = false;
      byCountries = true;
      currentMonth = 'January';
      document.getElementById('months').value = 1;  
      drawMap();
    }
  }

  radioContinent.onchange = function() {
    if (radioContinent.checked) {
      radioCountry.checked = false;
      byCountries = false;
      byContinents = true;
      currentMonth = 'January';
      document.getElementById('months').value = 1;  
      drawMap();
    }
  }

  radioYear.onchange = function() {
    if(radioYear.checked) {
      radioMonth.checked = false;
      byMonths = false;
      byYear = true;
      document.getElementById('months').value = 1;  
      drawMap();
    }
  }

  radioMonth.onchange = function() {
    if (radioMonth.checked) {
      radioYear.checked = false;
      byYear = false;
      byMonths = true;
      currentMonth = 'January';
      drawMap();
    }
  }
}

// Update the map depending on which month is selected using the slider

function updateMonth(month) {
  getMonth(month)
  if (byCountries) {
    countryCodesColumn = tableData.getColumn('geoId');
    codes = shortenList(countryCodesColumn);  
    findMonthlyCountryCases(table, codes, month);
  }
  else if (byContinents) {
    continentsColumn = tableData.getColumn('continentExp');
    cons = shortenList(continentsColumn);
    findMonthlyContinentCases(table, cons, month);
  }
}

// -------------------------------------------- DRAW MAP --------------------------------------------
window.onload = function() {
  drawMap();
}

var monthNum = document.querySelector('input[id="months"]');
monthNum.addEventListener('input', function () {
  updateMonth(int(monthNum.value));
  drawMap();
}, false);

function drawMap() {
  google.charts.load('current', {
    'packages':['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });
  google.charts.setOnLoadCallback(drawRegionsMap);
}

function findCountry(code) {
  var country;
  for (var i = 0; i < countriesYear.length; i++){
    if (countriesYear[i][0]["v"] === code) country = countriesYear[i][0]["f"];
  }
  return country;
}

function drawRegionsMap() {
  var mapData = [];
  if(byCountries && byYear) {
    mapData = countriesYear;
    chartTitle = 'Cumulative Corona Virus Cases in Each Country in the Year 2020 (Exact Number)';
  }
  else if (byContinents && byYear) {
    mapData = continentsYear;
    chartTitle = 'Cumulative Corona Virus Cases in Each Continent in the Year 2020 (Exact Number)';
  }
  else if(byCountries && byMonths) {
    mapData = countriesMonth;
    chartTitle = 'Total Corona Virus Cases in Each Country in ' + currentMonth + ' (Exact Number)';
  }
  else if(byContinents && byMonths) {
    mapData = continentsMonth;
    chartTitle = 'Total Corona Virus Cases in Each Continent in ' + currentMonth + ' (Exact Number)';
  }
  var data = google.visualization.arrayToDataTable(mapData);

  var options;
  if(byCountries) {
    options = {
      colors: yearColor,
      legend: { position: 'bottom', alignment: 'end' },
    };
  }
  else if (byContinents) {
    options = {
      colors: yearColor,
      resolution: 'continents',
      legend: { position: 'bottom', alignment: 'end' },
    };
  }

  document.getElementById('page_title').innerHTML = pageTitle;
  document.getElementById('map_title').innerHTML = chartTitle;
  var chart = new google.visualization.GeoChart(document.getElementById('world_map'));

  google.visualization.events.addListener(chart, 'select', function () {
    var selection = chart.getSelection()[0];
    choice = data.getValue(selection.row, 0);
    madeChoice = true;
    var countryName = findCountry(choice);
    document.getElementById('graph_title').innerHTML = graphTitle + countryName + ' in 2020';
  });

  chart.draw(data, options);
}