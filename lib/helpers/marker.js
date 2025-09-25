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

        let i = 0
        let startCoordinates = { x: this.#style.radius + 25, y: 25 }
        data.forEach((object) => {
            const path = this.#createPath(object.decimal, startCoordinates)
            const slice = this.#createSlice(path, i)
            const sliceText = this.#createSliceText(object.text, startCoordinates)

            graph.appendChild(slice)
            graph.appendChild(sliceText)
            startCoordinates = this.#updateCoordinates(object.decimal)
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

    #createPath(decimal, startCoordinates) {
        const centerCoordinates = this.#scale._getCenterCoordinates()
        const endCoordinates = this.#scale._getNextCoordinates(decimal)
        const totalAngle = this.#scale._calculateAngle(decimal)
        const largeArcFlag = this.#scale._getLargeArcFlag(totalAngle)
        const rotation = 0
        const sweepFlag = 1

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        // Passing the whole coordinates object at once will cause errors because 
        // the path command does not want the object keys (strings), only the values
        path.setAttribute("d", `
        M ${centerCoordinates.x} ${centerCoordinates.y}  
        L ${startCoordinates.x} ${startCoordinates.y}
        A ${this.#style.radius} ${this.#style.radius} ${rotation} ${largeArcFlag} ${sweepFlag} 
        ${endCoordinates.x} ${endCoordinates.y}
        L ${centerCoordinates.x} ${centerCoordinates.y} 
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

    #createSliceText(text, coordinates) {
        const sliceText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        sliceText.id = "sliceText"
        sliceText.textContent = `${text}`
        sliceText.setAttribute("fill", "darkred")
        sliceText.setAttribute("font-size", "1rem")
        sliceText.setAttribute("x", (coordinates.x))
        sliceText.setAttribute("y", (coordinates.y))

        return sliceText
    }

    #updateCoordinates(decimal) {
        return this.#scale._getNextCoordinates(decimal)
    }

}