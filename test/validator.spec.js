/**
 * @module Tests that data and style options are validated correctly.
 */

import { describe, test, expect } from "@jest/globals"
import { Rules } from "../lib/config/rules"
import { Validator } from "../lib/helpers/validator"

describe("validateData()", () => {
    test("doesn't throw if data is valid", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testData = [
            { name: "Oslo", value: 44 },
            { name: "Stockholm", value: 22 }
        ]
        expect(() => {
            validator.validateData(testData)
        }).not.toThrow()
    })
})

describe("validateData()", () => {
    test("throws RangeError if number of objects is outside allowed range", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testData = [{ name: "Oslo", value: 44 }]
        expect(() => {
            validator.validateData(testData)
        }).toThrow(RangeError)
    })

    test("throws RangeError if value is outside allowed range", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testData = [
            { name: "Oslo", value: -2 },
            { name: "Stockholm", value: 44 }
        ]
        expect(() => {
            validator.validateData(testData)
        }).toThrow(RangeError)
    })

    test("throws TypeError if type is incorrect", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testData = [
            { name: 1000, value: 44 },
            { name: "Stockholm", value: 22 }
        ]
        expect(() => {
            validator.validateData(testData)
        }).toThrow(TypeError)    
    })

    test("throws SyntaxError if key is invalid", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testData = [
            { pizza: "Oslo", value: 44 },
            { name: "Stockholm", value: 22, }
        ]
        expect(() => {
            validator.validateData(testData)
        }).toThrow(SyntaxError)
    })
})

describe("validateOptions()", () => {
    test("doesn't throw if options are valid", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testOptions = {
            width: 550,
            height: 300,
            title: "Test"
        }
        expect(() => {
            validator.validateOptions(testOptions)
        }).not.toThrow()
    })
})

describe("validateOptions()", () => {
    test("throws RangeError if value is outside allowed range", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testOptions = { width: 10000001 }
        expect(() => {
            validator.validateOptions(testOptions)
        }).toThrow(RangeError)
    })

    test("throws TypeError if type is incorrect", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testOptions = { height: "400" }
        expect(() => {
            validator.validateOptions(testOptions)
        }).toThrow(TypeError)
    })

    test("throws SyntaxError if key is invalid", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testOptions = { pizza: "red" }
        expect(() => {
            validator.validateOptions(testOptions)
        }).toThrow(SyntaxError)
    })
})

describe("validateOptions()", () => {
    test("throws TypeError if color is invalid", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testOptions = { color: "pizza" }
        expect(() => {
            validator.validateOptions(testOptions)
        }).toThrow(TypeError)
    })

    test("throws TypeError if font is invalid", () => {
        const rules = new Rules()
		const validator = new Validator(rules)

        const testOptions = { font: "pizza" }
        expect(() => {
            validator.validateOptions(testOptions)
        }).toThrow(TypeError)
    })
})