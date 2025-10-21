/**
 * @module Computes the scales of the chart's layout and data markers.
 */

export class Scale {
    constructor() {
    }

    getColumns(width, data) {
        return Math.round(width / data.length)
    }

    getBiggestValue(data) {
        let maxValue = -Infinity
        data.forEach((object) => {
            if (object.value > maxValue) {
                maxValue = object.value
            }
        })
        const maxValueLog = Math.ceil(Math.log10(maxValue))

		// so bars/lines don't reach top of chart; looks better
		const chartTopMargin = Math.pow(10, maxValueLog) / 10
        maxValue += chartTopMargin

        return maxValue
    }

    getSmallestValue(data) {
        let minValue = Infinity
        data.forEach((object) => {
            if (object.value < minValue) {
                minValue = object.value
            }
        })
        minValue = Math.floor(minValue)

        return minValue
    }

    getValues(minValue, maxValue, rows) {
        return this.#createValueArray(minValue, maxValue, rows)
    }

    #createValueArray(startValue, maxValue, rows) {
        let currentValue = startValue
        let yAxisValues = []

        for (let i = 0; i <= rows; i++) {
            yAxisValues.push(Math.round(currentValue))
            currentValue += maxValue / rows
        }
        yAxisValues.shift() // Don't need first value, it'll be rendered on x-axis
		yAxisValues.reverse() // Start from the lowest value
		
        return yAxisValues
    }

    getFractions(data) {
        let fractions = []
        const dataSum = this.#getSumOf(data)
        data.forEach((object) => {
            const fraction = Number((object.value / dataSum).toFixed(2))
            const dataFraction = {
                name: object.name,
                fraction,
            }
            fractions.push(dataFraction)
        })

        return fractions
    }

    #getSumOf(values) {
        return values.reduce((a, b) => a + b.value, 0)
    }

    getPieSliceData(data) {
        const { fractions, initCoordinates, radius, centerCoordinates } = data
        let pieSlicesData = []
        let startCoordinates = initCoordinates

        fractions.forEach((object) => {
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
        const angle = this.#calculateAngle(object.fraction)
        const angleInRadians = this.#calculateRadians(angle)
        
        return startAngle + angleInRadians
    }

    #calculateStartAngle(data) {
        const { startCoordinates, centerCoordinates } = data
        const deltaX = startCoordinates.x - centerCoordinates.x
        const deltaY = startCoordinates.y - centerCoordinates.y

        return Math.atan2(deltaY, deltaX)
    }

    #calculateAngle(fraction) {
        return fraction * 360
    }


    #calculateRadians(angle) {
        return angle * (Math.PI/180)
    }

    #createPieSlice(data, endCoordinates) {
        const { object, startCoordinates } = data
        const angle = this.#calculateAngle(object.fraction)
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