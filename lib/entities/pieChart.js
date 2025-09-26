/**
 * @module Defines and renders a Pie Chart.
 * @file entities/pieChart.js
 */

export class PieChart {
    // Immutable values
    #chartType = "RADIAL"
    #graphPadding = 50

    // Mutable values
    #dataPercentages
    #radius
    #graphDimensions
    #totalAngle
    #currentAngle
    #currentCoordinates
    #centerCoordinates

    // Objects
    #data
    #options
    #config
    #validator
    #scale
    #style
    #marker

    constructor(data, options) {
        this.#data = data
        this.#options = options
    }

    set(dependencies) {
        const { config, validator, scale, style, marker } = dependencies

        this.#config = config
        this.#validator = validator
        this.#scale = scale
        this.#style = style
        this.#marker = marker

        return this
    }

    render(chart) {
        this.#options = this.#config._assemble(this.#options, this.#chartType)
        this.#validator._validateData(this.#data)
        this.#validator._validateOptions(this.#options)

        this.#setMutableValues()
        chart.setAttribute("height", this.#radius * 2)
        chart.setAttribute("width", this.#radius * 2)
        this.#style.baseStyle = this.#options

        this.#scale._getPieChartDecimals(this.#dataPercentages)
        this.#marker._renderPieSlices(decimals)

        return chart
    }

    #setMutableValues() {
        this.#radius = this.#options.radius

        this.#dataPercentages = this.#scale._getPieChartDecimals(this.#data)
        this.#graphDimensions = (this.#radius * 2) + this.#graphPadding
        this.#centerCoordinates = { x: (this.#graphDimensions / 2), y: (this.#graphDimensions / 2) }
    }
}