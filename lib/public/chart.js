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
import { BarChart } from '../entities/barChart.js'
import { LineGraph } from '../entities/lineGraph.js'
import { PieChart } from '../entities/pieChart.js'

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

    get chart() {
        return this.#chart
    }

    clearChart() {
        this.#chart.querySelector("div").innerHTML = ""
    }
  
    /**
     * Generates a bar chart visualizing inputted data.
     * 
     * @param {Array} data containing objects with data.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG bar chart.
     */
	createBarChart(data, options = this.#config.defaultGraphOptions) {
        // TODO Make sure only one chart can be instantiated for one instance
        // TODO render the damn chart title, I keep forgetting
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
     * @param {Array} data containing objects with data.
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
     * @param {Array} data containing objects with data.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG pie chart.
     */
	createPieChart(data, options = this.#config.defaultPieOptions) {
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
     * Validates user data based on the defined constraints.
     * 
     * @param {Array} data containing objects with data.
     */
    validateData(data) {
        this.#validator._validateData(data)
    }

    /**
     * Validates user options based on the defined constraints.
     * 
     * @param {object} options containing chart style information.
     */
    validateOptions(options) {
        this.#validator._validateOptions(options)
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