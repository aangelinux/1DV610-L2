/**
 * @module Defines and renders a Line Graph.
 * @file entities/lineGraph.js
 */

export class LineGraph {
    // Static values
    #chartType = "LINEAR"
    #dataPointRadius = 5
    #yAxisRows = 4

    // Dynamic values
    #yAxisValues
    #width
    #height
    #maxYValue
    #minYValue
    #heightScale
    #yAxisRowsHeight
    #xAxisColumns
    #startingDataPointXPos

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
        this.#axis._renderYAxis(this.#yAxisValues)
        this.#axis._renderXAxis(this.#data)
        this.#marker._renderLine(this.#data)

        return chart
    }

    #calculateLayout() {
        this.#height = this.#options.height
        this.#width = this.#options.width

        this.#minYValue = this.#scale._getSmallestValueOf(this.#data)
        this.#maxYValue = this.#scale._getBiggestValueOf(this.#data)
        this.#yAxisValues = this.#scale._getYAxisValues(this.#minYValue, this.#maxYValue)
        this.#xAxisColumns = this.#scale._getXAxisColumns(this.#width, this.#data)

        this.#heightScale = this.#height / this.#maxYValue
        this.#yAxisRowsHeight = this.#height / this.#yAxisRows
        this.#startingDataPointXPos = (this.#xAxisColumns / 2) + (this.#dataPointRadius / 2) // TODO move to Scale since both bar charts and line graphs use it
    }

    #setLayout() {
        this.#axis.chartLayout = {
            width: this.#width,
            height: this.#height,
            xAxisColumns: this.#xAxisColumns,
            xAxisValue: this.#minYValue,
            yAxisRowsHeight: this.#yAxisRowsHeight
        }

        this.#marker.chartLayout = {
            width: this.#width,
            height: this.#height,
            xAxisColumns: this.#xAxisColumns,
            heightScale: this.#heightScale,
            dataPointRadius: this.#dataPointRadius,
            minYValue: this.#minYValue,
            startingDataPointXPos: this.#startingDataPointXPos           
        }
    }
}