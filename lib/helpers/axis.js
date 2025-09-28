/**
 * @module Renders the y-axis and x-axis on a linear chart.
 * @file helpers/axis.js
 */

export class Axis {
    #chart
    #style

    constructor(chart, style) {
        this.#chart = chart
        this.#style = style
    }

    set chartLayout(values) {
        this.layout = values
    }

    _renderYAxis(data) {
        const yAxis = this.#createYAxis()
        this.#chart.append(yAxis)

        data.reverse().forEach((value) => {
            const row = this.#createYAxisRow()
            yAxis.appendChild(row)
            const valueText = this.#createYAxisValue(value)
            row.appendChild(valueText) // TODO use before() instead ??
        })
    }

    _renderXAxis(data) {
        const xAxis = this.#createXAxis()
        this.#chart.querySelector("#yAxis").appendChild(xAxis)

        data.forEach((object) => {
            const label = this.#createXAxisLabel(object.name)
            xAxis.append(label)
        })
    }

    #createYAxis() {
        const yAxis = document.createElement("div")
        yAxis.id = "yAxis"
        yAxis.style.height = `${this.layout.height}px`

        return yAxis
    }

    #createXAxis() {
        const xAxis = document.createElement("div")
        xAxis.id = "xAxis"
        xAxis.style.width = `${this.#style.width}px`

        return xAxis
    }

    #createYAxisRow() {
        const row = document.createElement("div")
        row.id = "yAxisRow"
        row.style.height = `${this.layout.yAxisRowsHeight}px`
        row.style.width = `${this.layout.width}px`

        return row
    }

    #createYAxisValue(text) {
        const value = document.createElement("p")
        value.id = "yAxisValue"
        value.textContent = `${text}`
        value.style.color = this.#style.color
        value.style.fontFamily = this.#style.font
        value.style.fontSize = "1rem"  // TODO make dynamic

        return value
    }

    #createXAxisLabel(text) {
        const label = document.createElement("p")
        label.id = "xAxisLabel"
        label.textContent = `${text}`
        label.style.fontFamily = this.#style.font
        label.style.fontSize = "1rem"  // TODO make dynamic
        label.style.color = this.#style.color

        // Make sure each <p> tag has the same width, regardless of text length,
        // so all labels have equal distance between them
        const labelWidth = label.offsetWidth
        label.style.width = `${this.layout.xAxisColumns - labelWidth}px`

        return label
    }
}