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
    #dataPercentages
    #radius
    #graphDimensions
    #centerCoordinates

    // Mutable values
    #totalAngle
    #currentAngle
    #largeArcFlag
    #currentCoordinates

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

    get totalAngle() {
        return this.#totalAngle
    }

    get currentCoordinates() {
        return this.#currentCoordinates
    }

    get largeArcFlag() {
        return this.#scale._getLargeArcFlag(this.#totalAngle)
    }

    set currentAngle(angle) {
        this.#currentAngle = angle
    }

    set totalAngle(currentAngle) {
        this.#totalAngle += currentAngle
    }

    set currentCoordinates(coordinates) {
        this.#currentCoordinates = coordinates
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

        this.#marker._renderPieSlices(this.#dataPercentages)

        return chart
    }

    #calculateLayout() {
        this.#radius = this.#options.radius

        this.#dataPercentages = this.#scale._getPieChartDecimals(this.#data)
        this.#graphDimensions = (this.#radius * 2) + this.#graphPadding
        this.#centerCoordinates = { x: (this.#graphDimensions / 2), y: (this.#graphDimensions / 2) }
    }

    #setLayout() {
        this.#marker.layout = {
            graphDimensions: this.#graphDimensions,
            currentCoordinates: this.#currentCoordinates,
            centerCoordinates: this.#centerCoordinates,
            largeArcFlag: this.#largeArcFlag,
            rotation: this.#rotation,
            sweepFlag: this.#sweepFlag,
        }
    }
}