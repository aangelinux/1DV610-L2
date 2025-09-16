/**
 * @module Defines the public interface for the library.
 * @file lib/chart.js
 */

import { Scale } from '../lib/helpers/scale.js'

export class Chart {
    #options = {
        chartWidth: 700,
        chartHeight: 500,
        title: "Data Chart",
        color: "blue",
        animated: false,
        format: "canvas"
    }
    // Canvas Element

	constructor() {
	}
  
	createBarChart(data, options) {
        // Validate options & data
        // Calculate scales on Y- and X-axis
        // Render Y- and X-axis
        // Assign colors, animations
        // Render the bars/lines
        // Return the chart as canvas/SVG

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

        const scale = new Scale()
        scale.calculateBarChartYAxis(data)

        console.log("Bar chart works!", data)
	}

	createLineGraph(data, options) {
		// TODO

        console.log("Line graph works!", data)
	}

	createPieChart(data, options) {
        // Validate options & data
        // Calculate pie percentages
        // Assign colors, animations
        // Render the pie
        // Return the chart as canvas/SVG

        console.log("Pie chart works!", data)
	}
}