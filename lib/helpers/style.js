/**
 * @module Stores all style configurations.
 * @file helpers/style.js
 */

export class Style {
    #height
    #width
    #color
    #font

    constructor() {
    }

    set baseStyle(options) {
        this.#height = options.chartHeight
        this.#width = options.chartWidth
        this.#color = options.color
        this.#font = options.font
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

    get axisStyle() {
        // yAxis- borderLeft
        // yAxisPoint- borderTop
        // pointText- fontSize, display

        // xAxis- display, borderTop
        // valueText- fontSize, display, textAlign
    }
 
    get barStyle() {
        // graph- display, position
        // wrapper- display, justifyContent
        // bar- alignSelf
    }

    get lineStyle() {

    }

    get pieStyle() {

    }
 }