/**
 * @module Defines the public interface for the library.
 * @file lib/chart.js
 */

export class Chart {
    #options = {
        chartWidth: 700,
        chartHeight: 500,
        title: "Data Chart",
        color: "blue",
        animated: false
    }
    // Canvas Element

	constructor() {
	}
  
	createBarChart(data, options) {
		// TODO
	}

	createLineGraph(data, options) {
		// TODO
	}

	createPieChart(data, options) {
		// TODO
	}
}