/**
 * @module Tests that data and style options are validated correctly.
 */

import { describe, test, expect } from "@jest/globals"
import { Chart } from "../lib/public/chart.js"

describe("validateData()", () => {
    test("doesn't throw if data is valid", () => {
        const chart = new Chart()

        const testData = [
            { name: "Oslo", value: 44 },
            { name: "Stockholm", value: 22 }
        ]
        expect(() => {
            chart.validateData(testData)
        }).not.toThrow()
    })
})

describe("validateOptions()", () => {
    test("doesn't throw if options are valid", () => {
        const chart = new Chart()

        const testOptions = {
            width: 550,
            height: 300,
            title: "Test"
        }
        expect(() => {
            chart.validateOptions(testOptions)
        }).not.toThrow()
    })
})

describe("validateData()", () => {
    test("throws RangeError if number of objects is outside allowed range", () => {
        const chart = new Chart()

        const testData = [{ name: "Oslo", value: 44 }]
        expect(() => {
            chart.validateData(testData)
        }).toThrow(RangeError)
    })

    test("throws RangeError if value is outside range", () => {
        const chart = new Chart()

        const testData = [
            { name: "Oslo", value: -2 },
            { name: "Stockholm", value: 44 }
        ]
        expect(() => {
            chart.validateData(testData)
        }).toThrow(RangeError)
    })

    test("throws TypeError if type is incorrect", () => {
        const chart = new Chart()

        const testData = [
            { name: 100, value: 44 },
            { name: "Stockholm", value: 22 }
        ]
        expect(() => {
            chart.validateData(testData)
        }).toThrow(TypeError)    
    })

    test("throws SyntaxError if key is invalid", () => {
        const chart = new Chart()

        const testData = [
            { pizza: "Oslo", value: 44 },
            { name: "Stockholm", value: 22, }
        ]
        expect(() => {
            chart.validateData(testData)
        }).toThrow(SyntaxError)
    })
})


describe("validateOptions()", () => {
    test("throws RangeError if number of keys is outside allowed range", () => {
        const chart = new Chart()

        const testOptions = {
            width: 550,
            height: 300,
            title: "Test",
            color: "red",
            font: "arial",
			pizza: "yes"
        }
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(RangeError)
    })

    test("throws RangeError if value is outside range", () => {
        const chart = new Chart()

        const testOptions = { width: 10000001 }
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(RangeError)
    })

    test("throws TypeError if type is incorrect", () => {
        const chart = new Chart()

        const testOptions = { height: "400" }
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(TypeError)
    })

    test("throws SyntaxError if key is invalid", () => {
        const chart = new Chart()

        const testOptions = { pizza: "yes" }
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(SyntaxError)
    })
})

describe("validateOptions()", () => {
    test("throws TypeError if color is invalid", () => {
        const chart = new Chart()

        const testOptions = { color: "pizza" }
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(TypeError)
    })

    test("throws TypeError if font is invalid", () => {
        const chart = new Chart()

        const testOptions = { font: "pizza" }
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(TypeError)
    })
})