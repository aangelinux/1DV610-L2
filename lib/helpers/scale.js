/**
 * @module Calculates the scales of the chart elements.
 * @file helpers/scale.js
 */

export class Scale {
    #yAxisPoints = 4
    #barWidthRatio = 3
    #circleRadius = 5
    #pieGraphPadding = 50
    #height
    #width
    #radius
    #maxYValue
    #minYValue
    #xAxisDataBoxes
    #fontSize
    #angle = 0

    constructor() {
    }

    get heightScale() { 
        return this.#height / this.#maxYValue
    }

    get yAxisPointDistance() {
        return this.#height / this.#yAxisPoints
    }

    get xAxisDataBoxes() {
        return this.#xAxisDataBoxes
    }

    get xAxisDataBoxCenters() {
        return this.#xAxisDataBoxes / 2
    }

    get minYValue() {
        return this.#minYValue
    }

    get barWidth() {
        return this.xAxisDataBoxes / this.#barWidthRatio
    }

    get circleRadius() {
        return this.#circleRadius
    }

    get pieGraphDimensions() {
        return (this.#radius * 2) + this.#pieGraphPadding
    }

    get fontSize() {
        return this.#fontSize
    }

    get angle() {
        return this.#angle
    }

    set xAxisColumns(data) {
        return this.#width / (data.length)
    }

    set fontSize(data) {
        // set font size based on chart dimensions and amount of data categories
    }

    _setXAxisColumns(width, data) {
        return width / data.length
    }

    _setAllValues(data, options) {
        this.#height = options["height"]
        this.#width = options["width"]
        this.#radius = options["radius"]
    }

    _getYAxisValues(minYValue, maxYValue) {
        return this.#createArrayFrom(minYValue, maxYValue)
    }

    #createArrayFrom(startValue, maxValue) {
        let currentValue = startValue
        let yAxisValues = []

        const maxValue = this.#maxYValue
        for (let i = 0; i <= this.#yAxisPoints; i++) {
            yAxisValues.push(currentValue)
            currentValue += maxValue / this.#yAxisPoints
        }

        return yAxisValues
    }

    _getBiggestValueOf(data) {
        let maxDataValue = -Infinity

        data.forEach((object) => {
            const dataValue = object.value
            if (dataValue > maxDataValue) {
                maxDataValue = dataValue
            }
        })

        const maxDataValueLog = Math.ceil(Math.log10(maxDataValue))
        const maxValue = (Math.pow(10, maxDataValueLog))
        return maxValue
    }

    _getSmallestValueOf(data) {
        let minDataValue = Infinity

        data.forEach((object) => {
            const dataValue = object.value
            if (dataValue < minDataValue) {
                minDataValue = dataValue
            }
        })

        const minValue = Math.floor(minDataValue)
        return minValue
    }

    _getPieChartDecimals(data) {
        let values = []
        let decimals = []

        data.forEach((object) => {  // TODO extract into smaller function
            values.push(object.value)
        })
        const sum = values.reduce((a, b) => a + b)

        data.forEach((object) => {  // TODO extract into smaller function
            const decimal = Number((object.value / sum).toFixed(2))
            const dataDecimal = {
                name: object.name,
                decimal,
            }
            decimals.push(dataDecimal)
        })

        return decimals
    }

    _getCenterCoordinates() {
        return { x: (((this.#radius * 2) + this.#pieGraphPadding) / 2), 
                 y: (((this.#radius * 2) + this.#pieGraphPadding) / 2) }
    }

    _getNextCoordinates(decimal) {
        const centerCoordinates = this._getCenterCoordinates()
        this.#angle += this._calculateAngle(decimal)
        const radians = this.#calculateRadians(this.#angle)
        const coordinates = this.#calculateNextCoordinates(centerCoordinates, radians)

        return coordinates
    }

    _updateCoordinates() {
        const centerCoordinates = this._getCenterCoordinates()
        const radians = this.#calculateRadians(this.#angle)
        const coordinates = this.#calculateNextCoordinates(centerCoordinates, radians)

        return coordinates
    }

    _getLargeArcFlag(angle) {
        let largeArcFlag
        if (angle > 180) {
            largeArcFlag = 1
        } else {
            largeArcFlag = 0
        }

        return largeArcFlag
    }

    _calculateAngle(decimal) {
        return decimal * 360
    }

    #calculateRadians(angle) {
        return angle * (Math.PI/180)
    }

    #calculateNextCoordinates(centerCoordinates, radians) {
        const x = centerCoordinates.x + this.#radius * Math.cos(radians)
        const y = centerCoordinates.y + this.#radius * Math.sin(radians)

        return { x, y }
    }
}