export const cssTemplate = document.createElement('style')
cssTemplate.innerHTML = 
`
#chart {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-items: center;
}

#chartTitle {
    grid-area: 1 / 1;
    align-self: flex-start;
    margin: 0;
}

#yAxis {
    border-left: 2px solid black;
    grid-area: 1 / 1;
}

#yAxisRow {
    outline: 1px solid black;
    grid-area: 1 / 1;
}

#yAxisValue {
    display: inline;
    grid-area: 1 / 1;
}

#xAxis {
    display: flex;
    align-self: flex-end;
    border-top: 2px solid black;
    gap: 5px;
    grid-area: 1 / 1;
}

#xAxisLabel {
    text-align: center;
    overflow: hidden;
    grid-area: 1 / 1;
    // word-wrap: break-word;
}

#svgGraph {
    display: flex;
	justify-self: center;
    grid-area: 1 / 1;
    z-index: 1;
}

#polyline {
    fill: none;
    stroke-width: 3;
}

#slice {
    stroke: white;
    stroke-width: 2;
}

#sliceName {
	fill: black;
	font-size: .85rem;
}

`