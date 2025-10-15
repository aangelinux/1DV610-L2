/**
 * @module Calculates the scales of the chart.
 * @file helpers/scale.js
 */

export class Scale {
    constructor() {
    }

    _getColumns(width, data) {
        return width / data.length
    }

    _getValues(minValue, maxValue, rows) {
        return this.#createArrayFrom(minValue, maxValue, rows)
    }

    #createArrayFrom(startValue, maxValue, rows) {
        let currentValue = startValue
        let yAxisValues = []

        for (let i = 0; i <= rows; i++) {
            yAxisValues.push(currentValue.toFixed())
            currentValue += maxValue / rows
        }

        yAxisValues.shift() // First value not needed, it will be rendered on x-axis
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
		const yAxisTopMargin = (Math.pow(10, maxDataValueLog)) / 10
        const maxValue = maxDataValue + yAxisTopMargin

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

    _getPieSliceData(data) {
        const { decimals, initCoordinates, radius, centerCoordinates } = data
        let pieSlicesData = []
        let startCoordinates = initCoordinates

        decimals.forEach((object) => {
            const data = { object, startCoordinates, centerCoordinates, radius }
            const endCoordinates = this.#calculateEndCoordinates(data)
            const pieSlice = this.#createPieSlice(data, endCoordinates)

            pieSlicesData.push(pieSlice)
            startCoordinates = endCoordinates
        })

        return pieSlicesData
    }

    #calculateEndCoordinates(data) {
        const { centerCoordinates, radius } = data
        const endAngle = this.#calculateEndAngle(data)

        const x = centerCoordinates.x + radius * Math.cos(endAngle)
        const y = centerCoordinates.y + radius * Math.sin(endAngle)

        return { x, y }
    }

    #calculateEndAngle(data) {
        const { object } = data
        const startAngle = this.#calculateStartAngle(data)
        const angle = this.#calculateAngle(object.decimal)
        const angleInRadians = this.#calculateRadians(angle)
        
        return startAngle + angleInRadians
    }

    #calculateStartAngle(data) {
        const { startCoordinates, centerCoordinates } = data
        const deltaX = startCoordinates.x - centerCoordinates.x
        const deltaY = startCoordinates.y - centerCoordinates.y

        return Math.atan2(deltaY, deltaX)
    }

    #calculateAngle(decimal) {
        return decimal * 360
    }


    #calculateRadians(angle) {
        return angle * (Math.PI/180)
    }

    #createPieSlice(data, endCoordinates) {
        const { object, startCoordinates } = data
        const angle = this.#calculateAngle(object.decimal)
        const largeArcFlag = this.#getLargeArcFlag(angle)

        const pieSlice = {
            name: object.name,
            startCoordinates,
            endCoordinates,
            largeArcFlag
        }

        return pieSlice
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
}