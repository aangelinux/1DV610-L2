/**
 * @module Defines logic for rendering the y- and x-axis.
 * @file helpers/axis.js
 */

export class Axis {
    #yAxisPoints = 4

    constructor() {
    }

    _renderYAxis (values, chart) {
        const yAxis = document.createElement('div')
        yAxis.style.height = `${chart.getAttribute("height")}px`
        yAxis.style.borderLeft = '2px solid black'
        chart.append(yAxis)

        const pointDistance = chart.getAttribute("height") / this.#yAxisPoints

        values.reverse().forEach((value) => {
            const point = document.createElement('div')
            point.style.height = `${pointDistance}px`
            point.style.width = `${chart.getAttribute("width")}px`
            point.style.borderTop = '1px solid black'
            yAxis.appendChild(point)

            const valueText = document.createElement('p')
            valueText.textContent = `${value}`
            valueText.style.fontSize = '1rem' // Remove later, let Style class handle font size
            valueText.style.display = 'inline'
            point.appendChild(valueText) // Use before() ?
        })
    }

    _renderXAxis (values, chart) {
        const xAxis = document.createElement('div')
        xAxis.style.width = `${chart.getAttribute("width")}px`
        xAxis.style.borderTop = '2px solid black'
        chart.append(xAxis)

        const pointDistance = chart.getAttribute("width") / (values.length - 1)

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