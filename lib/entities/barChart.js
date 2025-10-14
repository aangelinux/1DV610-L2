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
        this.#marker._renderBars(this.#data)

        return chart
    }

    #calculateLayout() {
        this.#width = this.#options.width
        this.#height = this.#options.height

        this.#maxYValue = this.#scale._getBiggestValueOf(this.#data)
        this.#yAxisValues = this.#scale._getYAxisValues(this.#minYValue, this.#maxYValue)
        this.#xAxisColumns = this.#scale._getXAxisColumns(this.#width, this.#data)

        this.#barWidth = this.#xAxisColumns / this.#barToColumnRatio
        this.#heightScale = this.#height / this.#maxYValue
        this.#yAxisRowsHeight = this.#height / this.#yAxisRows
        this.#startingDataPointXPos = (this.#xAxisColumns / 2) - (this.#barWidth / 2)
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
            barWidth: this.#barWidth,
            startingDataPointXPos: this.#startingDataPointXPos
        }
    }
}