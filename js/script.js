/*
 * Author: Wang Zhuochun
 * Last Edit: 09/Jun/2012 06:21 PM
 */

(function($) {
    // enable tooltips
    $("header li.visible-desktop").tooltip({placement:'bottom', selector:"a[rel=tooltip]"});
    $("#tab-lists, #pane-contents").tooltip({selector:"a[rel=tooltip]"})
})(jQuery);

/* Dashboard Charts */
// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart', 'gauge']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table, instantiates
// the pie chart, passes in the data and draws it.
function drawChart() {
    // Create the data table.
    var dataPie = new google.visualization.DataTable();
    dataPie.addColumn('string', 'Topping');
    dataPie.addColumn('number', 'Slices');
    dataPie.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ]);
    var optionsPie = { 'title'  : 'How Much Pizza I Ate Last Night', };
    var chartPie = new google.visualization.PieChart(document.getElementById('pie-chart'));
    chartPie.draw(dataPie, optionsPie);

    /* scatter chart */
    var dataScatter = google.visualization.arrayToDataTable([
        ['Age', 'Weight'],
        [ 8,      12],
        [ 4,      5.5],
        [ 11,     14],
        [ 4,      5],
        [ 3,      3.5],
        [ 6.5,    7]
    ]);
    var optionsScatter = {
        title: 'Age vs. Weight comparison',
        hAxis: {title: 'Age', minValue: 0, maxValue: 15},
        vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
        legend: 'none'
    };
    var chartScatter = new google.visualization.ScatterChart(document.getElementById('scatter-chart'));
    chartScatter.draw(dataScatter, optionsScatter);

    /* combo chart */
    var dataCombo = google.visualization.arrayToDataTable([
        ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
        ['2004/05',  165,      938,         522,             998,           450,      614.6],
        ['2005/06',  135,      1120,        599,             1268,          288,      682],
        ['2006/07',  157,      1167,        587,             807,           397,      623],
        ['2007/08',  139,      1110,        615,             968,           215,      609.4],
        ['2008/09',  136,      691,         629,             1026,          366,      569.6]
    ]);

    var optionsCombo = {
        title : 'Monthly Coffee Production by Country',
        vAxis: {title: "Cups"},
        hAxis: {title: "Month"},
        seriesType: "bars",
        series: {5: {type: "line"}}
    };

    var chartCombo = new google.visualization.ComboChart(document.getElementById('combo-chart'));
    chartCombo.draw(dataCombo, optionsCombo);

    /* bar chart */
    var dataBar = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2004',  1000,      400],
        ['2005',  1170,      460],
        ['2006',  660,       1120],
        ['2007',  1030,      540]
    ]);

    var optionsBar = {
        title: 'Company Performance',
        vAxis: {title: 'Year',  titleTextStyle: {color: 'red'}}
    };

    var chartBar = new google.visualization.BarChart(document.getElementById('bar-chart'));
    chartBar.draw(dataBar, optionsBar);

    /* bubble chart */
    var dataBubble = google.visualization.arrayToDataTable([
        ['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
        ['CAN',    80.66,              1.67,      'North America',  33739900],
        ['DEU',    79.84,              1.36,      'Europe',         81902307],
        ['DNK',    78.6,               1.84,      'Europe',         5523095],
        ['EGY',    72.73,              2.78,      'Middle East',    79716203],
        ['GBR',    80.05,              2,         'Europe',         61801570],
        ['IRN',    72.49,              1.7,       'Middle East',    73137148],
        ['IRQ',    68.09,              4.77,      'Middle East',    31090763],
        ['ISR',    81.55,              2.96,      'Middle East',    7485600],
        ['RUS',    68.6,               1.54,      'Europe',         141850000],
        ['USA',    78.09,              2.05,      'North America',  307007000]
    ]);

    var optionsBubble = {
        title: 'Correlation between life expectancy, fertility rate and population of some world countries (2010)',
        hAxis: {title: 'Life Expectancy'},
        vAxis: {title: 'Fertility Rate'},
        bubble: {textStyle: {fontSize: 11}}
    };

    var chartBubble = new google.visualization.BubbleChart(document.getElementById('bubble-chart'));
    chartBubble.draw(dataBubble, optionsBubble);

    /* gauge */
    var dataGauge = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Memory', 80],
        ['CPU', 55],
        ['Network', 68]
    ]);

    var optionsGauge = {
        width: 400, height: 120,
        redFrom: 90, redTo: 100,
        yellowFrom:75, yellowTo: 90,
        minorTicks: 5
    };

    var chartGauge = new google.visualization.Gauge(document.getElementById('gauge-chart'));
    chartGauge.draw(dataGauge, optionsGauge);

    /* stepped area chart */
    var dataStep = google.visualization.arrayToDataTable([
        ['Director (Year)',  'Rotten Tomatoes', 'IMDB'],
        ['Alfred Hitchcock (1935)', 8.4,         7.9],
        ['Ralph Thomas (1959)',     6.9,         6.5],
        ['Don Sharp (1978)',        6.5,         6.4],
        ['James Hawes (2008)',      4.4,         6.2]
    ]);

    var optionsStep = {
        title: 'The decline of \'The 39 Steps\'',
        vAxis: {title: 'Accumulated Rating'},
        isStacked: true
    };

    var chartStep = new google.visualization.SteppedAreaChart(document.getElementById('step-chart'));
    chartStep.draw(dataStep, optionsStep);
}
