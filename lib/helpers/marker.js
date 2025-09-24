/**
 * @module Renders the data markers on the chart.
 * @file helpers/markers.js
 */

export class Marker {
    #chart
    #style
    #scale
    #startCoordinates

    constructor(chart, scale, style) {
        this.#chart = chart
        this.#scale = scale
        this.#style = style
    }

    _renderBars(data) {        
        const graph = this.#createGraph()
        let i = 0
        data.forEach((object) => {
            const barValue = object.number
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
            const dataPoint = this.#createCircle(object.number, i)
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
        graph.setAttribute("height", this.#style.height)
        graph.setAttribute("width", this.#style.width)

        // Graph needs to be first child of chart element
        // so the graph is rendered on top of all other div elements
        this.#chart.children[0].before(graph)

        return graph
    }

    #createBar(barValue, i) {
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        bar.id = "bar"
        bar.setAttribute("height", (barValue * this.#scale.heightScale))
        bar.setAttribute("width", this.#scale.barWidth)
        bar.setAttribute("fill", `${this.#style.color}`)

        bar.setAttribute("x", this.#scale.xAxisDataBoxCenters - (this.#scale.barWidth / 2) + (this.#scale.xAxisDataBoxes * i))
        bar.setAttribute("y", this.#style.height - (barValue * this.#scale.heightScale))

        return bar
    }

    #createCircle(dataPoint, i) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.id = "circle"
        circle.setAttribute("r", this.#scale.circleRadius)
        circle.setAttribute("fill", this.#style.color)

        circle.setAttribute("cx", (this.#scale.xAxisDataBoxCenters - this.#scale.circleRadius) + (this.#scale.xAxisDataBoxes * i))

        circle.setAttribute("cy", this.#style.height - ((dataPoint - this.#scale.minYValue) * this.#scale.heightScale))

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

        const colors = [
            "red",
            "yellow",
            "green",
            "darkgreen",
            "darkblue",
            "blue",
            "indigo",
            "violet",
            "pink"
        ]

        let i = 0
        this.#startCoordinates = { x: this.#style.radius + 25, y: 25 }
        data.forEach((object) => {
            const slice = this.#createSlice(object.decimal, this.#startCoordinates, colors[i])
            graph.appendChild(slice)
            i++
        })
    }

    #createPieGraph() {
        const graph = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        graph.id = "pieGraph"
        graph.setAttribute("height", this.#scale.pieGraphDimensions)
        graph.setAttribute("width", this.#scale.pieGraphDimensions)

        // Graph needs to be first child of chart element
        // so the graph is rendered on top of all other div elements
        this.#chart.children[0].before(graph)

        return graph
    }

    #createSlice(decimal, startCoordinates, color) {
        const centerCoordinates = this.#scale._getCenterCoordinates()
        const endCoordinates = this.#scale._getCoordinates(decimal)
        const totalAngle = this.#scale._calculateAngle(decimal)
        const largeArcFlag = this.#scale._getLargeArcFlag(totalAngle)

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        path.id = "path"
        path.setAttribute("fill", color)
        path.setAttribute("stroke", "#f7b538")
        path.setAttribute("stroke-width", 3)
        path.setAttribute("d", `M ${centerCoordinates.x} ${centerCoordinates.y} 
        L ${startCoordinates.x} ${startCoordinates.y}
        A ${this.#style.radius} ${this.#style.radius} ${0} ${largeArcFlag} ${1} ${endCoordinates.x} ${endCoordinates.y}
        L ${centerCoordinates.x} ${centerCoordinates.y} Z`)

        this.#startCoordinates = endCoordinates
        return path
    }
}