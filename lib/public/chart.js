/**
 * @module Defines the public interface for the library.
 * @file lib/chart.js
 */

import { Validator } from '../helpers/validator.js'
import { Scale } from '../helpers/scale.js'
import { Axis } from '../helpers/axis.js'

export class Chart {
    #chart
    #validator
    #scale
    #axis
    #style
    #render
    #options = {
        chartWidth: 550,
        chartHeight: 300,
        title: "Data Chart",
        color: "darkred",
        animated: false
    }

	constructor() {
        this.#chart = document.createElement('div')

        this.#validator = new Validator()
        this.#scale = new Scale()
        this.#axis = new Axis()
	}
  
	createBarChart(data, options = this.#options) {
        // Validate options & data
        // Calculate scales on Y- and X-axis
        // Render Y- and X-axis
        // Assign colors, animations
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

        // Move all of this later. To Scale class ?
        this.#chart.style.width = `${options.chartWidth}px`
        this.#chart.style.height = `${options.chartHeight}px`
        this.#chart.setAttribute("height", options.chartHeight)
        this.#chart.setAttribute("width", options.chartWidth)

        const yValues = this.#scale._getYAxisValues(data)
        const xValues = this.#scale._getXAxisValues(data)
        this.#axis._renderYAxis(yValues, this.#chart)
        this.#axis._renderXAxis(xValues, this.#chart)

        console.log("Bar chart works!", data)
        return this.#chart
	}

	createLineGraph(data, options) {
        // Validate options & data
        // Calculate scales on Y- and X-axis
        // Render Y- and X-axis
        // Assign colors, animations
        // Render the line(s)

        console.log("Line graph works!", data)
	}

	createPieChart(data, options) {
        // Validate options & data
        // Calculate pie slices (percentages)
        // Assign colors, animations
        // Render the pie

        console.log("Pie chart works!", data)
	}
}