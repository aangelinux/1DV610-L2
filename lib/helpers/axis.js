/**
 * @module Renders the y- and x-axis on the chart.
 * @file helpers/axis.js
 */

export class Axis {
    #chart
    #style
    #scale

    constructor(chart, style, scale) {
        this.#chart = chart
        this.#style = style
        this.#scale = scale
    }

    _renderYAxis (values) {
        const yAxis = this.#createYAxis()
        this.#chart.append(yAxis)

        values.reverse().forEach((value) => {
            const point = this.#createYAxisPoint()
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

    #createYAxisPoint() {
        const point = document.createElement('div')
        point.id = "yAxisPoint"
        point.style.height = `${this.#scale.yAxisPointDistance}px`
        point.style.width = `${this.#style.width}px`

        return point
    }

    #createPointText(text) {
        const pointText = document.createElement('p')
        pointText.id = "yAxisPointText"
        pointText.textContent = `${text}`
        pointText.style.color = this.#style.color
        pointText.style.fontFamily = this.#style.font
        pointText.style.fontSize = '1rem'  // TODO make dynamic

        return pointText
    }

    _renderXAxis (values) {
        const xAxis = this.#createXAxis()
        this.#chart.append(xAxis)

        values.forEach((value) => {
            const valueText = this.#createXAxisText(value)
            xAxis.appendChild(valueText)
        })
    }

    #createXAxis() {
        const xAxis = document.createElement('div')
        xAxis.id = "xAxis"
        xAxis.style.width = `${this.#style.width}px`

        return xAxis
    }

    #createXAxisText(text) {
        const xAxisText = document.createElement('p')
        xAxisText.id = "xAxisText"
        xAxisText.textContent = `${text}`
        xAxisText.style.fontFamily = this.#style.font
        xAxisText.style.fontSize = '1rem'  // TODO make dynamic
        xAxisText.style.color = this.#style.color

        // Make sure each <p> tag has the same width, regardless of text length,
        // so all bars have equal distance between them when rendered
        const xAxisTextWidth = xAxisText.offsetWidth
        xAxisText.style.width = `${this.#scale.xAxisTextDistance - xAxisTextWidth}px`

        return xAxisText
    }
}