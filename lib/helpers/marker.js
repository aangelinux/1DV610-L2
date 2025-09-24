/**
 * @module Renders the data markers on the chart.
 * @file helpers/markers.js
 */

export class Marker {
    #chart
    #style
    #scale

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
        circle.setAttribute("r", 5)
        circle.setAttribute("fill", this.#style.color)

        circle.setAttribute("cx", (this.#scale.xAxisDataBoxCenters - circle.getAttribute("r")) + (this.#scale.xAxisDataBoxes * i))

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
        console.log(data)
    }

    #createPie() {
        // Create circle with radius as defined in options
    }

    #createSlices(dataValues) {
        console.log(dataValues)
        const pieCenterCoords = { x: (this.#style.width / 2), y: (this.#style.height / 2) }
        let currentCoords = pieCenterCoords
        let nextCoords = { x: (this.#style.width / 2), y: 0 }
        let radians = 0

        for (let i = 0; i < dataValues.length; i++) {
            // Get radians: dataValue * 2 * pi (dataValue needs to be in decimal format)
            // Then: pieCenterCoordsX + circle-radius * Math.cos(radians)
            // Then: pieCenterCoordsY + circle-radius * Math.cos(radians)
            // Finally: update radians += radians

            // Create path going from currentCoords to nextCoords
            // Update currentCoords = nextCoords
            // Update nextCoords = calculation
            // Create elliptical arc going from currentCoords to nextCoords
            // Update currentCoords = nextCoords
            // Create path going from currentCoords to pieCenterCoords
            // Update currentCoords = pieCenterCoords
            // Close the path (Z)
            // Fill the pie slice (path)
        }
    }
}