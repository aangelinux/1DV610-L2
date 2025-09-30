/**
 * @module Defines unit tests for the library.
 * @file test/unit.spec.js
 */

import { describe, test, expect } from "@jest/globals"
import { Chart } from "../lib/public/chart.js"

describe("validateData() - object", () => {
    test("throws RangeError if number of number of objects is outside range", () => {
        const testData = [
            {
                name: "Oslo",
                value: 44
            }
        ]

        const chart = new Chart()
        expect(() => {
            chart.validateData(testData)
        }).toThrow(RangeError)
    })
})

describe("validateOptions() - object", () => {
    test("throws RangeError if number of number of keys is outside range", () => {
        const testOptions = {
            width: 550,
            height: 300,
            radius: 300,
            title: "Test",
            color: "red",
            font: "arial",
        }

        const chart = new Chart()
        expect(() => {
            chart.validateData(testOptions)
        }).toThrow(RangeError)
    })
})


describe("validateData() - values", () => {
    test("throws RangeError if value is outside range", () => {
        const testData = [
            {
                name: "Oslo",
                value: 44
            },
            {
                name: "Stockholm",
                value: 1000001
            }
        ]

        const chart = new Chart()
        expect(() => {
            chart.validateData(testData)
        }).toThrow(RangeError)
    })

    test("throws TypeError if type is wrong", () => {
        const testData = [
            {
                name: "Oslo",
                value: "44"
            },
            {
                name: "Stockholm",
                value: 22
            }
        ]
        
        const chart = new Chart()
        expect(() => {
            chart.validateData(testData)
        }).toThrow(TypeError)    
    })

    test("throws SyntaxError if key doesn't exist", () => {
        const testData = [
            {
                name: "Oslo",
                value: 44
            },
            {
                name: "Stockholm",
                pizza: 22,
            }
        ]
        
        const chart = new Chart()
        expect(() => {
            chart.validateData(testData)
        }).toThrow(SyntaxError)    
    })

    test("returns nothing if data object is correct", () => {
        const testData = [
            {
                name: "Oslo",
                value: 44
            },
            {
                name: "Stockholm",
                value: 22,
            }
        ]
        
        const chart = new Chart()
        expect(() => {
            chart.validateData(testData)
        }).toBeTruthy()
    })
})


describe("validateOptions() - values", () => {
    test("throws RangeError if value is outside range", () => {
        const testOptions = {
            width: 1001,
            height: 300,
            title: "Test",
            color: "red",
            font: "arial"
        }

        const chart = new Chart()
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(RangeError)
    })

    test("throws TypeError if type is wrong", () => {
        const testOptions = {
            width: "500",
            height: 300,
            title: "Test",
            color: "red",
            font: "arial"
        }

        const chart = new Chart()
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(TypeError)
    })

    test("throws RangeError if value is outside range", () => {
        const testOptions = {
            width: 550,
            height: 300,
            title: "Test",
            color: "red",
            pizza: "arial"
        }

        const chart = new Chart()
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(SyntaxError)
    })

    test("returns nothing if options object is correct", () => {
        const testOptions = {
            width: 550,
            height: 300,
            title: "Test",
            color: "red",
            font: "arial"
        }

        const chart = new Chart()
        expect(() => {
            chart.validateOptions(testOptions)
        }).toBeTruthy()
    })
})

describe("validateOptions() - color & font", () => {
    test("throws TypeError if color is invalid", () => {
        const testOptions = {
            width: 550,
            height: 300,
            title: "Test",
            color: "pizza",
            font: "arial"
        }

        const chart = new Chart()
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(TypeError)
    })

    test("throws TypeError if font is invalid", () => {
        const testOptions = {
            width: 550,
            height: 300,
            title: "Test",
            color: "red",
            font: "pizza"
        }

        const chart = new Chart()
        expect(() => {
            chart.validateOptions(testOptions)
        }).toThrow(TypeError)
    })
})