export const cssTemplate = document.createElement('style')
cssTemplate.innerHTML = 
`
#yAxis {
    border-left: 2px solid black;
}

#yAxisPoint {
    border-top: 1px solid black;
}

#yAxisPointText {
    display: inline;
}

#xAxis {
    display: flex;
    border-top: 2px solid black;
}

#xAxisText {
    display: inline;
    text-align: center;
}

#svgGraph {
    display: flex;
    position: absolute;
}

/* ------------ Data Markers: Bars ---------- */

#bar {
    align-self: center;
}

/* ------------ Data Markers: Lines ---------- */

#circle {
}

`