/**
 * @module Configures the chart style options.
 * @file helpers/configuration.js
 */

import { Defaults } from "../config/defaults.js" 

export class Configuration {
    #defaults

    constructor() {
		this.#defaults = new Defaults()
    }

    _assemble(userOptions, chartType) {
        let assembledOptions = {}
        const defaultOptions = this.#getDefaultOptionsFor(chartType)
        const userKeys = Object.keys(userOptions)

        for (const defaultKey in defaultOptions) {
            const matchingKey = this.#findMatchingKey(defaultKey, userKeys)
            if (!matchingKey) {
                Object.assign(assembledOptions, { [defaultKey]: defaultOptions[defaultKey] })
            } else {
                Object.assign(assembledOptions, { [matchingKey]: userOptions[matchingKey] })
            }
        }

        return assembledOptions
    }

    #getDefaultOptionsFor(chartType) {
        let defaultOptions
        if (chartType === "RADIAL") {
            defaultOptions = this.#defaults.radialOptions
        } else {
            defaultOptions = this.#defaults.linearOptions
        }
        
        return defaultOptions
    }

    #findMatchingKey(key, userKeys) {
        return userKeys.find((element) => element === key)
    }
}