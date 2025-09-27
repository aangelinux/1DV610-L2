/**
 * @module Defines and renders a Bar Chart.
 * @file entities/barChart.js
 */

export class BarChart {
    // Static values
    #chartType = "LINEAR"
    #barToColumnRatio = 3
    #yAxisRows = 4
    #minYValue = 0  // bar charts should start at 0 to not look misleading

    // Dynamic values
    #width
    #height
    #yAxisValues
    #maxYValue
    #heightScale
    #yAxisRowsHeight
    #xAxisColumns
    #barWidth

    // Objects
    #data
    #options
    #config
    #validator
    #scale
    #style
    #axis
    #marker

    constructor(data, options) {
        this.#data = data
        this.#options = options
    }

    set(dependencies) {  // TODO maybe inject these in the constructor instead
        const { config, validator, scale, style, axis, marker } = dependencies

        this.#config = config
        this.#validator = validator
        this.#scale = scale
        this.#style = style
        this.#axis = axis
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

        this.#axis._renderYAxis(this.#yAxisValues)
        this.#axis._renderXAxis(this.#data)
        this.#marker._renderBars(this.#data)

        return chart
    }

    #calculateLayout() {
        this.#width = this.#options.width
        this.#height = this.#options.height

        this.#maxYValue = this.#scale._getBiggestValueOf(this.#data)
        this.#yAxisValues = this.#scale._getYAxisValues(this.#minYValue, this.#maxYValue)
        this.#xAxisColumns = this.#scale._setXAxisColumns(this.#width, this.#data)

        this.#barWidth = this.#xAxisColumns / this.#barToColumnRatio
        this.#heightScale = this.#height / this.#maxYValue
        this.#yAxisRowsHeight = this.#height / this.#yAxisRows
    }

    #setLayout() {
        this.#axis.layout = {
            xAxisColumns: this.#xAxisColumns,
            yAxisRowsHeight: this.#yAxisRowsHeight
        }

        this.#marker.layout = {
            xAxisColumns: this.#xAxisColumns,
            heightScale: this.#heightScale,
            barWidth: this.#barWidth
        }
    }
}