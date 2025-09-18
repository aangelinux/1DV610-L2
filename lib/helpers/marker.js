/**
 * @module Defines logic for rendering the chart's data markers.
 * @file helpers/markers.js
 */

export class Marker {
    #chart
    #heightRatio = 100
    #barWidthRatio = 3

    constructor(chart) {
        this.#chart = chart
    }

    _renderBars(data) {
        const wrapperWidth = this.#chart.getAttribute("width") / (data.length - 1)
        const chartHeightScale = this.#chart.getAttribute("height") / this.#heightRatio
        const graph = this.#createGraph()

        data.forEach((object) => {
            const wrapper = this.#createWrapper(wrapperWidth)
            graph.appendChild(wrapper)
            const bar = this.#createBar(wrapperWidth, chartHeightScale)
            wrapper.appendChild(bar)
        })
    }

    #createGraph() {
        const graph = document.createElement('div')
        graph.style.width = `${this.#chart.getAttribute("width")}px`
        graph.style.height = `${this.#chart.getAttribute("height")}px`
        graph.style.display = 'flex'
        graph.style.position = 'absolute'
        this.#chart.children[0].before(graph) // Needs to be rendered on top of y-axis divs

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

    #createBar(wrapperWidth, chartHeightScale) {
        const bar = document.createElement('div')
        bar.style.width = `${wrapperWidth / this.#barWidthRatio}px`
        bar.style.height = `${object.number * chartHeightScale}px`
        bar.style.alignSelf = 'end'
        bar.style.backgroundColor = 'darkred' // Remove later, let Style class handle it

        return bar
    }

    _renderLine(values) {
        // TODO
    }

    _renderPieSlices(values) {
        // TODO
    }
}