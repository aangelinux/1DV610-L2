/**
 * @module Defines validation logic for chart data and options.
 * @file helpers/validator.js
 */

export class Validator {
    constructor() {
    }

    _validate(data) {
        this.#compareTypeOf(data)
        this.#compareLimitOf(data)
    }

    _validate(options) {
        // Might not be good that method names for data and option methods are so similar
        this.#compareTypesOf(options)
        this.#compareLimitsOf(options)
    }

    #compareTypeOf(data) {
        // TODO
    }

    #compareLimitOf(data) {
        // TODO
    }

    #compareTypesOf(options) {
        // TODO
    }

    #compareLimitsOf(options) {
        // TODO
    }
}