/**
 * @module Defines a class for calculating chart scales.
 * @file helpers/scale.js
 */

export class Scale {
    #yAxisPoints = 4

    constructor() {
    }

    calculateBarChartYAxis(data) {
        let maxDataValue = -Infinity
        let minDataValue = Infinity
        let yAxisValues = []

        data.forEach((object) => {
            const dataValue = object.number
            if (dataValue > maxDataValue) {
                maxDataValue = dataValue
            }
        })
        data.forEach((object) => {
            const dataValue = object.number
            if (dataValue < minDataValue) {
                minDataValue = dataValue
            }
        })

        const startValue = 0 // Bar charts should start at 0 so they are not misleading
        const maxValue = (Math.ceil(maxDataValue / 10)) * 10 

        console.log(startValue, maxValue)

        let currentValue = 0
        for (let i = 0; i < this.#yAxisPoints; i++) {
            currentValue += maxValue / this.#yAxisPoints
            yAxisValues.push(currentValue)
        }

        yAxisValues.unshift(startValue)
        console.log(yAxisValues)
    }
}