/**
 * @module Renders the y-axis and x-axis on a linear chart.
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

    renderYAxis(data) {
        const yAxis = this.#createYAxis()
        this.#chart.append(yAxis)

        data.forEach((value) => {
            const row = this.#createYAxisRow()
            yAxis.appendChild(row)
            const valueText = this.#createYAxisValue(value)
            row.appendChild(valueText)
        })
    }

    renderXAxis(data) {
        const xAxis = this.#createXAxis()
        this.#chart.querySelector("#yAxis").appendChild(xAxis)

        data.forEach((object) => {
            const label = this.#createXAxisLabel(object.name)
            xAxis.append(label)
        })

        const xAxisValue = this.#createXAxisValue(this.layout.xAxisValue)
        xAxis.appendChild(xAxisValue)
    }

    #createYAxis() {
        const yAxis = document.createElement("div")
        yAxis.id = "yAxis"
        yAxis.style.height = `${this.layout.height}px`
        yAxis.style.width = `${this.layout.width}px`

        return yAxis
    }

    #createYAxisRow() {
        const row = document.createElement("div")
        row.id = "yAxisRow"
        row.style.height = `${this.layout.rowHeight}px`
        row.style.width = `${this.layout.width}px`

        return row
    }

    #createYAxisValue(text) {
        const value = document.createElement("p")
        value.id = "yAxisValue"
        value.textContent = `${text}`
        value.style.fontFamily = this.#style.font

        return value
    }

    #createXAxis() {
        const xAxis = document.createElement("div")
        xAxis.id = "xAxis"
        xAxis.style.width = `${this.layout.width}px`

        return xAxis
    }

	#createXAxisValue(text) {
        const value = document.createElement("p")
        value.id = "xAxisValue"
        value.textContent = `${text}`
        value.style.fontFamily = this.#style.font

		return value
	}

    #createXAxisLabel(text) {
        const label = document.createElement("p")
        label.id = "xAxisLabel"
        label.textContent = `${text}`
        label.style.fontFamily = this.#style.font
        label.style.color = this.#style.color

        // Makes sure each <p> tag has the same width regardless of text length,
        // so there's equal distance between all labels
        const labelWidth = label.offsetWidth
        label.style.width = `${this.layout.columns - labelWidth}px`

        return label
    }
}