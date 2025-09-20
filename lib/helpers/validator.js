/**
 * @module Validates the data and options for the chart.
 * @file helpers/validator.js
 */

export class Validator {
    #dataObjects = { min: 2, max: 10 }
    #dataObjectKeys = { min: 2, max: 2 }
    #dataSecondKeyValue = { min: 0, max: 1000000 }

    #optionKeys = { min: 4, max: 4 }
    #optionKeyValues = {
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

    _validateData(data) {   // TODO remove this one?
        this.#validateDataValues(data)
        this.#validateDataTypes(data)
    }

    _validateOptions(options) {   // And this one
        this.#validateOptionValues(options)
        this.#validateOptionTypes(options)
    }

    #validateDataValues(data) {
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
            if (!this.#isWithinRange(object[secondKey], this.#dataSecondKeyValue)) {
                throw new RangeError(`Value of second key in object: [${JSON.stringify(object)}] is outside valid range [${this.#dataSecondKeyValue.min} - ${this.#dataSecondKeyValue.max}]`)
            }
        })
    }

    #validateOptionValues(options) {
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

/* ------------------------------ Good for now -------------------------------- */

    #validateDataTypes(data) {
        data.forEach((dataObject) => {  // Maybe use flatMap() or flat() instead?
            const dataObjectKeys = Object.keys(dataObject)

            dataObjectKeys.forEach((key) => {
                this.#validateKey(dataObject, key, this.#dataSchema)
            })
        })
    }

    #validateOptionTypes(options) {
        const optionKeys = Object.keys(options)

        optionKeys.forEach((key) => {
            this.#validateKey(options, key, this.#optionsSchema)
        })
    }

    #validateKey(object, key, schema) {  // TODO Three params is not good
        const matchingKey = this.#findMatchingKey(key, Object.keys(schema))  
        if (!matchingKey) {
            throw new SyntaxError(`Key: [${key}] of object: [${JSON.stringify(object)}] does not match any valid keys`)
        }

        const keyType = typeof object[key]
        const matchingKeyType = schema[matchingKey]
        if (!this.#hasSameType(keyType, matchingKeyType)) {
            throw new TypeError(`Key: [${key}] of object: [${JSON.stringify(object)}] needs to be of type 
            ${matchingKeyType}`)
        }
    }

    #findMatchingKey(key, schemaKeys) {
        return schemaKeys.find((element) => element === key)
    }

    #hasSameType(keyType, matchingKeyType) {
        return keyType === matchingKeyType
    }
}