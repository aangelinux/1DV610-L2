/**
 * @module Defines the public interface of the library.
 */

import { cssTemplate } from '../styles/cssTemplate.js'
import { Defaults } from '../config/defaults.js'
import { Rules } from '../config/rules.js'
import { Config } from '../helpers/config.js'
import { Validator } from '../helpers/validator.js'
import { Scale } from '../helpers/scale.js'
import { Style } from '../helpers/style.js'
import { Axis } from '../helpers/axis.js'
import { DataMarker } from '../helpers/dataMarker.js'
import { BarChart } from '../entities/barChart.js'
import { LineGraph } from '../entities/lineGraph.js'
import { PieChart } from '../entities/pieChart.js'

export class Chart {
	#defaults
	#rules
    #chart
    #config
    #validator
    #scale
    #style
    #axis
    #dataMarker

	constructor() {
        this.#chart = document.createElement("div")
        this.#chart.id = "chart"
        this.#chart.appendChild(cssTemplate).id = "cssTemplate"

		this.#defaults = new Defaults()
		this.#rules = new Rules()
        this.#config = new Config(this.#defaults)
        this.#validator = new Validator(this.#rules)
		
        this.#scale = new Scale()
        this.#style = new Style()
        this.#axis = new Axis(this.#chart, this.#style)
        this.#dataMarker = new DataMarker(this.#chart, this.#style)
	}

    get chart() {
        return this.#chart
    }

    /**
     * Resets the entire chart.
     */
    resetChart() {
        const children = Array.from(this.#chart.childNodes)
        children.forEach((child) => {
            if (child.id !== "cssTemplate") {
                child.remove()
            }
        })
    }

    /**
     * Clears the current chart and generates a new bar chart.
     * 
     * @param {Array} data containing objects with data.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG bar chart.
     */
    createBarChart(data, options = this.#defaults.linearOptions) {
        this.resetChart()

        const dependencies = {
            config: this.#config,
            validator: this.#validator,
            scale: this.#scale,
            style: this.#style,
            axis: this.#axis,
            dataMarker: this.#dataMarker
        }

        return new BarChart(dependencies, data, options).render(this.#chart)
    }

    /**
     * Clears the current chart and generates a new line graph.
     * 
     * @param {Array} data containing objects with data.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG line graph.
     */
    createLineGraph(data, options = this.#defaults.linearOptions) {
        this.resetChart()

        const dependencies = {
            config: this.#config,
            validator: this.#validator,
            scale: this.#scale,
            style: this.#style,
            axis: this.#axis,
            dataMarker: this.#dataMarker
        }

        return new LineGraph(dependencies, data, options).render(this.#chart)
    }

    /**
     * Clears the current chart and generates a new pie chart.
     * 
     * @param {Array} data containing objects with data.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG pie chart.
     */
    createPieChart(data, options = this.#defaults.radialOptions) {
        this.resetChart()

        const dependencies = {
            config: this.#config,
            validator: this.#validator,
            scale: this.#scale,
            style: this.#style,
            dataMarker: this.#dataMarker
        }

        return new PieChart(dependencies, data, options).render(this.#chart)
    }
    
    /**
     * Validates a data object for its types and values.
     * 
     * @param {Array} data containing objects with data.
     * @throws {Error} if any validation checks fail.
     */
    validateData(data) {
        this.#validator.validateData(data)
    }

    /**
     * Validates an options object for its types and values.
     * 
     * @param {object} options containing chart style information.
     * @throws {Error} if any validation checks fail.
     */
    validateOptions(options) {
        this.#validator.validateOptions(options)
    }

    /**
     * Removes the chart's static CSS template and replaces it.
     * 
     * @param {String | HTMLElement} template containing CSS style rules.
     */
    replaceStaticCSS(template) {
        const currentTemplate = this.#chart.querySelector("#cssTemplate")
        if (currentTemplate) {
            this.#chart.removeChild(currentTemplate)
        }

        template.id = "cssTemplate"
        this.#chart.appendChild(template)
    }
}