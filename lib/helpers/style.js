/**
 * @module Stores all dynamic style configurations.
 * @file helpers/style.js
 */

export class Style {
    #height
    #width
    #radius
    #color
    #font

    constructor() {
    }

    set baseStyle(options) {
        this.#height = options.chartHeight
        this.#width = options.chartWidth
        this.#radius = options.radius
        this.#color = options.color
        this.#font = options.font
    }

    get height() {
        return this.#height
    }

    get width() {
        return this.#width
    }

    get radius() {
        return this.#radius
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