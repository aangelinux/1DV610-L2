/**
 * @module Defines logic for rendering the y- and x-axis.
 * @file helpers/axis.js
 */

export class Axis {
    #chart
    #yAxisPoints = 4

    constructor(chart) {
        this.#chart = chart
    }

    _renderYAxis (values) {
        const yAxis = document.createElement('div') // Extract
        yAxis.style.height = `${this.#chart.getAttribute("height")}px`
        yAxis.style.borderLeft = '2px solid black'
        this.#chart.append(yAxis)

        const pointDistance = this.#chart.getAttribute("height") / this.#yAxisPoints

        values.reverse().forEach((value) => {
            const point = document.createElement('div') // Extract
            point.style.height = `${pointDistance}px`
            point.style.width = `${this.#chart.getAttribute("width")}px`
            point.style.borderTop = '1px solid black'
            yAxis.appendChild(point)

            const valueText = document.createElement('p') // Extract
            valueText.textContent = `${value}`
            valueText.style.fontSize = '1rem' // Remove later, let Style class handle font size
            valueText.style.display = 'inline'
            point.appendChild(valueText) // Use before() ?
        })
    }

    _renderXAxis (values) {
        const xAxis = document.createElement('div')
        xAxis.style.width = `${this.#chart.getAttribute("width")}px`
        xAxis.style.borderTop = '2px solid black'
        this.#chart.append(xAxis)

        const pointDistance = this.#chart.getAttribute("width") / (values.length - 1)

        values.forEach((value) => {
            const valueText = document.createElement('p')
            valueText.textContent = `${value}`
            valueText.style.fontSize = '1rem' // Remove later, let Style class handle font size
            valueText.style.display = 'inline'

            // Make sure each <p> tag has the same width, regardless of text length,
            // so all bars have equal distance between them
            const valueTextWidth = valueText.offsetWidth
            valueText.style.width = `${pointDistance - valueTextWidth}px` 
            valueText.style.textAlign = 'center'
            xAxis.appendChild(valueText)
        })

        xAxis.style.display = 'flex'
    }
}