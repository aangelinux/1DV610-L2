/**
 * @module Renders the data markers on the chart.
 * @file helpers/markers.js
 */

export class Marker {
    #chart
    #style

    constructor(chart, style) {
        this.#chart = chart
        this.#style = style
    }

    set chartLayout(values) {
        this.layout = values
    }

    _renderTitle(titleText) {
        const title = document.createElement("h3")
        title.id = "chartTitle"
        title.textContent = titleText
        title.style.color = this.#style.color
        title.style.fontFamily = this.#style.font
        this.#chart.appendChild(title)
    }

    _renderBars(data) {        
        const graph = this.#createGraph()
        let i = 0
        data.forEach((object) => {
            const dataValue = object.value
            const bar = this.#createBar(dataValue, i)
            graph.appendChild(bar)
            i++
        })
    }

    _renderLine(data) {
        const graph = this.#createGraph()

        let dataPoints = []
        let i = 0
        data.forEach((object) => {
            const dataPoint = this.#createDataPoint(object.value, i)
            graph.appendChild(dataPoint)
            dataPoints.push(dataPoint)
            i++
        })

        const line = this.#createLine(dataPoints)
        graph.appendChild(line)
    }

    _renderPieSlices(data) {
        const graph = this.#createGraph()
        let i = 0
        data.forEach((object) => {
            const path = this.#createPath(object)
            const pieSlice = this.#createPieSlice(path, i)
            graph.appendChild(pieSlice)
            i++
        })
    }

    #createGraph() {
        const graph = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        graph.id = "svgGraph"
        graph.setAttribute("height", this.layout.height)
        graph.setAttribute("width", this.layout.width)

        // Graph needs to be first child of chart element
        // so the graph is rendered on top of all other elements
        this.#chart.children[0].before(graph)

        return graph
    }

    #createBar(dataValue, i) {
        const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        bar.id = "bar"
        bar.setAttribute("height", (dataValue * this.layout.heightScale))
        bar.setAttribute("width", this.layout.barWidth)
        bar.setAttribute("fill", `${this.#style.color}`)

        bar.setAttribute("x", this.layout.startingDataPointXPos + (this.layout.xAxisColumns * i))
        bar.setAttribute("y", this.layout.height - (dataValue * this.layout.heightScale))

        return bar
    }

    #createDataPoint(dataPoint, i) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.id = "circle"
        circle.setAttribute("r", this.layout.dataPointRadius)
        circle.setAttribute("fill", this.#style.color)

        circle.setAttribute("cx", this.layout.startingDataPointXPos + (this.layout.xAxisColumns * i))
        circle.setAttribute("cy", this.layout.height - ((dataPoint - this.layout.minYValue) * this.layout.heightScale))

        return circle
    }

    #createLine(dataPoints) {
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
        polyline.id = "polyline"

        let points = ""
        for (let i = 0; i < dataPoints.length; i++) {
            points = points.concat(
                `${dataPoints[i].getAttribute("cx")},${dataPoints[i].getAttribute("cy")} `)
                // Don't remove the space between closing bracket and ending tick
        }

        polyline.setAttribute("points", points)
        polyline.setAttribute("stroke", this.#style.color)

        return polyline
    }

    #createPath(sliceData) {
        const { centerCoordinates, radius, rotation, sweepFlag } = this.layout
        const { startCoordinates, endCoordinates, largeArcFlag } = sliceData

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
        
        // Passing the whole coordinates object at once will cause errors because 
        // the path command does not accept strings ("x", "y")
        path.setAttribute("d", `
        M ${centerCoordinates.x} ${centerCoordinates.y}  
        L ${startCoordinates.x} ${startCoordinates.y}
        A ${radius} ${radius} ${rotation} ${largeArcFlag} ${sweepFlag}
            ${endCoordinates.x} ${endCoordinates.y}
        L ${centerCoordinates.x} ${centerCoordinates.y} 
        Z`)

        return path
    }

    #createPieSlice(slice, i) {
        slice.id = "slice"
        slice.setAttribute("fill", this.#style.pieColors[i])

        return slice
    }
}