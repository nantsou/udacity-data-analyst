
// used to map shortname and full name in update_info_function.
var nameMap = {
    "JP.HS":"Hiroshima",
    "JP.OY":"Okayama",
    "JP.SM":"Shimane",
    "JP.TT":"Tottori",
    "JP.YC":"Yamaguchi",
    "JP.SG":"Saga",
    "JP.FO":"Fukuoka",
    "JP.KM":"Kumamoto",
    "JP.MZ":"Miyazaki",
    "JP.EH":"Ehime",
    "JP.KG":"Kagawa",
    "JP.KC":"Kochi",
    "JP.OT":"Oita",
    "JP.TS":"Tokushima",
    "JP.AI":"Aichi",
    "JP.GF":"Gifu",
    "JP.IS":"Ishikawa",
    "JP.ME":"Mie",
    "JP.NN":"Nagano",
    "JP.SZ":"Shizuoka",
    "JP.TY":"Toyama",
    "JP.HK":"Hokkaido",
    "JP.FI":"Fukui",
    "JP.HG":"Hyogo",
    "JP.KY":"Kyoto",
    "JP.NR":"Nara",
    "JP.OS":"Osaka",
    "JP.SH":"Shiga",
    "JP.WK":"Wakayama",
    "JP.CH":"Chiba",
    "JP.IB":"Ibaraki",
    "JP.KN":"Kanagawa",
    "JP.ST":"Saitama",
    "JP.TC":"Tochigi",
    "JP.TK":"Tokyo",
    "JP.YN":"Yamanashi",
    "JP.AK":"Akita",
    "JP.AO":"Aomori",
    "JP.FS":"Fukushima",
    "JP.IW":"Iwate",
    "JP.MG":"Miyagi",
    "JP.NI":"Niigata",
    "JP.YT":"Yamagata",
    "JP.NS":"Nagasaki",
    "JP.KS":"Kagoshima",
    "JP.ON":"Okinawa",
    "JP.GM":"Gunma"
};

// setup the color dictionary used in choropleth map.
function set_fill_color(mapdata, color_set, num_level, max_val) {
    var color_set = colorbrewer[color_set][num_level];
    var fills_dict = {};
    var legend_arr = [];
    
    // create the dictionary of color set for legend.
    for (var i = 1; i <= num_level; i++) {
        fills_dict[i] = color_set[i - 1];
    }

    // setup the hue of the map.
    interval = 1.0/num_level;
    for (key in mapdata) {
        if (key === 'all') continue;

        // the color of the prefecture decided by
        // the ratio of local population to the maximum local population
        level = mapdata[key]['total_population']/max_val;
        for (var i = 1; i < num_level; i++) {
            if (level <= interval) {
                mapdata[key]['fillKey'] = 1;
                break;
            } else if (level > i*interval) {
                mapdata[key]['fillKey'] =  i + 1;
            }
        }
    }

    for (var i = 1; i <= num_level; i++) {
        val = parseFloat(Math.round(i * interval * max_val * 100) / 100).toFixed(2);
        legend_arr.push("<= " + val.toString() + "M");
    }
    
    // Setup the color for the connection of points in description with the geographic information.
    fills_dict['tokyo'] = "#92c5de";
    fills_dict['saitama'] = "#4d4d4d";
    fills_dict['kanagawa'] = "#b2df8a";
    fills_dict['aichi'] = "#1f78b4";
    fills_dict['okinawa'] = "#00441b";
    fills_dict['akita'] = "#54278f";
    fills_dict['toyama'] = "#dd3497";
    fills_dict['shimane'] = "#35978f";
    fills_dict['yamaguchi'] = "#bf812d";

    return {
        fills_dict: fills_dict,
        legend_arr: legend_arr
    };
}

// draw map hue legend with given color set and number of level.
function drawMapLegend(legend_arr, color_set, num_level) {

    var color = colorbrewer[color_set][num_level];

    var legend_color = d3.select("div#population div.detail_info").append("div")
                                      .style("position", "absolute")
                                      .style("top", "200px")
                                      .style("right", "0")
                                      .style("width", "150")
                                      .style("height", "200");

    var table = legend_color.append("table")
                            .attr("class","map-color-legend");

    var row = table.append("tr");

    row.append("td")
       .attr('class', 'td-legend-val')
       .attr('colspan', '2')
       .style('padding', '0')
       .style('font-size', '12pt')
       .text('POPULATION');
    
    // set the color to each level 
    for (var i = 0; i < legend_arr.length; i++) {
        row = table.append('tr');

        row.append('td')
           .attr('class', 'td-legend-icon')
           .append('i')
           .attr('class', 'fa fa-square fa-2x')
           .style('color', color[i]);

        row.append('td')
           .attr('class', 'td-legend-val')
           .style('font-size', '10pt')
           .text(legend_arr[i]);
    }
}

// draw map popup legend with given figures
function drawMapPopLegend() {
    var legend_icon = d3.select("div#population div.detail_info").append("div")
                                      .style("position", "absolute")
                                      .style("top", "5px")
                                      .style("right", "0");

    var table = legend_icon.append("table")
                         .attr("id","map-icon-legend");


    var row = table.append('tr');
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('MAP POPUP INFO:')
       .style('font-size', '12pt');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-users fa-lg');
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('POPULATION');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-child fa-2x');
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('DENSITY [People/Area]');

    row = table.append('tr');
    row.append('td');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-male fa-2x');
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('MALE PERCENTAGE');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-female fa-2x');
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('FEMALE PERCENTAGE');
}

// build the contents of popup information with given data of each prefecture
function map_popup_content_population(prefecture_name, data) {
    content = [
        '<div class="hoverinfo">',
        '<strong>',
        prefecture_name,
        '</strong>',
        '<table class="map-pop">',
        '<tr class="first-tr">',
        '<td class="td-icon"><i class="fa fa-users fa-lg"></i></td>',
        '<td class="td-val">',
        data.total_population,
        'M</td>',
        '<td class="td-icon"><i class="fa fa-child fa-2x"></i></td>',
        '<td class="td-val">',
        data.density,
        '</td></tr>',
        '<tr><td class="td-icon"><i class="fa fa-male fa-2x"></i></td>',
        '<td class="td-val">',
         data.percent_population_male,
        '%</td>',
        '<td class="td-icon"><i class="fa fa-female fa-2x"></i></td>',
        '<td class="td-val">',
         data.percent_population_female,
        '%</td></tr>',
        '</table>',
        '</div>'
    ].join('');

    return content;
}

// To add the dots on map
function build_bubbles_list() {

    var bubbles_list = [];

    bubbles_list.push({
        radius: 5,
        latitude: 35.7,
        longitude: 139.5,
        fillKey: "tokyo",
    });

    bubbles_list.push({
        radius: 5,
        latitude: 36.0,
        longitude: 139.5,
        fillKey: "saitama",
    });

    bubbles_list.push({
        radius: 5,
        latitude: 35.4,
        longitude: 139.3,
        fillKey: "kanagawa",
    });

    bubbles_list.push({
        radius: 5,
        latitude: 26.3,
        longitude: 127.8,
        fillKey: "okinawa",
    });

    bubbles_list.push({
        radius: 5,
        latitude: 35.1,
        longitude: 137.1,
        fillKey: "aichi",
    });

    bubbles_list.push({
        radius: 5,
        latitude: 39.7,
        longitude: 140.4,
        fillKey: "akita",
    });

    bubbles_list.push({
        radius: 5,
        latitude: 36.6,
        longitude: 137.2,
        fillKey: "toyama",
    });

    bubbles_list.push({
        radius: 5,
        latitude: 35.3,
        longitude: 132.9,
        fillKey: "shimane",
    });

    bubbles_list.push({
        radius: 5,
        latitude: 34.2,
        longitude: 131.4,
        fillKey: "yamaguchi",
    });

    return bubbles_list;
}

// draw choropleth map of Japan with setup fills dictionary
function drawMap(mapdata, fills_dict) {

    var map = new Datamap({
                element: document.getElementById('map'),
                scope: 'jpn',
                width: 1170,
                height: 800,
                responsive: true,
                projection: 'equirectangular',
                setProjection: function(element) {
                        var projection = d3.geo.equirectangular()
                        .scale(2100)
                        .center([142.5, 27.5])
                        .translate([element.offsetWidth/1.2, element.offsetHeight/1.2]);
                        var path = d3.geo.path()
                                     .projection(projection);
                        return {path: path, projection: projection};
                },
                geographyConfig: {
                    popupTemplate: function(geography, data) {
                        var content = '<div class="hoverinfo">' + geography.properties.name + '</div>';
                        if (data) {
                            return map_popup_content_population(geography.properties.name, data);
                        } else {
                            return '<div class="hoverinfo"><strong>' + geography.properties.name, + '</strong></div>';
                        }
                    },
                    borderColor: '#AFAFAF',
                    highlightBorderWidth: 2,
                    highlightBorderColor: '#000',
                    highlightFillColor: '#4dac26',
                },
                bubblesConfig: {
                    borderWidth: 0,
                    popupOnHover: false,
                    fillOpacity: 1,
                    highlightOnHover: false,
                },
                data: mapdata,
                fills: fills_dict
    });
    
    // add bubbles as the dot used to connect the points in description with geographic information
    map.bubbles(build_bubbles_list());

};

// draw doughnut (doughnut) chart
function drawDoughnutChartLegend(color_set) {
    var legend_bar = d3.select("#doughnut-age").append("div")
                                      .style("position", "absolute")
                                      .style("top", "50px")
                                      .style("right", "-70px");

    color = colorbrewer[color_set][6];

    var table = legend_bar.append('table')
                             .attr("class","doughnut-icon-legend");

    var row = table.append('tr');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[0]);

    row.append('td')
       .attr('class', 'td-legend-val')
       .text('UNDER 15');

    row = table.append('tr');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[1]);

    row.append('td')
       .attr('class', 'td-legend-val')
       .text('15 TO 29');

    row = table.append('tr');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[2]);

    row.append('td')
       .attr('class', 'td-legend-val')
       .text('30 TO 44');

    row = table.append('tr');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[3]);

    row.append('td')
       .attr('class', 'td-legend-val')
       .text('45 TO 64');

    row = table.append('tr');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[4]);

    row.append('td')
       .attr('class', 'td-legend-val')
       .text('65 TO 79');

    row = table.append('tr');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[5]);

    row.append('td')
       .attr('class', 'td-legend-val')
       .text('OVER 80');
}

function drawDoughnutChart(data, color_set) {

    var width = 250,
        height = 200,
        radius = Math.min(width, height) / 2;
    var margin = {top: 75, right: 30, bottom: 40, left: 0};
    var color = d3.scale.ordinal()
                  .range(colorbrewer[color_set][6]);

    var arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius - 60);

    var doughnut= d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.percentage; })
                .padAngle(.01);

    var svg = d3.select("div#population div.detail_info #doughnut-age")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom - 5);

    var g = svg.append("g")
               .attr("transform", "translate(" + (width + margin.left) / 2 + "," + (height + margin.top) / 2 + ")");

    var path = g.datum(data.all).selectAll("path")
                .data(doughnut)
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("fill", function(d, i) { return color(i); })
                .each(function(d){ this._current = d; });

    var val_text = g.datum(data.all).selectAll("text")
                    .data(doughnut)
                    .enter()
                    .append("text")
                    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                    .attr("class", "doughnut-val")
                    .attr("text-anchor", "middle")
                    .text(function(d) { return d.data.percentage + "%"; });

    // added the title of the doughnutchart
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", 75)
      .attr("y", 15)
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text('AGE STRUCTURE');
    
    // used to record the position of each segments "last time" for recovery when hoverout.
    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    }

    // update the segment area and percentage value in the segment when hover in and hover out.
    var update_func = function update(data, prefecture) {
                        g.datum(data[prefecture])
                         .selectAll("path")
                         .data(doughnut)
                         .transition()
                         .attrTween("d", arcTween);

                        g.datum(data[prefecture])
                         .selectAll("text.doughnut-val")
                         .data(doughnut)
                         .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                         .text(function(d) { return d.data.percentage + "%"; });
    }
    return update_func;
}

function drawBarLegend() {
    var legend_bar_title = d3.select("#bar-growth").append("div")
                             .style("position", "absolute")
                             .style("top", "-10px")
                             .style("right", "-100px");

    table = legend_bar_title.append('table')
                            .attr("class","bar-icon-legend")
                            .style("margin-top", "10px");

    row = table.append('tr');
    row.append('td')
       .attr('class', 'td-legend-val')
       .attr('colspan', '3')
       .style("font-weight", "bold")
       .text('POPULATION GROWTH');

    row = table.append('tr');
    row.append('td')
       .attr('class', 'td-legend-val')
       .attr('colspan', '3')
       .style("border-bottom", "1px solid black")
       .text('Natural Increase + Migratory Increase');

    row = table.append('tr');
    row.append('td')
       .attr('class', 'td-legend-val')
       .attr('colspan', '3')
       .text('Natural Increase = Births + Deaths');

    row = table.append('tr');
    row.append('td')
       .attr('class', 'td-legend-val')
       .attr('colspan', '3')
       .style("font-weight", "bold")
       .text('Migratory Increase = Immigrants + Emmigrants');

    var legend_bar_chart = d3.select("#bar-growth").append("div")
                             .style("position", "absolute")
                             .style("bottom", "30px")
                             .style("left", "0px");

    var table = legend_bar_chart.append('table')
                                .attr("class","bar-icon-legend")
                                .style("margin-top", "10px");

    row = table.append('tr');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', "#732A33");
    row.append('td')
       .attr('class', 'td-legend-val')
       .attr('colspan', '3')
       .text('Natural/Migratory Increase > 0');

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', "#20435B")
       .style('margin-left', '5px');
    row.append('td')
       .attr('class', 'td-legend-val')
       .attr('colspan', '3')
       .text('Natural/Migratory Increase < 0');
}

function drawBarChart(data) {

    var width = 250,
        height = 180,
        margin = {top: 20, right: 30, bottom: 40, left: 20};

    var color = ["#C14655", "#4087B6", "#732A33", "#20435B"];

    // get the minimum and maximum value to decide the range of x-axis
    var max = d3.max(data.all, function(d) {return +d.quantity});
    var min = d3.min(data.all, function(d) {return +d.quantity});

    var limit = Math.max(Math.abs(max), Math.abs(min));

    var x = d3.scale.linear()
              .domain([-limit, limit]).nice()
              .range([0, width]);

    var y = d3.scale.ordinal()
              .domain(["natural_increase", "migratory_increase"])
              .rangeRoundBands([margin.bottom, (height - margin.top)]);

    var x_axis = d3.svg.axis()
                   .scale(x)
                   .orient("bottom")
                   .tickValues([-limit, 0, limit])
                   .tickFormat(d3.format(",.2f"))
                   .tickSize(3);

    var svg = d3.select("div#population div.detail_info #bar-growth")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom + 5);

    var g = svg.append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var rect = g.selectAll("rect")
                .data(data.all)
                .enter()
                .append("rect")
                .attr("x", function(d) { return x(Math.min(0, d.quantity)); })
                .attr("y", function(d) {
                            var posit_y = 0;

                            if (["Births", "Deaths", "natural_increase"].indexOf(d.label) !== -1) {
                                posit_y = y("natural_increase")  + margin.top - 15;
                            } else {
                                posit_y = y("migratory_increase") + margin.top - 15;
                            }

                            if (d.label.endsWith("increase")) {
                                posit_y -= 10 ;
                            }

                            return posit_y;
                            })
                .attr("width", function(d) { return Math.abs(x(d.quantity) - x(0)); })
                .attr("height", function(d) {

                                return d.label.endsWith("increase")? "40":"20"
                            })
                .attr("fill", function(d){
                                if (d.label.endsWith("increase")) {
                                    return d.quantity > 0 ? color[2]:color[3];
                                } else {
                                    return d.quantity > 0 ? color[0]:color[1];
                                }
                            });

    // add title of the bar chart
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .attr("class", "bar-title")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("POPULATION GROWTH");

    var sign_color = '';
    var sign = "";
    if (data.all[0].quantity > 0) {
        sing_color = color[0];
        sign = "\uf102";
    } else if (data.all[0].quantity < 0){
        sing_color = color[1];
        sign = "\uf103";
    } else {
        sing_color = "black";
        sign = "\uf102";
    }

    svg.append("text")
       .attr("class", "growth-sign")
       .style("font-family", "FontAwesome")
       .attr("x", margin.left + 15)
       .attr("y", 45)
       .style("font-size", "32px")
       .style("font-weight", "bold")
       .style("fill", sing_color)
       .text(sign);

    svg.append("text")
       .attr("x", width/2)
       .attr("y", 40)
       .attr("text-anchor", "middle")
       .attr("class", "growth-quantity")
       .style("font-size", "16px")
       .style("font-weight", "bold")
       .style("fill", sing_color)
       .text(data.all[0].quantity + " M People");

    // add x axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + (margin.left) + "," + (height + margin.top - 40) + ")")
      .call(x_axis);

    // add y axis line manually
    svg.append("line")
       .style("stroke", "gray")
       .style("stroke-dasharray", "4,4")
       .attr("x1", (x(0) + margin.left))
       .attr("y1", margin.top + 30)
       .attr("x2", (x(0) + margin.left))
       .attr("y2", height + margin.top - 30);

    // add title of the bar chart
    svg.append("text")
        .attr("x", (width / 2) + margin.left)
        .attr("y", 190)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("number of people in million");

    // add label for "Births"
    svg.append("text")
        .attr("x", (x(0) + margin.left + 30))
        .attr("y", 75)
        .attr("dy", ".32em")
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Births");

    // add label for "Deaths"
    svg.append("text")
        .attr("x", (x(0) + margin.left + 10) - 45)
        .attr("y", 75)
        .attr("dy", ".32em")
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Deaths");

    // add label for "Immigrants"
    svg.append("text")
        .attr("x", (x(0) + margin.left + 50))
        .attr("y", 135)
        .attr("dy", ".32em")
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Immigrants");

    // add label for "Emmigrants"
    svg.append("text")
        .attr("x", (x(0) + margin.left + 10) - 60)
        .attr("y", 135)
        .attr("dy", ".32em")
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Emmigrants");

    // update the width of each bar and the value of population growth when hover in and hover out
    var update_func = function update(data, prefecture) {

                        var max = d3.max(data[prefecture], function(d) {return +d.quantity});
                        var min = d3.min(data[prefecture], function(d) {return +d.quantity});
                        var limit = Math.max(Math.abs(max), Math.abs(min));

                        var x = d3.scale.linear()
                                  .domain([-limit, limit]).nice()
                                  .range([0, width]);

                        var x_axis = d3.svg.axis()
                                       .scale(x)
                                       .orient("bottom")
                                       .tickValues([-limit, 0,  limit])
                                       .tickFormat(d3.format(",.2f"))
                                       .tickSize(3);

                        svg.select("g.x.axis")
                           .call(x_axis);

                        svg.selectAll("rect")
                           .data(data[prefecture])
                           .attr("x", function(d) { return x(Math.min(0, d.quantity)); })
                           .attr("width", function(d) { return Math.abs(x(d.quantity) - x(0)); })
                           .attr("height", function(d) {
                                return d.label.endsWith("increase")? "40":"20"
                            })
                           .attr("fill", function(d){
                                if (d.label.endsWith("increase")) {
                                    return d.quantity > 0 ? color[2]:color[3];
                                } else {
                                    return d.quantity > 0 ? color[0]:color[1];
                                }
                            });

                        var sign_color = '';
                        var sign = "";
                        if (data[prefecture][0].quantity > 0) {
                            sing_color = color[0];
                            sign = "\uf102";
                        } else if (data[prefecture][0].quantity < 0){
                            sing_color = color[1];
                            sign = "\uf103";
                        } else {
                            sing_color = "black";
                            sign = "\uf102";
                        }

                        svg.select("text.growth-sign")
                           .style("fill", sing_color)
                           .text(sign);

                        svg.select("text.growth-quantity")
                           .style("fill", sing_color)
                           .text(data[prefecture][0].quantity + " M People");

    }
    return update_func;
}

// collect calculated the necessary data from csv file
function collect_data(data) {
    // data used to create doughnut chart
    var doughnut_age_data = {};
    
    // data used to create bar chart
    var bar_growth_data = {};
    
    // data used to create map
    var mapdata = {};
    
    // value used to create map's hue legend
    var population_max = 0;

    // the list of the items used in doughnut chart
    age_list = ["under_15", "15_29", "30_44", "45_64", "65_79", "over_80"];

    // the list of the items used in bar chart
    growth_list = ['Births', 'Deaths', 'Immigrants', 'Emmigrants'];
    
    // scan all the data read from csv file
    data.forEach(function(d){

            // create the dictionary of each prefecture
            doughnut_age_data[d['prefecture']] = [];
            bar_growth_data[d['prefecture']] = [];

            // calculate population growth and format the number with unit M
            var local_population_growth = [+d['Births'],
                                       -d['Deaths'],
                                       +d['Immigrants'],
                                       -d['Emmigrants']].reduce(function(pv, cv) {
                                                                    return Number(pv) + Number(cv);
                                                                   }, 0)/1000000;

            // calculate natural increase and format the number with unit M
            var natural_increase = (d['Births'] - d['Deaths'])/1000000;

            // calculate migratory increase and format the number with unit M
            var migratory_increase = (d['Immigrants'] - d['Emmigrants'])/1000000;

            // set population growth information to the dictionary of each prefecture
            bar_growth_data[d['prefecture']].push({
                        'label': 'local_population_growth',
                        'quantity': parseFloat(local_population_growth).toFixed(3)
                        });

            bar_growth_data[d['prefecture']].push({
                        'label': 'natural_increase',
                        'quantity': parseFloat(natural_increase).toFixed(3)
                        });

            bar_growth_data[d['prefecture']].push({
                        'label': 'migratory_increase',
                        'quantity': parseFloat(migratory_increase).toFixed(3)
                        });

            // collect the data to build doughnut chart and bar chart.
            for (var key in d) {
                if (d.hasOwnProperty(key)) {
                    // collect the data to build doughnut chart to present age structure.
                    if (age_list.indexOf(key) !== -1) {
                        var percentage = parseFloat(d[key] / d['total_population'] * 100).toFixed(0);
                        data_set = {'label': key, 'percentage': percentage};
                        doughnut_age_data[d['prefecture']].push(data_set);
                    }

                    // collect the data to build bar chart to present population growth.
                    if (growth_list.indexOf(key) !== -1) {
                        if (['Births', 'Immigrants'].indexOf(key) !== -1) {
                            data_set = {'label': key, 'quantity': parseFloat(+d[key]/1000000).toFixed(3)};
                        } else {
                            data_set = {'label': key, 'quantity': parseFloat(-d[key]/1000000).toFixed(3)};
                        }

                        bar_growth_data[d['prefecture']].push(data_set);
                    }
                }
            }

            if (d['prefecture'] !== 'all') {
                population_max = Math.max(d['total_population']/1000000, population_max);
            }

            // collect the data used in choropleth
            mapdata[d['prefecture']] = {};
            mapdata[d['prefecture']]['total_population'] = parseFloat(d['total_population'] / 1000000).toFixed(2);
            mapdata[d['prefecture']]['percent_population_male'] = Math.floor(d['total_population_male'] / d['total_population'] * 100, 2);
            mapdata[d['prefecture']]['percent_population_female'] = Math.floor(d['total_population_female'] / d['total_population'] * 100, 2);
            mapdata[d['prefecture']]['density'] = parseFloat(d['density']).toFixed(2);

    });

    return {
        mapdata: mapdata,
        doughnut_age_data: doughnut_age_data,
        bar_growth_data: bar_growth_data,
        population_max: population_max,
    };
}

// main update function used when hover in and hover out
function update_info(collected_data, update_func_set) {

    $('path').on('mouseover', function() {
        detail_info = d3.select(".detail_info");
        short_name = $(this).attr('class').split(' ')[1];
        detail_info.select('.prefecture_name').text(nameMap[short_name]);
        update_func_set['update_func_age'](collected_data.doughnut_age_data, short_name);
        update_func_set['update_func_growth'](collected_data.bar_growth_data, short_name);

    }).on('mouseout', function() {
        detail_info.select('.prefecture_name').text('Japan');
        update_func_set['update_func_age'](collected_data.doughnut_age_data, 'all');
        update_func_set['update_func_growth'](collected_data.bar_growth_data, 'all');

    });
};

create_graph = function (collected_data) {

    var map_color_set = 'YlOrBr';
    var update_func_set = {};
    var auxiliary = set_fill_color(collected_data.mapdata, map_color_set, 9, collected_data.population_max);

    // draw map
    drawMap(collected_data.mapdata, auxiliary.fills_dict);
    drawMapLegend(auxiliary.legend_arr, map_color_set, 9);
    drawMapPopLegend();

    // draw doughnutchart
    var update_func_age = drawDoughnutChart(collected_data.doughnut_age_data, 'Paired');
    drawDoughnutChartLegend('Paired');

    // draw bar chart
    var update_func_growth = drawBarChart(collected_data.bar_growth_data);
    drawBarLegend();

    // assign the updating function used in hover events
    update_func_set['update_func_age'] = update_func_age;
    update_func_set['update_func_growth'] = update_func_growth;

    // setup hover events treatment
    update_info(collected_data, update_func_set);
}
