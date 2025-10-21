/**
 * @module Validates that data and style options follow the defined rules.
 */

export class Validator {
	#rules

    constructor(rules) {
		this.#rules = rules
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
				const types = this.#rules.dataTypes
                this.#validateType(dataObject, key, types)
            })
        })
    }

    #validateOptionTypes(options) {
        const optionKeys = Object.keys(options)
        optionKeys.forEach((key) => {
			const types = this.#rules.optionsTypes
            this.#validateType(options, key, types)
        })
    }

    #validateDataRanges(data) {
        const numberOfDataObjects = data.length
		const dataRange = this.#rules.dataObjects
        this.#validateRange(data, numberOfDataObjects, dataRange)

        data.forEach((object) => {
            const numberOfKeys = Object.keys(object).length
			const keyRange = this.#rules.dataObjectKeys
            this.#validateRange(object, numberOfKeys, keyRange)

            const value = object["value"]
			const valueRange = this.#rules.dataRange
            this.#validateRange(object, value, valueRange)
        })
    }

    #validateOptionRanges(options) {
        const numberOfKeys = Object.keys(options).length
		const keyRange = this.#rules.optionKeys
        this.#validateRange(options, numberOfKeys, keyRange)

        for (const key in this.#rules.optionRanges) {
            const matchingKey = this.#findMatchingKey(key, Object.keys(options))
            if (matchingKey) {
				const value = options[matchingKey]
				const valueRange = this.#rules.optionRanges[matchingKey]
				this.#validateRange(options, value, valueRange)
            }
        }
    }

	#validateOptionStrings(options) {
        for (const key in this.#rules.optionStrings) {
            const matchingKey = this.#findMatchingKey(key, Object.keys(options))
            if (matchingKey) {
				const string = options[matchingKey].toLowerCase()
				const validStrings = this.#rules.optionStrings[matchingKey]
                this.#validateString(options, string, validStrings)
			}
		}
	}

    #validateType(object, key, schema) {
        const matchingKey = this.#findMatchingKey(key, Object.keys(schema))  
        if (!matchingKey) {
			const currentObj = JSON.stringify(object)
            throw new SyntaxError(`[${key}] of [${currentObj}] is invalid`)
        }
		
        const keyType = typeof object[key]
        const matchingKeyType = schema[matchingKey]
        if (!this.#isSameType(keyType, matchingKeyType)) {
			const currentObj = JSON.stringify(object)
            throw new TypeError(`[${key}] of [${currentObj}] is wrong type`)
        }
    }

    #validateRange(object, value, range) {
        if (!this.#isWithinRange(value, range)) {
			const currentObj = JSON.stringify(object)
            throw new RangeError(`[${value}] of [${currentObj}] is outside range`)
        }
    }

    #validateString(object, string, validStrings) {
        if (!this.#findMatchingKey(string, validStrings)) {
			const currentObj = JSON.stringify(object)
            throw new TypeError(`[${string}] of [${currentObj}] is invalid`)
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