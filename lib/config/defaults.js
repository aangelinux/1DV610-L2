/**
 * @module Defines default values for the options object.
 */

export class Defaults {
    #linearOptions = {
        width: 550,
        height: 300,
        title: "Data Chart",
        color: "darkred",
        font: "Monaco, monospace"
    }
    #radialOptions = {
        radius: 150,
        title: "Data Chart",
        font: "Monaco, monospace"
    }

    constructor() {
    }

    get linearOptions() {
        return this.#linearOptions
    }

    get radialOptions() {
        return this.#radialOptions
    }
}