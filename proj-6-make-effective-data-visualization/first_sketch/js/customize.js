
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
}

function update_detail_info(pie_age_data, mapdata) {
    $('path').on('mouseover', function() {
        detail_info = d3.select('#detail_info');
        short_name = $(this).attr('class').split(' ')[1];
        detail_info.select('.prefecture_name').text(nameMap[short_name]);
        update_func_age(pie_age_data, short_name);
        update_func_growth(bullet_growth_data, short_name);
    }).on('mouseout', function() {
        detail_info.select('.prefecture_name').text('Japan');
        update_func_age(pie_age_data, 'all');
        update_func_growth(bullet_growth_data, 'all');
    });
};

function set_fill_color(mapdata, color_set, num_level, max_val) {
    var color_set = colorbrewer[color_set][num_level];
    var fills_dict = {}
    var legend_arr = []

    for (var i = 1; i <= num_level; i++) {
        fills_dict[i] = color_set[i - 1];
    }

    interval = 1.0/num_level;
    for (key in mapdata) {
        if (key === 'all') continue;
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
        val = parseFloat(Math.round(i * interval*max_val * 100) / 100).toFixed(2);
        legend_arr.push("<= " + val.toString() + "M");
    }

    return {
        fills_dict: fills_dict,
        legend_arr: legend_arr
    }

}
/*
function drawMapLegend(legend_arr, color_set, num_level) {
    var linear = d3.scale.ordinal()
                   .domain(legend_arr)
                   .range(colorbrewer[color_set][num_level]);

    var legend_color = d3.select("#detail_info").append("svg")
                                      .attr("id","map-color-legend")
                                      .style("position", "absolute")
                                      .style("top", "40px")
                                      .style("right", "0")
                                      .style("width", "826")
                                      .style("height", "40");

    legend_color.append("g")
              .attr("class", "legendOrdinal");


    var legendOrdinal = d3.legend.color()
                          .shapeWidth(90)
                          .orient('horizontal')
                          .scale(linear);

    legend_color.select(".legendOrdinal")
              .call(legendOrdinal);
}
*/

function drawMapLegend(legend_arr, color_set, num_level) {
    var linear = d3.scale.ordinal()
                   .domain(legend_arr)
                   .range(colorbrewer[color_set][num_level]);

    var legend_color = d3.select("#detail_info").append("svg")
                                      .attr("id","map-color-legend")
                                      .style("position", "absolute")
                                      .style("top", "40px")
                                      .style("right", "0")
                                      .style("width", "826")
                                      .style("height", "40");

    legend_color.append("g")
              .attr("class", "legendOrdinal");


    var legendOrdinal = d3.legend.color()
                          .shapeWidth(90)
                          .orient('horizontal')
                          .scale(linear);

    legend_color.select(".legendOrdinal")
              .call(legendOrdinal);
}

function drawMapPopLegend() {
    var legend_icon = d3.select("#detail_info").append("div")
                                      .style("position", "absolute")
                                      .style("top", "5px")
                                      .style("right", "0");

    row = legend_icon.append('table')
                     .attr("id","map-icon-legend")
                     .append('tr')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-users fa-lg')
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('POPULATION')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-home fa-2x')
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('HOUSEHOLDS')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-male fa-2x')
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('MALE PERCENTAGE')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-female fa-2x')
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('FEMALE PERCENTAGE')


}

function map_popup_content(prefecture_name, data) {
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
        '<td class="td-icon"><i class="fa fa-home fa-2x"></i></td>',
        '<td class="td-val">',
        data.total_households,
        'M</td></tr>',
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
    return content
}

function drawMap(mapdata, fills_dict) {
    var map = new Datamap({
                element: document.getElementById('map'),
                scope: 'jpn',
                height: 800,
                responsive: true,
                projection: 'equirectangular',
                setProjection: function(element) {
                        var projection = d3.geo.equirectangular()
                        .scale(2100)
                        .center([143, 27.5])
                        .translate([element.offsetWidth/1.2, element.offsetHeight/1.2]);
                        var path = d3.geo.path()
                                     .projection(projection);
                        return {path: path, projection: projection};
                },
                geographyConfig: {
                    popupTemplate: function(geography, data) {
                        var content = '<div class="hoverinfo">' + geography.properties.name + '</div>';
                        if (data) {
                            return map_popup_content(geography.properties.name, data);
                        } else {
                            return '<div class="hoverinfo"><strong>' + geography.properties.name, + '</strong></div>';
                        }
                    },
                    borderColor: '#AFAFAF',
                    highlightBorderWidth: 2,
                    highlightBorderColor: '#000',
                    highlightFillColor: '#4dac26',
                },
                data: mapdata,
                fills: fills_dict
    });
};

/*
function drawPieChartLegend(color_set) {
    var linear = d3.scale.ordinal()
                   .domain(["under_15", "15_29", "30_44", "45_64", "65_79", "over_80"])
                   .range(colorbrewer[color_set][6]);

    var legend_svg = d3.select("div#detail_info #pie-chart")
                       .append("svg")
                       .style("height", "50px")
                       .style("width", "250");

    legend_svg.append("g")
              .attr("class", "legend-pie");

    var legend_pie = d3.legend.color()
                          .shapeWidth(62)
                          .orient('horizontal')
                          .scale(linear);

    legend_svg.select(".legend-pie")
              .call(legend_pie);
}
*/

function drawPieChartLegend(color_set) {
    var legend_bullet = d3.select("#pie-chart").append("div")
                                      .style("position", "absolute")
                                      .style("bottom", "0")
                                      .style("right", "0");

    color = colorbrewer[color_set][6];

    row = legend_bullet.append('table')
                     .attr("id","pie-icon-legend")
                     .append('tr')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[0])
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('UNDER_15')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[1])
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('15_29')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[2])
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('30_44')

    row = legend_bullet.append('table')
                     .attr("id","bullet-icon-legend")
                     .append('tr')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[3])
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('45_64')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[4])
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('65_79')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', color[5])
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('over_80')
}

function drawPieChart(data, color_set) {

    var width = 250,
        height = 180,
        radius = Math.min(width, height) / 2;
    var margin = {top: 50, right: 30, bottom: 40, left: 30};
    var color = d3.scale.ordinal()
                  .range(colorbrewer[color_set][6]);

    var arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius - 60);

    var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.percentage; })
                .padAngle(.01);

    var svg = d3.select("div#detail_info #pie-chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom - 5);

    var g = svg.append("g")
               .attr("transform", "translate(" + (width + margin.left) / 2 + "," + (height + margin.top) / 2 + ")");


    var path = g.datum(data.all).selectAll("path")
                .data(pie)
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("fill", function(d, i) { return color(i); })
                .each(function(d){ this._current = d; });

    var val_text = g.datum(data.all).selectAll("text")
                    .data(pie)
                    .enter()
                    .append("text")
                    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                    .attr("class", "pie-val")
                    .attr("text-anchor", "middle")
                    .text(function(d) { return d.data.percentage + "%"; });

    // added the title of the pie chart
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", 2.5 * margin.left)
      .attr("y", 15)
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text('Classified By Age');

    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
    }

    var update_func = function update(data, prefecture) {
                        g.datum(data[prefecture])
                         .selectAll("path")
                         .data(pie)
                         .transition()
                         .attrTween("d", arcTween);

                        g.datum(data[prefecture])
                         .selectAll("text.pie-val")
                         .data(pie)
                         .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                         .text(function(d) { return d.data.percentage + "%"; });
    }
    return update_func;
}

function drawBulletLegend() {
    var legend_bullet = d3.select("#bullet-chart").append("div")
                                      .style("position", "absolute")
                                      .style("bottom", "0")
                                      .style("right", "0");

    row = legend_bullet.append('table')
                     .attr("id","bullet-icon-legend")
                     .append('tr')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', "#C14655")
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('INCREASE')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', "#4087B6")
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('DECREASE')

    row = legend_bullet.append('table')
                     .attr("id","bullet-icon-legend")
                     .append('tr')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', "#D2D2D2")
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('SUB NET GROWTH')

    row.append('td')
       .attr('class', 'td-legend-icon')
       .append('i')
       .attr('class', 'fa fa-square fa-lg')
       .style('color', "#4D4D4D")
    row.append('td')
       .attr('class', 'td-legend-val')
       .text('TOTAL NET GROWTH')


}

function drawBulletChart(data) {

    var width = 250,
        height = 180,
        margin = {top: 40, right: 30, bottom: 40, left: 150};

    var color = ["#C14655", "#4087B6", "#D2D2D2", "#4D4D4D"];

    var max = d3.max(data.all, function(d) {return +d.quantity});
    var min = d3.min(data.all, function(d) {return +d.quantity});

    var limit = Math.max(Math.abs(max, min));

    var x = d3.scale.linear()
              .domain([-limit, limit]).nice()
              .range([0, width]);

    var y = d3.scale.ordinal()
              .domain(["Natural", "Domestic Migratory"])
              .rangeRoundBands([0, height]);

    var x_axis = d3.svg.axis()
                   .scale(x)
                   .orient("bottom")
                   .tickValues([-limit, 0, limit])
                   .tickSize(3);

    var y_axis = d3.svg.axis()
                   .scale(y)
                   .orient("left")
                   .tickSize(1);

    var svg = d3.select("div#detail_info #bullet-chart")
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

                            if (d.label === "net_growth_quantity") {
                                return (y("Natural") + y("Domestic Migratory")) / 2 - height/ 2 + margin.top - 10;
                            }

                            if (["Births", "Deaths", "net_natural"].indexOf(d.label) !== -1) {
                                posit_y = y("Natural")  + margin.top - 10;
                            } else {
                                posit_y = y("Domestic Migratory") + margin.top - 10;
                            }

                            if (d.label.startsWith("net")) {
                                posit_y -= 10 ;
                            }

                            return posit_y;
                            })
                .attr("width", function(d) { return Math.abs(x(d.quantity) - x(0)); })
                .attr("height", function(d) {
                                if (d.label === "net_growth_quantity") {
                                return (height);
                                }

                                return d.label.startsWith("net")? "40":"20"
                            })
                .attr("fill", function(d){
                                if (d.label === "net_growth_quantity") {
                                return color[3];
                                }

                                return d.label.startsWith("net")? color[2]: d.quantity > 0 ? color[0]:color[1];
                            });


    svg.append("line")
       .style("stroke", "gray")
       .style("stroke-dasharray", "4,4")
       .attr("x1", (x(0) + margin.left))
       .attr("y1", margin.top - 10)
       .attr("x2", (x(0) + margin.left))
       .attr("y2", height + margin.top - 10);

    svg.append("text")
        .attr("x", (width / 2) + 10)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .attr("class", "bullet-title")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Population Growth " + data.all[0].quantity + " M People");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + margin.left + "," + (height + margin.top - 10) + ")")
      .call(x_axis);

    var y_x_posit = x(0) + margin.left;

    svg.append("g")
       .attr("class", "y axis")
       .attr("transform", "translate(" + (margin.left) + "," + (margin.top - 10) + ")")
       .call(y_axis);

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
                                       .tickValues([-limit, 0, limit])
                                       .tickSize(3);

                        svg.select("g.x.axis")
                           .call(x_axis);

                        svg.selectAll("rect")
                            .data(data[prefecture])
                           .attr("x", function(d) { return x(Math.min(0, d.quantity)); })
                           .attr("width", function(d) { return Math.abs(x(d.quantity) - x(0)); })
                           .attr("height", function(d) {
                                if (d.label === "net_growth_quantity") {
                                return (height);
                            }
                                return d.label.startsWith("net")? "40":"20"
                            })
                           .attr("fill", function(d){
                                if (d.label === "net_growth_quantity") {
                                return color[3];
                                }

                                return d.label.startsWith("net")? color[2]: d.quantity > 0 ? color[0]:color[1]
                            });

                        svg.select("text.bullet-title")
                           .text("Population Growth " + data[prefecture][0].quantity + " M People");
    }
    return update_func;
}

function collect_data_population(data) {
    var detail_data = {};
    var pie_age_data = {};
    var bullet_growth_data = {};
    var mapdata = {};
    var max_val = 0;
    var min_val = 0;


    age_list = ["under_15", "15_29", "30_44", "45_64", "65_79", "over_80"];
    growth_list = ['Births', 'Deaths', 'Immigrants', 'Emmigrants'];
    data.forEach(function(d){
            detail_data[d['prefecture']] = {};
            pie_age_data[d['prefecture']] = [];
            bullet_growth_data[d['prefecture']] = [];

            var net_growth_quantity = [+d['Births'],
                                       -d['Deaths'],
                                       +d['Immigrants'],
                                       -d['Emmigrants']].reduce(function(pv, cv) {
                                                                    return Number(pv) + Number(cv);
                                                                   }, 0)/1000000;
            var net_natural = (d['Births'] - d['Deaths'])/1000000;
            var net_migratory = (d['Immigrants'] - d['Emmigrants'])/1000000;

            bullet_growth_data[d['prefecture']].push({'label': 'net_growth_quantity', 'quantity': parseFloat(net_growth_quantity).toFixed(3)});
            bullet_growth_data[d['prefecture']].push({'label': 'net_natural', 'quantity': parseFloat(net_natural).toFixed(3)});
            bullet_growth_data[d['prefecture']].push({'label': 'net_migratory', 'quantity': parseFloat(net_migratory).toFixed(3)});

            for (var key in d) {
                if (d.hasOwnProperty(key)) {
                    detail_data[d['prefecture']][key] = d[key];
                    if (age_list.indexOf(key) !== -1) {
                        var percentage = parseFloat(d[key] / d['total_population'] * 100).toFixed(0);
                        data_set = {'label': key, 'percentage': percentage};
                        pie_age_data[d['prefecture']].push(data_set);
                    }

                    if (growth_list.indexOf(key) !== -1) {
                        if (['Births', 'Immigrants'].indexOf(key) !== -1) {
                            data_set = {'label': key, 'quantity': parseFloat(+d[key]/1000000).toFixed(3)};
                        } else {
                            data_set = {'label': key, 'quantity': parseFloat(-d[key]/1000000).toFixed(3)};
                        }

                        bullet_growth_data[d['prefecture']].push(data_set);
                    }
                }
            }

            if (d['prefecture'] !== 'all') {
                //max_val = Math.max(d['density'], max_val);
                //min_val = Math.min(d['density'], min_val);
                max_val = Math.max(d['total_population']/1000000, max_val);
                min_val = Math.min(d['total_population']/1000000, min_val);
            }

            mapdata[d['prefecture']] = {};
            mapdata[d['prefecture']]['total_population'] = parseFloat(d['total_population'] / 1000000).toFixed(2);
            mapdata[d['prefecture']]['total_households'] = parseFloat(d['total_households'] / 1000000).toFixed(2);
            mapdata[d['prefecture']]['percent_population_male'] = Math.floor(d['total_population_male'] / d['total_population'] * 100, 2);
            mapdata[d['prefecture']]['percent_population_female'] = Math.floor(d['total_population_female'] / d['total_population'] * 100, 2);
            mapdata[d['prefecture']]['density'] = parseFloat(d['density']).toFixed(2);

    });
    return {
        detail_data: detail_data,
        mapdata: mapdata,
        pie_age_data: pie_age_data,
        bullet_growth_data: bullet_growth_data,
        max_val: max_val,
        min_val: min_val,

    }
}

function create_graph(topic) {

    d3.csv("data/population.csv", function(error, data){
        collected_data = collect_data_population(data);
        detail_data = collected_data.detail_data;
        var auxiliary = set_fill_color(collected_data.mapdata, 'YlOrBr', 9, collected_data.max_val);

        drawMap(collected_data.mapdata, auxiliary.fills_dict);
        drawMapLegend(auxiliary.legend_arr, 'YlOrBr',9);
        drawMapPopLegend();
        pie_age_data = collected_data.pie_age_data;
        bullet_growth_data = collected_data.bullet_growth_data;
        update_func_age = drawPieChart(pie_age_data, 'PuOr');
        drawPieChartLegend('PuOr');
        update_detail_info(pie_age_data, collected_data.mapdata);
        update_func_growth = drawBulletChart(bullet_growth_data);
        drawBulletLegend();
    });
}