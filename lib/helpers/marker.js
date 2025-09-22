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
        const wrapperWidth = this.#chart.getAttribute("width") / (data.length - 1)  // Extract to Scale
        
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
        graph.style.width = `${this.#chart.getAttribute("width")}px`  // Extract to Style
        graph.style.height = `${this.#chart.getAttribute("height")}px`  // Extract to Style
        graph.style.display = 'flex'  // Extract to Style
        graph.style.position = 'absolute'  // Extract to Style
        this.#chart.children[0].before(graph) 
        // Graph needs to be first child of chart element
        // so the graph is rendered on top of all other div elements

        return graph
    }

    #createWrapper(wrapperWidth) {
        const wrapper = document.createElement('div') 
        wrapper.style.width = `${wrapperWidth}px`  // Extract to Style
        wrapper.style.height = `${this.#chart.getAttribute("height")}px`  // Extract to Style
        wrapper.style.display = 'flex'  // Extract to Style
        wrapper.style.justifyContent = 'center'  // Extract to Style

        return wrapper
    }

    #createBar(wrapperWidth, dataValue, heightRatio) {  // TODO See if amount of params can be reduced
        const chartHeightScale = this.#chart.getAttribute("height") / heightRatio  // TODO move to Scale

        const bar = document.createElement('div')
        bar.style.width = `${wrapperWidth / this.#barWidthRatio}px`  // Extract to Style
        bar.style.height = `${dataValue * chartHeightScale}px`  // Extract to Style
        bar.style.alignSelf = 'end'  // Extract to Style
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