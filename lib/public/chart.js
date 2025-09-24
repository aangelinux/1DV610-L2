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
  
    /**
     * Generates a bar chart visualizing inputted data.
     * 
     * @param {object} data to be visualized in the chart.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG bar chart.
     */
	createBarChart(data, options = this.#config.defaultGraphOptions) {
        // TODO Make sure only one chart can be instantiated for one instance
        options = this.#config._assemble(options, "barChart")
        this.#validator._validateData(data)
        this.#validator._validateOptions(options)

        this.#style.baseStyle = options
        this.#chart.style.width = `${this.#style.width}px`
        this.#chart.style.height = `${this.#style.height}}px`
        this.#scale._setAllValues(data, options)

        const yValues = this.#scale._getBarYAxisValues()
        this.#axis._renderYAxis(yValues)
        this.#axis._renderXAxis(data)
        this.#marker._renderBars(data)

        return this.#chart
	}

    /**
     * Generates a line graph visualizing inputted data.
     * 
     * @param {object} data to be visualized in the chart.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG line graph.
     */
	createLineGraph(data, options = this.#config.defaultGraphOptions) {
        options = this.#config._assemble(options, "lineGraph")
        this.#validator._validateData(data)
        this.#validator._validateOptions(options)

        this.#style.baseStyle = options
        this.#chart.style.width = `${this.#style.width}px`
        this.#chart.style.height = `${this.#style.height}}px`
        this.#scale._setAllValues(data, options)
        
        const yValues = this.#scale._getLineYAxisValues()
        this.#axis._renderYAxis(yValues)
        this.#axis._renderXAxis(data)
        this.#marker._renderLine(data)

        return this.#chart
	}

    /**
     * Generates a pie chart visualizing inputted data.
     * 
     * @param {object} data to be visualized in the chart.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG pie chart.
     */
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
            radius: 150,
            title: "Pie Chart",
            font: "Monaco monospace"
        }

        options = this.#config._assemble(options, "pieChart")
        this.#validator._validateData(data)
        this.#validator._validateOptions(options)

        this.#style.baseStyle = options
        this.#scale._setAllValues(data, options)
        this.#chart.style.width = `${this.#style.radius * 2}px`
        this.#chart.style.height = `${this.#style.radius * 2}px`
        
        const decimals = this.#scale._getPieChartDecimals(data)
        this.#marker._renderPieSlices(decimals)

        return this.#chart
	}

    /**
     * Removes the current CSS template for the chart and replaces it.
     * 
     * @param {String} template containing CSS style rules.
     */
    swapCSS(template) {
        this.#chart.removeChild(cssTemplate)
        this.#chart.appendChild(template)
    }
}