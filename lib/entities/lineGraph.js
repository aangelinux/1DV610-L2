/**
 * @module Defines and renders a Line Graph.
 * @file entities/lineGraph.js
 */

export class LineGraph {
    #dataPointRadius = 5
    #yAxisTicks = 4
    #yAxisValues = []
    #width
    #height
    #maxYValue
    #minYValue
    #xAxisColumns

    constructor(chart, data, options) {
        this.chart = chart
        this.data = data
        this.options = options
    }

    set(dependencies) {
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
        const options = this.config._assemble(this.options, "LINE_GRAPH")

        this.validator._validateData(this.data)
        this.validator._validateOptions(options)

        this.#height = options.height
        this.#width = options.width
        this.chart.setAttribute("height", this.#height)
        this.chart.setAttribute("width", this.#width)

        this.scale._setAllValues(this.data, options)
        this.style.baseStyle = options

        const yValues = this.scale._getLineYAxisValues()
        this.axis._renderYAxis(yValues)
        this.axis._renderXAxis(this.data)
        this.marker._renderLine(this.data)

        return this.chart
    }
}