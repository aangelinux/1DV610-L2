/**
 * @module Defines the public interface of the library.
 * @file lib/chart.js
 */

import { cssTemplate } from '../styles/cssTemplate.js'
import { Config } from '../helpers/config.js'
import { Validator } from '../helpers/validator.js'
import { Scale } from '../helpers/scale.js'
import { Style } from '../helpers/style.js'
import { Axis } from '../helpers/axis.js'
import { Marker } from '../helpers/marker.js'

export class Chart {
    #config
    #chart
    #validator
    #scale
    #style
    #axis
    #marker

	constructor() {
        this.#chart = document.createElement('div')
        this.#chart.appendChild(cssTemplate)

        this.#config = new Config()
        this.#validator = new Validator()
        this.#scale = new Scale()
        this.#style = new Style()
        this.#axis = new Axis(this.#chart, this.#scale, this.#style)
        this.#marker = new Marker(this.#chart, this.#scale, this.#style)
	}
  
	createBarChart(data, options = this.#config.defaultGraphOptions) {
        // TODO Make sure only one chart can be instantiated for one instance
        // For testing purposes; remove later
        data = [
            {
                text: "Stockholm",
                number: 22
            },
            {
                text: "Rome",
                number: 5
            },
            {
                text: "Berlin",
                number: 78
            },
            {
                text: "Madrid",
                number: 14
            },
            {
                text: "Prague",
                number: 40
            }
        ]
        options = {
            chartWidth: 500,
            chartHeight: 250,
            title: "Test Chart",
            color: "purple",
            font: "Monaco, monospace"
        }

        options = this.#config._assemble(options, "barChart")
        this.#validator._validateData(data)
        this.#validator._validateOptions(options)

        this.#style.baseStyle = options
        this.#chart.style.width = `${this.#style.width}px`
        this.#chart.style.height = `${this.#style.height}}px`
        this.#scale._setAllValues(data, options)

        const yValues = this.#scale._getBarYAxisValues(data)
        this.#axis._renderYAxis(yValues)
        this.#axis._renderXAxis(data)
        this.#marker._renderBars(data)

        return this.#chart
	}

	createLineGraph(data, options = this.#config.defaultGraphOptions) {
        // For testing purposes; remove later
        data = [
            {
                text: "Stockholm",
                number: 22
            },
            {
                text: "Rome",
                number: 5
            },
            {
                text: "Berlin",
                number: 78
            },
            {
                text: "Madrid",
                number: 14
            },
            {
                text: "Prague",
                number: 40
            },
            {
                text: "Stockholm",
                number: 22
            },
            {
                text: "Rome",
                number: 5
            },
            {
                text: "Berlin",
                number: 78
            },
            {
                text: "Madrid",
                number: 14
            },
            {
                text: "Prague",
                number: 40
            }
        ]
        options = {
            chartWidth: 500,
            chartHeight: 250,
            title: "Test Chart",
            color: "purple",
            font: "Monaco, monospace"
        }

        options = this.#config._assemble(options, "lineGraph")
        this.#validator._validateData(data)
        this.#validator._validateOptions(options)

        this.#style.baseStyle = options
        this.#chart.style.width = `${this.#style.width}px`
        this.#chart.style.height = `${this.#style.height}}px`
        this.#scale._setAllValues(data, options)
        
        const yValues = this.#scale._getLineYAxisValues(data)
        this.#axis._renderYAxis(yValues)
        this.#axis._renderXAxis(data)
        this.#marker._renderLine(data)

        return this.#chart
	}

	createPieChart(data, options = this.#config.defaultPieOptions) {
        // For testing purposes; remove later
        data = [
            {
                text: "Stockholm",
                number: 22
            },
            {
                text: "Rome",
                number: 5
            },
            {
                text: "Berlin",
                number: 78
            },
            {
                text: "Madrid",
                number: 14
            },
            {
                text: "Prague",
                number: 40
            }
        ]
        options = {
            radius: 400,
            title: "Pie Chart",
            font: "Monaco monospace"
        }

        options = this.#config._assemble(options, "pieChart")
        this.#validator._validateData(data)
        this.#validator._validateOptions(options)

        this.#style.baseStyle = options
        this.#chart.style.width = `${this.#style.width}px`
        this.#chart.style.height = `${this.#style.height}}px`
        this.#scale._setAllValues(data, options)
        
        const percentages = this.#scale._getPieChartPercentages(data)
        this.#marker._renderPieSlices(percentages)

        return this.#chart
	}

    swapCSS(template) {
        this.#chart.removeChild(cssTemplate)
        this.#chart.appendChild(template)
    }
}