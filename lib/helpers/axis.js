/**
 * @module Renders the y- and x-axis on the chart.
 * @file helpers/axis.js
 */

export class Axis {
    #chart
    #style
    #yAxisPoints = 4

    constructor(chart, style) {
        this.#chart = chart
        this.#style = style
    }

    _renderYAxis (values) {
        const yAxis = this.#createYAxis()
        this.#chart.append(yAxis)

        const pointDistance = this.#style.height / this.#yAxisPoints  // Extract to Scale
        values.reverse().forEach((value) => {
            const point = this.#createYAxisPoint(pointDistance)
            yAxis.appendChild(point)
            const pointText = this.#createPointText(value)
            point.appendChild(pointText) // Use before() ?
        })
    }

    #createYAxis() {
        const yAxis = document.createElement('div')
        yAxis.style.height = `${this.#style.height}px`
        yAxis.style.borderLeft = '2px solid black'  // Extract to Style

        return yAxis
    }

    #createYAxisPoint(pointDistance) {  // TODO Change 'point' name to something clearer
        const point = document.createElement('div')
        point.style.height = `${pointDistance}px`  // Extract to Style
        point.style.width = `${this.#style.width}px`
        point.style.borderTop = '1px solid black'  // Extract to Style

        return point
    }

    #createPointText(text) {
        const pointText = document.createElement('p')
        pointText.textContent = `${text}`
        pointText.style.fontSize = '1rem'  // Extract to Style
        pointText.style.display = 'inline'  // Extract to Style

        return pointText
    }

    _renderXAxis (values) {
        const xAxis = this.#createXAxis()
        this.#chart.append(xAxis)
        xAxis.style.display = 'flex'  // Extract to Style

        const pointDistance = this.#style.width / (values.length - 1)  // Extract to Scale
        values.forEach((value) => {
            const valueText = this.#createValueText(value, pointDistance)
            xAxis.appendChild(valueText)
        })
    }

    #createXAxis() {
        const xAxis = document.createElement('div')
        xAxis.style.width = `${this.#style.width}px`
        xAxis.style.borderTop = '2px solid black'  // Extract to Style

        return xAxis
    }

    #createValueText(text, pointDistance) {  // TODO Change 'valueText' name to something clearer
        const valueText = document.createElement('p')
        valueText.textContent = `${text}`
        valueText.style.fontSize = '1rem'  // Extract to Style
        valueText.style.display = 'inline'  // Extract to Style

        // Make sure each <p> tag has the same width, regardless of text length,
        // so all bars have equal distance between them when rendered later
        const valueTextWidth = valueText.offsetWidth
        valueText.style.width = `${pointDistance - valueTextWidth}px`
        valueText.style.textAlign = 'center'  // Extract to Style

        return valueText
    }
}