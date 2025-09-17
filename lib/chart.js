/**
 * @module Defines the public interface for the library.
 * @file lib/chart.js
 */

import { Validator } from './helpers/validator.js'
import { Scale } from '../lib/helpers/scale.js'

export class Chart {
    #validator
    #scale
    #axis
    #style
    #render
    #options = {
        chartWidth: 700,
        chartHeight: 500,
        title: "Data Chart",
        color: "blue",
        animated: false
    }

	constructor() {
        this.#validator = new Validator()
        this.#scale = new Scale()
	}
  
	createBarChart(data, options) {
        // Validate options & data
        // Calculate scales on Y- and X-axis
        // Render Y- and X-axis
        // Assign colors, animations
        // Render the bars/lines

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

        this.#scale._getYAxisValues(data)
        this.#scale._getXAxisValues(data)

        console.log("Bar chart works!", data)
	}

	createLineGraph(data, options) {
        console.log("Line graph works!", data)
	}

	createPieChart(data, options) {
        // Validate options & data
        // Calculate pie percentages
        // Assign colors, animations
        // Render the pie

        console.log("Pie chart works!", data)
	}
}