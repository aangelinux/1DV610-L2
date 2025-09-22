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
        yAxis.id = "yAxis"
        yAxis.style.height = `${this.#style.height}px`

        return yAxis
    }

    #createYAxisPoint(pointDistance) {
        const point = document.createElement('div')
        point.id = "yAxisPoint"
        point.style.height = `${pointDistance}px`  // Extract to Style
        point.style.width = `${this.#style.width}px`

        return point
    }

    #createPointText(text) {
        const pointText = document.createElement('p')
        pointText.id = "yAxisPointText"
        pointText.textContent = `${text}`
        pointText.style.fontSize = '1rem'  // Extract to Style

        return pointText
    }

    _renderXAxis (values) {
        const xAxis = this.#createXAxis()
        this.#chart.append(xAxis)

        const pointDistance = this.#style.width / (values.length - 1)  // Extract to Scale
        values.forEach((value) => {
            const valueText = this.#createXAxisText(value, pointDistance)
            xAxis.appendChild(valueText)
        })
    }

    #createXAxis() {
        const xAxis = document.createElement('div')
        xAxis.id = "xAxis"
        xAxis.style.width = `${this.#style.width}px`

        return xAxis
    }

    #createXAxisText(text, pointDistance) {
        const xAxisText = document.createElement('p')
        xAxisText.id = "xAxisText"
        xAxisText.textContent = `${text}`
        xAxisText.style.fontSize = '1rem'  // Extract to Scale / Style

        // Make sure each <p> tag has the same width, regardless of text length,
        // so all bars have equal distance between them when rendered
        const xAxisTextWidth = xAxisText.offsetWidth
        xAxisText.style.width = `${pointDistance - xAxisTextWidth}px`

        return xAxisText
    }
}