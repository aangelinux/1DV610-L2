/**
 * @module Configures the chart options.
 * @file helpers/config.js
 */

export class Config {
    #defaultGraphOptions = {
        chartWidth: 550,
        chartHeight: 300,
        title: "Data Chart",
        color: "darkred",
        font: "Monaco monospace"
    }
    #defaultPieOptions = {
        radius: 150,
        title: "Data Chart",
        font: "Monaco monospace"
    }

    constructor() {
    }

    get defaultGraphOptions() {
        return this.#defaultGraphOptions
    }

    get defaultPieOptions() {
        return this.#defaultPieOptions
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
        if (chartType === "PIE_CHART") {
            defaultOptions = this.#defaultPieOptions
        } else {
            defaultOptions = this.#defaultGraphOptions
        }
        
        return defaultOptions
    }

    #findMatchingKey(key, userKeys) {
        return userKeys.find((element) => element === key)
    }
}