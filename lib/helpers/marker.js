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

    _renderBars(data) {        
        const graph = this.#createGraph()
        let i = 0
        data.forEach((object) => {
            const barValue = object.value
            const bar = this.#createBar(barValue, i)
            graph.appendChild(bar)
            i++
        })
    }

    _renderLine(data) {
        let circles = []

        const graph = this.#createGraph()
        let i = 0
        data.forEach((object) => {
            const dataPoint = this.#createCircle(object.value, i)
            graph.appendChild(dataPoint)
            circles.push(dataPoint)
            i++
        })

        const line = this.#createLine(circles)
        graph.appendChild(line)
    }

    #createGraph() {
        const graph = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        graph.id = "svgGraph"
        graph.setAttribute("height", this.layout.height)
        graph.setAttribute("width", this.layout.width)

        // Graph needs to be first child of chart element
        // so the graph is rendered on top of all other div elements
        this.#chart.children[0].before(graph)

        return graph
    }

    #createBar(barValue, i) {
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        bar.id = "bar"
        bar.setAttribute("height", (barValue * this.layout.heightScale))
        bar.setAttribute("width", this.layout.barWidth)
        bar.setAttribute("fill", `${this.#style.color}`)

        bar.setAttribute("x", (this.layout.xAxisColumns / 2) - (this.layout.barWidth / 2) + (this.layout.xAxisColumns * i))
        bar.setAttribute("y", this.#style.height - (barValue * this.layout.heightScale))

        return bar
    }

    #createCircle(dataPoint, i) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.id = "circle"
        circle.setAttribute("r", this.layout.dataPointRadius)
        circle.setAttribute("fill", this.#style.color)

        circle.setAttribute("cx", ((this.layout.xAxisColumns / 2) - this.layout.dataPointRadius) + (this.layout.xAxisColumns * i))

        circle.setAttribute("cy", this.layout.height - ((dataPoint - this.layout.minYValue) * this.layout.heightScale))

        return circle
    }

    #createLine(dataPoints) {
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
        polyline.id = "polyline"

        let points = ""
        for (let i = 0; i < dataPoints.length; i++) {
            points = points.concat(`${dataPoints[i].getAttribute("cx")},${dataPoints[i].getAttribute("cy")} `)
        }

        polyline.setAttribute("points", points)
        polyline.setAttribute("fill", "none")
        polyline.setAttribute("stroke", this.#style.color)
        polyline.setAttribute("stroke-width", 3)

        return polyline
    }

    _renderPieSlices(data) {
        const graph = this.#createPieGraph()

        let i = 0
        data.forEach((object) => {
            const path = this.#createPath(object)
            const slice = this.#createSlice(path, i)

            graph.appendChild(slice)
            i++
        })
    }

    #createPieGraph() {
        const graph = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        graph.id = "pieGraph"
        graph.setAttribute("height", this.layout.graphDimensions)
        graph.setAttribute("width", this.layout.graphDimensions)

        // Graph needs to be first child of chart element
        // so the graph is rendered on top of all other div elements
        this.#chart.children[0].before(graph)

        return graph
    }

    #createPath(sliceData) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        console.log(sliceData)
        console.log(this.layout)
        // TODO fix the path variables
        
        // Passing the whole coordinates object at once will cause errors because 
        // the path command does not want the object keys (strings), only the values
        path.setAttribute("d", `
        M ${this.layout.centerCoordinates.x} ${this.layout.centerCoordinates.y}  
        L ${sliceData.currentCoordinates.x} ${sliceData.currentCoordinates.y}
        A ${this.layout.radius} ${this.layout.radius} ${this.layout.rotation} ${sliceData.largeArcFlag} ${this.layout.sweepFlag} ${sliceData.endCoordinates.x} ${sliceData.endCoordinates.y}
        L ${this.layout.centerCoordinates.x} ${this.layout.centerCoordinates.y} 
        Z`)

        return path
    }

    #createSlice(slice, i) {
        slice.id = "slice"
        slice.setAttribute("fill", this.#style.pieColors[i])
        slice.setAttribute("stroke", "#f7b538")
        slice.setAttribute("stroke-width", 3)

        return slice
    }
}