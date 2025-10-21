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
    #fractions
    #slices
    #centerCoordinates
    #initialCoordinates

    // Objects
    #config
    #validator
    #scale
    #style
    #dataMarker
    #data
    #options

    constructor(dependencies, data, options) {
        this.#config = dependencies.config
        this.#validator = dependencies.validator
        this.#scale = dependencies.scale
        this.#style = dependencies.style
        this.#dataMarker = dependencies.dataMarker

        this.#data = data
        this.#options = options

    }

    render(chart) {
        this.#options = this.#config.assemble(this.#options, this.#chartType)
        this.#validator.validateData(this.#data)
        this.#validator.validateOptions(this.#options)

        this.#calculateLayout()
        this.#setLayout()
        this.#style.baseStyle = this.#options

        this.#dataMarker.renderTitle(this.#options.title)
        this.#dataMarker.renderPieSlices(this.#slices)

        return chart
    }

    #calculateLayout() {
        this.#radius = this.#options.radius

        this.#height = (this.#radius * 2) + this.#graphPadding
        this.#width = (this.#radius * 2) + this.#graphPadding
        this.#centerCoordinates = { x: (this.#height / 2), y: (this.#height / 2) }
        this.#initialCoordinates = { x: this.#height / 2, y: this.#graphPadding / 2 }
        this.#fractions = this.#scale.getFractions(this.#data)
        
        this.#slices = this.#scale.getPieSliceData({
            fractions: this.#fractions,
            initCoordinates: this.#initialCoordinates,
            centerCoordinates: this.#centerCoordinates,
            radius: this.#radius
        })
    }

    #setLayout() {
        this.#dataMarker.layout = {
            radius: this.#radius,
            height: this.#height,
            width: this.#width,
            centerCoordinates: this.#centerCoordinates,
            rotation: this.#rotation,
            sweepFlag: this.#sweepFlag
        }
    }
}