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
        const graph = this.#createGraph()
        let i = 0
        data.forEach((object) => {
            const dataPoint = this.#createCircle(object.number, i)
            graph.appendChild(dataPoint)
            i++
        })
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
        circle.setAttribute("fill", `${this.#style.color}`)

        circle.setAttribute("cx", (this.#scale.xAxisDataBoxCenters - circle.getAttribute("r")) + (this.#scale.xAxisDataBoxes * i))
        circle.setAttribute("cy", this.#style.height - (dataPoint * this.#scale.heightScale)) // TODO this is wrong

        return circle
    }

    #createLine() {

    }

    _renderPieSlices(data) {
        // TODO
    }
}