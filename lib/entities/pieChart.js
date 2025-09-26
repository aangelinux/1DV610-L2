/**
 * @module Defines and renders a Pie Chart.
 * @file entities/pieChart.js
 */

export class PieChart {
    #chartPadding = 50
    #radius
    #totalAngle
    #currentAngle
    #currentCoordinates

    constructor(chart, data, options) {
        this.chart = chart
        this.data = data
        this.options = options
    }

    set(dependencies) {
        const { config, validator, scale, style, marker } = dependencies

        this.config = config
        this.validator = validator
        this.scale = scale
        this.style = style
        this.marker = marker

        return this
    }

    render() {
        const options = this.config._assemble(this.options, "PIE_CHART")

        this.validator._validateData(this.data)
        this.validator._validateOptions(options)

        this.#radius = options.radius
        this.chart.setAttribute("height", this.#radius * 2)  // TODO store in class field
        this.chart.setAttribute("width", this.#radius * 2)

        this.scale._setAllValues(this.data, options)
        this.style.baseStyle = options

        const decimals = this.scale._getPieChartDecimals(this.data)
        this.marker._renderPieSlices(decimals)

        return this.chart    
    }
}