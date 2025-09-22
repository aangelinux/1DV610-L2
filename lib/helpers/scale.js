/**
 * @module Calculates the scales of the chart elements.
 * @file helpers/scale.js
 */

export class Scale {
    #yAxisPoints = 4
    #barWidthRatio = 3
    #chartHeight
    #chartWidth
    #maxYValue
    #wrapperWidth
    #xAxisTextDistance
    #fontSize

    constructor() {
    }

    get heightScale() {
        return this.#chartHeight / this.#maxYValue
    }

    get yAxisPointDistance() {
        return this.#chartHeight / this.#yAxisPoints
    }

    get xAxisTextDistance() {
        return this.#xAxisTextDistance
    }

    get wrapperWidth() {
        return this.#wrapperWidth
    }

    get barWidth() {
        return this.#wrapperWidth / this.#barWidthRatio
    }

    get fontSize() {
        return this.#fontSize
    }

    _setAllValues(data, options) {
        this.#chartHeight = options["chartHeight"]
        this.#chartWidth = options["chartWidth"]

        this.#setMaxYValue(data)
        this.#setFontSize(data)
        this.#setWrapperWidth(data)
        this.#setXAxisTextDistance(data)
    }

    _getXAxisValues(data) {
        let xAxisValues = []

        data.forEach((object) => {
            xAxisValues.push(object.text)
        })

        return xAxisValues
    }

    _getBarYAxisValues() {
        let yAxisValues = []

        const maxValue = this.#maxYValue
        let currentValue = 0
        for (let i = 0; i < this.#yAxisPoints; i++) {
            currentValue += maxValue / this.#yAxisPoints
            yAxisValues.push(currentValue)
        }

        const startValue = 0 // Bar charts should start at 0 so they aren't misleading
        yAxisValues.unshift(startValue)

        return yAxisValues
    }

    #setMaxYValue(data) {
        let maxDataValue = -Infinity

        data.forEach((object) => {
            const dataValue = object.number
            if (dataValue > maxDataValue) {
                maxDataValue = dataValue
            }
        })

        const maxDataValueLog = Math.ceil(Math.log10(maxDataValue))
        const maxValue = (Math.pow(10, maxDataValueLog))

        this.#maxYValue = maxValue
    }

    #setWrapperWidth(data) {
        this.#wrapperWidth = this.#chartWidth / (data.length - 1)
    }

    #setXAxisTextDistance(data) {
        this.#xAxisTextDistance = this.#chartWidth / (data.length - 1)
    }

    #setFontSize(data) {
        // set font size based on chart dimensions and amount of data categories
    }
}