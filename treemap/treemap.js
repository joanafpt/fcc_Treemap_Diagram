let w = 1150;
let h = 650;

const svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h + 100)
 // .style("margin-left", "200")
  .style("background-color", "white");//white

d3.json("https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json").then(function (data) {

  let root = d3.hierarchy(data)
    .sum(function (d) { return d.value })

  let colorsArr = ['#ffe6e6', ' #ff9999', '#ff704d', '#ffa64d', '#ffff80', '#ccff99', ' #e6ffff', '#33ffcc', '#00e6e6', '#d9b38c',
    '#f2e6ff', ' #ffb3ff', '#ffccee', '#e64d00', ' #ffffe6', '#ff0080', ' #cc6699', ' #66ccff'];
  d3.treemap()
    .size([w, h])
    //.padding(1)
    (root)

  const tooltip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .attr('class', 'invisible')
    .attr("data-value", '')

  //keep text within rects
  const nodes = svg.selectAll('g')
    .data(root.leaves())
    .enter()
    .append('g')
    .attr('transform', d => `translate(${d.x0}, ${d.y0})`)

  let companies = ['2600', 'Wii', 'NES', 'GB', 'DS', 'X360', ' PS3', 'PS2', 'SNES', 'GBA', 'PS4', '3DS', 'N64', 'PS', 'XB', 'PC', 'PSP', 'XOne'];
  let colori = d3.scaleOrdinal()
    .domain(companies)
    .range(colorsArr);


  nodes.append('rect')
    .attr('width', function (d) { return d.x1 - d.x0 })
    .attr('height', function (d) { return d.y1 - d.y0 })
    .style("stroke", "white")
    .style("fill", function (d) {
      return colori(d.data.category)
    })
    .attr('class', 'tile')
    .attr('data-name', function (d) { return d.data.name })
    .attr('data-category', function (d) { return d.data.category })
    .attr('data-value', function (d) { return d.data.value })
    .on('mouseover', function (d, i) {
      tooltip.attr('class', 'visible')
        .html("Name: " + d.data.name + "<br> Category: " + d.data.category + "<br> Value: " + d.data.value)
        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY + 5) + "px")
        .attr("data-value", d.data.value)
    })
    .on('mouseout', function (d) {
      tooltip.attr('class', 'invisible')
        .attr("data-value", '')
    })

  nodes.append('text')
    .selectAll('tspan')
    .data(function (d) { return d.data.name.split(' ') }) // splits the text on spaces
    .enter()
    .append('tspan')
    .attr('x', 2)
    .attr('y', (d, i) => 8 + i * 8)
    .text(d => d)
    .style("font-size", '10').style("font-family", "Calibri Light")

  let color = d3.scaleOrdinal()
    .domain(companies)
    .range(colorsArr);

  const squareWidth = 55;
  const squareHeight = 23;

  let legend = svg.append("g")
    .attr("id", "legend")
    .selectAll("rect")
    .data(colorsArr)
    .enter()
    .append("rect")
    .attr("width", squareWidth)
    .attr("height", squareHeight)
    .attr("y", "700")
    .attr("x", function (d, i) { return 35 + i * 60 })
    .attr("class", "legend-item")
    .attr('fill', function (d) {

      return color(d);

    })

  // console.log(companies)

  svg.append("g")
    .selectAll("text")
    .data(companies)
    .enter()
    .append("text")
    .attr("y", h + 90)
    .attr("x", function (d, i) {
      return 40 + i * (40 + 20)
    })
    .text(function (d) { return d }).style("font-family", "Calibri Light").style("font-size", "16")

});
