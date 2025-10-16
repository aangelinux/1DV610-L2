/**
 * @module Defines and renders a Pie Chart.
 * @file entities/pieChart.js
 */

export class PieChart {
    // Static values
    #chartType = "RADIAL"
    #graphPadding = 70
    #rotation = 0
    #sweepFlag = 1

    // Dynamic values
    #height
    #width
    #radius
    #decimals
    #slices
    #centerCoordinates
    #initialCoordinates

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
        this.#marker._renderPieSlices(this.#slices)

        return chart
    }

    #calculateLayout() {
        this.#radius = this.#options.radius

        this.#height = (this.#radius * 2) + this.#graphPadding
        this.#width = (this.#radius * 2) + this.#graphPadding
        this.#centerCoordinates = { x: (this.#height / 2), y: (this.#height / 2) }
        this.#initialCoordinates = { x: this.#height / 2, y: this.#graphPadding / 2 }
        this.#decimals = this.#scale._getPieChartDecimals(this.#data)
        
        this.#slices = this.#scale._getPieSliceData({
            decimals: this.#decimals,
            initCoordinates: this.#initialCoordinates,
            centerCoordinates: this.#centerCoordinates,
            radius: this.#radius
        })
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