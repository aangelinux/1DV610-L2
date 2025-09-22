/**
 * @module Renders the data markers on the chart.
 * @file helpers/markers.js
 */

export class Marker {
    #chart
    #style
    #heightRatio
    #barWidthRatio = 3

    constructor(chart, style) {
        this.#chart = chart
        this.#style = style
    }

    _renderBars(data, heightRatio) {
        const wrapperWidth = this.#style.width / (data.length - 1)  // Extract to Scale
        
        const graph = this.#createGraph()
        data.forEach((object) => {
            const wrapper = this.#createWrapper(wrapperWidth)
            graph.appendChild(wrapper)
            const bar = this.#createBar(wrapperWidth, object.number, heightRatio)
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

    #createWrapper(wrapperWidth) {
        const wrapper = document.createElement('div')
        wrapper.id = "barWrapper"
        wrapper.style.width = `${wrapperWidth}px`  // Extract to Scale / Style
        wrapper.style.height = `${this.#style.height}px`

        return wrapper
    }

    #createBar(wrapperWidth, dataValue, heightRatio) {  // TODO See if amount of params can be reduced
        const chartHeightScale = this.#style.height / heightRatio  // TODO move to Scale

        const bar = document.createElement('div')
        bar.id = "bar"
        bar.style.width = `${wrapperWidth / this.#barWidthRatio}px`  // Extract to Style / Scale
        bar.style.height = `${dataValue * chartHeightScale}px`  // Extract to Style / Scale
        bar.style.backgroundColor = 'darkred' // Extract to Style

        return bar
    }

    _renderLine(data) {
        // TODO
    }

    _renderPieSlices(data) {
        // TODO
    }
}