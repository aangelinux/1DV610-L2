/**
 * @module Validates that data and style options follow the defined rules.
 */

import { Rules } from "../config/rules.js"

export class Validator {
	#rules

    constructor() {
		this.#rules = new Rules()
    }
    
    validateData(data) {
        this.#validateDataTypes(data)
        this.#validateDataRanges(data)
    }

    validateOptions(options) {
        this.#validateOptionTypes(options)
        this.#validateOptionRanges(options)
		this.#validateOptionStrings(options)
    }

    #validateDataTypes(data) {
        data.forEach((dataObject) => {
            const dataObjectKeys = Object.keys(dataObject)
            dataObjectKeys.forEach((key) => {
                this.#validateType(dataObject, key, this.#rules.dataTypes)
            })
        })
    }

    #validateOptionTypes(options) {
        const optionKeys = Object.keys(options)
        optionKeys.forEach((key) => {
            this.#validateType(options, key, this.#rules.optionsTypes)
        })
    }

    #validateDataRanges(data) {
        const numberOfDataObjects = data.length
        this.#validateRange(data, numberOfDataObjects, this.#rules.dataObjects)

        data.forEach((object) => {
            const numberOfKeys = Object.keys(object).length
            this.#validateRange(object, numberOfKeys, this.#rules.dataObjectKeys)
            const value = Object.keys(object)[1]
            this.#validateRange(object, object[value], this.#rules.dataRange)
        })
    }

    #validateOptionRanges(options) {
        const numberOfKeys = Object.keys(options).length
        this.#validateRange(options, numberOfKeys, this.#rules.optionKeys)

        for (const key in this.#rules.optionRanges) {
            const matchingKey = this.#findMatchingKey(key, Object.keys(options))
            if (matchingKey) {
				this.#validateRange(
				options,
				options[matchingKey], 
				this.#rules.optionRanges[matchingKey])   
            }
        }
    }

	#validateOptionStrings(options) {
        for (const key in this.#rules.optionStrings) {
            const matchingKey = this.#findMatchingKey(key, Object.keys(options))
            if (matchingKey) {
                this.#validateString(
				options,
                options[matchingKey].toLowerCase(), 
				this.#rules.optionStrings[matchingKey])
			}
		}
	}

    #validateType(object, key, schema) {
        const matchingKey = this.#findMatchingKey(key, Object.keys(schema))  
        if (!matchingKey) {
            throw new SyntaxError
			(`Key [${key}] of object [${JSON.stringify(object)}] is invalid`)
        }
        const keyType = typeof object[key]
        const matchingKeyType = schema[matchingKey]
        if (!this.#isSameType(keyType, matchingKeyType)) {
            throw new TypeError
			(`Key [${key}] of object [${JSON.stringify(object)}] is wrong type`)
        }
    }

    #validateRange(object, value, range) {
        if (!this.#isWithinRange(value, range)) {
            throw new RangeError
			(`Value [${value}] of object [${JSON.stringify(object)}] is outside allowed range`)
        }
    }

    #validateString(object, string, validStrings) {
        if (!this.#findMatchingKey(string, validStrings)) {
            throw new TypeError
			(`String [${string}] of object [${JSON.stringify(object)}] is invalid`)
        }
    }

    #findMatchingKey(key, schemaKeys) {
        return schemaKeys.find((element) => element === key)
    }

    #isSameType(keyType, matchingKeyType) {
        return keyType === matchingKeyType
    }

    #isWithinRange(value, range) {
        return value >= range.min && value <= range.max
    }
}