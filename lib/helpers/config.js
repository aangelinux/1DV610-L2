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
        font: "Georgia"
    }
    #defaultPieOptions = {
        radius: 300,
        title: "Data Chart",
        font: "Georgia"
    }

    constructor() {
    }

    get defaultGraphOptions() {
        return this.#defaultGraphOptions
    }

    get defaultPieOptions() {
        return this.#defaultPieOptions
    }

    _assemble(userOptions, chartType) {  // TODO simplify this method
        let defaultOptions
        if (chartType === "pieChart") {
            defaultOptions = this.#defaultPieOptions
        } else {
            defaultOptions = this.#defaultGraphOptions
        }

        let assembledOptions = {}
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

    #findMatchingKey(key, userKeys) {
        return userKeys.find((element) => element === key)
    }
}