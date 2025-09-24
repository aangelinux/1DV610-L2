/**
 * @module Calculates the scales of the chart elements.
 * @file helpers/scale.js
 */

export class Scale {
    #yAxisPoints = 4
    #barWidthRatio = 3
    #circleRadius = 5
    #pieGraphPadding = 50
    #chartHeight
    #chartWidth
    #radius
    #maxYValue
    #minYValue
    #xAxisDataBoxes
    #fontSize
    #angle = 0

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

    set xAxisDataBoxes(data) {
        this.#xAxisDataBoxes = this.#chartWidth / (data.length)
    }

    set fontSize(data) {
        // set font size based on chart dimensions and amount of data categories
    }

    _setAllValues(data, options) {
        this.#chartHeight = options["chartHeight"]
        this.#chartWidth = options["chartWidth"]
        this.#radius = options["radius"]

        this.xAxisDataBoxes = data
        this.fontSize = data
        this.#calculateMaxYValue(data)
        this.#calculateMinYValue(data)
    }

    _getBarYAxisValues() {
        return this.#createArrayStartingFrom(0) // Bar charts should start 0 to not be misleading
    }

    _getLineYAxisValues() {
        return this.#createArrayStartingFrom(this.#minYValue)
    }

    #createArrayStartingFrom(startValue) {
        let currentValue = startValue
        let yAxisValues = []

        const maxValue = this.#maxYValue
        for (let i = 0; i <= this.#yAxisPoints; i++) {
            yAxisValues.push(currentValue)
            currentValue += maxValue / this.#yAxisPoints
        }

        return yAxisValues
    }

    #calculateMaxYValue(data) {
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

    #calculateMinYValue(data) {
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

    _getPieChartDecimals(data) {
        let values = []
        let decimals = []

        data.forEach((object) => {  // TODO extract into smaller function
            values.push(object.number)
        })
        const sum = values.reduce((a, b) => a + b)

        data.forEach((object) => {  // TODO extract into smaller function
            const decimal = Number((object.number / sum).toFixed(2))
            const dataDecimal = {
                text: object.text,
                decimal,
            }
            decimals.push(dataDecimal)
        })

        return decimals
    }

    _getCoordinates(decimal) {
        const centerCoordinates = this._getCenterCoordinates()
        this.#angle += this.#calculateAngle(decimal)
        const radians = this.#calculateRadians(this.#angle)
        const coordinates = this.#calculateNextCoordinates(centerCoordinates, radians)

        console.log(this.#angle)
        console.log(radians)
        return coordinates
    }

    _getCenterCoordinates() {
        return { x: (((this.#radius * 2) + this.#pieGraphPadding) / 2), 
                 y: (((this.#radius * 2) + this.#pieGraphPadding) / 2) }
    }

    _getLargeArcFlag(angle) {
        let largeArcFlag
        if (angle >= 180) {
            largeArcFlag = 1
        } else {
            largeArcFlag = 0
        }

        return largeArcFlag
    }

    #calculateAngle(decimal) {
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