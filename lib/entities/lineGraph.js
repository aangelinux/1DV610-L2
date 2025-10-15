/**
 * @module Defines and renders a Line Graph.
 * @file entities/lineGraph.js
 */

export class LineGraph {
    // Static values
    #chartType = "LINEAR"
    #dataPointRadius = 5
    #rows = 4

    // Dynamic values
    #width
    #height
    #values
    #maxValue
    #minValue
    #heightScale
    #rowHeight
    #columns
    #firstDataPos

    // Objects
    #configuration
    #validator
    #scale
    #style
    #axis
    #marker
    #data
    #options

    constructor(dependencies, data, options) {
        const { configuration, validator, scale, style, axis, marker } = dependencies
        
        this.#configuration = configuration
        this.#validator = validator
        this.#scale = scale
        this.#style = style
        this.#axis = axis
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
        this.#axis._renderYAxis(this.#values)
        this.#axis._renderXAxis(this.#data)
        this.#marker._renderLine(this.#data)

        return chart
    }

    #calculateLayout() {
        this.#height = this.#options.height
        this.#width = this.#options.width

        this.#minValue = this.#scale._getSmallestValueOf(this.#data)
        this.#maxValue = this.#scale._getBiggestValueOf(this.#data)
        this.#values = this.#scale._getValues(this.#minValue, this.#maxValue, this.#rows)
        this.#columns = this.#scale._getColumns(this.#width, this.#data)

        this.#heightScale = this.#height / this.#maxValue
        this.#rowHeight = this.#height / this.#rows
        this.#firstDataPos = (this.#columns / 2) + (this.#dataPointRadius / 2)
    }

    #setLayout() {
        this.#axis.chartLayout = {
            width: this.#width,
            height: this.#height,
            columns: this.#columns,
            xAxisValue: this.#minValue,
            rowHeight: this.#rowHeight
        }

        this.#marker.chartLayout = {
            width: this.#width,
            height: this.#height,
            columns: this.#columns,
            heightScale: this.#heightScale,
            dataPointRadius: this.#dataPointRadius,
            minValue: this.#minValue,
            firstDataPos: this.#firstDataPos           
        }
    }
}