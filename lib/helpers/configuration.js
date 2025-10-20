/**
 * @module Configures the chart style options based on default and user-defined values.
 */

export class Configuration {
    #defaults

    constructor(defaults) {
		this.#defaults = defaults
    }

    assemble(userOptions, chartType) {
        let options = {}
        const defaultOptions = this.#getDefaultOptions(chartType)
        const userKeys = Object.keys(userOptions)

        for (const defaultKey in defaultOptions) {
            const matchingKey = this.#findMatchingKey(defaultKey, userKeys)
            if (!matchingKey) {
                Object.assign(options, { [defaultKey]: defaultOptions[defaultKey] })
            } else {
                Object.assign(options, { [matchingKey]: userOptions[matchingKey] })
            }
        }
        return options
    }

    #getDefaultOptions(chartType) {
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