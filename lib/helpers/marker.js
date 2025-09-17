/**
 * @module Defines logic for rendering the chart's data markers.
 * @file helpers/markers.js
 */

export class Marker {
    #scaleRatio = 100

    constructor() {
    }

    _renderBars(data, chart) {
        const chartHeightScale = chart.getAttribute("height") / this.#scaleRatio

        const graph = document.createElement('div')
        graph.style.width = `${chart.getAttribute("width")}px`
        graph.style.height = `${chart.getAttribute("height")}px`
        graph.style.display = 'flex'
        graph.style.position = 'absolute'
        chart.children[0].before(graph) // Needs to be rendered on top of y-axis divs

        data.forEach((object) => {
            const wrapper = document.createElement('div')
            const pointDistance = chart.getAttribute("width") / (data.length - 1)
            wrapper.style.width = `${pointDistance}px`
            wrapper.style.height = `${chart.getAttribute("height")}px`
            wrapper.style.display = 'flex'
            wrapper.style.justifyContent = 'center'
            graph.appendChild(wrapper)

            const bar = document.createElement('div')
            bar.style.width = `${pointDistance / 3}px`
            bar.style.height = `${object.number * chartHeightScale}px`
            bar.style.alignSelf = 'end'
            bar.style.backgroundColor = 'darkred'
            wrapper.appendChild(bar)
        })
    }

    _renderLine(values) {
        // TODO
    }

    _renderPieSlices(values) {
        // TODO
    }
}