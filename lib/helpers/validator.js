/**
 * @module Validates the data and options for the chart.
 * @file helpers/validator.js
 */

export class Validator {
    #dataObjects = { min: 2, max: 10 }
    #dataObjectKeys = { min: 2, max: 2 }
    #dataKeyValue = { min: 0, max: 1000000 }

    #optionKeys = { min: 4, max: 4 }
    #optionKeyValues = {
        chartWidth: { min: 200, max: 1000 },
        chartHeight: { min: 150, max: 800 },
    }

    #dataTypes = {
        text: "string",
        number: "number",
    }
    #optionsTypes = {
        chartWidth: "number",
        chartHeight: "number",
        title: "string",
        color: "string",
    }

    constructor() {
    }

    _validateData(data) {
        this.#checkDataValues(data)
        this.#checkDataTypes(data)
    }

    _validateOptions(options) {
        this.#checkOptionValues(options)
        this.#checkOptionTypes(options)
    }

    #checkDataValues(data) {
        const numberOfDataObjects = data.length
        if (!this.#isWithinRange(numberOfDataObjects, this.#dataObjects)) {
            throw new RangeError(`Number of data objects: [${numberOfDataObjects}] is outside valid range [${this.#dataObjects.min} - ${this.#dataObjects.max}]`)
        }

        data.forEach((object) => {
            const numberOfDataObjectKeys = Object.keys(object).length
            if (!this.#isWithinRange(numberOfDataObjectKeys, this.#dataObjectKeys)) {
                throw new RangeError(`Number of keys in data object: [${JSON.stringify(object)}] is outside valid range [${this.#dataObjectKeys.min} - ${this.#dataObjectKeys.max}]`)
            }

            const secondKey = Object.keys(object)[1]
            if (!this.#isWithinRange(object[secondKey], this.#dataKeyValue)) {
                throw new RangeError(`Value of second key in object: [${JSON.stringify(object)}] is outside valid range [${this.#dataKeyValue.min} - ${this.#dataKeyValue.max}]`)
            }
        })
    }

    #checkOptionValues(options) {
        const numberOfOptionsKeys = Object.keys(options).length
        if (!this.#isWithinRange(numberOfOptionsKeys, this.#optionKeys)) {
            throw new RangeError(`Number of keys in options object: [${numberOfOptionsKeys}] is outside valid range [${this.#optionKeys.min} - ${this.#optionKeys.max}]`)
        }

        const chartWidthValue = options["chartWidth"]
        if (!this.#isWithinRange(chartWidthValue, this.#optionKeyValues["chartWidth"])) {
            throw new RangeError(`Value of chart width: [${chartWidthValue}] is outside valid range [${this.#optionKeyValues["chartWidth"].min} - ${this.#optionKeyValues["chartWidth"].max}]`)
        }

        const chartHeightValue = options["chartHeight"]
        if (!this.#isWithinRange(chartHeightValue, this.#optionKeyValues["chartHeight"])) {
            throw new RangeError(`Value of chart height: [${chartHeightValue}] is outside valid range [${this.#optionKeyValues["chartHeight"].min} - ${this.#optionKeyValues["chartHeight"].max}]`)
        }
    }

    #isWithinRange(value, constraints) {
        return value >= constraints.min && value <= constraints.max
    }

    #checkDataTypes(data) {
        const dataSchemaKeys = Object.keys(this.#dataTypes)

        data.forEach((object) => {
            const objectKeys = Object.keys(object)  // Extract
            objectKeys.forEach((key) => {
                const matchingKey = this.#findMatchingKey(key, dataSchemaKeys)  
                if (!matchingKey) {
                    throw new SyntaxError(`Option key [${key}] does not match any valid option`)
                }

                const matchingKeyType = this.#dataTypes[matchingKey]  // Extract
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
        const optionSchemaKeys = Object.keys(this.#optionsTypes)

        optionKeys.forEach((key) => {
            const matchingKey = this.#findMatchingKey(key, optionSchemaKeys)  // Extract
            if (!matchingKey) {
                throw new SyntaxError(`Option key [${key}] does not match any valid option`)
            }

            const matchingKeyType = this.#optionsTypes[matchingKey]  // Extract
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
}