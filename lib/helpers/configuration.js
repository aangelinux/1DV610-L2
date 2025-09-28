/**
 * @module Configures the chart options.
 * @file helpers/configuration.js
 */

export class Configuration {
    #defaultLinearOptions = {
        width: 550,
        height: 300,
        title: "Data Chart",
        color: "darkred",
        font: "Monaco, monospace"
    }
    #defaultRadialOptions = {
        radius: 150,
        title: "Data Chart",
        font: "Monaco, monospace"
    }

    constructor() {
    }

    get defaultLinearOptions() {
        return this.#defaultLinearOptions
    }

    get defaultRadialOptions() {
        return this.#defaultRadialOptions
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
            defaultOptions = this.#defaultRadialOptions
        } else {
            defaultOptions = this.#defaultLinearOptions
        }
        
        return defaultOptions
    }

    #findMatchingKey(key, userKeys) {
        return userKeys.find((element) => element === key)
    }
}