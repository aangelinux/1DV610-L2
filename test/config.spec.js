/**
 * @module Tests that style options are properly configured.
 */

import { describe, test, expect } from "@jest/globals"
import { Defaults } from "../lib/config/defaults"
import { Configuration } from "../lib/helpers/configuration"

describe("assemble()", () => {
	test("uses user-defined style options (linear) if present", () => {
		const defaults = new Defaults()
		const configuration = new Configuration(defaults)
		const userOptions = { width: 400, font: "arial" }
		const options = configuration.assemble(userOptions, "LINEAR")

		expect(options).toStrictEqual({
			width: 400,
			height: 300,
			title: "Data Chart",
			color: "darkred",
			font: "arial"
		})
	})
})

describe("assemble()", () => {
	test("uses user-defined style options (radial) if present", () => {
		const defaults = new Defaults()
		const configuration = new Configuration(defaults)
		const userOptions = { radius: 300, font: "tahoma" }
		const options = configuration.assemble(userOptions, "RADIAL")

		expect(options).toStrictEqual({
			radius: 300,
			title: "Data Chart",
			font: "tahoma"
		})
	})
})

describe("assemble()", () => {
	test("excludes invalid options", () => {
		const defaults = new Defaults()
		const configuration = new Configuration(defaults)
		const userOptions = { pizza: "green", font: "arial" }
		const options = configuration.assemble(userOptions, "LINEAR")

		expect(options).toStrictEqual({
			width: 550,
			height: 300,
			title: "Data Chart",
			color: "darkred",
			font: "arial"
		})
	})
})