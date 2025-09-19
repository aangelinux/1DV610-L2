/**
 * @module Validates the data and options for the chart.
 * @file helpers/validator.js
 */

export class Validator {
    #limitForDataObjects = { min: 2, max: 10 }
    #limitForDataObjectKeys = 2
    #limitForDataObjectSecondKey = { min: 0, max: 1000000 }
    #optionsAmountOfKeys = { min: 1, max: 4 }
    #optionsConstraints = {
        chartWidth: { min: 200, max: 1000 },
        chartHeight: { min: 150, max: 800 },
    }

    #dataTypes = [
        {
            text: String,
            number: Number,
        }
    ]
    #optionsTypes = {
        chartWidth: Number,
        chartHeight: Number,
        title: String,
        color: String,
    }

    constructor() {
    }

    _validateData(data) {
        this.#dataCheckLimits(data)
        this.#dataCheckTypes(data)
    }

    _validateOptions(options) {
        this.#optionsCheckLimits(options)
        this.#optionsCheckTypes(options)
    }

    #dataCheckLimits(data) {
        const objects = data.length
        this.#hasValidNumberOf(objects)

        data.forEach((object) => {
            const keys = Object.keys(object).length
            this.#objectHasValidNumberOf(keys)
            const secondKey = object.number
            this.#objectHasValid(secondKey)
        })
    }

    #hasValidNumberOf(objects) {
        if (objects >= this.#limitForDataObjects.min && objects <= this.#limitForDataObjects.max) {
            return    
        } else {
            throw new RangeError(`Number of data objects [${objects}] is outside limits [2-15]`)
        }
    }

    #objectHasValidNumberOf(keys) {
        if (keys === this.#limitForDataObjectKeys) {
            return
        } else {
            throw new RangeError(`Number of data object keys [${keys}] is outside limit [2]`)
        }
    }

    #objectHasValid(secondKey) {
        if (secondKey >= this.#limitForDataObjectSecondKey.min
            && secondKey <= this.#limitForDataObjectSecondKey.max) {
            return
        } else {
            throw new RangeError(`Value of second key [${secondKey}] is outside limits [0 - 1 000 000]`)
        }
    }

    #optionsCheckLimits(options) {
        const keys = Object.keys(options).length
        this.#optionsObjectHasValidNumberOf(keys)

        // Refactor these into one function
        const chartWidth = options["chartWidth"]
        this.#optionsObjectHasValidWidth(chartWidth)
        const chartHeight = options["chartHeight"]
        this.#optionsObjectHasValidHeight[chartHeight]
    }

    #optionsObjectHasValidNumberOf(keys) {
        if (keys >= this.#optionsAmountOfKeys.min && keys <= this.#optionsAmountOfKeys.max) {
            return
        } else {
            throw new RangeError(`Number of option object keys [${keys}] are outside of limits [1-5]`)
        }
    }

    #optionsObjectHasValidWidth(chartWidth) {
        if (chartWidth >= this.#optionsConstraints["chartWidth"].min
            && chartWidth <= this.#optionsConstraints["chartWidth"].max) {
            return
        } else {
            throw new RangeError(`Chart width [${chartWidth}] is outside of limits [200-1000]`)
        }
    }

    #optionsObjectHasValidHeight(chartHeight) {
        if (chartHeight >= this.#optionsConstraints["chartHeight"].min
            && chartHeight <= this.#optionsConstraints["chartHeight"].max) {
            return
        } else {
            throw new RangeError(`Chart width [${chartHeight}] is outside of limits [150-800]`)
        }
    }

    #dataCheckTypes(data) {
        this.#isTypeOfArray(data)

        data.forEach((object) => {
            const dataObject = object
            this.#isTypeOfObject(dataObject)

            const firstValue = Object.values(object)[0]
            this.#isTypeOfString(firstValue)
            const secondValue = Object.values(object)[1]
            this.#isTypeOfNumber(secondValue)
        })
    }

    #optionsCheckTypes(options) {
        this.#isTypeOfObject(options)

        const chartWidth = options["chartWidth"]
        this.#isTypeOfNumber(chartWidth)

        const chartHeight = options["chartHeight"]
        this.#isTypeOfNumber(chartHeight)

        const title = options["title"]
        this.#isTypeOfString(title)

        const color = options["color"]
        this.#isTypeOfString(color)
    }

    #isTypeOfArray(variable) {
        if (Array.isArray(variable)) {
            return
        } else {
            throw new TypeError(`${variable} needs to be of type Array`)
        }
    }

    #isTypeOfObject(variable) {
        if (typeof variable === "object" && !Array.isArray(variable)) {
            return
        } else {
            throw new TypeError(`${variable} needs to be of type object`)
        }
    }

    #isTypeOfString(variable) {
        if (typeof variable === "string") {
            return
        } else {
            throw new TypeError(`${variable} needs to be of type string`)
        }
    }

    #isTypeOfNumber(variable) {
        if (typeof variable === "number") {
            return
        } else {
            throw new TypeError(`${variable} needs to be of type number`)
        }
    }
}