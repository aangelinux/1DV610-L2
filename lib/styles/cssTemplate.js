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

/* ------------ Data Markers: Bars ---------- */

#barGraph {  /* TODO Change id name */
    display: flex;
    position: absolute;
}

#barWrapper {
    display: flex;
    justify-content: center;
}

#bar {
    align-self: flex-end;
}

/* ------------ Data Markers: Lines ---------- */

`