/**
 * @module Renders a pie chart.
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
        this.#configuration = dependencies.configuration
        this.#validator = dependencies.validator
        this.#scale = dependencies.scale
        this.#style = dependencies.style
        this.#marker = dependencies.marker

        this.#data = data
        this.#options = options

    }

    render(chart) {
        this.#options = this.#configuration.assemble(this.#options, this.#chartType)
        this.#validator.validateData(this.#data)
        this.#validator.validateOptions(this.#options)

        this.#calculateLayout()
        this.#setLayout()
        this.#style.baseStyle = this.#options

        this.#marker.renderTitle(this.#options.title)
        this.#marker.renderPieSlices(this.#slices)

        return chart
    }

    #calculateLayout() {
        this.#radius = this.#options.radius

        this.#height = (this.#radius * 2) + this.#graphPadding
        this.#width = (this.#radius * 2) + this.#graphPadding
        this.#centerCoordinates = { x: (this.#height / 2), y: (this.#height / 2) }
        this.#initialCoordinates = { x: this.#height / 2, y: this.#graphPadding / 2 }
        this.#decimals = this.#scale.getPieChartDecimals(this.#data)
        
        this.#slices = this.#scale.getPieSliceData({
            decimals: this.#decimals,
            initCoordinates: this.#initialCoordinates,
            centerCoordinates: this.#centerCoordinates,
            radius: this.#radius
        })
    }

    #setLayout() {
        this.#marker.layout = {
            radius: this.#radius,
            height: this.#height,
            width: this.#width,
            centerCoordinates: this.#centerCoordinates,
            rotation: this.#rotation,
            sweepFlag: this.#sweepFlag
        }
    }
}