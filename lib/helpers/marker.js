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
        data.forEach((object) => {
            const wrapper = this.#createWrapper()
            graph.appendChild(wrapper)

            const barValue = object.number
            const bar = this.#createBar(barValue)
            wrapper.appendChild(bar)
        })
    }

    #createGraph() {
        const graph = document.createElement('div')
        graph.id = "barGraph"
        graph.style.width = `${this.#style.width}px`
        graph.style.height = `${this.#style.height}px`

        // Graph needs to be first child of chart element
        // so the graph is rendered on top of all other div elements
        this.#chart.children[0].before(graph)

        return graph
    }

    #createWrapper() {
        const wrapper = document.createElement('div')
        wrapper.id = "barWrapper"
        wrapper.style.width = `${this.#scale.wrapperWidth}px`
        wrapper.style.height = `${this.#style.height}px`

        return wrapper
    }

    #createBar(barValue) {
        const bar = document.createElement('div')
        bar.id = "bar"
        bar.style.width = `${this.#scale.barWidth}px`
        bar.style.height = `${barValue * this.#scale.heightScale}px`
        bar.style.backgroundColor = this.#style.color

        return bar
    }

    _renderLine(data) {
        // TODO
    }

    _renderPieSlices(data) {
        // TODO
    }
}