/**
 * @module Configures the chart options.
 * @file helpers/config.js
 */

export class Config {
    #defaultOptions = {
        chartWidth: 550,
        chartHeight: 300,
        title: "Data Chart",
        color: "darkred",
        font: "Georgia"
    }

    constructor() {
    }

    get defaultOptions() {
        return this.#defaultOptions
    }

    _assemble(userOptions) {
        let assembledOptions = {}
        const userKeys = Object.keys(userOptions)

        for (const defaultKey in this.#defaultOptions) {
            const matchingKey = this.#findMatchingKey(defaultKey, userKeys)
            if (!matchingKey) {
                Object.assign(assembledOptions, { [defaultKey]: this.#defaultOptions[defaultKey] })
            } else {
                Object.assign(assembledOptions, { [matchingKey]: userOptions[matchingKey] })
            }
        }

        return assembledOptions
    }

    #findMatchingKey(key, userKeys) {
        return userKeys.find((element) => element === key)
    }
}