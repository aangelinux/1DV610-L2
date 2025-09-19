/**
 * @module Defines validation logic for chart data and options.
 * @file helpers/validator.js
 */

export class Validator {
    #dataAmountOfObjects = { min: 2, max: 10 }
    #dataObjectAmountOfKeys = 2
    #dataObjectSecondKeyConstraints = { min: 0, max: 1000000 }
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
        // TODO Fix method names of submethods
        this.#isWithinLimitsFor(data)
        this.#isCorrectTypesFor(data)
    }

    _validateOptions(options) {
        // TODO Fix method names of submethods
        this.#isWithinConstraintsFor(options)
        this.#isDefinedTypesFor(options)
    }

    #isWithinLimitsFor(data) {
        // Check that data array contains between 2-10 objects
        // Check that each object contains exactly two keys
        // Check that second key of each object has value between 0 - 1 000 000

        if (data.length >= this.#dataAmountOfObjects.min  // Extract
            && data.length <= this.#dataAmountOfObjects.max) {
        } else {
            throw new RangeError("Amount of data objects is outside limits [2-10]");
        }

        data.forEach((object) => {
            if (object.number >= this.#dataObjectSecondKeyConstraints.min  // Extract
                && object.number <= this.#dataObjectSecondKeyConstraints.max) {
            } else {
                throw new RangeError("Data value is outside limits [0 - 1 000 000]")
            }
            if (Object.keys(object).length === this.#dataObjectAmountOfKeys) {  // Extract
            } else {
                throw new RangeError("Amount of keys in data object is outside limit [2]")
            }
        })
    }

    #isCorrectTypesFor(data) {
        // Check that data is array of objects
        // Check that first key contains string value
        // Check that second key contains int value

        if (Array.isArray(data)) {  // Extract
        } else {
            throw new TypeError("Data needs to be of type Array")
        }

        data.forEach((object) => {
            if (typeof object === "object") {  // Extract
            } else {
                throw new TypeError("Data objects need to be of type Object")
            }
            if (typeof Object.values(object)[0] === "string") {  // Extract
            } else {
                throw new TypeError("First key of data object needs to be of type string")
            }
            if (typeof Object.values(object)[1] === "number") {  // Extract
            } else {
                throw new TypeError("Second key of data object needs to be of type number")
            }
        })
    }

    #isWithinConstraintsFor(options) {
        // Check that options object contains 1-5 keys
        // Check that chartWidth is between 200-1000
        // Check that chartHeight is between 150-800

        if (Object.keys(options).length >= this.#optionsAmountOfKeys.min
            && Object.keys(options).length <= this.#optionsAmountOfKeys.max) {
        } else {
            throw new RangeError("Amount of option keys are outside of limits [1-5]")
        }

        if (options["chartWidth"] >= this.#optionsConstraints["chartWidth"].min
            && options["chartWidth"] <= this.#optionsConstraints["chartWidth"].max) {
        } else {
            throw new RangeError("Chart width is outside of limits [200-1000]")
        }

        if (options["chartHeight"] >= this.#optionsConstraints["chartHeight"].min
            && options["chartHeight"] <= this.#optionsConstraints["chartHeight"].max) {
        } else {
            throw new RangeError("Chart height is outside of limits [150-800]")
        }
    }

    #isDefinedTypesFor(options) {
        // Check that options is an object
        // Check that keys 'chartWidth' and 'chartHeight' has int values
        // Check that key 'title' has string value
        // Check that key 'color' has 1-2 string values matching strings in specified array

        if (typeof options === "object" && !Array.isArray(options)) {
        } else {
            throw new TypeError("Options object needs to be of type object")
        }

        if (typeof options["chartWidth"] === "number") {
        } else {
            throw new TypeError("Chart width value needs to be of type number")
        }

        if (typeof options["chartHeight"] === "number") {
        } else {
            throw new TypeError("Chart height value needs to be of type number")
        }

        if (typeof options["title"] === "string") {
        } else {
            throw new TypeError("Chart title needs to be of type string")
        }

        if (typeof options["color"] === "string") {
        } else {
            throw new TypeError("Chart color value needs to be of type string")
        }
    }
}