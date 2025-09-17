/**
 * @module Defines the logic for calculating chart scales.
 * @file helpers/scale.js
 */

export class Scale {
    #yAxisPoints = 4

    constructor() {
    }

    _returnXAxisValues(data) {
        let xAxisValues = []

        data.forEach((object) => {
            xAxisValues.push(object.text)
        })

        console.log(xAxisValues)
        return xAxisValues
    }

    _returnYAxisValues(data) {
        let yAxisValues = []

        const maxValue = this.#getMaxYValue(data) // Extract into its own function ?
        let currentValue = 0
        for (let i = 0; i < this.#yAxisPoints; i++) {
            currentValue += maxValue / this.#yAxisPoints
            yAxisValues.push(currentValue)
        }

        const startValue = 0 // Bar charts should start at 0 so they don't look misleading
        yAxisValues.unshift(startValue)

        console.log(yAxisValues)
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