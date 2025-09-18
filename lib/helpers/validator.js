/**
 * @module Defines validation logic for chart data and options.
 * @file helpers/validator.js
 */

export class Validator {
    constructor() {
    }

    _validate(data) {
        this.#compareTypeOf(data)
        this.#compareLimitsOf(data)
    }

    _validate(options) {
        this.#compareTypeOf(options)
        this.#compareLimitsOf(options)
    }

    #compareTypeOf(data) {
        // TODO
    }

    #compareLimitsOf(data) {
        // TODO
    }

    #compareTypeOf(options) {
        // TODO
    }

    #compareLimitsOf(options) {
        // TODO
    }
}