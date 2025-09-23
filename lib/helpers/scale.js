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
    #minYValue
    #xAxisDataBoxes
    #fontSize

    constructor() {
    }

    get heightScale() { 
        return this.#chartHeight / this.#maxYValue 
    }

    get yAxisPointDistance() {
        return this.#chartHeight / this.#yAxisPoints
    }

    get xAxisDataBoxes() {
        return this.#xAxisDataBoxes
    }

    get xAxisDataBoxCenters() {
        return this.#xAxisDataBoxes / 2
    }

    get barWidth() {
        return this.xAxisDataBoxes / this.#barWidthRatio
    }

    get fontSize() {
        return this.#fontSize
    }

    _getBarYAxisValues() {   // TODO refactor these two into one method?
        let yAxisValues = []

        const maxValue = this.#maxYValue
        let currentValue = 0  // Bar charts should start at 0 so they aren't misleading
        for (let i = 0; i <= this.#yAxisPoints; i++) {
            yAxisValues.push(currentValue)
            currentValue += maxValue / this.#yAxisPoints
        }

        return yAxisValues
    }

    _getLineYAxisValues() {
        let yAxisValues = []

        const maxValue = this.#maxYValue
        let currentValue = this.#minYValue
        for (let i = 0; i <= this.#yAxisPoints; i++) {
            yAxisValues.push(currentValue)
            currentValue += maxValue / this.#yAxisPoints
        }

        return yAxisValues
    }

    _setAllValues(data, options) {
        this.#chartHeight = options["chartHeight"]
        this.#chartWidth = options["chartWidth"]

        this.#setMaxYValue(data)
        this.#setMinYValue(data)
        this.#setFontSize(data)
        this.#setXAxisDataBoxes(data)
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

    #setMinYValue(data) {
        let minDataValue = Infinity

        data.forEach((object) => {
            const dataValue = object.number
            if (dataValue < minDataValue) {
                minDataValue = dataValue
            }
        })

        const minValue = Math.floor(minDataValue)
        this.#minYValue = minValue
    }

    #setXAxisDataBoxes(data) {
        this.#xAxisDataBoxes = this.#chartWidth / (data.length)
    }

    #setFontSize(data) {
        // set font size based on chart dimensions and amount of data categories
    }
}