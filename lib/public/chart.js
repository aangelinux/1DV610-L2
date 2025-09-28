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
        this.#chart.appendChild(cssTemplate).id = "cssTemplate"

        this.#config = new Config()
        this.#validator = new Validator()
        this.#scale = new Scale()
        this.#style = new Style()
        this.#axis = new Axis(this.#chart, this.#style)
        this.#marker = new Marker(this.#chart, this.#style)

        this.currentInstance = null
	}

    get chart() {
        return this.#chart
    }

    /**
     * Removes all chart elements.
     */
    clearChart() {  // TODO fix bug where xAxis is not removed
        for (const child of this.#chart.children) {
            if (child.id === "cssTemplate") {
                continue
            } else {
                child.remove()
            }
        }

        if (this.#chart.querySelector("#xAxis")) {
            this.#chart.querySelector("#xAxis").remove()
        }
    }

    /**
     * Generates a bar chart visualizing inputted data.
     * 
     * @param {Array} data containing objects with data.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG bar chart.
     */
    createBarChart(data, options = this.#config.defaultLinearOptions) {
        // TODO render the damn chart title, I keep forgetting
        this.clearChart()

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
        this.clearChart()

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
        this.clearChart()

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
     * Validates user data based on the defined rules.
     * 
     * @param {Array} data containing objects with data.
     * @throws {Error} if any validation checks fail.
     */
    validateData(data) {
        this.#validator._validateData(data)
    }

    /**
     * Validates user options based on the defined rules.
     * 
     * @param {object} options containing chart style information.
     * @throws {Error} if any validation checks fail.
     */
    validateOptions(options) {
        this.#validator._validateOptions(options)
    }

    /**
     * Removes the chart's CSS template and replaces it.
     * 
     * @param {String} template containing CSS style rules.
     */
    swapCSS(template) {
        const currentTemplate = this.#chart.querySelector("#cssTemplate")
        if (currentTemplate) {
            this.#chart.removeChild(currentTemplate)
        }

        this.#chart.appendChild(template)
    }
}