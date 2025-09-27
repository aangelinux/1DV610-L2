/**
 * @module Defines and renders a Pie Chart.
 * @file entities/pieChart.js
 */

export class PieChart {
    // Static values
    #chartType = "RADIAL"
    #graphPadding = 50
    #rotation = 0
    #sweepFlag = 1

    // Dynamic values
    #pieDecimals
    #pieSlices
    #radius
    #graphDimensions
    #centerCoordinates
    #startCoordinates

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

        this.#calculateLayout()
        this.#setLayout()
        this.#style.baseStyle = this.#options

        this.#marker._renderPieSlices(this.#pieSlices)

        return chart
    }

    #calculateLayout() {
        this.#radius = this.#options.radius

        this.#graphDimensions = (this.#radius * 2) + this.#graphPadding
        this.#centerCoordinates = { x: (this.#graphDimensions / 2), y: (this.#graphDimensions / 2) }
        this.#startCoordinates = { x: this.#graphDimensions / 2, y: this.#graphPadding / 2 }

        this.#pieDecimals = this.#scale._getPieChartDecimals(this.#data)
        this.#pieSlices = this.#scale._getPieSlices(this.#pieDecimals, this.#startCoordinates, this.#centerCoordinates, this.#radius)  // TODO reduce number of params
    }

    #setLayout() {
        this.#marker.chartLayout = {
            radius: this.#radius,
            graphDimensions: this.#graphDimensions,
            centerCoordinates: this.#centerCoordinates,
            rotation: this.#rotation,
            sweepFlag: this.#sweepFlag
        }
    }
}