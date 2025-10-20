/**
 * @module Defines rules for data objects and style options.
 */

export class Rules {
	#dataObjects = { 
		min: 2, 
		max: 10 
	}
		
    #dataObjectKeys = { 
		min: 2, 
		max: 2 
	}

    #dataRange = { 
		min: 0, 
		max: 10000000 
	}

    #optionKeys = { 
		min: 0, 
		max: 5 
	}

    #optionRanges = {
        width: { min: 200, max: 1000 },
        height: { min: 150, max: 800 },
        radius: { min: 100, max: 400 }
    }

	#optionStrings = {
		color: [
			"darkred", 
			"red", 
			"orange", 
			"yellow", 
			"green", 
			"blue", 
			"indigo", 
			"violet", 
			"darkolivegreen"
		],
		font: [
			"monaco, monospace",
			"arial", 
			"verdana", 
			"tahoma", 
			"times new roman", 
			"georgia", 
			"lexend light"	
		]
	}

    #dataTypes = {
        name: "string",
        value: "number",
    }

    #optionsTypes = {
        width: "number",
        height: "number",
        radius: "number",
        title: "string",
        color: "string",
        font: "string"
    }

	constructor() {
	}

	get dataObjects() {
		return Object.freeze(this.#dataObjects)
	}

	get dataObjectKeys() {
		return Object.freeze(this.#dataObjectKeys)
	}

	get dataRange() {
		return Object.freeze(this.#dataRange)
	}

	get optionKeys() {
		return Object.freeze(this.#optionKeys)
	}

	get optionRanges() {
		return Object.freeze(this.#optionRanges)
	}

	get optionStrings() {
		return Object.freeze(this.#optionStrings)
	}

	get dataTypes() {
		return Object.freeze(this.#dataTypes)
	}

	get optionsTypes() {
		return Object.freeze(this.#optionsTypes)
	}
}