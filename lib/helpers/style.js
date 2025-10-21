/**
 * @module Stores all dynamic style configurations.
 */

export class Style {
    #color
    #font

    constructor() {
    }

    set baseStyle(options) {
        this.#color = options.color
        this.#font = options.font
    }

    get color() {
        return this.#color
    }

    get pieColors() {
        return [
            "red",
            "yellow",
            "green",
            "darkgreen",
            "blue",
            "aqua",
            "indigo",
            "violet",
            "pink"
        ]
    }

    get font() {
        return this.#font
    }
 }