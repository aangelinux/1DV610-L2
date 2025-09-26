/**
 * @module Defines and renders a Bar Chart.
 * @file entities/barChart.js
 */

export class BarChart {
    #barWidthRatio = 3
    #yAxisTicks = 4
    #yAxisValues = []
    #width
    #height
    #maxYValue
    #xAxisColumns
    #barWidth

    constructor(chart, data, options) {
        this.chart = chart  // TODO make private
        this.data = data
        this.options = options
    }

    set(dependencies) {  // TODO make all objects private
        const { config, validator, scale, style, axis, marker } = dependencies

        this.config = config
        this.validator = validator
        this.scale = scale
        this.style = style
        this.axis = axis
        this.marker = marker

        return this
    }

    render() {
        const options = this.config._assemble(this.options, "BAR_CHART")

        this.validator._validateData(this.data)
        this.validator._validateOptions(options)

        this.#height = options.height
        this.#width = options.width
        this.chart.setAttribute("height", this.#height)
        this.chart.setAttribute("width", this.#width)

        this.scale._setAllValues(this.data, options)
        this.style.baseStyle = options

        const yValues = this.scale._getBarYAxisValues()
        this.axis._renderYAxis(yValues)
        this.axis._renderXAxis(this.data)
        this.marker._renderBars(this.data)

        return this.chart
    }
}