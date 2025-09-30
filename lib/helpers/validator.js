/**
 * @module Validates the data and options for the chart.
 * @file helpers/validator.js
 */

export class Validator {
    #dataObjects = { min: 2, max: 10 }
    #dataObjectKeys = { min: 2, max: 2 }
    #dataSecondKeyValue = { min: -1000000, max: 1000000 } // TODO add separate values for different charts
    #optionsKeys = { min: 3, max: 5 }
    #optionsKeysValues = {
        width: { min: 200, max: 1000 },
        height: { min: 150, max: 800 },
        radius: { min: 100, max: 400 },
        color: ["darkred", "red", "orange", "yellow", "green", "blue", "indigo", "violet"],
        font: ["monaco, monospace", "arial", "verdana", "tahoma", "times new roman", "georgia"]
    }

    #dataTypes = {
        name: "string",
        value: "number",
    }
    #optionsTypes = {
        width: "number",
        height: "number",
        radius: "number",
        title: "string",
        color: "string",
        font: "string"
    }

    constructor() {
    }
    
    _validateData(data) {
        this.#validateDataValues(data)
        this.#validateDataTypes(data)
    }

    _validateOptions(options) {
        this.#validateOptionValues(options)
        this.#validateOptionTypes(options)
    }

    #validateDataValues(data) {
        const numberOfDataObjects = data.length
        this.#validateRangeOf(numberOfDataObjects, this.#dataObjects)

        data.forEach((object) => {
            const numberOfDataObjectKeys = Object.keys(object).length
            this.#validateRangeOf(numberOfDataObjectKeys, this.#dataObjectKeys)
            
            const secondKey = Object.keys(object)[1]
            this.#validateRangeOf(object[secondKey], this.#dataSecondKeyValue)
        })
    }

    #validateOptionValues(options) {
        const numberOfOptionsKeys = Object.keys(options).length
        this.#validateRangeOf(numberOfOptionsKeys, this.#optionsKeys)

        for (const key in this.#optionsKeysValues) {
            const matchingKey = this.#findMatchingKey(key, Object.keys(options))
            if (matchingKey) {  // TODO break out into separate method
                if (matchingKey === "color" || matchingKey === "font") {
                    this.#validateStringOf(
                    options[matchingKey].toLowerCase(), this.#optionsKeysValues[matchingKey])
                } else {
                    this.#validateRangeOf(
                    options[matchingKey], this.#optionsKeysValues[matchingKey])   
                }
            }
        }
    }

    #validateDataTypes(data) {
        data.forEach((dataObject) => {
            const dataObjectKeys = Object.keys(dataObject)
            dataObjectKeys.forEach((key) => {
                this.#validateKey(dataObject, key, this.#dataTypes)
            })
        })
    }

    #validateOptionTypes(options) {
        const optionKeys = Object.keys(options)
        optionKeys.forEach((key) => {
            this.#validateKey(options, key, this.#optionsTypes)
        })
    }

    #validateRangeOf(value, range) {  // TODO tell the user which object is throwing the error
        if (!this.#isWithinRange(value, range)) {
            throw new RangeError(
            `Value of: [${value}] is outside valid range for [${range.min} - ${range.max}]`)
        }
    }

    #validateStringOf(string, validStrings) {
        if (!this.#findMatchingKey(string, validStrings)) {
            throw new TypeError(
            `String: [${string}] does not match any valid strings [${validStrings}]`)
        }
    }

    #validateKey(object, key, schema) {
        const matchingKey = this.#findMatchingKey(key, Object.keys(schema))  
        if (!matchingKey) {
            throw new SyntaxError(
            `Key: [${key}] of object: [${JSON.stringify(object)}] does not match any valid keys`)
        }

        const keyType = typeof object[key]
        const matchingKeyType = schema[matchingKey]
        if (!this.#isSameType(keyType, matchingKeyType)) {
            throw new TypeError(
            `Key: [${key}] of object: [${JSON.stringify(object)}] needs to be of type 
            ${matchingKeyType}`)
        }
    }

    #isWithinRange(value, range) {
        return value >= range.min && value <= range.max
    }

    #findMatchingKey(key, schemaKeys) {
        return schemaKeys.find((element) => element === key)
    }

    #isSameType(keyType, matchingKeyType) {
        return keyType === matchingKeyType
    }
}