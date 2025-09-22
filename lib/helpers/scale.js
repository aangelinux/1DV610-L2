/**
 * @module Calculates the scale of the chart.
 * @file helpers/scale.js
 */

export class Scale {
    #yAxisPoints = 4

    constructor() {
    }

    _getFontSize(data, options) {
        // calculate font size based on chart dimensions and amount of data categories
    }

    _getXAxisValues(data) {
        let xAxisValues = []

        data.forEach((object) => {
            xAxisValues.push(object.text)
        })

        return xAxisValues
    }

    _getYAxisValues(data) {
        let yAxisValues = []

        const maxValue = this.#getMaxYValue(data)
        let currentValue = 0 // Extract for loop into its own function ?
        for (let i = 0; i < this.#yAxisPoints; i++) {
            currentValue += maxValue / this.#yAxisPoints
            yAxisValues.push(currentValue)
        }

        const startValue = 0 // Bar charts should start at 0 so they don't look misleading
        yAxisValues.unshift(startValue)

        return yAxisValues
    }

    #getMaxYValue(data) {
        let maxDataValue = -Infinity

        data.forEach((object) => {
            const dataValue = object.number
            if (dataValue > maxDataValue) {
                maxDataValue = dataValue
            }
        })

        const maxDataValueLog = Math.ceil(Math.log10(maxDataValue))
        const maxValue = (Math.pow(10, maxDataValueLog))

        return maxValue
    }
}