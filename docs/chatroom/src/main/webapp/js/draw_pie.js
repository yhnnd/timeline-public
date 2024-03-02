function draw_pie(nameScope, dataScope, width, names, dataset) {
    let drawingField = d3.select(dataScope);
    let svg = drawingField
        .append("svg")
        .attr("width", width + "px")
        .attr("height", width + "px");
    let pie = d3.layout.pie();
    let outerRadius = width / 2;
    let innerRadius = width / 4;
    let arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    let arcs = svg
        .selectAll("g")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
    let color = d3.scale.category10();
    arcs.append("path")
        .attr("fill", function (d, i) {
            return color(i);
        })
        .attr("d", function (d) {
            return arc(d);
        });
    arcs.append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(function (d) {
            return d.value;
        });
    for (let i in dataset) {
        d3.select(nameScope)
            .append("span")
            .style("display", "inline-block")
            .style("width", "calc(100% / " + dataset.length + ")")
            .style("padding", "10px")
            .style("background", color(i))
            .style("color", "white")
            .text(names[i]);
    }
}