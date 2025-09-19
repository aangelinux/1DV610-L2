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
        const yAxis = this.#createYAxis()
        this.#chart.append(yAxis)

        const pointDistance = this.#chart.getAttribute("height") / this.#yAxisPoints
        values.reverse().forEach((value) => {
            const point = this.#createYAxisPoint(pointDistance)
            yAxis.appendChild(point)
            const pointText = this.#createPointText(value)
            point.appendChild(pointText) // Use before() ?
        })
    }

    #createYAxis() {
        const yAxis = document.createElement('div')
        yAxis.style.height = `${this.#chart.getAttribute("height")}px`
        yAxis.style.borderLeft = '2px solid black'

        return yAxis
    }

    #createYAxisPoint(pointDistance) {  // TODO Change 'point' name to something clearer
        const point = document.createElement('div')
        point.style.height = `${pointDistance}px`
        point.style.width = `${this.#chart.getAttribute("width")}px`
        point.style.borderTop = '1px solid black'

        return point
    }

    #createPointText(text) {
        const pointText = document.createElement('p')
        pointText.textContent = `${text}`
        pointText.style.fontSize = '1rem' // TODO Remove later, let Style class handle font size
        pointText.style.display = 'inline'

        return pointText
    }

    _renderXAxis (values) {
        const xAxis = this.#createXAxis()
        this.#chart.append(xAxis)
        xAxis.style.display = 'flex'

        const pointDistance = this.#chart.getAttribute("width") / (values.length - 1)
        values.forEach((value) => {
            const valueText = this.#createValueText(value, pointDistance)
            xAxis.appendChild(valueText)
        })
    }

    #createXAxis() {
        const xAxis = document.createElement('div')
        xAxis.style.width = `${this.#chart.getAttribute("width")}px`
        xAxis.style.borderTop = '2px solid black'

        return xAxis
    }

    #createValueText(text, pointDistance) {  // TODO Change 'valueText' name to something clearer
        const valueText = document.createElement('p')
        valueText.textContent = `${text}`
        valueText.style.fontSize = '1rem' // TODO Remove later, let Style class handle font size
        valueText.style.display = 'inline'

        // Make sure each <p> tag has the same width, regardless of text length,
        // so all bars have equal distance between them when rendered later
        const valueTextWidth = valueText.offsetWidth
        valueText.style.width = `${pointDistance - valueTextWidth}px` 
        valueText.style.textAlign = 'center'

        return valueText
    }
}