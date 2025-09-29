/**
 * @module Defines the public interface of the library.
 * @file lib/chart.js
 */

import { cssTemplate } from '../styles/cssTemplate.js'
import { Configuration } from '../helpers/configuration.js'
import { Validator } from '../helpers/validator.js'
import { Scale } from '../helpers/scale.js'
import { Style } from '../helpers/style.js'
import { Axis } from '../helpers/axis.js'
import { Marker } from '../helpers/marker.js'
import { BarChart } from '../entities/barChart.js'
import { LineGraph } from '../entities/lineGraph.js'
import { PieChart } from '../entities/pieChart.js'

export class Chart {
    #chart
    #configuration
    #validator
    #scale
    #style
    #axis
    #marker

	constructor() {
        this.#chart = document.createElement("div")
        this.#chart.id = "chart"
        this.#chart.appendChild(cssTemplate).id = "cssTemplate"

        this.#configuration = new Configuration()
        this.#validator = new Validator()
        this.#scale = new Scale()
        this.#style = new Style()
        this.#axis = new Axis(this.#chart, this.#style)
        this.#marker = new Marker(this.#chart, this.#style)
	}

    get chart() {
        return this.#chart
    }

    /**
     * Resets the entire chart.
     */
    resetChart() {  // TODO fix bug where yAxis is not removed
        for (const child of this.#chart.children) {
            if (child.id === "cssTemplate") {
                continue
            } else {
                child.remove()
            }
        }

        if (this.#chart.querySelector("#yAxis")) {
            this.#chart.querySelector("#yAxis").remove()
        }
    }

    /**
     * Clears the current chart and generates a new bar chart.
     * 
     * @param {Array} data containing objects with data.
     * @param {object} options containing chart style information.
     * @returns {HTMLElement} div containing an SVG bar chart.
     */
    createBarChart(data, options = this.#configuration.defaultLinearOptions) {
        this.resetChart()

        const dependencies = {
            configuration: this.#configuration,
            validator: this.#validator,
            scale: this.#scale,
            style: this.#style,
            axis: this.#axis,
            marker: this.#marker
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
    createLineGraph(data, options = this.#configuration.defaultLinearOptions) {
        this.resetChart()

        const dependencies = {
            configuration: this.#configuration,
            validator: this.#validator,
            scale: this.#scale,
            style: this.#style,
            axis: this.#axis,
            marker: this.#marker
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
    createPieChart(data, options = this.#configuration.defaultRadialOptions) {
        this.resetChart()

        const dependencies = {
            configuration: this.#configuration,
            validator: this.#validator,
            scale: this.#scale,
            style: this.#style,
            marker: this.#marker
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
        this.#validator._validateData(data)
    }

    /**
     * Validates an options object for its types and values.
     * 
     * @param {object} options containing chart style information.
     * @throws {Error} if any validation checks fail.
     */
    validateOptions(options) {
        this.#validator._validateOptions(options)
    }

    /**
     * Removes the chart's static CSS template and replaces it.
     * 
     * @param {String} template containing CSS style rules.
     */
    replaceStaticCSS(template) {
        const currentTemplate = this.#chart.querySelector("#cssTemplate")
        if (currentTemplate) {
            this.#chart.removeChild(currentTemplate)
        }

        template.id = "cssTemplate" // resetChart() will remove the new template if ID is not set
        this.#chart.appendChild(template)
    }
}