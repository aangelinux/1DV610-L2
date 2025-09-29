/**
 * @module Calculates the scales of the chart.
 * @file helpers/scale.js
 */

export class Scale {
    #yAxisRows = 4

    constructor() {
    }

    _getFontSize(data) {
        // TODO set font size based on chart dimensions and amount of data categories
    }

    _getXAxisColumns(width, data) {
        return width / data.length
    }

    _getYAxisValues(minYValue, maxYValue) {
        return this.#createArrayFrom(minYValue, maxYValue)
    }

    #createArrayFrom(startValue, maxValue) {
        let currentValue = startValue
        let yAxisValues = []

        for (let i = 0; i <= this.#yAxisRows; i++) {
            yAxisValues.push(currentValue)
            currentValue += maxValue / this.#yAxisRows
        }

        // Temp solution, remove first value because otherwise 5 rows will be rendered instead of 4
        yAxisValues.shift()
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

        const minValue = Math.floor(minDataValue)  // TODO add some space between minValue and xAxis
        return minValue
    }

    _getPieChartDecimals(data) {
        let dataDecimals = []

        const sum = this.#getSumOf(data)
        data.forEach((object) => {
            const decimal = Number((object.value / sum).toFixed(2))
            const dataDecimal = {
                name: object.name,
                decimal,
            }
            dataDecimals.push(dataDecimal)
        })

        return dataDecimals
    }

    #getSumOf(values) {
        let valuesArray = []
        values.forEach((object) => {
            valuesArray.push(object.value)
        })

        return valuesArray.reduce((a, b) => a + b)
    }

    _getPieSliceData(dataDecimals, intialCoordinates, centerCoordinates, radius) {
        let pieSlicesData = []
        let startCoordinates = intialCoordinates

        dataDecimals.forEach((dataObject) => {
            const angle = this.#calculateAngle(dataObject.decimal)
            const endCoordinates = this.#getEndCoordinates(startCoordinates, centerCoordinates, angle, radius)
            const largeArcFlag = this.#getLargeArcFlag(angle)

            pieSlicesData.push({
                name: dataObject.name,
                startCoordinates,
                endCoordinates,
                largeArcFlag
            })
            
            startCoordinates = endCoordinates
        })

        return pieSlicesData
    }

    #getEndCoordinates(startCoordinates, centerCoordinates, angle, radius) { // TODO reduce number of params
        const startAngle = this.#calculateStartAngle(startCoordinates, centerCoordinates)
        const angleInRadians = this.#calculateRadians(angle)
        const endAngle = startAngle + angleInRadians

        return this.#calculateEndCoordinates(centerCoordinates, radius, endAngle)
    }

    #calculateStartAngle(startCoordinates, centerCoordinates) {
        const deltaX = startCoordinates.x - centerCoordinates.x
        const deltaY = startCoordinates.y - centerCoordinates.y

        return Math.atan2(deltaY, deltaX)
    }

    #calculateAngle(decimal) {
        return decimal * 360
    }

    #getLargeArcFlag(angle) {
        let largeArcFlag
        if (angle > 180) {
            largeArcFlag = 1
        } else {
            largeArcFlag = 0
        }

        return largeArcFlag
    }

    #calculateRadians(angle) {
        return angle * (Math.PI/180)
    }

    #calculateEndCoordinates(centerCoordinates, radius, endAngle) {
        const x = centerCoordinates.x + radius * Math.cos(endAngle)
        const y = centerCoordinates.y + radius * Math.sin(endAngle)

        return { x, y }
    }
}