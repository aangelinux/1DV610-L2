/**
 * @module Defines the public interface for the library.
 * @file lib/chart.js
 */

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
    #defaultOptions = {
        chartWidth: 550,
        chartHeight: 300,
        title: "Data Chart",
        color: "darkred"
    }

	constructor() {
        this.#chart = document.createElement('div')

        this.#config = new Config()
        this.#validator = new Validator()
        this.#scale = new Scale()
        this.#style = new Style(this.#chart)
        this.#axis = new Axis(this.#chart)
        this.#marker = new Marker(this.#chart)
	}
  
	createBarChart(data, options = this.#defaultOptions) {
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

        // TODO Add method for updating/overriding options schema
        this.#validator._validateData(data)
        this.#validator._validateOptions(options)

        // TODO Move all of this later. To Scale class ?
        this.#chart.style.width = `${options.chartWidth}px`
        this.#chart.style.height = `${options.chartHeight}px`
        this.#chart.setAttribute("height", options.chartHeight)
        this.#chart.setAttribute("width", options.chartWidth)

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