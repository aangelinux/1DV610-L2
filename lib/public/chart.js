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
        this.#chart = document.createElement("div")
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
    createBarChart(data, options = this.#config.defaultLinearOptions) {
        // TODO Make sure only one chart can be instantiated for one instance
        // TODO render the damn chart title, I keep forgetting

        const dependencies = {
            config: this.#config,
            validator: this.#validator,
            scale: this.#scale,
            style: this.#style,
            axis: this.#axis,
            marker: this.#marker
        }

        return new BarChart(data, options).set(dependencies).render(this.#chart)
    }

    /**
     * Generates a line graph visualizing inputted data.
     * 
     * @param {Array} data containing objects with data.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG line graph.
     */
    createLineGraph(data, options = this.#config.defaultLinearOptions) {
        const dependencies = {
            config: this.#config,
            validator: this.#validator,
            scale: this.#scale,
            style: this.#style,
            axis: this.#axis,
            marker: this.#marker
        }

        return new LineGraph(data, options).set(dependencies).render(this.#chart)
    }

    /**
     * Generates a pie chart visualizing inputted data.
     * 
     * @param {Array} data containing objects with data.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG pie chart.
     */
    createPieChart(data, options = this.#config.defaultRadialOptions) {
        const dependencies = {
            config: this.#config,
            validator: this.#validator,
            scale: this.#scale,
            style: this.#style,
            marker: this.#marker
        }

        return new PieChart(data, options).set(dependencies).render(this.#chart)
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