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
    #height
    #width
    #pieDecimals
    #pieSlices
    #radius
    #centerCoordinates
    #startCoordinates

    // Objects
    #configuration
    #validator
    #scale
    #style
    #marker
    #data
    #options

    constructor(dependencies, data, options) {
        const { configuration, validator, scale, style, marker } = dependencies

        this.#configuration = configuration
        this.#validator = validator
        this.#scale = scale
        this.#style = style
        this.#marker = marker

        this.#data = data
        this.#options = options

    }

    render(chart) {
        this.#options = this.#configuration._assemble(this.#options, this.#chartType)
        this.#validator._validateData(this.#data)
        this.#validator._validateOptions(this.#options)

        this.#calculateLayout()
        this.#setLayout()
        this.#style.baseStyle = this.#options

        this.#marker._renderTitle(this.#options.title)
        this.#marker._renderPieSlices(this.#pieSlices)

        return chart
    }

    #calculateLayout() {
        this.#radius = this.#options.radius

        this.#height = (this.#radius * 2) + this.#graphPadding
        this.#width = (this.#radius * 2) + this.#graphPadding
        this.#centerCoordinates = { x: (this.#height / 2), y: (this.#height / 2) }
        this.#startCoordinates = { x: this.#height / 2, y: this.#graphPadding / 2 }

        this.#pieDecimals = this.#scale._getPieChartDecimals(this.#data)
        this.#pieSlices = this.#scale._getPieSlices(this.#pieDecimals, this.#startCoordinates, this.#centerCoordinates, this.#radius)  // TODO reduce number of params
    }

    #setLayout() {
        this.#marker.chartLayout = {
            radius: this.#radius,
            height: this.#height,
            width: this.#width,
            centerCoordinates: this.#centerCoordinates,
            rotation: this.#rotation,
            sweepFlag: this.#sweepFlag
        }
    }
}