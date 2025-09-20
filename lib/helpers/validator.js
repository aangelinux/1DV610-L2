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

    #dataSchema = {
        text: "string",
        number: "number",
    }
    #optionsSchema = {
        chartWidth: "number",
        chartHeight: "number",
        title: "string",
        color: "string",
    }

    constructor() {
    }

    _validateData(data) {
        this.#checkDataTypes(data)
        this.#checkDataLimits(data)
    }

    _validateOptions(options) {
        this.#checkOptionTypes(options)
        this.#checkOptionsLimits(options)
    }

    #checkDataTypes(data) {
        const dataSchemaKeys = Object.keys(this.#dataSchema)

        data.forEach((object) => {
            const objectKeys = Object.keys(object)
            objectKeys.forEach((key) => {
                const matchingKey = this.#findMatchingKey(key, dataSchemaKeys)
                if (!matchingKey) {
                    throw new SyntaxError(`Option key [${key}] does not match any valid option`)
                }

                const matchingKeyType = this.#dataSchema[matchingKey]
                const keyType = typeof object[key]

                if (matchingKeyType === keyType) {
                    return
                } else {
                    throw new TypeError(`Option key [${key}] needs to be of type ${matchingKeyType}`)
                }
            })
        })
    }

    #checkOptionTypes(options) {
        const optionKeys = Object.keys(options)
        const optionSchemaKeys = Object.keys(this.#optionsSchema)

        optionKeys.forEach((key) => {
            const matchingKey = this.#findMatchingKey(key, optionSchemaKeys)
            if (!matchingKey) {
                throw new SyntaxError(`Option key [${key}] does not match any valid option`)
            }

            const matchingKeyType = this.#optionsSchema[matchingKey]
            const keyType = typeof options[key]

            if (matchingKeyType === keyType) {
                return
            } else {
                throw new TypeError(`Option key [${key}] needs to be of type ${matchingKeyType}`)
            }
        })
    }

    #findMatchingKey(key, schemaKeys) {
        return schemaKeys.find((element) => element === key)
    }

    #checkDataLimits(data) {
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

    #checkOptionsLimits(options) {
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
}