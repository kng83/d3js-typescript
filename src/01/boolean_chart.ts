import { scaleLinear, scaleBand } from 'd3-scale';
import { range } from 'd3-array'
import { select } from 'd3-selection';
import { curveStep, line } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis'
import { easeLinear } from 'd3-ease';
import { active, interrupt } from 'd3-transition';


import { interval, pipe } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';



let n = 30,
    random = () => Math.round(Math.random()),
    data = range(n).map(v => 0);

let svg = select("svg"),
    margin = { top: 20, right: 20, bottom: 20, left: 40 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

let x = scaleLinear()
    .domain([1, n - 2])
    .range([0, width]);

let y = scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

let superLine = line()
    .x((d, i) => x(i))
    .y((d, i) => y(d as any))
    .curve(curveStep);

g.append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(${0},${y(0)})`)
    .call(axisBottom(x).ticks(3));

g.append("g")
    .attr("class", "axis axis--y")
    .call(axisLeft(y).ticks(1));

g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(data)
    .attr("id", "cline")
    .attr("class", "clip-line")


function dataPusher(time, value) {

    interrupt(select(".clip-line").node())

    data.push(value);
    select(".clip-line")
        .transition()
        .duration(time)
        .ease(easeLinear)
        .on("start", tick)
    data.shift()
}


function tick() {
    let selection = select(".clip-line")
        .attr("d", superLine)
        .attr("transform", null)

    active(selection.node())
        .attr("transform", `translate(${x(0)},${0})`)
        .transition()
        .on("start", () => dataPusher(500, data[data.length - 1]))
}

interval(500).pipe(
    map((value) => {
        let random = Math.round(Math.random() + 0.3)
        return random
    }),
    distinctUntilChanged()
).subscribe(value => {
    dataPusher(500, value);
})



