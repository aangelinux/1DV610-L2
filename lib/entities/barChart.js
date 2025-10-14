/**
 * @module Defines and renders a Bar Chart.
 * @file entities/barChart.js
 */

export class BarChart {
    // Static values
    #chartType = "LINEAR"
    #barToColumnRatio = 3
    #rows = 4
    #minValue = 0  // bar charts should start at 0 to not look misleading

    // Dynamic values
    #width
    #height
    #values
    #maxValue
    #heightScale
    #rowHeight
    #columns
    #barWidth
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
        this.#marker._renderBars(this.#data)

        return chart
    }

    #calculateLayout() {
        this.#width = this.#options.width
        this.#height = this.#options.height

        this.#maxValue = this.#scale._getBiggestValueOf(this.#data)
        this.#values = this.#scale._getYAxisValues(this.#minValue, this.#maxValue)
        this.#columns = this.#scale._getXAxisColumns(this.#width, this.#data)

        this.#barWidth = this.#columns / this.#barToColumnRatio
        this.#heightScale = this.#height / this.#maxValue
        this.#rowHeight = this.#height / this.#rows
        this.#firstDataPos = (this.#columns / 2) - (this.#barWidth / 2)
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
            barWidth: this.#barWidth,
            firstDataPos: this.#firstDataPos
        }
    }
}