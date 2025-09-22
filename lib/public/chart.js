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
        this.#axis = new Axis(this.#chart, this.#style)
        this.#marker = new Marker(this.#chart, this.#style)
	}

    injectCSS(template) {
        this.#chart.removeChild(cssTemplate)
        this.#chart.appendChild(template)
    }
  
	createBarChart(data, options = this.#config.defaultOptions) {
        // TODO Make sure only one chart can be instantiated for one instance
        // Validate options & data
        // Calculate scales on Y- and X-axis
        // Assign colors, animations to chart
        // Render Y- and X-axis
        // Render the bars

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
            chartHeight: 200,
            title: "Test Chart",
            color: "darkblue",
            font: "Georgia"
        }


        options = this.#config._assembleOptions(options)

        this.#validator._validateData(data)
        this.#validator._validateOptions(options)

        this.#style.baseStyle = options

        this.#chart.style.width = `${this.#style.width}px`  // TODO Move these?
        this.#chart.style.height = `${this.#style.height}}px`

        const yValues = this.#scale._getYAxisValues(data)
        const xValues = this.#scale._getXAxisValues(data)

        this.#axis._renderYAxis(yValues)
        this.#axis._renderXAxis(xValues)

        this.#marker._renderBars(data, yValues[0]) // TODO need to make it clear why yValues[0] is there

        return this.#chart
	}

	createLineGraph(data, options) {
        // Validate options & data
        // Calculate scales on Y- and X-axis
        // Assign colors, animations
        // Render Y- and X-axis
        // Render the line(s)
	}

	createPieChart(data, options) {
        // Validate options & data
        // Calculate pie slices (percentages)
        // Assign colors, animations
        // Render the pie
	}
}