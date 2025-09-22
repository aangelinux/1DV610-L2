/**
 * @module Stores all dynamic style configurations.
 * @file helpers/style.js
 */

export class Style {
    #height
    #width
    #color
    #font
    #fontSize

    constructor() {
    }

    set baseStyle(options) {
        this.#height = options.chartHeight
        this.#width = options.chartWidth
        this.#color = options.color
        this.#font = options.font
    }

    set fontSize(fontSize) {
        this.#fontSize = fontSize
    }

    get height() {
        return this.#height
    }

    get width() {
        return this.#width
    }

    get color() {
        return this.#color
    }

    get font() {
        return this.#font
    }

    get fontSize() {
        return this.#fontSize
    }
 }