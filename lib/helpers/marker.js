/**
 * @module Renders the data markers on the chart.
 * @file helpers/markers.js
 */

export class Marker {
    #chart
    #heightRatio
    #barWidthRatio = 3

    constructor(chart) {
        this.#chart = chart
    }

    _renderBars(data, heightRatio) {
        const wrapperWidth = this.#chart.getAttribute("width") / (data.length - 1)
        
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
        graph.style.width = `${this.#chart.getAttribute("width")}px`
        graph.style.height = `${this.#chart.getAttribute("height")}px`
        graph.style.display = 'flex'
        graph.style.position = 'absolute'
        this.#chart.children[0].before(graph) // Graph needs to be first child of chart element
        // so the graph is rendered on top of all other div elements

        return graph
    }

    #createWrapper(wrapperWidth) {
        const wrapper = document.createElement('div') 
        wrapper.style.width = `${wrapperWidth}px`
        wrapper.style.height = `${this.#chart.getAttribute("height")}px`
        wrapper.style.display = 'flex'
        wrapper.style.justifyContent = 'center'

        return wrapper
    }

    #createBar(wrapperWidth, dataValue, heightRatio) {  // This is too many params
        const chartHeightScale = this.#chart.getAttribute("height") / heightRatio // TODO Move this?

        const bar = document.createElement('div')
        bar.style.width = `${wrapperWidth / this.#barWidthRatio}px`
        bar.style.height = `${dataValue * chartHeightScale}px`
        bar.style.alignSelf = 'end'
        bar.style.backgroundColor = 'darkred' // TODO Remove later, let Style class handle it

        return bar
    }

    _renderLine(data) {
        // TODO
    }

    _renderPieSlices(data) {
        // TODO
    }
}