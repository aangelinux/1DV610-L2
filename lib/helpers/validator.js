/**
 * @module Validates the data and options for the chart.
 * @file helpers/validator.js
 */

import { Limits } from "../config/limits.js"

export class Validator {
	#limits

    constructor() {
		this.#limits = new Limits()
    }
    
    _validateData(data) {
        this.#validateDataValues(data)
        this.#validateDataTypes(data)
    }

    _validateOptions(options) {
        this.#validateOptionValues(options)
		this.#validateOptionStrings(options)
        this.#validateOptionTypes(options)
    }

    #validateDataValues(data) {
        const numberOfDataObjects = data.length
        this.#validateRange(numberOfDataObjects, this.#limits.dataObjects)

        data.forEach((object) => {
            const numberOfDataObjectKeys = Object.keys(object).length
            this.#validateRange(numberOfDataObjectKeys, this.#limits.dataObjectKeys)
            
            const secondKey = Object.keys(object)[1]
            this.#validateRange(object[secondKey], this.#limits.dataValue)
        })
    }

    #validateOptionValues(options) {
        const numberOfOptionsKeys = Object.keys(options).length
        this.#validateRange(numberOfOptionsKeys, this.#limits.optionKeys)

        for (const key in this.#limits.optionValues) {
            const matchingKey = this.#findMatchingKey(key, Object.keys(options))
            if (matchingKey) {
				this.#validateRange(
				options[matchingKey], this.#limits.optionValues[matchingKey])   
            }
        }
    }

	#validateOptionStrings(options) {
        for (const key in this.#limits.optionStrings) {
            const matchingKey = this.#findMatchingKey(key, Object.keys(options))
            if (matchingKey) {
                this.#validateString(
                options[matchingKey].toLowerCase(), 
				this.#limits.optionStrings[matchingKey])
			}
		}
	}

    #validateDataTypes(data) {
        data.forEach((dataObject) => {
            const dataObjectKeys = Object.keys(dataObject)
            dataObjectKeys.forEach((key) => {
                this.#validateType(dataObject, key, this.#limits.dataTypes)
            })
        })
    }

    #validateOptionTypes(options) {
        const optionKeys = Object.keys(options)
        optionKeys.forEach((key) => {
            this.#validateType(options, key, this.#limits.optionsTypes)
        })
    }

    #validateRange(value, range) {
        if (!this.#isWithinRange(value, range)) {
            throw new RangeError(
            `Value of: [${value}] is outside valid range for [${range.min} - ${range.max}]`)
        }
    }

    #validateString(string, validStrings) {
        if (!this.#findMatchingKey(string, validStrings)) {
            throw new TypeError(
            `String: [${string}] does not match any valid strings [${validStrings}]`)
        }
    }

    #validateType(object, key, schema) {
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