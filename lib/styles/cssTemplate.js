export const cssTemplate = document.createElement('style')
cssTemplate.innerHTML = 
`
#yAxis {
    border-left: 2px solid black;
}

#yAxisRow {
    border-top: 1px solid black;
}

#yAxisValue {
    display: inline;
}

#xAxis {
    display: flex;
    border-top: 2px solid black;
    gap: 5px;
}

#xAxisLabel {
    display: inline;
    text-align: center;
    overflow: hidden;
    // word-wrap: break-word;
}

#svgGraph {
    display: flex;
    position: absolute;
}

`